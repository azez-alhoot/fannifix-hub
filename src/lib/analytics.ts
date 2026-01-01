/**
 * Analytics utility functions for FanniFix
 * Handles Google Analytics 4 tracking and UTM parameter detection
 */

/**
 * Get UTM source from URL query parameters
 * Falls back to 'direct' if no utm_source is present
 * Stores the source in sessionStorage for persistence across page navigations
 */
export function getUtmSource(): string {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return 'direct';
  }

  // First, check if we already stored the source in sessionStorage
  const storedSource = sessionStorage.getItem('fannifix_utm_source');
  if (storedSource) {
    return storedSource;
  }

  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');

  // If UTM source exists, store it and return
  if (utmSource) {
    sessionStorage.setItem('fannifix_utm_source', utmSource);
    return utmSource;
  }

  // Default to 'direct'
  const defaultSource = 'direct';
  sessionStorage.setItem('fannifix_utm_source', defaultSource);
  return defaultSource;
}

/**
 * Track WhatsApp click event in Google Analytics 4
 * This is marked as a conversion event
 */
export function trackWhatsAppClick(params: {
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const source = getUtmSource();

  // Track event in GA4
  if ((window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      source: source,
      technician_name: params.technicianName,
      service: params.service,
      area: params.area,
      technician_id: params.technicianId || 'unknown',
      // Mark as conversion event
      value: 1,
    });
  }
}

/**
 * Generate WhatsApp URL with pre-filled message including source
 */
export function generateWhatsAppUrl(
  phoneNumber: string,
  source: string = 'direct'
): string {
  // Remove + and spaces from phone number
  const cleanPhone = phoneNumber.replace(/\+|\s/g, '');
  
  // Create message with source
  const message = encodeURIComponent(
    `مرحبا، وصلتكم من ${source} عبر موقع FanniFix`
  );
  
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

/**
 * Optional: Log lead to Supabase (non-blocking, fails silently)
 * Only runs if Supabase is enabled and lead logging is enabled
 * GA4 remains the source of truth for analytics
 */
export async function logLeadToSupabase(params: {
  technicianId?: string;
  technicianName: string;
  service: string;
  area: string;
  phoneNumber: string;
}): Promise<void> {
  // Check if Supabase package is available
  try {
    // Dynamic import to avoid bundling Supabase if not installed
    const supabaseModule = await import('@/lib/supabase-client').catch(() => null);
    
    if (!supabaseModule) {
      return; // Supabase not installed
    }
    
    const { getSupabaseAsync, isLeadLoggingEnabled } = supabaseModule;
    
    if (!isLeadLoggingEnabled()) {
      return; // Lead logging disabled via env var
    }
    
    // Use async getter to ensure Supabase is initialized
    const supabase = await getSupabaseAsync();
    if (!supabase) {
      return; // Supabase not initialized (package not installed or no credentials)
    }
    
    const source = getUtmSource();
    
    await supabase.from('leads').insert({
      technician_id: params.technicianId || null,
      technician_name: params.technicianName,
      service: params.service,
      area: params.area,
      source: source,
      whatsapp: params.phoneNumber,
      status: 'new',
    });
  } catch (error) {
    // Fail silently - GA4 is source of truth
    // Don't break user experience if Supabase fails or isn't installed
    if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase lead logging failed (non-critical):', error);
    }
  }
}

/**
 * Track phone call event in Google Analytics 4
 * This is marked as a conversion event (secondary conversion)
 */
export function trackPhoneCall(params: {
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
  serviceId?: string;
  areaId?: string;
  countryCode?: string;
}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const source = getUtmSource();

  // Track event in GA4
  if ((window as any).gtag) {
    (window as any).gtag('event', 'phone_call', {
      source: source,
      technician_id: params.technicianId || 'unknown',
      technician_name: params.technicianName,
      service_id: params.serviceId || 'unknown',
      service_name: params.service,
      area_id: params.areaId || 'unknown',
      area_name: params.area,
      country_code: params.countryCode || 'kw',
      page_path: window.location.pathname,
      value: 1,
    });
  }
}

/**
 * Handle phone call with tracking
 * This is the main function to use for all phone call buttons
 */
export function handlePhoneCall(params: {
  phoneNumber: string;
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
  serviceId?: string;
  areaId?: string;
  countryCode?: string;
}): void {
  // GA4 tracking - ALWAYS RUNS (source of truth)
  trackPhoneCall({
    technicianName: params.technicianName,
    service: params.service,
    area: params.area,
    technicianId: params.technicianId,
    serviceId: params.serviceId,
    areaId: params.areaId,
    countryCode: params.countryCode,
  });
  
  // Open phone dialer
  window.open(`tel:${params.phoneNumber}`, '_blank');
}

/**
 * Handle WhatsApp click with tracking and pre-filled message
 * This is the main function to use for all WhatsApp buttons
 * 
 * GA4 tracking always runs (unchanged)
 * Supabase logging is optional and non-blocking
 */
export function handleWhatsAppClick(params: {
  phoneNumber: string;
  technicianName: string;
  service: string;
  area: string;
  technicianId?: string;
}): void {
  // Get source
  const source = getUtmSource();
  
  // GA4 tracking - ALWAYS RUNS (unchanged, source of truth)
  trackWhatsAppClick({
    technicianName: params.technicianName,
    service: params.service,
    area: params.area,
    technicianId: params.technicianId,
  });
  
  // OPTIONAL: Log to Supabase (non-blocking, runs in background)
  // This is additive and doesn't affect GA4 tracking
  logLeadToSupabase({
    technicianId: params.technicianId,
    technicianName: params.technicianName,
    service: params.service,
    area: params.area,
    phoneNumber: params.phoneNumber,
  }).catch(() => {
    // Ignore errors - GA4 is source of truth
  });
  
  // Generate WhatsApp URL with pre-filled message
  const whatsappUrl = generateWhatsAppUrl(params.phoneNumber, source);
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
}

