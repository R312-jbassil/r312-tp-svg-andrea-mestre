import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export const POST = async ({ request, locals }) => {
    try {
        const { id } = await request.json();
        const user = locals.user;
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID requis' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Vérifier que le SVG appartient à l'utilisateur
        try {
            const existingSvg = await pb.collection('svgs').getOne(id);
            if (existingSvg.user !== user?.id) {
                console.error("⛔ Accès refusé: L'utilisateur ne peut pas supprimer ce SVG");
                return new Response(JSON.stringify({ 
                    error: 'Vous n\'avez pas la permission de supprimer ce SVG' 
                }), { 
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch (e) {
            return new Response(JSON.stringify({ 
                error: 'SVG non trouvé' 
            }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Suppression de l'enregistrement
        await pb.collection('svgs').delete(id);
        console.log("✅ SVG supprimé:", id);

        return new Response(JSON.stringify({ 
            success: true,
            message: 'SVG supprimé avec succès !' 
        }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        return new Response(JSON.stringify({ 
            error: 'Erreur de suppression',
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
