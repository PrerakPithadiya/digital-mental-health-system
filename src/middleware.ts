import {NextRequest, NextResponse} from 'next/server';
import {decrypt} from '@/lib/session';
import {cookies} from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/ai-support', '/booking', '/resources', '/forums', '/admin'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(prefix => path.startsWith(prefix));
  const isPublicRoute = publicRoutes.includes(path);

  // 2. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // 3. Redirect to /login if the user is not authenticated and is trying to access a protected route
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 4. Redirect to /dashboard if the user is authenticated and is trying to access a public route
  if (
    isPublicRoute &&
    session?.user &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // 5. If none of the above, continue.
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
