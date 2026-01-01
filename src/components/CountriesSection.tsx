"use client";

import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { countries, getAreasByCountry, getTechniciansByCountry } from "@/data";

export const CountriesSection = () => {
  return (
    <section id="countries" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold mb-3">
            تغطيتنا
          </span>
          <h2 className="section-title">
            نخدمك في أربع دول خليجية
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            اختر دولتك للوصول إلى الفنيين المتاحين في منطقتك
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country, index) => {
            const areas = getAreasByCountry(country.code);
            const technicians = getTechniciansByCountry(country.code);
            const isFeatured = country.code === 'kw';
            
            return (
              <Link
                key={country.code}
                href={`/country/${country.code}`}
                className={`country-card group opacity-0 animate-fade-up ${
                  isFeatured ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-br-xl rounded-tl-lg">
                    الأكثر نشاطاً
                  </div>
                )}

                {/* Flag & Name */}
                <div className="text-center mb-6">
                  <span className="text-6xl mb-4 block">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {country.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {country.nameEn}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {technicians.length}+
                    </div>
                    <div className="text-xs text-muted-foreground">فني</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {areas.length}+
                    </div>
                    <div className="text-xs text-muted-foreground">منطقة</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="w-full flex items-center justify-center gap-2 text-primary font-semibold py-3 rounded-lg bg-secondary/50 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span>تصفح الفنيين</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Map Preview */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">تغطية جغرافية واسعة</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            نعمل على توسيع تغطيتنا باستمرار لتشمل المزيد من المناطق والمدن في جميع دول الخليج
          </p>
        </div>
      </div>
    </section>
  );
};
