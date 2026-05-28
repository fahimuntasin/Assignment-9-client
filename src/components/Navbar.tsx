"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrint, Menu, X, Sun, Moon, LayoutDashboard, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pets", label: "All Pets" },
    ...(user
      ? [
          { href: "/dashboard/requests", label: "My Requests" },
          { href: "/dashboard/add-pet", label: "Add Pet" },
        ]
      : []),
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Animated gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Background glass layer */}
            <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-xl border-b border-white/5" />

            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center gap-2.5 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full group-hover:bg-emerald-400/30 transition-all duration-500" />
                <PawPrint className="relative h-7 w-7 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300" />
              </div>
              <span className="hidden sm:inline font-bold text-xl bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                PawAdopt
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative overflow-hidden hover:bg-muted/80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <Sun className="relative h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {loading ? (
                <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="group relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-400/10 blur-md rounded-full group-hover:bg-emerald-400/20 transition-all duration-300" />
                      <Avatar className="relative h-8 w-8 ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300">
                        <AvatarImage src={user.photoURL || ""} />
                        <AvatarFallback className="text-xs font-medium bg-emerald-500/10 text-emerald-500">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 mt-1">
                    <DropdownMenuItem onClick={() => router.push("/dashboard/requests")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="plastic"
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="text-xs"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-4 mb-3 rounded-2xl border border-white/5 bg-background/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="p-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-3 pt-0 flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="shrink-0"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              {user ? (
                <Button variant="plastic" size="sm" onClick={handleLogout} className="flex-1">
                  Logout
                </Button>
              ) : (
                <Button variant="plastic" size="sm" onClick={() => router.push("/login")} className="flex-1">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  );
}
