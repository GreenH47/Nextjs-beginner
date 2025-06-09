// This file runs only on the server (Node), so env vars stay secret.
export async function POST(req: Request) {
    const body = await req.text();               // pass raw body straight through

    const upstream = await fetch(
        process.env.N8N_WEBHOOK_URL_QRCODE!,       // ← your real n8n URL
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        },
    );

    // Copy n8n’s content-type (image/png) so the browser knows it’s binary
    const blob = await upstream.blob();
    return new Response(blob, {
        status: upstream.status,
        headers: { 'Content-Type': upstream.headers.get('content-type') ?? 'image/png' },
    });
}

// Optional: respond 200 to the CORS pre-flight if you still need it
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '300',
        },
    });
}
