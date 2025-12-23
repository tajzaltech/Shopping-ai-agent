import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

const CartDrawer = () => {
    const {
        isOpen,
        closeCart,
        items,
        removeItem,
        updateQuantity,
        getTotalPrice
    } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-grey-200">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-navy-600" />
                        <h2 className="text-lg font-bold text-navy-900">Your Cart ({items.length})</h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 text-grey-400 hover:text-navy-900 rounded-full hover:bg-grey-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-grey-500 space-y-4">
                            <ShoppingBag className="w-12 h-12 text-grey-300" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={closeCart}
                                className="text-navy-600 font-semibold hover:text-navy-800"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 border border-grey-100 rounded-xl bg-grey-50">
                                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-grey-200">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-navy-900 line-clamp-1">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-grey-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-grey-500 font-medium">{item.brand}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-2 border border-grey-200 rounded-lg bg-white px-1 py-0.5">
                                            <button
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                className="p-1 text-grey-500 hover:text-navy-900 disabled:opacity-30"
                                                disabled={(item.quantity || 1) <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-semibold w-4 text-center">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                className="p-1 text-grey-500 hover:text-navy-900"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="font-bold text-navy-900">
                                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-grey-200 bg-white space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold text-navy-900">
                            <span>Total</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 group">
                            Checkout
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center text-xs text-grey-500">
                            Free shipping and returns on all orders.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
