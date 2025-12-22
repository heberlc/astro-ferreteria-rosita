/**
 * Site Configuration - Central source of truth
 * 
 * All business information, contact details, and site metadata
 * should be defined here and imported where needed.
 */

// ============ BUSINESS INFORMATION ============
export const BUSINESS = {
  name: "Ferretería Rosita",
  legalName: "Corporación Ferretería Rosita SAC",
  tagline: "Materiales de Construcción en Lima",
  description: "Tu ferretería de confianza con más de 30 años de experiencia en materiales de construcción, herramientas y acabados para el hogar.",
  foundingYear: 1990,
} as const;

// ============ CONTACT INFORMATION ============
export const CONTACT = {
  whatsapp: {
    primary: "51955314610",
    secondary: "51955099118",
  },
  phones: [
    "+51 955 314 610",
    "+51 955 099 118",
    "(01) 251 5860",
  ],
  phonesFormatted: ["+51955314610", "+51955099118", "+5112515860"],
  emails: [
    "ventas.empresarial@rosita.pe",
    "ventas@corporacionrosita.com",
  ],
  address: {
    street: "Av. Guardia Civil 221-225",
    district: "Urb. La Campiña - Chorrillos",
    city: "Lima",
    country: "Perú",
    full: "Av. Guardia Civil 221-225, Urb. La Campiña - Chorrillos, Lima, Perú",
  },
  hours: {
    weekdays: "Lun - Sáb: 8:00 - 18:00",
    weekend: "Domingo: Cerrado",
  },
  googleMapsUrl: "https://maps.google.com/?q=Ferreteria+Rosita+Chorrillos+Lima",
} as const;

// ============ SOCIAL MEDIA ============
export const SOCIAL = {
  facebook: "https://facebook.com/ferreteriarosita",
  instagram: "https://instagram.com/ferreteriarosita",
  tiktok: "https://tiktok.com/@ferreteriarosita",
} as const;

// ============ SEO & SITE ============
export const SITE = {
  url: "https://corporacionrosita.com",
  title: `${BUSINESS.name} | ${BUSINESS.tagline}`,
  defaultDescription: BUSINESS.description,
  language: "es-PE",
  locale: "es_PE",
  ogImage: "/og-image.jpg",
  favicon: "/favicon.svg",
} as const;

// ============ PRODUCTS PER PAGE ============
export const CATALOG = {
  productsPerPage: 12,
  maxVisiblePaginationPages: 5,
} as const;

// ============ WHATSAPP MESSAGE TEMPLATES ============
export const WHATSAPP_TEMPLATES = {
  cartOrder: `🛒 *SOLICITUD DE COTIZACIÓN - ${BUSINESS.name.toUpperCase()}*`,
  productInquiry: (productName: string, productCode: string, price: number) => 
    `Hola, me interesa el producto:\n\n📦 ${productName}\n🏷️ Código: ${productCode}\n💰 Precio: S/ ${price.toFixed(2)}\n\n¿Está disponible?`,
  contactForm: (data: { name: string; email: string; phone: string; message: string }) =>
    `¡Hola! Me contacto desde el formulario web.\n\n👤 *Nombre:* ${data.name}\n📧 *Email:* ${data.email}\n📱 *Teléfono:* ${data.phone}\n\n💬 *Mensaje:*\n${data.message}`,
  defaultMessage: "Hola, quisiera más información sobre sus productos.",
} as const;

// ============ HELPER FUNCTIONS ============

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function getWhatsAppUrl(message: string, phone: string = CONTACT.whatsapp.primary): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Generate page title with site name suffix
 */
export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) return SITE.title;
  return `${pageTitle} | ${BUSINESS.name}`;
}
