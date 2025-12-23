import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],

            addToWishlist: (product) => {
                const { wishlist } = get();
                if (!wishlist.find((item) => item.id === product.id)) {
                    set({ wishlist: [...wishlist, product] });
                }
            },

            removeFromWishlist: (productId) => {
                const { wishlist } = get();
                set({ wishlist: wishlist.filter((item) => item.id !== productId) });
            },

            isInWishlist: (productId) => {
                const { wishlist } = get();
                return !!wishlist.find((item) => item.id === productId);
            },

            toggleWishlist: (product) => {
                const { wishlist } = get();
                const exists = wishlist.find((item) => item.id === product.id);
                if (exists) {
                    set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
                } else {
                    set({ wishlist: [...wishlist, product] });
                }
            }
        }),
        {
            name: 'shopping-agent-wishlist',
        }
    )
);
