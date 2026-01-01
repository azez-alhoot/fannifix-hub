"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleWhatsAppClick, generateWhatsAppUrl, getUtmSource } from "@/lib/analytics";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  text?: string;
  className?: string;
  variant?: "default" | "outline";
  technicianName?: string;
  service?: string;
  area?: string;
  technicianId?: string;
}

export const WhatsAppButton = ({ 
  phoneNumber = "965", 
  text = "تواصل معنا عبر واتساب",
  className = "",
  variant = "default",
  technicianName,
  service,
  area,
  technicianId
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    // If technician data is provided, use full tracking
    if (technicianName && service && area) {
      handleWhatsAppClick({
        phoneNumber,
        technicianName,
        service,
        area,
        technicianId,
      });
    } else {
      // Fallback for general WhatsApp buttons without technician context
      // Still includes source in message but no GA4 event tracking
      const source = getUtmSource();
      const url = generateWhatsAppUrl(phoneNumber, source);
      window.open(url, '_blank');
    }
  };

  if (variant === "outline") {
    return (
      <Button 
        variant="outline"
        className={className}
        onClick={handleClick}
      >
        <MessageCircle className="w-5 h-5 ml-2" />
        {text}
      </Button>
    );
  }

  return (
    <Button 
      className={`bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold gap-2 ${className}`}
      onClick={handleClick}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
    </Button>
  );
};

