"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, MessageCircle, Phone, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedTechnicians, getAreaById, getServiceById } from "@/data";
import { handleWhatsAppClick, handlePhoneCall } from "@/lib/analytics";

export const TechniciansSection = () => {
  const technicians = getFeaturedTechnicians().slice(0, 4);

  return (
    <section id="technicians" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block text-primary font-semibold mb-3">
              فنيون مميزون
            </span>
            <h2 className="section-title mb-0">
              أفضل الفنيين في منطقتك
            </h2>
          </div>
          <Link href="/technicians">
            <Button variant="outline" className="mt-4 md:mt-0">
              عرض الكل
            </Button>
          </Link>
        </div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicians.map((tech, index) => {
            const areas = tech.areaIds.map(id => getAreaById(id)).filter(Boolean);
            const services = tech.serviceIds.map(id => getServiceById(id)).filter(Boolean);
            const primaryArea = areas[0];
            const primaryService = services[0];
            
            return (
              <div
                key={tech.id}
                className="technician-card opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Link href={`/technician/${tech.id}`}>
                    <Image
                      src={tech.images[0]}
                      alt={tech.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  {tech.verified && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-white gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        موثق
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {tech.experienceYears} سنوات خبرة
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <Link href={`/technician/${tech.id}`}>
                    <h3 className="text-lg font-bold text-foreground mb-1 hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                  </Link>
                  {primaryService && (
                    <Link href={`/services/${primaryService.slug}`}>
                      <p className="text-primary font-medium mb-3 hover:underline">
                        {primaryService.name}
                        {services.length > 1 && (
                          <span className="text-muted-foreground text-sm mr-1">
                            +{services.length - 1} خدمة أخرى
                          </span>
                        )}
                      </p>
                    </Link>
                  )}

                  {/* Location */}
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {primaryArea?.name}
                    {areas.length > 1 && (
                      <span className="text-xs">
                        +{areas.length - 1} منطقة أخرى
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-bold text-foreground">{tech.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({tech.reviewsCount} تقييم)
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 btn-primary gap-2" 
                      size="sm"
                      onClick={() => handleWhatsAppClick({
                        phoneNumber: tech.whatsapp,
                        technicianName: tech.name,
                        service: primaryService?.name || 'Unknown',
                        area: primaryArea?.name || 'Unknown',
                        technicianId: tech.id,
                      })}
                    >
                      <MessageCircle className="w-4 h-4" />
                      واتساب
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-3"
                      onClick={() => handlePhoneCall({
                        phoneNumber: tech.phone,
                        technicianName: tech.name,
                        service: primaryService?.name || 'Unknown',
                        area: primaryArea?.name || 'Unknown',
                        technicianId: tech.id,
                        serviceId: primaryService?.id,
                        areaId: primaryArea?.id,
                        countryCode: 'kw',
                      })}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
