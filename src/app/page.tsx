import { redirect } from 'next/navigation';

export default function RootPage() {
  // The middleware will handle redirection to /login if not authenticated
  // or /dashboard if authenticated. This page can be a loading spinner
  // or just redirect immediately.
  redirect('/dashboard');
}
