"use client";

import { useUser } from "@clerk/nextjs";                   // Clerk hook :contentReference[oaicite:4]{index=4}
import FormClient from "./FormClient";
import MessagesClient from "./MessagesClient";

export default function FormPage() {
    const { isLoaded, user } = useUser();
    if (!isLoaded) return <p className="p-4">Loading…</p>;
    if (!user)     return <p className="p-4">You must sign in first.</p>;

    return (
        <main className="mx-auto max-w-lg p-4 space-y-6">
            <h1 className="text-2xl font-bold">Create a new message</h1>
            <p className="text-sm">Signed in as: <code>{user.id}</code></p>
            <FormClient />
            <MessagesClient />
        </main>
    );
}
