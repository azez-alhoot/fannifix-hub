"use client";

import { useEffect } from "react";
import { getUtmSource } from "@/lib/analytics";

/**
 * UtmTracker Component
 * 
 * Initializes UTM source detection on page load
 * Stores the source in sessionStorage for persistence across navigations
 * This ensures the source is available even after internal page navigation
 */
export function UtmTracker() {
  useEffect(() => {
    // Initialize UTM source detection on mount
    // This will read from URL params and store in sessionStorage
    getUtmSource();
  }, []);

  // This component doesn't render anything
  return null;
}

