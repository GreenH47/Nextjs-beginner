"use client";
import StartWorkflowClient from "./StartWorkflowClient";
import ImagePopup from "@/components/ImagePopup";
import Link from "next/link";

export default function N8nUiLandingPage() {
    return (
        <main className="mx-auto max-w-2xl p-6 flex flex-col items-center gap-8 text-center">
            <h1 className="text-3xl font-bold dark:text-white">n8n × Next.js Quick Demo</h1>

            <p className="text-gray-600 dark:text-gray-300">Press the button below—here’s what happens:</p>
            <ol className="list-decimal list-inside text-left text-sm leading-6 max-w-prose text-gray-700 dark:text-gray-300">
                <li>We <code className="font-mono">POST /api/n8nui</code>, a thin proxy to your n8n Webhook.</li>
                <li>n8n replies with an <strong>xid</strong>, so we redirect to <code className="font-mono">/n8nui/&lt;xid&gt;</code>.</li>
                <li>That page polls the n8n <em>Executions API</em> and lets you resume the Wait node.</li>
            </ol>

            <div className="w-full grid sm:grid-cols-2 gap-6 mt-4">
                <ImagePopup src="/n8nui/workflow.png" label="Workflow diagram" />
                <ImagePopup src="/n8nui/works.png" label="Wait‑resume flow" />
                <ImagePopup src="/n8nui/n8nui-sequence.png" label="sequence flow" />
            </div>

            <StartWorkflowClient />

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                Source&nbsp;code on&nbsp;
                <Link href="https://github.com/n8nui/examples" className="underline" target="_blank">
                    Code reference
                </Link>
                <Link href="https://github.com/GreenH47/Nextjs-beginner/tree/main/src/app/n8nui" className="underline" target="_blank">
                    page source
                </Link>
            </p>
        </main>
    );
}