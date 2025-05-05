import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Handle /movie/[id] to /film/[id] redirect
  const path = request.nextUrl.pathname;
  if (path.startsWith('/movie/')) {
    const id = path.split('/movie/')[1];
    return NextResponse.redirect(new URL(`/film/${id}`, request.url));
  }

  // Handle /series/[id] to /tv/[id] redirect
  if (path.startsWith('/series/')) {
    const id = path.split('/series/')[1];
    return NextResponse.redirect(new URL(`/tv/${id}`, request.url));
  }

  // If the user tried to navigate to /film or /movie or /tv or /series, but does not specify an id, redirect to /search
  if (
    path.endsWith('/film') ||
    path.endsWith('/film/') ||
    path.endsWith('/movie') ||
    path.endsWith('/movie/') ||
    path.endsWith('/tv') ||
    path.endsWith('/tv/') ||
    path.endsWith('/series') ||
    path.endsWith('/series/') ||
    path.endsWith('/person/') ||
    path.endsWith('/person') ||
    path.endsWith('/people') ||
    path.endsWith('/people/')
  ) {
    return NextResponse.redirect(new URL('/search', request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
