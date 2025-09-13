'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import Logo from '@/components/logo';
import { useState } from 'react';

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Create an account
    </Button>
  );
}

export default function RegisterPage() {
  const [errorMessage, dispatch] = useActionState(register, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="absolute top-4 left-4">
         <Logo />
       </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <form action={dispatch}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Your Username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="collegeName">College Name</Label>
              <Input id="collegeName" name="collegeName" placeholder="Your College" required />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-6 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
             {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Registration Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <RegisterButton />
          </CardFooter>
        </form>
         <CardFooter className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline ml-1">
              Log in
            </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
