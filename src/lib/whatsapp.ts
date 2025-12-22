/**
 * WhatsApp Message Generator
 * Creates formatted messages for quote requests
 */

import { getCart } from './cart';
import { CONTACT, WHATSAPP_TEMPLATES, getWhatsAppUrl as getUrl } from '../config/site';

/**
 * Generate WhatsApp message with cart items
 */
export function generateWhatsAppMessage(): string {
  const cart = getCart();
  
  if (cart.length === 0) {
    return '';
  }

  let message = `${WHATSAPP_TEMPLATES.cartOrder}\n\n`;
  message += '📋 *Productos:*\n';
  message += '─────────────────\n';

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.title}*\n`;
    message += `   Marca: ${item.brand}\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    if (item.price) {
      message += `   Precio ref.: S/${(item.price * item.quantity).toFixed(2)}\n`;
    }
    message += '\n';
  });

  message += '─────────────────\n';
  
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  if (total > 0) {
    message += `💰 *Total Referencial: S/${total.toFixed(2)}*\n\n`;
  }
  
  message += '📞 Por favor, confirmar disponibilidad y precio final.\n';
  message += '¡Gracias!';

  return message;
}

/**
 * Get WhatsApp URL with pre-filled message
 */
export function getWhatsAppUrl(): string {
  const message = generateWhatsAppMessage();
  if (!message) return '';
  
  return getUrl(message, CONTACT.whatsapp.primary);
}

/**
 * Open WhatsApp with cart message
 */
export function openWhatsApp(): void {
  const url = getWhatsAppUrl();
  if (url) {
    window.open(url, '_blank');
  }
}
