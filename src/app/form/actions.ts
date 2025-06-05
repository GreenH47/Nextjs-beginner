"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";




/** Union that client + server share */
export type ActionState =
    | { ok: true;  id: string }           // success variant
    | { ok: false; message: string };     // error  variant

export async function createMessage(
    prevState: ActionState | undefined,   // 👈 1st param for useFormState
    formData: FormData,
): Promise<ActionState> {
    const { userId, getToken } = await auth();           // Clerk v6 – always await :contentReference[oaicite:5]{index=5}
    if (!userId)          return { ok: false, message: "Not signed in" };

    const jwt = await getToken();                        // Server-side session token
    if (!jwt)              return { ok: false, message: "No session token" };

    const supabase = await createClient(jwt);            // Pass token as Bearer


    /* ── 2. build the payload once so we can reuse it ────── */
    const payload = {
        name: formData.get("name") as string,
        body: formData.get("body") as string,
        clerk_user_id: userId,
    };

    /* ── 3. fire-and-forget call to n8n ──────────────────── */
    try {
        const res = await fetch(process.env.N8N_FORM_SUBMIT_WEBHOOK_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            // n8n already echoes 200; no need to wait for body
        });
        if (!res.ok) {
            /* don’t kill the request – just log for observability */
            // console.error("[n8n] webhook returned", res.status);
            const errorText = "[n8n] webhook returned" + ` ${res.status} ${res.statusText}`;
            return { ok: false, message: errorText  };
        }
    } catch (err) {
        // console.error("[n8n] webhook error", err);
        const errorText = "[n8n] webhook error: " + (err instanceof Error ? err.message : String(err));
        return { ok: false, message: errorText };
        /* still continue – we promised the user their message is saved */
    }

    /* ── only test for n8n not submit to db ────────────── */
    // const message = `Message from ${payload.name} saved!`;
    // return { ok: true, id: message };



    /* ── 4. insert into Supabase with RLS enabled ────────── */

    const { data, error } = await supabase
        .from("messages_clerk")
        .insert({
            name: formData.get("name") as string,            // cast = clear TS noise
            body: formData.get("body") as string,
            clerk_user_id: userId,
        })
        .select("id")
        .single();                                         // echoes row through RLS

    if (error || !data)  return { ok: false, message: error?.message ?? "DB error" };

    revalidatePath("/form");                             // bust cache :contentReference[oaicite:8]{index=8}
    return { ok: true, id: data.id };
}



