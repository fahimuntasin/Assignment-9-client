"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  PlusCircle,
  ListOrdered,
  LayoutDashboard,
} from "lucide-react";

const sidebarLinks = [
  {
    href: "/dashboard/requests",
    label: "My Requests",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/listings",
    label: "My Listings",
    icon: ListOrdered,
  },
  {
    href: "/dashboard/add-pet",
    label: "Add Pet",
    icon: PlusCircle,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <div className="lg:sticky lg:top-24 space-y-1">
            <h2 className="text-lg font-semibold px-3 mb-3 flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </h2>
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
