"use client";

import { useEffect, useState, useRef } from "react";
import { useSupabaseBrowser } from "@/utils/supabase/client";

type Message = {
    id: string;
    name: string;
    body: string;
    created_at: string;
};

const PAGE_SIZE = 3;

export default function MessagesClient() {
    const supabase = useSupabaseBrowser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const loadingRef = useRef(false);

    /** Fetch a specific page. If pageIdx===0 we REPLACE, else we APPEND */
    const fetchPage = async (pageIdx: number) => {
        if (!supabase || loadingRef.current) return;
        loadingRef.current = true;

        const from = pageIdx * PAGE_SIZE;
        const to   = from + PAGE_SIZE - 1;

        const { data, error } = await supabase          // range-based pagination :contentReference[oaicite:3]{index=3}
            .from("messages_clerk")
            .select("id, name, body, created_at")
            .order("created_at", { ascending: false })    // newest first :contentReference[oaicite:4]{index=4}
            .range(from, to);

        if (!error && data) {
            setMessages(prev =>
                pageIdx === 0 ? (data as Message[])         // replace on first page
                    : [...prev, ...(data as Message[])]
            );
            setHasMore(data.length === PAGE_SIZE);
            setPage(pageIdx);
        }
        loadingRef.current = false;
    };

    /* First page → run once when the *stable* client exists */
    useEffect(() => {
        if (supabase) fetchPage(0);
    }, [supabase]);                                   // ← runs exactly once

    /* ---------- UI ---------- */
    if (!supabase) return null;                       // waiting for JWT → client

    return (
        <section className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold">My messages</h2>

            {messages.length === 0 && (
                <p className="italic text-gray-500">say something</p>
            )}

            {messages.map(m => (
                <article key={m.id} className="border rounded p-3 bg-gray-50 space-y-1">
                    <h3 className="font-medium">{m.name}</h3>
                    <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                    <time className="block text-xs text-gray-400">
                        {new Date(m.created_at).toLocaleString()}
                    </time>
                </article>
            ))}

            {hasMore && (
                <button onClick={() => fetchPage(page + 1)}
                        className="text-blue-600 hover:underline">
                    Load older
                </button>
            )}
        </section>
    );
}
