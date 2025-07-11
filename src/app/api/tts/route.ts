// ============================================================
// File: src/app/lipsync/api/tts/route.ts
// Next.js (App Router) API route. Path = /lipsync/api/tts
// It receives { data: string } → forwards to n8n → streams audio back
// with proper CORS headers so the browser can consume it.
// ============================================================

import { type NextRequest } from 'next/server';

const N8N_TTS_URL =
    process.env.NEXT_PUBLIC_TTS_WEBHOOK_URL ??
    'https://your-n8n-domain/webhook/text-to-speech';

export const runtime = 'nodejs'; // use edge if you prefer

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const { data } = (await request.json()) as { data: string };
        if (!data?.trim()) {
            return new Response('No text provided', { status: 400 });
        }

        const upstream = await fetch(N8N_TTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (!upstream.ok) {
            return new Response(await upstream.text(), { status: upstream.status });
        }

        const arrayBuffer = await upstream.arrayBuffer();

        return new Response(arrayBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (err) {
        return new Response('Internal server error', { status: 500 });
    }
}
