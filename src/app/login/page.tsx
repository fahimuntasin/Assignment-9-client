"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PawRipple from "@/components/PawRipple";
import { PawPrint, Cat, Dog } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const googleLoginHook = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        }).then((r) => r.json());
        if (!userInfo.sub) { toast.error("Could not retrieve profile"); return; }
        await googleLogin({
          name: userInfo.name, email: userInfo.email, photoURL: userInfo.picture || "", googleId: userInfo.sub,
        });
        router.push("/");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Google login failed");
      }
    },
    onError: (errorResponse) => {
      toast.error(errorResponse?.error_description || "Google Sign-In failed");
    },
  });

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-500/5"
            style={{ top: `${15 + i * 18}%`, left: `${i % 2 === 0 ? 5 : 90}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
          >
            {i % 2 === 0 ? <Cat size={32 + i * 4} /> : <Dog size={28 + i * 4} />}
          </motion.div>
        ))}
      </div>

      <PawRipple className="w-full max-w-md">
        <Card className="w-full max-w-md relative">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full" />
                  <PawPrint className="relative h-10 w-10 text-emerald-500" />
                </div>
              </motion.div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to find your new best friend</CardDescription>
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
              <Button type="submit" className="w-full gap-2" disabled={loading} variant="plastic">
                {loading ? (
                  <><PawPrint className="h-4 w-4 animate-bounce" /> Signing in...</>
                ) : (
                  <><PawPrint className="h-4 w-4" /> Login</>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button type="button" variant="plastic" className="w-full gap-2" onClick={() => googleLoginHook()}>
              <FcGoogle className="h-5 w-5" />
              Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-emerald-500 hover:text-emerald-400 hover:underline font-medium transition-colors">
                Adopt your first pet!
              </Link>
            </p>
          </CardContent>
        </Card>
      </PawRipple>
    </div>
  );
}
