import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Search, Shirt } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-grey-100">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-50 text-navy-700 text-sm font-medium mb-8 animate-fade-in">
                    <Sparkles className="w-4 h-4" />
                    <span>New: AI Fit Prediction Engine</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 tracking-tight mb-6 max-w-4xl animate-slide-up">
                    Your Personal AI Stylist <br className="hidden sm:block" />
                    <span className="text-navy-600">That Actually Gets You</span>
                </h1>

                <p className="text-lg sm:text-xl text-grey-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Find clothes that fit perfectly. Shop with voice, image, or text.
                    Get personalized recommendations based on your unique style profile.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 group">
                        Start Styling For Free
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/about" className="btn-secondary flex items-center justify-center">
                        How it Works
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-navy-100/50 rounded-xl flex items-center justify-center mb-4 text-navy-700">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Smart Search</h3>
                            <p className="text-grey-600">
                                "Find me a navy blue dress for a summer wedding under $100." Just ask naturally.
                            </p>
                        </div>

                        <div className="card hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-navy-100/50 rounded-xl flex items-center justify-center mb-4 text-navy-700">
                                <Shirt className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Perfect Fit</h3>
                            <p className="text-grey-600">
                                Our AI analyzes size charts and reviews to predict your perfect size for every brand.
                            </p>
                        </div>

                        <div className="card hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-navy-100/50 rounded-xl flex items-center justify-center mb-4 text-navy-700">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Style Match</h3>
                            <p className="text-grey-600">
                                Get recommendations that match your taste, budget, and existing wardrobe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
