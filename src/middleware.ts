import {NextRequest, NextResponse} from 'next/server';
import {updateSession} from '@/lib/session';

export async function middleware(request: NextRequest) {
  const session = await updateSession(request);
  const {pathname} = request.nextUrl;

  // If the user is trying to access auth pages but is already logged in, redirect to dashboard
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is trying to access protected pages and is not logged in, redirect to login
  if (!session && !['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return session;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
