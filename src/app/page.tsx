import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect directly to the dashboard.
  redirect('/dashboard');
}
