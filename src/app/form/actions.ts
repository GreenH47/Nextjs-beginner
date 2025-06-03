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



