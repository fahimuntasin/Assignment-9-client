"use client";

import Link from "next/link";
import { PawPrint, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PawAdopt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting loving families with pets in need. Every adoption changes two lives.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@pawadopt.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Pet Street, Animal City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/pets" className="block text-muted-foreground hover:text-foreground transition-colors">
                Browse Pets
              </Link>
              <Link href="/login" className="block text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/register" className="block text-muted-foreground hover:text-foreground transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PawAdopt. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
