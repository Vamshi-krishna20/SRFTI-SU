import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            ;(cookieStore as any).set(name, value, options);
          } catch {
            // ignore in route handlers where cookies can't always be set
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            ;(cookieStore as any).delete(name, options);
          } catch {
            // ignore
          }
        },
      },
    }
  );
};