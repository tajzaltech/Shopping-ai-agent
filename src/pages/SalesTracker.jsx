import React, { useState, useEffect, useMemo } from 'react';
import { Tag, Clock, ExternalLink, Sparkles, TrendingUp, Zap, Heart, Filter, ArrowRight, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import ProductDetailPanel from '../components/product/ProductDetailPanel';

const SalesTracker = () => {
    const { user } = useAuth();
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [activeProduct, setActiveProduct] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);


    // Powerful Mock Data - Articles with Style "Vibes"
    const articles = [
        {
            id: 1,
            name: "Luxe Velvet Embroidered Kurta",
            brand: "Khaadi",
            price: 6490,
            originalPrice: 12980,
            discount: "50% FLAT",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
            vibe: "Formal / Elegant",
            vibeMatch: 98,
            tags: ["Trending", "Desi Wear"]
        },
        {
            id: 2,
            name: "Digital Print Lawn 3-Piece",
            brand: "Sapphire",
            price: 3495,
            originalPrice: 4990,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
            vibe: "Minimalist / Airy",
            vibeMatch: 95,
            tags: ["New Arrival Sale", "Summer"]
        },
        {
            id: 3,
            name: "Street Culture Oversized Hoodie",
            brand: "Outfitters",
            price: 2990,
            originalPrice: 5980,
            discount: "50% OFF",
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
            vibe: "Streetwear / Urban",
            vibeMatch: 92,
            tags: ["Flash Sale", "Z-Generation"]
        },
        {
            id: 4,
            name: "Classic Silk Festive Suit",
            brand: "Junaid Jamshed",
            price: 8500,
            originalPrice: 11500,
            discount: "Rs. 3000 OFF",
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
            vibe: "Traditional / Rich",
            vibeMatch: 96,
            tags: ["Shaadi Season", "Limited"]
        },
        {
            id: 5,
            name: "Contemporary Chic Co-ord Set",
            brand: "Sana Safinaz",
            price: 4500,
            originalPrice: 9000,
            discount: "50% FLAT",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
            vibe: "Modern / Professional",
            vibeMatch: 94,
            tags: ["Editor's Choice"]
        },
        {
            id: 6,
            name: "Jacquard Statement Tunic",
            brand: "Khaadi",
            price: 2950,
            originalPrice: 5900,
            discount: "50% OFF",
            image: "https://images.unsplash.com/photo-1610030469668-935102a11b65?auto=format&fit=crop&q=80&w=800",
            vibe: "Artsy / Bold",
            vibeMatch: 91,
            tags: ["Clearance"]
        }
    ];

    const brands = ["All", "Khaadi", "Sapphire", "Junaid Jamshed", "Outfitters", "Sana Safinaz"];

    const filteredArticles = useMemo(() => {
        if (selectedBrand === 'All') return articles;
        return articles.filter(a => a.brand === selectedBrand);
    }, [selectedBrand]);

    return (
        <div className="min-h-screen bg-grey-50 pt-20 pb-12">
            {/* Professional White Header Section */}
            <div className="bg-white border-b border-grey-200 py-12 px-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-red-600 font-black tracking-widest text-xs uppercase">
                                <Zap className="w-4 h-4 fill-current" />
                                Live Tracking
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-navy-900 tracking-tight">
                                Sales Optimized for <span className="text-navy-600 underline decoration-navy-200 underline-offset-8">You</span>
                            </h1>
                            <p className="text-grey-500 font-medium text-lg max-w-2xl">
                                Discover premium articles on sale, analyzed and matched to your style vibe.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-navy-50 px-6 py-4 rounded-3xl border border-navy-100 flex flex-col">
                                <span className="text-[10px] font-black text-navy-400 uppercase tracking-widest leading-none mb-2">My Vibe Type</span>
                                <span className="text-navy-900 font-black text-lg">Minimalist Desi</span>
                            </div>
                        </div>
                    </div>

                    {/* Brand Filter Row */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => setSelectedBrand(brand)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2",
                                    selectedBrand === brand
                                        ? "bg-navy-800 border-navy-800 text-white shadow-lg shadow-navy-100"
                                        : "bg-white border-grey-100 text-grey-500 hover:border-navy-200 hover:text-navy-700"
                                )}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-10">
                <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="text-navy-400 w-5 h-5" />
                    <h2 className="text-2xl font-black text-navy-900 tracking-tight uppercase">Article Discovery Feed</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => {
                                setActiveProduct(article);
                                setIsPanelOpen(true);
                            }}
                            className="group bg-white rounded-[2rem] overflow-hidden border border-grey-100 shadow-sm hover:shadow-2xl hover:shadow-navy-100/50 transition-all duration-500 flex flex-col cursor-pointer"
                        >

                            {/* Visual Image Section */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest shadow-xl">
                                    {article.discount}
                                </div>

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-lg text-navy-900">
                                    <Heart className="w-5 h-5 hover:fill-red-500 hover:text-red-500 transition-colors cursor-pointer" />
                                </div>

                                {/* Vibe Match Overlay - Subtle but powerful */}
                                <div className="absolute inset-x-4 bottom-4">
                                    <div className="bg-navy-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{article.vibe}</span>
                                            <span className="text-white font-bold text-xs">Vibe Match {article.vibeMatch}%</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center p-1">
                                            <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
                                                <TrendingUp className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-black text-navy-500 uppercase tracking-widest">{article.brand}</span>
                                    {article.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-grey-400 border border-grey-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-4 line-clamp-2 leading-tight flex-1">
                                    {article.name}
                                </h3>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between border-t border-grey-50 pt-4">
                                        <div>
                                            <div className="text-sm text-grey-400 line-through font-bold">Rs. {article.originalPrice.toLocaleString()}</div>
                                            <div className="text-2xl font-black text-navy-900">Rs. {article.price.toLocaleString()}</div>
                                        </div>
                                        <a
                                            href={`https://www.${article.brand.toLowerCase().replace(/\s+/g, '')}.com/products/${article.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-navy-50 text-navy-800 rounded-2xl hover:bg-navy-800 hover:text-white transition-all transform active:scale-95 group/btn border border-navy-100"
                                        >
                                            <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>

                                    <button className="w-full py-4 bg-white border-2 border-grey-100 rounded-2xl font-black text-navy-900 text-sm flex items-center justify-center gap-2 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all">
                                        Ask AI for Styling
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Sales Summary - Interactive */}
                <div className="mt-20 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-white p-8 rounded-[3rem] border border-grey-100 shadow-sm flex items-center gap-6">
                        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
                            <Tag className="w-10 h-10 text-red-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-navy-900 mb-1">Upcoming Sales Alert 📢</h4>
                            <p className="text-grey-500 font-medium">Junaid Jamshed Festive Sale starts in 4 hours. 200+ articles detected.</p>
                            <button className="text-red-600 font-bold text-sm mt-2 hover:underline">Set Reminder →</button>
                        </div>
                    </div>

                    <div className="w-full md:w-80 bg-navy-900 p-8 rounded-[3rem] text-white flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Verified Sales</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        <div>
                            <div className="text-4xl font-black mb-1">1,402</div>
                            <div className="text-xs font-bold text-white/50 uppercase">Articles in Hafta Bazaar Today</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Detail Panel (Slide-over) */}
            <ProductDetailPanel
                product={activeProduct}
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />
        </div>

    );
};

export default SalesTracker;
