import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request, cookies }) => {
    try {
        const { name, email, password, passwordConfirm } = await request.json();

        // Validation des données
        if (!name || !email || !password || !passwordConfirm) {
            return new Response(
                JSON.stringify({ error: "Tous les champs sont requis" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (password !== passwordConfirm) {
            return new Response(
                JSON.stringify({ error: "Les mots de passe ne correspondent pas" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (password.length < 8) {
            return new Response(
                JSON.stringify({ error: "Le mot de passe doit contenir au moins 8 caractères" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Générer un username unique à partir de l'email
        const username = email.split('@')[0] + '_' + Date.now().toString().slice(-6);

        // Création de l'utilisateur dans PocketBase
        const userData = {
            username,
            name,
            email,
            password,
            passwordConfirm,
            emailVisibility: true,
        };

        console.log("Création de l'utilisateur:", { username, name, email });
        
        const user = await pb.collection(Collections.Users).create(userData);
        
        console.log("✅ Utilisateur créé:", user.id);

        // Authentification automatique après création
        const authData = await pb.collection(Collections.Users).authWithPassword(email, password);
        
        // Sauvegarder le cookie d'authentification
        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
        });

        console.log("✅ Authentification réussie pour:", authData.record.email);

        return new Response(
            JSON.stringify({
                success: true,
                user: {
                    id: authData.record.id,
                    email: authData.record.email,
                    username: authData.record.username,
                    name: authData.record.name,
                },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("❌ Erreur lors de la création du compte:", error);
        
        // Gérer les erreurs spécifiques de PocketBase
        let errorMessage = "Erreur lors de la création du compte";
        
        if (error.response?.data) {
            const data = error.response.data;
            if (data.email) {
                errorMessage = "Cet email est déjà utilisé";
            } else if (data.username) {
                errorMessage = "Ce nom d'utilisateur est déjà pris";
            } else if (data.message) {
                errorMessage = data.message;
            }
        }

        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
};
