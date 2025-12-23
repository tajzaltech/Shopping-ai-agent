import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            // Actions
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    // Increment quantity if exists
                    const updatedItems = items.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    );
                    set({ items: updatedItems, isOpen: true }); // Open cart on add
                } else {
                    // Add new item
                    set({
                        items: [...items, { ...product, quantity: 1 }],
                        isOpen: true // Open cart on add
                    });
                }
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId)
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    )
                }));
            },

            clearCart: () => set({ items: [] }),

            // Selectors (computed)
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + (item.quantity || 1), 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
            }
        }),
        {
            name: 'shopping-agent-cart', // Unique name for localStorage
        }
    )
);
