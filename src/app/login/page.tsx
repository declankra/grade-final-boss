// src/app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

// Initialize a Supabase client for the browser
// Replace these env vars with your own from .env or environment variables
const supabaseBrowserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function LoginPage() {
  const [user, setUser] = useState<any>(null); // For simplicity, store the user object here

  // Check the current session on first load
  useEffect(() => {
    async function fetchSession() {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        // Optionally upsert on first load
        handleUpsertUser(session.user);
      }
    }
    fetchSession();

    // Listen for future auth changes
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          
          handleUpsertUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    // Cleanup the subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * handleSignIn: Initiate Google OAuth sign-in with Supabase
   */
  async function handleSignIn() {
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });
  }

  /**
   * handleSignOut: Log the user out of the Supabase session
   */
  async function handleSignOut() {
    const { error } = await supabaseBrowserClient.auth.signOut();
    if (error) {
      console.error("Sign-out error:", error);
    } else {
      setUser(null); // Force state to re-render as signed out.
    }
  }

  /**
   * handleUpsertUser: Call the /api/auth/upsert route to store user info
   */
  async function handleUpsertUser(u: any) {
      await fetch("/api/auth/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: u.id, // MAKE SURE THIS IS INCLUDED
          email: u.email,
          name: u.user_metadata?.full_name || u.email,
        }),
      });
    }

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-xl font-bold">Google Sign-In Test</h1>

      {user ? (
        <div className="space-y-4">
          <p>Welcome, {user.email}</p>
          <Button variant="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p>You are not signed in. Click below to continue.</p>
          <Button onClick={handleSignIn}>Sign in with Google</Button>
        </div>
      )}
    </div>
  );
}
