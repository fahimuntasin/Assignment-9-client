"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1009595917225-f9tn17amnhnq7gk76tegp98h6jshk4h7.apps.googleusercontent.com";

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const checkGoogle = () => {
      if ((window as any).google?.accounts?.id) {
        (window as any).google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredentialResponse,
          cancel_on_tap_outside: false,
          auto_select: false,
        });
        return true;
      }
      return false;
    };
    if (!checkGoogle()) {
      const interval = setInterval(() => {
        if (checkGoogle()) clearInterval(interval);
      }, 500);
      setTimeout(() => clearInterval(interval), 10000);
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    if (!response?.credential) return;
    setGoogleLoading(true);
    try {
      const payload = JSON.parse(atob(response.credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      await googleLogin({
        name: payload.name, email: payload.email, photoURL: payload.picture || "", googleId: payload.sub,
      });
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const oauth2 = (window as any).google?.accounts?.oauth2;
    if (!oauth2) {
      toast.error("Google Sign-In is still loading. Please wait a moment.");
      return;
    }
    setGoogleLoading(true);
    const tokenClient = oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "openid email profile",
      callback: async (response: any) => {
        if (response.error) {
          setGoogleLoading(false);
          if (response.error === "popup_closed_by_user") return;
          toast.error(response.error_description || "Google Sign-In failed");
          return;
        }
        try {
          const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${response.access_token}` }
          }).then((r) => r.json());
          if (!userInfo.sub) { toast.error("Could not retrieve profile"); return; }
          await googleLogin({
            name: userInfo.name, email: userInfo.email, photoURL: userInfo.picture || "", googleId: userInfo.sub,
          });
          router.push("/");
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Google login failed");
        } finally {
          setGoogleLoading(false);
        }
      },
    });
    tokenClient.requestAccessToken();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!email.trim()) e2.email = "Email is required";
    if (!password) e2.password = "Password is required";
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2"><PawPrint className="h-10 w-10 text-primary" /></div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your PawAdopt account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({}); }} className={errors.email ? "border-destructive" : ""} required />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password *</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({}); }} className={errors.password ? "border-destructive" : ""} required />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading} variant="plastic">
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="plastic" className="w-full gap-2" disabled={googleLoading} onClick={handleGoogleLogin}>
            <FcGoogle className="h-5 w-5" />
            {googleLoading ? "Connecting..." : "Google"}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
