/**
 * Contact Form Store - Nanostores implementation
 * Manages contact form state and sends data to WhatsApp
 */

import { atom } from 'nanostores';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormState {
  data: ContactFormData;
  isSubmitting: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

const initialState: ContactFormState = {
  data: {
    name: '',
    email: '',
    phone: '',
    message: ''
  },
  isSubmitting: false,
  errors: {}
};

// Main store
export const $contactForm = atom<ContactFormState>({ ...initialState });

// WhatsApp number for contact messages
const WHATSAPP_NUMBER = '51955314610';

/**
 * Update a single field in the form
 */
export function updateField(field: keyof ContactFormData, value: string): void {
  const current = $contactForm.get();
  $contactForm.set({
    ...current,
    data: {
      ...current.data,
      [field]: value
    },
    errors: {
      ...current.errors,
      [field]: undefined // Clear error when field is updated
    }
  });
}

/**
 * Validate the form and return whether it's valid
 */
export function validateForm(): boolean {
  const { data } = $contactForm.get();
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre es requerido';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!data.phone.trim()) {
    errors.phone = 'El teléfono es requerido';
  }

  if (!data.message.trim()) {
    errors.message = 'El mensaje es requerido';
  }

  $contactForm.set({
    ...$contactForm.get(),
    errors
  });

  return Object.keys(errors).length === 0;
}

/**
 * Generate WhatsApp message from form data
 */
function generateWhatsAppMessage(data: ContactFormData): string {
  return `¡Hola! Me contacto desde el formulario web.

👤 *Nombre:* ${data.name}
📧 *Email:* ${data.email}
📱 *Teléfono:* ${data.phone}

💬 *Mensaje:*
${data.message}`;
}

/**
 * Submit the form - opens WhatsApp with the message
 */
export function submitForm(): boolean {
  if (!validateForm()) {
    return false;
  }

  const { data } = $contactForm.get();
  
  $contactForm.set({
    ...$contactForm.get(),
    isSubmitting: true
  });

  const message = generateWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');

  // Reset form after submission
  setTimeout(() => {
    resetForm();
  }, 1000);

  return true;
}

/**
 * Reset the form to initial state
 */
export function resetForm(): void {
  $contactForm.set({ ...initialState });
}
