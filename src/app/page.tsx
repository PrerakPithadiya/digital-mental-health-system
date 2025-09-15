import { redirect } from 'next/navigation';

export default function RootPage() {
  // The middleware will handle redirection to /login if not authenticated
  // or /dashboard if authenticated.
  redirect('/login');
}
