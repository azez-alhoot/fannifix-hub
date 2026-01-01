"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

// Kuwait-first navigation - no country selector for Phase 1
const navLinks = [
  { label: "الرئيسية", href: "/kw" },
  { label: "الخدمات", href: "/kw" },
  { label: "أضف إعلانك", href: "/kw/add-listing" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/kw" className="flex-shrink-0">
            <Logo size="xl" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Kuwait Badge */}
            <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1.5">
              <span className="text-lg">🇰🇼</span>
              <span className="text-sm font-medium text-muted-foreground">الكويت</span>
            </div>
            <Link href="/kw/add-listing">
              <Button className="btn-primary">
                أضف إعلانك
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {/* Kuwait Badge - Mobile */}
              <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-2 w-fit">
                <span className="text-lg">🇰🇼</span>
                <span className="text-sm font-medium">الكويت</span>
              </div>
              
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Link href="/kw/add-listing" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-primary w-full">
                    أضف إعلانك
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
