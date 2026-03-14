import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createSupabaseServerClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async get(name: string) {
        const themeCookies = await cookieStore; 
        return themeCookies.get(name)?.value;
      },
    },
  }); // <--- 请确保这里有一个 }); 闭合 return 语句
} // <--- 请确保这里有一个 } 闭合函数定义
