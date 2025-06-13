import StartWorkflowClient from "./StartWorkflowClient";

export default function N8nUiLandingPage() {
    return (
        <main className="mx-auto max-w-2xl p-6 flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl font-bold">n8n Two‑Step Workflow Demo</h1>
            <p className="text-gray-600 dark:text-gray-300">
                Click the button below to start an n8n workflow. You’ll be redirected to
                a status page where you can complete the waiting step.
            </p>
            <StartWorkflowClient />
        </main>
    );
}