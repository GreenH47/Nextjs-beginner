// ====================================================================
// src/app/api/n8nui/route.ts
// ====================================================================
// ------------------------------------------------------------
// Next.js 15 – App Router – API routes for n8n two‑step workflow
// ------------------------------------------------------------
// Folder layout (all under `src/app/api/n8nui`):
//   ├─ route.ts         → POST /api/n8nui          – start workflow
//   └─ [xid]/route.ts   → GET  /api/n8nui/:xid     – poll status
//                        → POST /api/n8nui/:xid    – resume Wait node
// ------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";

function env(key: keyof NodeJS.ProcessEnv): string {
    const val = process.env[key];
    if (!val) throw new Error(`Missing required env: ${key}`);
    return val;
}

const N8N_API_URL = env("N8N_API_URL");
const N8N_API_KEY = env("N8N_API_KEY");
const N8N_WAIT_NODE_RESUME_URL = env("N8N_WAIT_NODE_RESUME_URL");
const N8N_N8NUI_WEBHOOK_URL = env("N8N_N8NUI_WEBHOOK_URL");

// Utility: strip trailing slashes so we can safely concat
const strip = (url: string) => url.replace(/\/+$/, "");

export async function POST(req: NextRequest) {
    const rawBody = await req.text();

    const url = new URL(N8N_N8NUI_WEBHOOK_URL);
    url.searchParams.set("includeData", "true");

    const n8nRes = await fetch(`${strip(N8N_N8NUI_WEBHOOK_URL)}?includeData=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: rawBody || "{}",
        // No‑cache so we always hit n8n
        cache: "no-store",
    });

    return new NextResponse(await n8nRes.text(), {
        status: n8nRes.status,
        headers: {
            "content-type": n8nRes.headers.get("content-type") ?? "application/json",
        },
    });
}
