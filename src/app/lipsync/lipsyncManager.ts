'use client';

import type { Lipsync as LipsyncType } from 'wawa-lipsync';

function createLipsync(): LipsyncType | null {
    if (typeof window === 'undefined') {
        // Stub so SSR doesn’t crash and types stay happy
        return null as unknown as LipsyncType;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Lipsync } = require('wawa-lipsync') as typeof import('wawa-lipsync');
    return new Lipsync({ fftSize: 2048, historySize: 60 });
}

export const lipsyncManager = createLipsync();
