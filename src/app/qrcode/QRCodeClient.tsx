// src/app/qrcode/QRCodeClient.tsx
"use client";
import { useState } from 'react';
type Props = { endpoint: string };

export default function QRCodeClient({ endpoint }: Props) {
    const [data, setData] = useState('');
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setImgSrc(null);

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data }),
            });
            if (!res.ok) throw new Error(`Server returned ${res.status}`);

            // Receive the binary from our Route Handler
            const blob = await res.blob();                           // turn1search0
            setImgSrc(URL.createObjectURL(blob));                    // turn1search1
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
                <label htmlFor="qrdata" className="font-medium">
                    Text or URL to encode
                </label>
                <input
                    id="qrdata"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                    placeholder="https://example.com"
                    className="border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Generating…' : 'Generate QR Code'}
                </button>
            </form>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {imgSrc && (
                <div className="mt-6">
                    <img src={imgSrc} alt="Generated QR Code" />
                </div>
            )}
        </>
    );
}
