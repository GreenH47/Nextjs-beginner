// src/app/qrcode/page.tsx
import QRCodeClient from './QRCodeClient';
import Link from 'next/link';

export default function QRCodePage() {
    return (
        <main className="flex flex-col items-center p-8">
            <h1 className="text-2xl font-semibold mb-4">QR-Code Generator</h1>
            <p>
                This demo calls an{" "}
                <Link
                    href="https://n8n.io/workflows/4596-qr-code-generator-via-webhook/"
                    className="underline text-blue-700"
                    target="_blank"
                >
                    n8n workflow template
                </Link>{" "}
                that listens for <code>POST</code> requests on <code>/webhook/qrcode</code>,
                forwards the <code>data</code> field to
                generate the image, then streams that binary back through a
                <em> Respond to Webhook</em> node. As soon as the browser receives the
                <code>image/png</code>&nbsp;payload our React client turns it into a
                Blob-URL and swaps the UI from the form state to the finished QR
            </p>
            {/* client will hit /api/qrcode, so no secrets leave the server */}
            <QRCodeClient endpoint="/api/qrcode"/>
        </main>
    );
}
