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

export default function RegisterPage() {
  const { register, googleLogin } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", email: "", photoURL: "", password: "", confirmPassword: "",
  });
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
      toast.error(err.response?.data?.message || "Google sign-up failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const google = (window as any).google?.accounts;
    if (!google?.oauth2) {
      toast.error("Google Sign-In is still loading. Please wait a moment.");
      return;
    }
    setGoogleLoading(true);
    const tokenClient = google.oauth2.initTokenClient({
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
          toast.error(err.response?.data?.message || "Google sign-up failed");
        } finally {
          setGoogleLoading(false);
        }
      },
    });
    tokenClient.requestAccessToken();
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Must be at least 6 characters";
    else if (!/[A-Z]/.test(formData.password)) e.password = "Must contain an uppercase letter";
    else if (!/[a-z]/.test(formData.password)) e.password = "Must contain a lowercase letter";
    if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(formData);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2"><PawPrint className="h-10 w-10 text-primary" /></div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join PawAdopt and find your perfect pet</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Name" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} error={errors.name} required />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
            <Field label="Photo URL" name="photoURL" placeholder="https://example.com/photo.jpg" value={formData.photoURL} onChange={handleChange} />
            <Field label="Password" name="password" type="password" placeholder="Min 6 chars, 1 uppercase, 1 lowercase" value={formData.password} onChange={handleChange} error={errors.password} required />
            <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
            <Button type="submit" className="w-full" disabled={loading} variant="plastic">
              {loading ? "Creating account..." : "Register"}
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
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, value, onChange, error, required }: any) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className={error ? "border-destructive" : ""} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
