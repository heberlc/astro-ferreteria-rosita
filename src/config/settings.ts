/**
 * Site Settings Loader
 * 
 * Lee la configuración del sitio desde Keystatic (settings/site.yaml)
 * y la exporta para uso en componentes.
 */
import { getCollection } from "astro:content";

export interface SiteSettings {
  businessName: string;
  tagline?: string;
  description?: string;
  whatsappPrimary: string;
  whatsappSecondary?: string;
  phone?: string;
  email?: string;
  addressStreet?: string;
  addressDistrict?: string;
  addressCity?: string;
  googleMapsUrl?: string;
  hoursWeekdays?: string;
  hoursWeekend?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

/**
 * Get site settings from Keystatic
 * Call this in Astro components/pages with: const settings = await getSiteSettings()
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const settingsEntries = await getCollection("settings");
  const siteEntry = settingsEntries.find((entry) => entry.id === "site");
  
  if (!siteEntry) {
    // Fallback values if settings file not found
    return {
      businessName: "Ferretería Rosita",
      tagline: "Materiales de Construcción en Lima",
      whatsappPrimary: "51955314610",
    };
  }
  
  return siteEntry.data as SiteSettings;
}

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function getWhatsAppUrl(message: string, phone?: string): string {
  const whatsappPhone = phone || "51955314610"; // Fallback
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
}
