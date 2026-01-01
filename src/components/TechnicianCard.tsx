"use client";

import { MapPin, MessageCircle, Phone, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Technician, getAreaById, getServiceById } from "@/data";
import { handleWhatsAppClick, handlePhoneCall } from "@/lib/analytics";

interface TechnicianCardProps {
  technician: Technician;
  showFullDetails?: boolean;
}

export const TechnicianCard = ({ technician, showFullDetails = false }: TechnicianCardProps) => {
  const areas = technician.areaIds.map(id => getAreaById(id)).filter(Boolean);
  const services = technician.serviceIds.map(id => getServiceById(id)).filter(Boolean);
  const primaryArea = areas[0];
  const primaryService = services[0];

  const handleWhatsApp = () => {
    handleWhatsAppClick({
      phoneNumber: technician.whatsapp,
      technicianName: technician.name,
      service: primaryService?.name || 'Unknown',
      area: primaryArea?.name || 'Unknown',
      technicianId: technician.id,
    });
  };

  const handleCall = () => {
    handlePhoneCall({
      phoneNumber: technician.phone,
      technicianName: technician.name,
      service: primaryService?.name || 'Unknown',
      area: primaryArea?.name || 'Unknown',
      technicianId: technician.id,
      serviceId: primaryService?.id,
      areaId: primaryArea?.id,
      countryCode: 'kw', // Default to Kuwait for now
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image Section - 16:9 Aspect Ratio */}
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <Link href={`/technician/${technician.id}`}>
          <Image
            src={technician.images[0]}
            alt={technician.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        
        {/* Badges Overlay - Top Corners */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {technician.featured && (
            <Badge className="bg-[#FACC15] text-[#1E293B] font-semibold border-0 shadow-sm">
              مميز
            </Badge>
          )}
          {technician.verified && (
            <Badge className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-bold border-2 border-white shadow-lg gap-1.5 px-3 py-1 text-sm">
              <BadgeCheck className="w-4 h-4" />
              موثّق
            </Badge>
          )}
        </div>

        {/* Experience Badge - Bottom Left */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-white/95 text-[#1E293B] font-medium border-0 shadow-sm">
            {technician.experienceYears} سنوات خبرة
          </Badge>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <Link href={`/technician/${technician.id}`}>
          <h3 className="text-xl font-bold text-[#1E293B] mb-1 hover:text-[#2563EB] transition-colors">
            {technician.name}
          </h3>
        </Link>

        {/* Service Type */}
        {primaryService && (
          <div className="mb-2">
            <Link href={`/services/${primaryService.slug}`}>
              <p className="text-[#2563EB] font-medium hover:underline text-sm">
                {primaryService.name}
                {services.length > 1 && (
                  <span className="text-gray-500 text-xs mr-1">
                    {" "}+{services.length - 1} خدمة أخرى
                  </span>
                )}
              </p>
            </Link>
          </div>
        )}

        {/* Locations - Show All Areas */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
            <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
            <span>المناطق المغطاة:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {areas.map((area, index) => (
              <Link
                key={area.id}
                href={`/kw/area/${area.slug}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-xs font-medium transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {area.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Price Section - Always Visible */}
        <div className="pt-2 pb-1">
          <div className="bg-[#F8FAFC] rounded-lg px-4 py-2.5 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">السعر التقريبي</span>
              <span className="font-bold text-[#2563EB] text-sm">{technician.priceEstimate}</span>
            </div>
          </div>
        </div>

        {/* Actions Section - WhatsApp Dominant */}
        <div className="space-y-2 pt-2">
          {/* Primary WhatsApp CTA - More Dominant */}
          <Button 
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold gap-2 h-12 shadow-lg hover:shadow-xl transition-all text-base" 
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-5 h-5" />
            تواصل عبر واتساب
          </Button>
          
          {/* Micro-copy under WhatsApp */}
          <p className="text-xs text-center text-gray-500">
            رد سريع · تواصل مباشر
          </p>

          {/* Secondary Phone Button - De-emphasized */}
          <Button 
            variant="outline" 
            className="w-full h-10 border-gray-200 hover:bg-gray-50 text-sm" 
            onClick={handleCall}
            aria-label="اتصال"
          >
            <Phone className="w-4 h-4 ml-2" />
            اتصال هاتفي
          </Button>
        </div>
      </div>
    </div>
  );
};
