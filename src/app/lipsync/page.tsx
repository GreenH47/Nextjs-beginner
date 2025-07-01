'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from '@/components/lipsync/Experience';
import { Visualizer } from '@/components/lipsync/Visualizer';

const LipsyncPage: React.FC = () => (
    <main className="flex flex-col-reverse lg:flex-row overflow-hidden h-full w-full">
        {/* LEFT COLUMN --------------------------------------------------------*/}
        <div className="p-10 lg:max-w-2xl overflow-y-auto">
            <a
                className="pointer-events-auto select-none opacity-0 animate-fade-in-down animation-delay-200"
                href="https://wawasensei.dev"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src="/images/wawasensei.png"
                    alt="Wawa Sensei logo"
                    className="w-20 h-20 object-contain"
                />
            </a>
            <Visualizer />
        </div>

        {/* RIGHT COLUMN -------------------------------------------------------*/}
        <div className="flex-1 bg-gradient-to-b from-pink-400 to-pink-200 relative">
            {/*  ❗ Suspense goes OUTSIDE the Canvas  */}
            <Suspense fallback={<div className="text-white p-4">Loading…</div>}>
                <Canvas shadows camera={{ position: [12, 8, 26], fov: 30 }}>
                    <Experience />
                </Canvas>
            </Suspense>

            {/* Overlay gradient & CTA */}
            <div className="bg-gradient-to-b from-transparent to-black/90 absolute bottom-0 top-3/4 left-0 right-0 pointer-events-none z-10" />
            <div className="bottom-4 fixed z-20 right-4 md:right-15 flex items-center gap-4 animation-delay-1500 animate-fade-in-up opacity-0">
                <div className="w-20 h-px bg-white/60" />
                <a
                    href="https://lessons.wawasensei.dev/courses/react-three-fiber/"
                    className="text-white/60 text-xs pointer-events-auto select-none"
                >
                    Learn Three.js &amp; React Three Fiber
                </a>
            </div>
        </div>
    </main>
);

export default LipsyncPage;
