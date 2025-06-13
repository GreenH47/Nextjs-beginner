// ────────────────────────────────────────────────────────────────────
// src/app/n8nui/[xid]/page.tsx   →  /n8nui/:xid  (status & resume page)
// ────────────────────────────────────────────────────────────────────
import WorkflowClient from "./WorkflowClient";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ xid: string }>;
}

export const metadata: Metadata = {
    title: "n8n Workflow Status",
};

export default async function N8nUiXidPage({ params }: PageProps) {
    const { xid } = await params;
    return <WorkflowClient xid={xid} />;
}