"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PawRipple from "@/components/PawRipple";
import { PawPrint, Cat, Dog, Bird, Rabbit } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const petIcons = [PawPrint, Cat, Dog, Bird, Rabbit];

export default function RegisterPage() {
  const { register, googleLogin } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", email: "", photoURL: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [currentPet, setCurrentPet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPet((prev) => (prev + 1) % petIcons.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
        toast.error(err.response?.data?.message || "Google sign-up failed");
      }
    },
    onError: (errorResponse) => {
      toast.error(errorResponse?.error_description || "Google Sign-In failed");
    },
  });

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

  const PetIcon = petIcons[currentPet];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-500/5"
            style={{ top: `${10 + i * 13}%`, left: `${i % 2 === 0 ? 3 : 92}%` }}
            animate={{ y: [0, -18, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
          >
            {i % 3 === 0 ? <Bird size={24 + i * 3} /> : i % 3 === 1 ? <Rabbit size={26 + i * 3} /> : <Dog size={22 + i * 3} />}
          </motion.div>
        ))}
      </div>

      <PawRipple className="w-full max-w-md">
        <Card className="w-full max-w-md relative">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <motion.div
                key={currentPet}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full" />
                  <PetIcon className="relative h-10 w-10 text-emerald-500" />
                </div>
              </motion.div>
            </div>
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
              <Button type="submit" className="w-full gap-2" disabled={loading} variant="plastic">
                {loading ? (
                  <><PawPrint className="h-4 w-4 animate-bounce" /> Creating account...</>
                ) : (
                  <><PawPrint className="h-4 w-4" /> Register</>
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
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-500 hover:text-emerald-400 hover:underline font-medium transition-colors">
                Welcome back!
              </Link>
            </p>
          </CardContent>
        </Card>
      </PawRipple>
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
