import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export const POST = async ({ request }) => {
    try {
        const { id } = await request.json();
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID requis' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Suppression de l'enregistrement
        await pb.collection('svgs').delete(id);

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
