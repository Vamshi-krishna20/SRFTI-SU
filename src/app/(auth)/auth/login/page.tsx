"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Mail, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [redirect, setRedirect] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setRedirect(params.get("redirect") || "/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Simulate auth
    await new Promise(r => setTimeout(r, 1500));
    
    // In real app, use supabase.auth.signInWithPassword()
    setIsLoading(false);
    router.push(redirect);
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Access your SRFTI Student Union account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Development / Dummy Admin Credentials Card */}
          <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-primary">
              <KeyRound className="h-4 w-4" />
              <span>Development / Test Admin Credentials</span>
            </div>
            <p className="text-muted-foreground">
              Click below to autofill admin credentials for testing and inspection:
            </p>
            <div className="flex items-center justify-between rounded bg-background p-2 border border-border">
              <div className="font-mono space-y-0.5">
                <div><span className="text-muted-foreground">Email:</span> admin@srfti.ac.in</div>
                <div><span className="text-muted-foreground">Password:</span> admin123</div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-xs h-7 px-2.5"
                onClick={() => {
                  setEmail("admin@srfti.ac.in");
                  setPassword("admin123");
                }}
              >
                Autofill
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-sm text-destructive text-center p-3 bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@srfti.ac.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Sign In
            </Button>
          </form>

          <Separator className="my-6">Or continue with</Separator>

          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="w-full" disabled>
              Google
            </Button>
            <Button type="button" variant="outline" className="w-full" disabled>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Button variant="ghost" className="text-primary hover:underline p-0 h-auto" type="button">
              Contact Admin
            </Button>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}