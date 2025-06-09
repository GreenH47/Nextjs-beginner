// src/components/ImagePopup.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = { src: string; label: string };

export default function ImagePopup({ src, label }: Props) {
    const [open, setOpen] = useState(false);

    // stopPropagation keeps a click on the image from closing the overlay
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="underline text-blue-700 hover:text-blue-900"
            >
                {label}
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="relative max-h-[90vh] w-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            aria-label="Close"
                            className="absolute -top-3 -right-3 rounded-full bg-white px-2 font-bold shadow"
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>
                        <Image
                            src={src}
                            alt={label}
                            width={960}
                            height={600}
                            className="w-auto max-h-[90vh] rounded shadow-lg"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
