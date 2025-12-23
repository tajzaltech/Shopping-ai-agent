import React from 'react';
import { X, ExternalLink, Heart, ShoppingBag, Sparkles, Ruler, Info, ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const ProductDetailPanel = ({ product, isOpen, onClose }) => {
    if (!product) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-navy-900/40 backdrop-blur-sm z-[100] transition-opacity duration-500",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Side Panel */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[101] transform transition-transform duration-500 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-grey-100 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-black text-navy-900 leading-none">Product Details</h2>
                            <p className="text-[10px] font-black text-grey-400 uppercase tracking-widest mt-1">Ref: {product.brand.slice(0, 3)}-{product.id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-grey-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-navy-900" />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-grey-200">
                    {/* Image & Main Info */}
                    <div className="space-y-4">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-grey-100 shadow-inner">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-xs font-black text-navy-600 uppercase tracking-[0.2em]">{product.brand}</span>
                                <h3 className="text-2xl font-black text-navy-900 mt-1">{product.name}</h3>
                            </div>
                            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl font-black text-sm">
                                {product.discount}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-black text-navy-900">Rs. {product.price.toLocaleString()}</span>
                            <span className="text-sm text-grey-300 line-through font-bold">Rs. {product.originalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* AI Vibe Analysis */}
                    <div className="bg-navy-50 rounded-3xl p-6 border border-navy-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-navy-600" />
                            <h4 className="text-sm font-black text-navy-900 uppercase tracking-widest">StylistAI Vibe Analysis</h4>
                        </div>
                        <p className="text-sm text-navy-700 leading-relaxed font-medium">
                            "This piece perfectly captures your <span className="text-navy-900 font-bold">{product.vibe}</span> preference. The {product.brand} silhouette is optimized for a modern yet traditional look, making it a high-confidence match ({product.vibeMatch}%) for your style profile."
                        </p>
                    </div>

                    {/* Size Guide Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Ruler className="w-5 h-5 text-navy-400" />
                            <h4 className="text-sm font-black text-navy-900 uppercase tracking-widest">Size Guide</h4>
                        </div>
                        <div className="border border-grey-100 rounded-2xl overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-grey-50">
                                    <tr className="text-left">
                                        <th className="px-4 py-3 font-black text-navy-900">Size</th>
                                        <th className="px-4 py-3 font-black text-navy-900">Bust</th>
                                        <th className="px-4 py-3 font-black text-navy-900">Length</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-50">
                                    {[
                                        { s: 'Small', b: '36"', l: '38"' },
                                        { s: 'Medium', b: '38"', l: '40"' },
                                        { s: 'Large', b: '42"', l: '41"' }
                                    ].map(sz => (
                                        <tr key={sz.s}>
                                            <td className="px-4 py-3 font-bold text-grey-700">{sz.s}</td>
                                            <td className="px-4 py-3 text-grey-500">{sz.b}</td>
                                            <td className="px-4 py-3 text-grey-500">{sz.l}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[10px] text-grey-400 italic">*Measurements are in inches and may vary slightly by brand.</p>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Info className="w-5 h-5 text-navy-400" />
                            <h4 className="text-sm font-black text-navy-900 uppercase tracking-widest">Product Description</h4>
                        </div>
                        <p className="text-sm text-grey-600 leading-relaxed">
                            Crafted from premium fabric, this {product.name} from {product.brand} features intricate detailing that stands out. Designed for both comfort and elegance, it's a versatile choice for your formal or casual festive wardrobe.
                        </p>
                        <ul className="grid grid-cols-2 gap-3">
                            {['100% Cotton', 'Dry Clean Only', 'Embroidered', 'Pakistan Made'].map(feat => (
                                <li key={feat} className="flex items-center gap-2 text-xs text-grey-500 font-bold bg-grey-50 px-3 py-2 rounded-xl">
                                    <div className="w-1 h-1 rounded-full bg-navy-300" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-grey-100 bg-white">
                    <div className="flex gap-3 mb-4">
                        <button className="flex-1 py-4 bg-navy-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-navy-800 transition-all active:scale-95">
                            <ShoppingBag className="w-4 h-4" />
                            BUY AT STORE
                        </button>
                        <button className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-all border border-red-100">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                    <button className="w-full py-4 bg-white border-2 border-grey-200 rounded-2xl font-black text-navy-900 text-sm flex items-center justify-center gap-3 hover:border-navy-900 hover:bg-navy-50 transition-all">
                        <MessageCircle className="w-5 h-5 text-navy-600" />
                        ASK FRIEND ON WHATSAPP
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPanel;
