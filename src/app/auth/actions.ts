'use server';

import {z} from 'zod';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import {clearSession, decrypt, encrypt} from '@/lib/session';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  collegeName: z.string().min(2, 'College name is required'),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function register(prevState: string | undefined, formData: FormData) {
  const validatedFields = registerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return validatedFields.error.errors.map(e => e.message).join(', ');
  }

  const {username, password, collegeName} = validatedFields.data;

  try {
    const client = await clientPromise;
    const db = client.db('wellspring');
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({username});
    if (existingUser) {
      return 'Username already exists.';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      username,
      password: hashedPassword,
      collegeName,
    });
  } catch (error) {
    console.error(error);
    return 'An error occurred during registration.';
  }

  redirect('/login');
}

export async function login(prevState: string | undefined, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return 'Invalid form data.';
  }

  const {username, password} = validatedFields.data;

  try {
    const client = await clientPromise;
    const db = client.db('wellspring');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({username});
    if (!user) {
      return 'Invalid username or password.';
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return 'Invalid username or password.';
    }
    
    // Create the session
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const sessionPayload = {
      user: {
        _id: user._id.toString(),
        username: user.username,
        collegeName: user.collegeName,
      },
      expires,
    };
    
    const session = await encrypt(sessionPayload);

    cookies().set('session', session, {expires, httpOnly: true});

  } catch (error) {
    console.error(error);
    return 'An error occurred during login.';
  }

  redirect('/dashboard');
}

export async function logout() {
  await clearSession();
  redirect('/login');
}
