import React, { useState } from 'react';
import { MapPin, Star, Heart, MessageCircle, Sparkles, ShoppingBag, ExternalLink } from 'lucide-react';

// ... (imports remain same)

import { useWishlistStore } from '../../store/useWishlistStore';
import { cn } from '../../lib/utils';
import FitAnalysisModal from './FitAnalysisModal';
import VirtualTryOnModal from './VirtualTryOnModal';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
            <div className="product-card group relative flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                {/* Match Badge */}
                {matchScore && (
                    <div className="absolute top-2 left-2 z-10 bg-navy-900 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl group">
                    <a
                        href={brandLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full bg-grey-100"
                        onClick={(e) => e.stopPropagation()} // Prevent card click from triggering link
                    >
                        <img
                            src={imageUrl || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400'}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </a>

                    {/* Quick Actions overlay - Find Store & WhatsApp */}
                    <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 gap-2">
                        <Link
                            to="/stores"
                            className="w-full py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-navy-50"
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
                            className="w-full py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2 bg-navy-800 text-white hover:bg-navy-900"
                        >
                            <Sparkles className="w-4 h-4" />
                            Virtual Try-On
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const text = encodeURIComponent(`Ya kaisa lag raha ha? ${name} from ${brand}. Link: ${window.location.href}`);
                                window.open(`https://wa.me/?text=${text}`, '_blank');
                            }}
                            className="w-full py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba59]"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Ask Friend
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-grey-500 uppercase tracking-wider">{brand}</span>
                        <div className="flex items-center gap-1 text-xs text-navy-600 font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            4.5
                        </div>
                    </div>

                    <a
                        href={brandLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-navy-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-sm font-medium text-navy-900 mb-1 line-clamp-2 min-h-[2.5em]">{name}</h3>
                    </a>


                    <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-navy-900">Rs. {price?.toLocaleString()}</span>
                            {originalPrice && (
                                <span className="text-xs text-grey-500 line-through">Rs. {originalPrice?.toLocaleString()}</span>
                            )}
                        </div>

                        {fitConfidence && (
                            <button
                                onClick={() => setShowFitModal(true)}
                                className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full hover:bg-green-100 transition-colors"
                            >
                                {fitConfidence}% Fit Risk
                            </button>
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
