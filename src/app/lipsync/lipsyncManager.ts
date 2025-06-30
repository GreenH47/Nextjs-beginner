//src/app/lipsync/lipsyncManager.ts
import { Lipsync } from 'wawa-lipsync';

// Singleton instance – import it wherever you need FFT data.
export const lipsyncManager = new Lipsync({
    fftSize: 2048,   // sensible latency / resolution trade‑off
    historySize: 60, // keep about 1 second of history for smoothing
});