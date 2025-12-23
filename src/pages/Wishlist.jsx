import React from 'react';
import { useWishlistStore } from '../store/useWishlistStore';
import ProductCard from '../components/product/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useWishlistStore();

    return (
        <div className="min-h-screen bg-grey-50 pt-20 pb-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-red-50 rounded-full">
                        <Heart className="w-8 h-8 text-red-500 fill-current" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-navy-900">Your Wishlist</h1>
                        <p className="text-grey-600">{wishlist.length} items saved for later</p>
                    </div>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-grey-100">
                        <Heart className="w-16 h-16 text-grey-200 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-navy-800 mb-2">Your wishlist is empty</h2>
                        <p className="text-grey-500 mb-6">Start chatting with our stylist to find items you love.</p>
                        <Link to="/chat" className="btn-primary inline-flex">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product.id} className="h-[420px]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
