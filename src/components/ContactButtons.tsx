"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleWhatsAppClick, handlePhoneCall } from "@/lib/analytics";

interface ContactButtonsProps {
  whatsapp: string;
  phone: string;
  technicianName?: string;
  service?: string;
  area?: string;
  technicianId?: string;
}

export const ContactButtons = ({ 
  whatsapp, 
  phone, 
  technicianName,
  service,
  area,
  technicianId
}: ContactButtonsProps) => {
  const handleWhatsApp = () => {
    handleWhatsAppClick({
      phoneNumber: whatsapp,
      technicianName: technicianName || 'Unknown',
      service: service || 'Unknown',
      area: area || 'Unknown',
      technicianId: technicianId,
    });
  };

  const handleCall = () => {
    handlePhoneCall({
      phoneNumber: phone,
      technicianName: technicianName || 'Unknown',
      service: service || 'Unknown',
      area: area || 'Unknown',
      technicianId: technicianId,
    });
  };

  return (
    <div className="flex gap-4">
      <Button 
        className="flex-1 h-14 text-lg btn-primary gap-2" 
        onClick={handleWhatsApp}
      >
        <MessageCircle className="w-5 h-5" />
        تواصل عبر واتساب
      </Button>
      <Button 
        variant="outline" 
        className="h-14 px-8 text-lg gap-2" 
        onClick={handleCall}
      >
        <Phone className="w-5 h-5" />
        اتصال
      </Button>
    </div>
  );
};

