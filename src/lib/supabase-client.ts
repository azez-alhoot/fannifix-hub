/**
 * Supabase Client Configuration
 * 
 * This file creates the Supabase client when credentials are available.
 * If credentials are missing or package isn't installed, Supabase is disabled.
 * 
 * IMPORTANT: This file will only work if @supabase/supabase-js is installed.
 * If not installed, all functions return null/false gracefully.
 * 
 * To install: npm install @supabase/supabase-js
 * 
 * NOTE: Uses dynamic imports to avoid build-time errors when package is not installed.
 */

// Type definition for SupabaseClient (to avoid import errors if package not installed)
type SupabaseClientType = any;

let supabaseClient: SupabaseClientType | null = null;
let initializationPromise: Promise<SupabaseClientType | null> | null = null;

/**
 * Initialize Supabase client (async, called lazily)
 * Uses dynamic import to avoid webpack resolution at build time
 */
async function initializeSupabase(): Promise<SupabaseClientType | null> {
  // Return existing client if already initialized
  if (supabaseClient) {
    return supabaseClient;
  }
  
  // Return existing promise if initialization is in progress
  if (initializationPromise) {
    return initializationPromise;
  }
  
  // Start initialization
  initializationPromise = (async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
      if (!supabaseUrl || !supabaseAnonKey) {
        return null;
      }
      
      // Dynamic import - will fail gracefully if package is not installed
      // Webpack may try to resolve this, but the catch() handles missing package
      const supabaseModule = await import('@supabase/supabase-js').catch(() => {
        // Package not installed - return null gracefully
        return null;
      });
      
      if (!supabaseModule || !supabaseModule.createClient) {
        return null;
      }
      
      supabaseClient = supabaseModule.createClient(supabaseUrl, supabaseAnonKey);
      return supabaseClient;
    } catch (error) {
      // Package not installed or other error - that's okay, Supabase is optional
      return null;
    }
  })();
  
  return initializationPromise;
}

/**
 * Get Supabase client instance (synchronous - returns null if not initialized)
 * For guaranteed initialization, use getSupabaseAsync()
 */
export function getSupabase(): SupabaseClientType | null {
  return supabaseClient;
}

/**
 * Get Supabase client instance (async - ensures initialization)
 * Use this when you need to ensure Supabase is initialized
 */
export async function getSupabaseAsync(): Promise<SupabaseClientType | null> {
  return initializeSupabase();
}

/**
 * Supabase client instance (for backward compatibility)
 * Use getSupabase() or getSupabaseAsync() instead
 */
export const supabase: SupabaseClientType | null = null; // Placeholder

/**
 * Check if Supabase is enabled
 * Use this to conditionally enable Supabase features
 * Note: This checks if client exists, not if package is installed
 */
export const isSupabaseEnabled = (): boolean => {
  return !!getSupabase();
};

/**
 * Feature flag: Enable lead logging to Supabase
 * Set NEXT_PUBLIC_ENABLE_LEAD_LOGGING=true to enable
 */
export const isLeadLoggingEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_ENABLE_LEAD_LOGGING === 'true' && isSupabaseEnabled();
};
