// ============================================================
// File: src/app/lipsync/useLipSyncStore.ts
// Global store (Zustand) holding the current audio URL to be lip‑sync’d
// ============================================================

'use client';
import { create } from 'zustand';

interface LipSyncState {
    audioUrl: string | null;
    setAudioUrl: (url: string | null) => void;
}

export const useLipSyncStore = create<LipSyncState>((set) => ({
    audioUrl: null,
    setAudioUrl: (url) => set({ audioUrl: url }),
}));