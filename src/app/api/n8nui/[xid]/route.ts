// ====================================================================
// src/app/api/n8nui/[xid]/route.ts   (poll & resume)
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

/**
 * GET /api/n8nui/:xid – fetch execution status from the n8n REST API.
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ xid: string }> },
) {
    const { xid } = await params; // ← async param retrieval (Next 15)

    const url = `${strip(N8N_API_URL)}/executions/${encodeURIComponent(xid)}?includeData=true`;

    const n8nRes = await fetch(url, {
        headers: { "x-n8n-api-key": N8N_API_KEY },
    });

    return new NextResponse(await n8nRes.text(), {
        status: n8nRes.status,
        headers: {
            "content-type": n8nRes.headers.get("content-type") ?? "application/json",
        },
    });
}

/**
 * POST /api/n8nui/:xid – resume a waiting node.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ xid: string }> },
) {
    const { xid } = await params;
    const rawBody = await req.text();

    const url = `${strip(N8N_WAIT_NODE_RESUME_URL)}/${encodeURIComponent(xid)}`;

    const n8nRes = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": req.headers.get("content-type") ?? "application/json",
        },
        body: rawBody,
    });

    return new NextResponse(await n8nRes.text(), {
        status: n8nRes.status,
        headers: {
            "content-type": n8nRes.headers.get("content-type") ?? "application/json",
        },
    });
}