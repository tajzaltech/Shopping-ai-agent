import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Heart, MessageCircle, MapPin, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

    const { user } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (isAuthPage) return null;

    return (
        <nav className="bg-white border-b border-grey-200 sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-7.5 h-7.5 bg-navy-800 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-4.5 h-4.5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-navy-900">Stylist<span className="text-navy-600">AI</span></span>
                        </Link>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center gap-1.5">
                        {/* Chat */}
                        <Link
                            to="/chat"
                            className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/chat' ? 'bg-navy-100 text-navy-800' : 'text-grey-600 hover:text-navy-800 hover:bg-grey-100'}`}
                        >
                            <MessageCircle className="w-5.5 h-5.5" />
                        </Link>

                        {/* Hafta Bazaar (Sales) */}
                        <Link
                            to="/sales"
                            className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/sales' ? 'bg-red-50 text-red-600' : 'text-grey-600 hover:text-red-600 hover:bg-red-50'}`}
                        >
                            <Tag className="w-5.5 h-5.5" />
                        </Link>

                        {/* Find a Store */}
                        <Link
                            to="/stores"
                            className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/stores' ? 'bg-navy-100 text-navy-800' : 'text-grey-600 hover:text-navy-800 hover:bg-grey-100'}`}
                        >
                            <MapPin className="w-5.5 h-5.5" />
                        </Link>

                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/wishlist' ? 'bg-red-50 text-red-500' : 'text-grey-600 hover:text-red-500 hover:bg-grey-100'}`}
                        >
                            <Heart className="w-5.5 h-5.5" />
                        </Link>

                        <div className="h-5 w-px bg-grey-200 mx-1"></div>

                        {/* Profile / Auth */}
                        {user ? (
                            <Link
                                to="/profile"
                                className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/profile' ? 'bg-navy-100 text-navy-800' : 'text-grey-600 hover:text-navy-800 hover:bg-grey-100'}`}
                            >
                                <User className="w-5.5 h-5.5" />
                            </Link>
                        ) : (
                            <Link to="/signin" className="bg-navy-900 text-white py-1.5 px-3 rounded-lg text-xs font-bold hover:bg-navy-800 transition-all">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
