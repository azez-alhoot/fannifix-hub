"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AdBannerProps {
  variant?: "horizontal" | "sidebar";
  imageUrl?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  dismissible?: boolean;
  className?: string;
}

export const AdBanner = ({
  variant = "horizontal",
  imageUrl,
  title,
  description,
  ctaText = "اعرف المزيد",
  ctaLink = "#",
  dismissible = true,
  className = "",
}: AdBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const isImageAd = !!imageUrl && !title;
  
  if (variant === "sidebar") {
    return (
      <div className={`relative bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden border border-border/50 ${className}`}>
        {dismissible && (
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 left-2 z-10 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        )}
        
        {isImageAd ? (
          <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="block">
            <img src={imageUrl} alt="إعلان" className="w-full h-auto object-cover" />
          </a>
        ) : (
          <div className="p-4 text-center">
            {imageUrl && (
              <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full mb-2 inline-block">إعلان</span>
            {title && <h4 className="font-semibold text-foreground mb-1">{title}</h4>}
            {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2563eb] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    );
  }

  // Horizontal banner (between sections)
  return (
    <div className={`relative bg-gradient-to-l from-[#2563eb]/10 via-background to-[#eab308]/10 rounded-2xl overflow-hidden border border-border/50 ${className}`}>
      {dismissible && (
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 left-3 z-10 w-7 h-7 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
      
      {isImageAd ? (
        <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="block">
          <img src={imageUrl} alt="إعلان" className="w-full h-24 md:h-32 object-cover" />
        </a>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6">
          <div className="flex items-center gap-4">
            {imageUrl && (
              <img src={imageUrl} alt="" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl flex-shrink-0" />
            )}
            <div className="text-center md:text-right">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full mb-1 inline-block">إعلان</span>
              {title && <h3 className="font-bold text-lg text-foreground">{title}</h3>}
              {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
          </div>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-lg shadow-[#2563eb]/20"
          >
            {ctaText}
          </a>
        </div>
      )}
    </div>
  );
};

// Sample ad data for demonstration
export const sampleAds = {
  horizontal: {
    title: "أعلن معنا على فني تصليح",
    description: "وصول إلى آلاف العملاء المحتملين يومياً",
    ctaText: "احجز مساحتك الإعلانية",
    ctaLink: "#",
  },
  sidebar: {
    title: "عروض خاصة",
    description: "خصم 20% على أول خدمة",
    ctaText: "استفد الآن",
    ctaLink: "#",
  },
};