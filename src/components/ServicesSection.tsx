"use client";

import Link from "next/link";
import { 
  Refrigerator, 
  WashingMachine, 
  Zap, 
  Droplets, 
  Wind, 
  Hammer,
  Shield,
  Satellite,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, getTechniciansByService } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Refrigerator,
  WashingMachine,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Shield,
  Satellite,
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold mb-3">
            خدماتنا
          </span>
          <h2 className="section-title">
            جميع خدمات الصيانة في مكان واحد
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            اختر الخدمة التي تحتاجها واحصل على أفضل الفنيين في منطقتك
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Zap;
            const techCount = getTechniciansByService(service.id).length;
            
            return (
              <div
                key={service.id}
                className="service-card group cursor-pointer opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {service.description}
                </p>
                <p className="text-sm text-primary mb-4">
                  {techCount} فني متاح
                </p>

                {/* CTA */}
                <Link href={`/services/${service.slug}`}>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-primary font-semibold group-hover:gap-3 transition-all"
                  >
                    اعثر على فني
                    <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                  </Button>
                </Link>

                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden rounded-br-[4rem] opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-full`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg" className="gap-2">
              عرض جميع الخدمات
              <span>←</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
