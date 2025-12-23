import React, { useState } from 'react';
import { ShoppingBag, Heart, Share2, Sparkles, ArrowRight, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const ShopTheLook = () => {
    const looks = [
        {
            id: 1,
            influencer: "Hira Khan",
            title: "Summer Breeze",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
            brands: ["Khaadi", "Borjan"],
            items: [
                { id: 101, name: "Floral Lawn Suit", brand: "Khaadi", price: 4990 },
                { id: 102, name: "Tan Heels", brand: "Borjan", price: 3200 }
            ]
        },
        {
            id: 2,
            influencer: "Zaid Ali",
            title: "Vintage Chic",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
            brands: ["Junaid Jamshed"],
            items: [
                { id: 201, name: "White Kurta Shalwar", brand: "J. Junaid Jamshed", price: 6490 }
            ]
        },
        {
            id: 3,
            influencer: "Sarah Shah",
            title: "Sapphire Dreams",
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
            brands: ["Sapphire"],
            items: [
                { id: 301, name: "Printed Silk Tunic", brand: "Sapphire", price: 3950 }
            ]
        },
        {
            id: 4,
            influencer: "Ahmed Bilal",
            title: "Casual Sunday",
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
            brands: ["Outfitters"],
            items: [
                { id: 401, name: "Linen Shirt", brand: "Outfitters", price: 2499 },
                { id: 402, name: "Chino Pants", brand: "Outfitters", price: 2999 }
            ]
        }
    ];

    const [activeLook, setActiveLook] = useState(null);

    return (
        <div className="min-h-screen bg-grey-50 pt-20 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-navy-900 mb-3 tracking-tight">Shop the Look ✨</h1>
                    <p className="text-grey-600 text-lg max-w-2xl mx-auto">
                        Trending styles from Pakistan's top influencers. One click to find them all.
                    </p>
                </div>

                {/* Trending Feed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {looks.map((look) => (
                        <div
                            key={look.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-grey-100 relative"
                            onClick={() => setActiveLook(look)}
                        >
                            {/* Look Image */}
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    src={look.image}
                                    alt={look.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="text-lg font-bold mb-1">{look.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-white/80">
                                        <div className="w-5 h-5 rounded-full bg-navy-500 flex items-center justify-center">
                                            <User className="w-3 h-3 text-white" />
                                        </div>
                                        {look.influencer}
                                    </div>
                                </div>

                                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {look.brands.map((b, i) => (
                                        <div key={i} className="px-3 py-1 bg-grey-50 border border-grey-200 rounded-lg text-xs font-bold text-navy-800">
                                            {b}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-navy-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                                    Shop Items <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Look Modal */}
                {activeLook && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm" onClick={() => setActiveLook(null)}></div>
                        <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-full max-h-[85vh]">
                            <button
                                onClick={() => setActiveLook(null)}
                                className="absolute top-4 right-4 md:right-auto md:left-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-navy-900" />
                            </button>

                            {/* Image Part */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto">
                                <img src={activeLook.image} alt={activeLook.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Details Part */}
                            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                                <div className="mb-6">
                                    <span className="text-xs font-black text-navy-500 uppercase tracking-[0.2em] mb-2 block">Featured Look</span>
                                    <h2 className="text-3xl font-black text-navy-900 mb-1">{activeLook.title}</h2>
                                    <p className="text-grey-500 font-medium">Styled by <span className="text-navy-800 font-bold">{activeLook.influencer}</span></p>
                                </div>

                                <h3 className="text-sm font-black text-grey-400 uppercase tracking-widest mb-4">Items in this Look</h3>
                                <div className="space-y-4 mb-8">
                                    {activeLook.items.map((item) => (
                                        <div key={item.id} className="group relative flex items-center gap-4 p-4 bg-grey-50 rounded-2xl border border-grey-100 hover:border-navy-200 hover:bg-white transition-all">
                                            <div className="w-16 h-16 rounded-xl bg-grey-200 overflow-hidden">
                                                <img src={activeLook.image} className="w-full h-full object-cover grayscale opacity-50" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-grey-400 uppercase">{item.brand}</p>
                                                <h4 className="font-bold text-navy-900">{item.name}</h4>
                                                <p className="text-sm font-black text-navy-500">Rs. {item.price.toLocaleString()}</p>
                                            </div>
                                            <Link
                                                to="/chat"
                                                className="p-3 bg-white shadow-sm border border-grey-200 rounded-xl text-navy-600 hover:bg-navy-800 hover:text-white transition-all"
                                                onClick={() => {
                                                    // Simulation of finding item in chat
                                                }}
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/chat"
                                    className="w-full py-4 bg-navy-800 text-white rounded-2xl font-black text-lg shadow-xl shadow-navy-200 hover:bg-navy-900 flex items-center justify-center gap-3 transition-all active:scale-95"
                                    onClick={() => setActiveLook(null)}
                                >
                                    <Sparkles className="w-6 h-6" />
                                    Find Full Outfit
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const X = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default ShopTheLook;
