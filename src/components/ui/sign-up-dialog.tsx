// src/components/ui/sign-up-dialog.tsx
'use client';

import { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useCalculation } from '@/contexts/CalculationContext';

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AuthMode = 'signup' | 'signin';

const SignUpDialog = ({ open, onOpenChange }: SignUpDialogProps) => {
  const id = useId();
  const router = useRouter();
  const { saveCalculation } = useCalculation();
  // State to track form inputs and status
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signup'); // toggle between signup and signin

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: Record<string, string> = { email, password };
    if (authMode === 'signup') {
      payload['name'] = fullName;
    }

    try {
      // Determine endpoint based on auth mode
      const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      // If we have a session, save the calculation and redirect
      if (data.data?.session) {
        const userId = data.data.session.user.id;
        try {
          await saveCalculation(userId);
          onOpenChange(false);
          router.push('/dashboard');
          router.refresh();
        } catch (saveError) {
          console.error('Error saving calculation:', saveError);
          // Still redirect even if save fails
          onOpenChange(false);
          router.push('/dashboard');
          router.refresh();
        }
      } else {
        setError('Please check your email to confirm your account.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{authMode === 'signup' ? 'Sign up' : 'Sign in'}</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
              width={44}
              height={44}
            />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {authMode === 'signup' ? 'Sign up for Grade Final Boss' : 'Sign in to Grade Final Boss'}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {authMode === 'signup'
                ? 'We just need a few details to get you started.'
                : 'Enter your email and password to sign in.'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {authMode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Full name</Label>
              <Input
                id={`${id}-name`}
                placeholder="Sam Altman"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              placeholder="hi@email.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              placeholder="Enter your password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (authMode === 'signup' ? 'Signing up...' : 'Signing in...') : authMode === 'signup' ? 'Sign up' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="underline hover:no-underline"
            onClick={() => {
              setError(null);
              setAuthMode(authMode === 'signup' ? 'signin' : 'signup');
            }}
          >
            {authMode === 'signup' ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
