/**
 * Cart Store - Vanilla JS with localStorage
 * Manages shopping cart state for quote requests
 */

export interface CartItem {
  slug: string;
  title: string;
  brand: string;
  price?: number;
  image: string;
  quantity: number;
}

const CART_KEY = 'rosita-cart';

/**
 * Get cart items from localStorage
 */
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save cart to localStorage
 */
function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Dispatch custom event for UI updates
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items } }));
}

/**
 * Add item to cart or increment quantity
 */
export function addToCart(item: Omit<CartItem, 'quantity'>): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.slug === item.slug);
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
}

/**
 * Remove item from cart
 */
export function removeFromCart(slug: string): void {
  const cart = getCart().filter(item => item.slug !== slug);
  saveCart(cart);
}

/**
 * Update item quantity
 */
export function updateQuantity(slug: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(slug);
    return;
  }
  
  const cart = getCart();
  const item = cart.find(i => i.slug === slug);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Get total items count
 */
export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get cart total price
 */
export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
}
