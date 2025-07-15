// ─────────────────────────────────────────────────────────────
// Text‑to‑Speech Lip‑Sync Feature – v3 (Audio files extracted)
// ============================================================
// NEW FILE ▶ src/components/lipsync/AudioFiles.ts
//   ‑ Houses the (large) `audioFiles` array so Visualizer stays lean.

// ============================================================
// File: src/components/lipsync/AudioFiles.ts
// ============================================================

export interface AudioFileEntry {
    name: string;
    path: string;
}

export interface AudioFileSection {
    name: string;
    files: AudioFileEntry[];
}

/**
 * Master list of demo/reference audio clips for the lipsync visualiser.
 * Paths are relative to the public folder (e.g. `/lipsync/audios/...`).
 */
export const audioFiles: AudioFileSection[] = [
    {
        name: "Emma (ElevenLabs)",
        files: [
            { name: "A", path: "/lipsync/audios/ElevenLabs_Emma_a.mp3" },
            { name: "E", path: "/lipsync/audios/ElevenLabs_Emma_e.mp3" },
            { name: "O", path: "/lipsync/audios/ElevenLabs_Emma_o.mp3" },
            { name: "You", path: "/lipsync/audios/ElevenLabs_Emma_you.mp3" },
            { name: "Vowels", path: "/lipsync/audios/ElevenLabs_Emma_vowels.mp3" },
            { name: "Ta", path: "/lipsync/audios/ElevenLabs_Emma_ta.mp3" },
            { name: "Click", path: "/lipsync/audios/ElevenLabs_Emma_click.mp3" },
            { name: "Bump", path: "/lipsync/audios/ElevenLabs_Emma_bump.mp3" },
            { name: "Not", path: "/lipsync/audios/ElevenLabs_Emma_not.mp3" },
            { name: "Lot", path: "/lipsync/audios/ElevenLabs_Emma_lot.mp3" },
            { name: "Think", path: "/lipsync/audios/ElevenLabs_Emma_think.mp3" },
            { name: "Fan", path: "/lipsync/audios/ElevenLabs_Emma_fan.mp3" },
            { name: "This", path: "/lipsync/audios/ElevenLabs_Emma_this.mp3" },
            { name: "Consonants", path: "/lipsync/audios/ElevenLabs_Emma_consonants.mp3" },
        ],
    },
    {
        name: "Liam (ElevenLabs)",
        files: [
            { name: "A", path: "/lipsync/audios/ElevenLabs_Liam_a.mp3" },
            { name: "E", path: "/lipsync/audios/ElevenLabs_Liam_e.mp3" },
            { name: "O", path: "/lipsync/audios/ElevenLabs_Liam_o.mp3" },
            { name: "You", path: "/lipsync/audios/ElevenLabs_Liam_you.mp3" },
            { name: "Vowels", path: "/lipsync/audios/ElevenLabs_Liam_vowels.mp3" },
            { name: "Ta", path: "/lipsync/audios/ElevenLabs_Liam_ta.mp3" },
            { name: "Click", path: "/lipsync/audios/ElevenLabs_Liam_click.mp3" },
            { name: "Bump", path: "/lipsync/audios/ElevenLabs_Liam_bump.mp3" },
            { name: "Not", path: "/lipsync/audios/ElevenLabs_Liam_not.mp3" },
            { name: "Lot", path: "/lipsync/audios/ElevenLabs_Liam_lot.mp3" },
            { name: "Think", path: "/lipsync/audios/ElevenLabs_Liam_think.mp3" },
            { name: "Fan", path: "/lipsync/audios/ElevenLabs_Liam_fan.mp3" },
            { name: "This", path: "/lipsync/audios/ElevenLabs_Liam_this.mp3" },
            { name: "Consonants", path: "/lipsync/audios/ElevenLabs_Liam_consonants.mp3" },
        ],
    },
    {
        name: "Misc",
        files: [
            { name: "ElevenLabs long test", path: "/lipsync/audios/ElevenLabs_Text_to_Speech_audio.mp3" },
            { name: "OpenAI Alloy test", path: "/lipsync/audios/OpenAI_Alloy_test.mp3" },
            { name: "OpenAI Alloy test (short)", path: "/lipsync/audios/OpenAI_Alloy_test_short.mp3" },
        ],
    },
];
