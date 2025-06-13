// ────────────────────────────────────────────────────────────────────
// src/app/n8nui/StartWorkflowClient.tsx   (client‑side helper)
// ────────────────────────────────────────────────────────────────────
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartWorkflowClient() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStart = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/n8nui", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            if (!res.ok) throw new Error(await res.text());
            const { xid } = (await res.json()) as { xid: string };
            router.push(`/n8nui/${encodeURIComponent(xid)}`);
        } catch (err: any) {
            setError(err.message ?? "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleStart}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Starting…" : "Start Workflow"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}