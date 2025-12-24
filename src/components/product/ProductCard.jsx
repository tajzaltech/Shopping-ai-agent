import React, { useState } from 'react';
import { MapPin, Star, Heart, MessageCircle, Sparkles, ShoppingBag, ExternalLink } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { cn } from '../../lib/utils';
import FitAnalysisModal from './FitAnalysisModal';
import VirtualTryOnModal from './VirtualTryOnModal';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onCardClick }) => {
    if (!product) return null;

    const {
        id, brand, name, price, originalPrice,
        imageUrl, matchScore, fitConfidence
    } = product;

    const { toggleWishlist, isInWishlist } = useWishlistStore();
    const [showFitModal, setShowFitModal] = useState(false);
    const [showTryOnModal, setShowTryOnModal] = useState(false);

    const isLiked = isInWishlist(id);
    const brandLink = `https://www.${brand?.toLowerCase().replace(/\s+/g, '')}.com/search?q=${encodeURIComponent(name || '')}`;

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <>
            <div
                onClick={() => onCardClick?.({ ...product, vibe: 'Matches your search', vibeMatch: matchScore || 95, originalPrice: originalPrice || price * 1.2, discount: matchScore ? `${matchScore}% Match` : 'HOT DEAL' })}
                className="product-card group relative flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-grey-100"
            >
                {/* Match Badge */}
                {matchScore && (
                    <div className="absolute top-2 left-2 z-10 bg-navy-900 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                        {matchScore}% Match
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-grey-400 hover:text-red-500 transition-colors shadow-sm"
                >
                    <Heart className={cn("w-5 h-5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "")} />
                </button>

                {/* Image */}
                <div className="relative h-48 overflow-hidden rounded-t-xl group/img">
                    <img
                        src={imageUrl || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400'}
                        alt={name}
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                    />

                    {/* Quick Actions overlay */}
                    <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col justify-end p-4 gap-2">
                        <Link
                            to="/stores"
                            className="w-full py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover/img:translate-y-0 transition-all flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-navy-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MapPin className="w-4 h-4" />
                            Find in Store
                        </Link>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTryOnModal(true);
                            }}
                            className="w-full py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover/img:translate-y-0 transition-all flex items-center justify-center gap-2 bg-navy-800 text-white hover:bg-navy-900"
                        >
                            <Sparkles className="w-4 h-4" />
                            Virtual Try-On
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[9px] font-black text-grey-400 uppercase tracking-widest">{brand}</span>
                        <div className="flex items-center gap-1 text-xs text-navy-600 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            4.5
                        </div>
                    </div>

                    <h3 className="text-[13px] font-bold text-navy-900 mb-1 line-clamp-2 min-h-[2.5em] leading-tight">{name}</h3>

                    <div className="mt-auto flex items-end justify-between">
                        <div className="flex flex-col">
                            {originalPrice && (
                                <span className="text-[10px] text-grey-400 line-through font-bold">Rs. {originalPrice?.toLocaleString()}</span>
                            )}
                            <span className="text-base font-black text-navy-900">Rs. {price?.toLocaleString()}</span>
                        </div>

                        {fitConfidence && (
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-grey-400 uppercase tracking-widest">Fit Confidence</span>
                                <span className={cn(
                                    "text-[9px] font-black uppercase px-2 py-0.5 rounded",
                                    fitConfidence > 10 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                                )}>
                                    {fitConfidence > 10 ? 'High' : 'Medium'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FitAnalysisModal
                isOpen={showFitModal}
                onClose={() => setShowFitModal(false)}
                product={product}
            />
            <VirtualTryOnModal
                isOpen={showTryOnModal}
                onClose={() => setShowTryOnModal(false)}
                product={product}
            />
        </>
    );
};

export default ProductCard;
