import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export const POST = async ({ request }) => {
    try {
        const { id, code, history } = await request.json();
        
        console.log("🔄 Mise à jour du SVG:", { id, codeLength: code?.length, historyLength: history?.length });

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID requis' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!code) {
            return new Response(JSON.stringify({ error: 'Code SVG requis' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Données à mettre à jour
        const data = {
            code: code,
            history: history || "[]"
        };

        // Mise à jour dans PocketBase
        const record = await pb.collection('svgs').update(id, data);
        console.log("✅ SVG mis à jour:", record.id);

        return new Response(JSON.stringify({ 
            success: true,
            id: record.id,
            message: 'SVG mis à jour avec succès !' 
        }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour:", error);
        return new Response(JSON.stringify({ 
            error: 'Erreur de mise à jour',
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
