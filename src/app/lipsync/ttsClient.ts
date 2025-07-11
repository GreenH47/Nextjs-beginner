// ============================================================
// File: src/app/lipsync/ttsClient.ts
// Helper to call your n8n Text‑to‑Speech webhook and return an ObjectURL
// ============================================================

export async function fetchSpeechAudio(text: string): Promise<string> {
    if (!text.trim()) throw new Error('Text input is empty');

    // Same‑origin path avoids CORS issues.
    const proxyPath = '/api/tts';

    const res = await fetch(proxyPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: text }),
    });

    if (!res.ok) {
        const msg = await res.text().catch(() => res.statusText);
        throw new Error(`TTS request failed: ${res.status} – ${msg}`);
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
}