/**
 * GA4 Event Parameter Types
 * 
 * This file defines TypeScript types for all GA4 events to ensure
 * consistency and prevent mistakes during implementation.
 * 
 * See GA4_EVENT_STRATEGY.md for full documentation.
 */

/**
 * Base parameters included in every event
 */
export interface BaseEventParams {
  source: string;              // UTM source or "direct"
  country_code: string;        // ISO country code (e.g., "kw", "sa")
  page_path: string;          // Current page path
  page_title?: string;         // Page title (optional)
}

/**
 * MVP Events
 */

export interface WhatsAppClickParams extends BaseEventParams {
  technician_id: string;       // Technician ID or "unknown"
  technician_name: string;     // Technician display name
  service_id?: string;         // Service ID (if available)
  service_name: string;        // Service display name
  area_id?: string;           // Area ID (if available)
  area_name: string;          // Area display name
  value?: number;             // Conversion value (default: 1)
}

export interface PhoneCallParams extends BaseEventParams {
  technician_id: string;       // Technician ID or "unknown"
  technician_name: string;     // Technician display name
  service_id?: string;         // Service ID (if available)
  service_name: string;        // Service display name
  area_id?: string;           // Area ID (if available)
  area_name: string;          // Area display name
  value?: number;             // Conversion value (default: 1)
}

/**
 * Growth Events (Phase 2)
 */

export interface TechnicianViewParams extends BaseEventParams {
  technician_id: string;
  technician_name: string;
  service_id?: string;
  service_name?: string;
  area_id?: string;
  area_name?: string;
  is_featured: boolean;
  is_verified: boolean;
}

export interface AreaFilterClickParams extends BaseEventParams {
  area_id: string;
  area_name: string;
  filter_type: 'dropdown' | 'chip' | 'search' | 'link';
  previous_area_id?: string;
}

export interface ServiceFilterClickParams extends BaseEventParams {
  service_id: string;
  service_name: string;
  filter_type: 'dropdown' | 'card' | 'search' | 'link';
  previous_service_id?: string;
}

export interface FeaturedTechnicianClickParams extends BaseEventParams {
  technician_id: string;
  technician_name: string;
  service_id?: string;
  service_name?: string;
  area_id?: string;
  area_name?: string;
  click_location: 'homepage' | 'featured_section' | 'listing' | 'search_results';
  position?: number;          // Position in list (1-indexed)
}

/**
 * Future Events (Phase 3+)
 */

export interface LeadSubmittedParams extends BaseEventParams {
  technician_id?: string;
  service_id?: string;
  area_id?: string;
  form_type: 'contact_form' | 'quote_request' | 'booking';
  value?: number;
}

export interface TechnicianSignupParams extends BaseEventParams {
  signup_method: 'direct' | 'invite' | 'referral';
  referral_code?: string;
  service_ids: string[];
  area_ids: string[];
}

export interface SubscriptionPurchaseParams extends BaseEventParams {
  technician_id: string;
  plan_type: 'basic' | 'premium' | 'enterprise';
  plan_duration: 'monthly' | 'yearly';
  value: number;
  currency: string;           // "KWD" | "SAR" | etc.
}

/**
 * Helper type for event parameter validation
 */
export type EventParams =
  | WhatsAppClickParams
  | PhoneCallParams
  | TechnicianViewParams
  | AreaFilterClickParams
  | ServiceFilterClickParams
  | FeaturedTechnicianClickParams
  | LeadSubmittedParams
  | TechnicianSignupParams
  | SubscriptionPurchaseParams;

