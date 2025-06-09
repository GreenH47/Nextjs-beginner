// src/app/qrcode/page.tsx
import QRCodeClient from './QRCodeClient';
import Link from 'next/link';
import ImagePopup from '@/components/ImagePopup';

export default function QRCodePage() {
    return (
        <main className="flex flex-col items-center p-8">
            <h1 className="text-2xl font-semibold mb-4">QR-Code Generator</h1>

            {/* --- intro text --- */}
            <p className="max-w-prose text-sm text-gray-700 leading-6 mb-8 text-center">
                This demo calls an{' '}
                <Link
                    href="https://n8n.io/workflows/4596-qr-code-generator-via-webhook/"
                    className="underline text-blue-700"
                    target="_blank"
                >
                    n8n workflow template
                </Link>{' '}
                that listens for <code>POST</code> requests on{' '}
                <code>/webhook/qrcode</code>, forwards the <code>data</code> field to
                generate the image, then streams that binary back through a
                <em> Respond to Webhook</em> node. The browser receives an
                <code>image/png</code> payload, turns it into a Blob-URL, and swaps the
                form for the finished QR code.
            </p>

            {/* --- new screenshots section --- */}
            <section className="mb-10 text-sm">
                <h2 className="font-medium mb-2 text-lg text-center">
                    How the workflow looks in n8n
                </h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <ImagePopup
                            src="/qrcode/n8n-workflow.png"
                            label="View n8n workflow diagram"
                        />
                    </li>
                    <li>
                        <ImagePopup
                            src="/qrcode/api-response.png"
                            label="View sample API response"
                        />
                    </li>
                </ul>
            </section>

            {/* interactive widget — stays the same */}
            <QRCodeClient endpoint="/api/qrcode" />
        </main>
    );
}
