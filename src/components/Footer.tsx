"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { services } from "@/data";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <Logo variant="white" />
            <p className="mt-4 text-white/70 leading-relaxed">
              أكبر منصة للعثور على فنيين موثوقين في الكويت
            </p>
            <div className="mt-6 space-y-3">
              <a href="mailto:info@fannifix.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />info@fannifix.com
              </a>
              <a href="tel:+96500000000" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span dir="ltr">+965 0000 0000</span>
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">الخدمات</h4>
            <ul className="space-y-2">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}><Link href={`/services/${s.slug}`} className="text-white/70 hover:text-white transition-colors">{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">روابط</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link href="/technicians" className="text-white/70 hover:text-white transition-colors">الفنيين</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-white transition-colors">الخدمات</Link></li>
            </ul>
          </div>
        </div>
        {/* Newsletter subscription - hidden for now */}
        {/* <div className="py-8 border-b border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="font-bold text-white mb-2">اشترك في نشرتنا البريدية</h4>
            <div className="flex gap-2">
              <Input type="email" placeholder="بريدك الإلكتروني" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
              <Button className="btn-accent">اشترك</Button>
            </div>
          </div>
        </div> */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© 2026 FanniFix. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-sm text-white/50"><span>صنع بـ ❤️ في الكويت</span></div>
        </div>
      </div>
    </footer>
  );
};
