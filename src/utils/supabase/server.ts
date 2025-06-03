// utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async (accessToken?: string) => {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: accessToken               // ⬅️ forward Clerk token
                ? { headers: { Authorization: `Bearer ${accessToken}` } }
                : undefined,
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (c) => {
                    try {
                        c.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch (_) {/* SSR can’t set cookies – safe to ignore */}
                },
            },
        },
    );
};
