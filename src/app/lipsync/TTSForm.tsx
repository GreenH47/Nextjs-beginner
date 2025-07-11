// ============================================================
// File: src/app/lipsync/TTSForm.tsx
// UI component: lets the user type text → gets back audio → updates store
// ============================================================

'use client';
import React, { useState } from 'react';
import { fetchSpeechAudio } from './ttsClient';
import { useLipSyncStore } from './useLipSyncStore';

export const TTSForm: React.FC = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const setAudioUrl = useLipSyncStore((s) => s.setAudioUrl);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            const url = await fetchSpeechAudio(text.trim());
            setAudioUrl(url);
        } catch (err) {
            console.error(err);
            alert(
                err instanceof Error ? err.message : 'Something went wrong generating audio.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-6">
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to synthesize…"
          className="bg-white/5 text-white p-3 rounded outline-none min-h-[100px]"
      />
            <button
                type="submit"
                disabled={loading}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? 'Generating…' : 'Generate & Lip‑Sync'}
            </button>
        </form>
    );
};
