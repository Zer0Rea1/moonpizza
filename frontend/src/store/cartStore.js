// Zustand Cart Store - State Management for Shopping Cart
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TAX_RATE = 0.0875; // 8.75% tax

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,

            // Add item to cart
            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },

            // Remove item from cart
            removeItem: (productId) => {
                set({ items: get().items.filter(item => item.id !== productId) });
            },

            // Update item quantity
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map(item =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            // Increment quantity
            incrementQuantity: (productId) => {
                const item = get().items.find(item => item.id === productId);
                if (item) {
                    get().updateQuantity(productId, item.quantity + 1);
                }
            },

            // Decrement quantity
            decrementQuantity: (productId) => {
                const item = get().items.find(item => item.id === productId);
                if (item) {
                    get().updateQuantity(productId, item.quantity - 1);
                }
            },

            // Clear cart
            clearCart: () => set({ items: [] }),

            // Toggle cart sidebar
            toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),

            // Computed values
            getSubtotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getTax: () => {
                return get().getSubtotal() * TAX_RATE;
            },

            getTotal: () => {
                return get().getSubtotal() + get().getTax();
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'slice-sizzle-cart',
        }
    )
);
