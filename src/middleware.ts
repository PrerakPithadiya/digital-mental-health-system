import {NextRequest, NextResponse} from 'next/server';

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
