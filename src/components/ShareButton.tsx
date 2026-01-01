"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={handleShare}
      aria-label="مشاركة"
    >
      <Share2 className="w-4 h-4" />
    </Button>
  );
};

