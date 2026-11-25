import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/types/supabase";

const publicRoutes = [
  "/",
  "/cinema",
  "/cinema/",
  "/students-cut",
  "/students-cut/",
  "/students-cut/poll/",
  "/awaz-do",
  "/awaz-do/",
  "/awaz-do/bulletin/",
  "/students",
  "/students/",
  "/voices",
  "/voices/",
  "/notices",
  "/notices/",
  "/events",
  "/events/",
];

const studentRoutes = [
  "/students/me",
  "/students-cut/recommend",
];

const adminRoutes = [
  "/admin",
];

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your_supabase")
);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  let user: { id?: string } | null = null;
  let userRole = "student";

  if (hasSupabaseConfig) {
    try {
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name) {
              return request.cookies.get(name)?.value;
            },
            set(name, value, options) {
              response.cookies.set(name, value, options);
            },
            remove(name, options) {
              response.cookies.delete({ name, ...options });
            },
          },
        }
      );

      const { data } = await supabase.auth.getUser();
      user = data?.user ?? null;

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role_id, roles(name)")
          .eq("id", user.id ?? "")
          .single();
        userRole = profile?.roles?.name || "student";
      }
    } catch {
      // Supabase not configured or unreachable — degrade gracefully
      user = null;
      userRole = "student";
    }
  }

  const path = request.nextUrl.pathname;

  // Check public routes
  const isPublic = publicRoutes.some(route =>
    path === route || path.startsWith(route + "/") || path.startsWith(route)
  );

  // Check student-only routes
  const isStudentRoute = studentRoutes.some(route => path.startsWith(route));

  // Check admin routes
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route));

  // Redirect unauthenticated users from protected routes
  if (!user && (isStudentRoute || isAdminRoute)) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
  }

  // Check role for admin routes
  if (isAdminRoute && user) {
    const allowedRoles = ["super_admin", "union_admin", "awaz_do_editor", "cinema_curator"];
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check role for student routes
  if (isStudentRoute && user) {
    if (userRole !== "student" && !["super_admin", "union_admin"].includes(userRole)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Add user role to response headers for client-side access
  response.headers.set("x-user-role", userRole);
  response.headers.set("x-user-id", user?.id || "");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
