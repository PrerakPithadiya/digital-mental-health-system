import 'server-only';
import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const {payload} = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // console.error('JWT verification failed:', error);
    return null;
  }
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) {
    // If no session, just continue without creating a new response
    // The middleware logic will handle redirection.
    return NextResponse.next();
  }

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (!parsed) {
    // If session is invalid, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('session', '', {httpOnly: true, expires: new Date(0)});
    return response;
  }

  parsed.expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function clearSession() {
  // Destroy the session
  cookies().set('session', '', {httpOnly: true, expires: new Date(0)});
}
