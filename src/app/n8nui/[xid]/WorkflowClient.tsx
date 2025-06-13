// ────────────────────────────────────────────────────────────────────
// src/app/n8nui/[xid]/WorkflowClient.tsx   (client‑side helper)
// ────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Props {
    xid: string;
}

interface Execution {
    id: string;
    finished: boolean;
    status: string;
    createdAt: string;
    startedAt: string;
    stoppedAt: string | null;
}

export default function WorkflowClient({ xid }: Props) {
    const router = useRouter();
    const [exec, setExec] = useState<Execution | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("complete");

    const fetchStatus = useCallback(async () => {
        try {
            const res = await fetch(`/api/n8nui/${encodeURIComponent(xid)}`);
            if (!res.ok) throw new Error(await res.text());
            const data = (await res.json()) as Execution;
            setExec(data);
        } catch (err: any) {
            setError(err.message ?? "Failed to fetch status");
        } finally {
            setLoading(false);
        }
    }, [xid]);

    useEffect(() => {
        fetchStatus();
        const id = setInterval(fetchStatus, 3000); // poll every 3 s
        return () => clearInterval(id);
    }, [fetchStatus]);

    const handleSubmit = async () => {
        setSubmitLoading(true);
        try {
            const res = await fetch(`/api/n8nui/${encodeURIComponent(xid)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([{ data: inputValue }]),
            });
            if (!res.ok) throw new Error(await res.text());
            await fetchStatus(); // refresh immediately
        } catch (err: any) {
            setError(err.message ?? "Submission failed");
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="h‑screen flex items-center justify-center">
                <p className="text-gray-500">Loading status…</p>
            </main>
        );
    }

    if (!exec) {
        return (
            <main className="h‑screen flex items-center justify-center">
                <p className="text-red-500">{error ?? "Unknown error"}</p>
            </main>
        );
    }

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Workflow #{exec.id}</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Status Column */}
                <div className="rounded-xl border p-4 flex flex-col gap-2 shadow-sm">
                    <h2 className="font-semibold">Status</h2>
                    <p>
                        <span className="font-medium">State:</span> {exec.status}
                    </p>
                    <p>
                        <span className="font-medium">Finished:</span> {String(exec.finished)}
                    </p>
                    {exec.stoppedAt && (
                        <p>
                            <span className="font-medium">Stopped At:</span> {exec.stoppedAt}
                        </p>
                    )}
                    <button
                        className="mt-4 text-sm text-blue-600 hover:underline"
                        onClick={fetchStatus}
                    >
                        Refresh
                    </button>
                </div>

                {/* Interaction Column */}
                <div className="rounded-xl border p-4 flex flex-col gap-4 shadow-sm">
                    <h2 className="font-semibold">Complete Wait Node</h2>

                    {exec.finished ? (
                        <p className="text-green-600 font-medium">Workflow is complete ✅</p>
                    ) : (
                        <>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full dark:bg-gray-800"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={submitLoading}
                                className="rounded-lg bg-emerald-600 px-6 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {submitLoading ? "Submitting…" : "Submit & Resume"}
                            </button>
                        </>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>
        </main>
    );
}
