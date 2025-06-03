import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useSupabaseBrowser(): SupabaseClient | null {
  const { getToken } = useAuth();                           // Clerk hook :contentReference[oaicite:0]{index=0}
  const [client, setClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) return;

      const supa = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { global: { headers: { Authorization: `Bearer ${token}` } } }, // Bearer JWT :contentReference[oaicite:1]{index=1}
      );
      setClient(supa);                                          // one-time set
    })();
  }, [getToken]);

  return client;
}
