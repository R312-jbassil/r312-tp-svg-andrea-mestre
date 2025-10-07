import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export const POST = async ({ request }) => {
    try {
        // Récupération des données depuis le frontend
        const { name, code, prompt } = await request.json();
        console.log("Données reçues:", { name, code: code?.substring(0, 50) + "...", prompt });
        
        if (!code) {
            console.log("Erreur: Code SVG manquant");
            return new Response(JSON.stringify({ error: 'Code SVG requis' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }


        // Données à sauvegarder (adapter aux champs de votre collection)
        const data = {
            name: name || `SVG_${new Date().toISOString().slice(0, 19)}`,
            code: code,  // Le code SVG généré
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),  // Format: YYYY-MM-DD HH:mm:ss
            prompt: prompt || ""  // Le prompt utilisé pour générer le SVG
        };
        console.log("Données à sauvegarder:", { name: data.name, codeLength: data.code.length, prompt: data.prompt, date: data.date });

        // Sauvegarde dans la collection 'svgs'
        console.log("Envoi vers PocketBase...");
        const record = await pb.collection('svgs').create(data);
        console.log("Sauvegarde réussie:", record.id);

        return new Response(JSON.stringify({ 
            success: true, 
            id: record.id,
            message: 'SVG sauvegardé avec succès !' 
        }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Erreur complète:", error);
        return new Response(JSON.stringify({ 
            error: 'Erreur de sauvegarde',
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};