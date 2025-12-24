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
            category: "Formal Wear",
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
            category: "Casual Summer",
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
            category: "Urban / Street",
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
            category: "Traditional",
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
            category: "Modern Chic",
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
            category: "Artsy / Bold",
            tags: ["Clearance"]
        }
    ];

    const brands = ["All", "Khaadi", "Sapphire", "Junaid Jamshed", "Outfitters", "Sana Safinaz"];

    const filteredArticles = useMemo(() => {
        if (selectedBrand === 'All') return articles;
        return articles.filter(a => a.brand === selectedBrand);
    }, [selectedBrand]);

    return (
        <div className="min-h-screen bg-white pt-20 pb-12">
            {/* Elite White Header Section */}
            <div className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-grey-100 pb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-grey-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                                <Clock className="w-4 h-4" />
                                Updated 2 minutes ago
                            </div>
                            <h1 className="text-5xl md:text-7xl font-light text-navy-900 tracking-tight leading-[1.1]">
                                The Curated <br /><span className="font-serif italic text-navy-800">Sales Ledger</span>
                            </h1>
                            <p className="text-grey-500 font-medium text-lg max-w-xl leading-relaxed">
                                A definitive collection of premium articles currently on sale across major Pakistani brands, curated for the modern identity.
                            </p>
                        </div>
                    </div>

                    {/* Brand Filter Row */}
                    <div className="flex items-center gap-3 overflow-x-auto py-8 scrollbar-none">
                        <span className="text-[10px] font-bold text-grey-400 uppercase tracking-widest mr-4">Filter by Brand</span>
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => setSelectedBrand(brand)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                                    selectedBrand === brand
                                        ? "bg-navy-900 border-navy-900 text-white shadow-xl shadow-navy-900/10"
                                        : "bg-white border-grey-100 text-grey-500 hover:border-grey-300 hover:text-navy-900"
                                )}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-16">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-light text-navy-900 tracking-tight uppercase">Article Discovery</h2>
                        <div className="h-px w-20 bg-navy-900"></div>
                    </div>
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
                            <div className="relative aspect-[3/4] overflow-hidden bg-grey-50">
                                <img
                                    src={article.image}
                                    alt={article.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />

                                <div className="absolute top-6 left-6 bg-white border border-grey-100 text-navy-900 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest shadow-sm">
                                    {article.discount}
                                </div>

                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white p-2.5 rounded-full shadow-xl border border-grey-100 text-navy-900 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold text-navy-400 uppercase tracking-[0.2em]">{article.brand}</span>
                                    <span className="text-[10px] font-medium text-grey-400 italic">{article.category}</span>
                                </div>

                                <h3 className="text-lg font-light text-navy-900 mb-6 line-clamp-1 truncate leading-tight flex-1">
                                    {article.name}
                                </h3>

                                <div className="flex items-end justify-between pt-6 border-t border-grey-50">
                                    <div className="space-y-1">
                                        <span className="block text-[10px] text-grey-400 line-through font-medium">Rs. {article.originalPrice.toLocaleString()}</span>
                                        <span className="block text-2xl font-bold text-navy-900">Rs. {article.price.toLocaleString()}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-grey-100 flex items-center justify-center text-grey-400 group-hover:bg-navy-900 group-hover:text-white transition-all duration-500">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Sales Summary - Neat & Clean */}
                <div className="mt-20 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-white p-10 rounded-[2rem] border border-grey-100 flex items-center gap-8">
                        <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center shrink-0">
                            <Tag className="w-6 h-6 text-navy-900" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-2">Upcoming Alert</h4>
                            <p className="text-xl font-light text-navy-900 leading-relaxed">
                                Junaid Jamshed Festive Sale starts in <span className="font-bold">4 hours</span>.
                            </p>
                            <button className="text-navy-900 font-bold text-sm mt-4 hover:underline flex items-center gap-2">
                                Set Reminder <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-96 bg-white p-10 rounded-[2rem] border border-grey-100 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-[10px] font-bold text-grey-400 uppercase tracking-widest">Verified Inventory</span>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <div>
                            <div className="text-6xl font-light text-navy-900 mb-2">1,402</div>
                            <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest leading-none">Articles Tracked Today</div>
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
