"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from './AuthContext';

// Wait for token to be loaded before making API calls
const waitForToken = () => {
    return new Promise<string | null>((resolve) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            resolve(token);
        } else {
            setTimeout(() => resolve(localStorage.getItem('auth_token')), 100);
        }
    });
};

interface CartItem {
    id: string; // Generic ID (variant or product)
    quantity: number;
    name: string;
    price: number;
    image?: string;
    stockAvailable?: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const { isAuthenticated, token } = useAuth();

    // Load guest cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('guest_cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Sync with backend if authenticated AND token is ready
    useEffect(() => {
        if (token) {
            console.log("Token available, fetching cart...");
            const mergeAndFetch = async () => {
                const guestItems = JSON.parse(localStorage.getItem('guest_cart') || '[]');
                if (guestItems.length > 0) {
                    try {
                        await api.post('/cart/merge', { items: guestItems });
                        localStorage.removeItem('guest_cart');
                    } catch (e) {
                        console.error("Failed to merge cart", e);
                    }
                }

                try {
                    const res = await api.get('/cart');
                    console.log("Backend cart items:", res.data.items);
                    const backendItems = res.data.items.map((i: any) => ({
                        id: i.variantId,
                        variantId: i.variantId,
                        quantity: i.quantity,
                        name: i.variant.product.name,
                        price: Number(i.unitPrice),
                        image: i.variant.product.media?.[0]?.url,
                        stockAvailable: i.variant.inventory?.quantity ?? 999
                    }));
                    setItems(backendItems);
                } catch (e) {
                    console.error("Failed to fetch cart", e);
                }
            };
            mergeAndFetch();
        }
    }, [token]);

    // Save guest cart to localStorage
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('guest_cart', JSON.stringify(items));
        }
    }, [items, isAuthenticated]);

    const addItem = async (newItem: CartItem) => {
        // Enforce stock limit
        if (newItem.stockAvailable !== undefined && newItem.quantity > newItem.stockAvailable) {
            newItem.quantity = newItem.stockAvailable;
        }

        if (isAuthenticated) {
            try {
                await api.post('/cart/add', {
                    variantId: newItem.id, // Assuming id is variantId for now
                    quantity: newItem.quantity
                });
            } catch (e) {
                console.error("Failed to add to cart backend", e);
            }
        }

        setItems(currentItems => {
            const existing = currentItems.find(i => i.id === newItem.id);
            if (existing) {
                const totalQty = existing.quantity + newItem.quantity;
                const finalQty = (existing.stockAvailable !== undefined && totalQty > existing.stockAvailable)
                    ? existing.stockAvailable
                    : totalQty;

                if (finalQty === existing.quantity && totalQty > existing.quantity) {
                    // Alert only if trying to add more than available
                    return currentItems;
                }

                return currentItems.map(i =>
                    i.id === newItem.id
                        ? { ...i, quantity: finalQty }
                        : i
                );
            }
            return [...currentItems, newItem];
        });
    };

    const removeItem = async (id: string) => {
        // If authenticated, delete from backend first
        if (token) {
            try {
                await api.delete(`/cart/${id}`);
            } catch (e) {
                console.error("Failed to delete from cart backend", e);
            }
        }
        setItems(current => current.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('guest_cart');
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
