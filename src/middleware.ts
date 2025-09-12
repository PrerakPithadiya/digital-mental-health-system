import {NextRequest, NextResponse} from 'next/server';
import {decrypt} from '@/lib/session';
import {cookies} from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/ai-support', '/booking', '/resources', '/forums', '/admin'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
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
  const response = NextResponse.next();

  // Refresh the session so it doesn't expire
  if (session?.user) {
    const newExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const newSessionPayload = { ...session, expires: newExpires };

    const newSession = await encrypt(newSessionPayload);

    response.cookies.set('session', newSession, {
      expires: newExpires,
      httpOnly: true,
    });
  }


  return response;
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};

async function encrypt(payload: any) {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined');
  }
  const key = new TextEncoder().encode(secretKey);
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}