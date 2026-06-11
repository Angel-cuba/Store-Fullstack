import { CartState } from '../types/CartActions';

const CART_KEY = 'store_cart';

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartState) : { inCart: null };
  } catch {
    return { inCart: null };
  }
}

export function saveCart(state: CartState): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  } catch {
    // storage quota exceeded — fail silently
  }
}
