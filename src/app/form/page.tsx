"use client";

import { useUser } from "@clerk/nextjs";
import { useFormState } from "react-dom";            // still valid in Next 15 :contentReference[oaicite:9]{index=9}
import { useEffect } from "react";
import { createMessage, type ActionState } from "./actions";

export default function FormPage() {
    const { isLoaded, user } = useUser();

    // Initial state just needs to satisfy the union
    const [state, formAction] = useFormState<ActionState | undefined, FormData>(
        createMessage,
        undefined,                        // ← no initial object
    );

    useEffect(() => {
        if (!state) return;
        if (state.ok)  window.alert(`✅ Message saved! Row id: ${state.id}`);
        else           window.alert(`❌ ${state.message}`);
    }, [state]);

    if (!isLoaded) return <p className="p-4">Loading…</p>;
    if (!user)     return <p className="p-4">You must sign in first.</p>;

    return (
        <main className="mx-auto max-w-lg p-4 space-y-6">
            <h1 className="text-2xl font-bold">Create a new message</h1>

            <p className="text-sm">
                Signed in as: <code>{user.id}</code>
            </p>

            {/* Server Action wired directly to the form */}
            <form action={formAction} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Subject"
                    maxLength={120}
                    required
                    className="border rounded p-2"
                />
                <textarea
                    name="body"
                    placeholder="Your message (max 5000 chars)…"
                    maxLength={5000}
                    required
                    rows={6}
                    className="border rounded p-2"
                />
                <button className="rounded bg-blue-600 text-white py-2 font-medium hover:bg-blue-700">
                    Save
                </button>
            </form>
        </main>
    );
}
