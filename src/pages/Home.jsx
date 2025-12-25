import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    ArrowRight, Sparkles, Search, Shirt, Send, Camera, Mic, ArrowUp,
    ChevronLeft, ChevronRight, Zap, TrendingUp, Instagram, Twitter, Linkedin, Facebook
} from 'lucide-react';
import { cn } from '../lib/utils';

const Home = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const placeholders = [
        "Ask for an outfit, or describe a style...",
        "Find a perfect dress for a summer wedding...",
        "Looking for minimalist office wear...",
        "Search for vintage-style denim jackets...",
        "Need matching accessories for a navy suit...",
        "Show me trending street chic outfits..."
    ];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullInsight.slice(0, i));
            i++;
            if (i > fullInsight.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleStartChat = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            navigate('/chat', { state: { initialPrompt: query } });
        }
    };

    const trendingTopics = [
        "Summer Lawn '24", "Formal Wedding Wear", "Minimalist Street Style",
        "Sustainable Fabrics", "Zari Work Trends", "Pastel Palettes",
        "Vintage Silhouetts", "Modern Chic"
    ];

    const carouselArticles = [
        { title: "The Rise of Fusion Wear", category: "Style Guide", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop" },
        { title: "Sustainable Silk: A New Era", category: "Innovation", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=400&fit=crop" },
        { title: "Wedding Guest Ettiquette", category: "Lifestyle", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=400&fit=crop" },
        { title: "Accessorizing Your Eid Outfit", category: "Tips", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop" }
    ];

    const featuredPicks = [
        { title: "Editor's Choice: Navy Blue Formals", brand: "Sana Safinaz", price: "Rs. 24,500", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop" },
        { title: "The Ultimate Lawn Collection", brand: "Khaadi", price: "Rs. 12,000", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop" },
        { title: "Street Smart Summer Sets", brand: "Outfitters", price: "Rs. 5,500", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop" },
        { title: "Classic Heritage Collection", brand: "J.", price: "Rs. 18,900", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop" }
    ];

    const ledgerArticles = [
        {
            title: "The Midnight Silk Revolution",
            description: "How high-sheen fabrics are reclaiming the luxury night-wear space this winter season.",
            category: "Material Flux",
            img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200",
            tag: "Intelligence"
        },
        {
            title: "Geometric Zari: Future Traditions",
            description: "A deep dive into how traditional Pakistani craftsmanship is meeting modern digital patterns.",
            category: "Cultural Sync",
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200",
            tag: "Trend-set"
        },
        {
            title: "The Sculpted Silhouette",
            description: "Exploring the shift towards structured, architectural tailoring in everyday street chic.",
            category: "Avant-Garde",
            img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
            tag: "Curation"
        }
    ];

    const [activeLedger, setActiveLedger] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveLedger((prev) => (prev + 1) % ledgerArticles.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const carouselRef = useRef(null);

    // Initialize carousel position to the middle buffer
    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel && carouselArticles.length > 0) {
            const card = carousel.querySelector('.snap-start');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = window.innerWidth >= 768 ? 24 : 16;
                const initialScroll = (cardWidth + gap) * carouselArticles.length;
                carousel.scrollLeft = initialScroll;
            }
        }
    }, [carouselArticles.length]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let animationFrameId;
        const scrollSpeed = 0.5; // Constant speed

        const animate = () => {
            if (!carousel) return;

            // Increment scroll
            carousel.scrollLeft += scrollSpeed;

            // Infinite loop check
            const card = carousel.querySelector('.snap-start');
            if (card) {
                const unitWidth = (card.offsetWidth + (window.innerWidth >= 768 ? 24 : 16)) * carouselArticles.length;
                if (carousel.scrollLeft >= unitWidth * 2) {
                    carousel.scrollLeft -= unitWidth;
                } else if (carousel.scrollLeft <= unitWidth * 0.5) {
                    carousel.scrollLeft += unitWidth;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Optional: Pause on hover
        const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
        const handleMouseLeave = () => {
            animationFrameId = requestAnimationFrame(animate);
        };

        carousel.addEventListener('mouseenter', handleMouseEnter);
        carousel.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            carousel.removeEventListener('mouseenter', handleMouseEnter);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [carouselArticles.length]);

    const insights = [
        { label: "Fabric of the Month", value: "Premium Chiffon", trend: "+24% demand" },
        { label: "Most Searched Color", value: "Emerald Green", trend: "Trending Now" },
        { label: "Average Cart Value", value: "Rs. 15,400", trend: "Style conscious" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white selection:bg-navy-900 selection:text-white">

            {/* Section 1: ChatGPT-Style Minimal Hero */}
            <section className="relative px-6 pt-32 pb-24 flex flex-col items-center text-center bg-white overflow-hidden">
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-outfit font-light text-navy-900 tracking-tight mb-8 md:mb-12 animate-slide-up">
                        Describe your <span className="font-bold">perfect</span> outfit
                    </h1>

                    <div className="w-full max-w-3xl relative animate-slide-up [animation-delay:0.1s]">
                        <form onSubmit={handleStartChat} className="relative">
                            <div className="relative bg-grey-50 rounded-[2rem] border border-navy-200 shadow-sm focus-within:shadow-md transition-shadow group-focus-within:border-navy-900/20">
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleStartChat();
                                        }
                                    }}
                                    placeholder={placeholders[placeholderIndex]}
                                    className="w-full pt-6 md:pt-8 pb-16 md:pb-20 pl-6 md:pl-10 pr-16 bg-transparent border-none focus:ring-0 focus:outline-none text-base md:text-xl font-jakarta font-medium text-navy-900 placeholder:text-grey-300 placeholder:font-medium resize-none min-h-[120px] md:min-h-[160px]"
                                    rows={1}
                                />
                                <div className="absolute right-4 bottom-4 flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={!query.trim()}
                                        className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center text-navy-400 hover:bg-navy-900 hover:text-white disabled:bg-grey-50/50 disabled:text-grey-200 transition-all active:scale-95 shadow-sm"
                                    >
                                        <ArrowUp className="w-6 h-6 stroke-[3]" />
                                    </button>
                                </div>
                            </div>

                            {/* Suggestion Chips */}
                            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in [animation-delay:0.3s]">
                                {["Floral Lawn", "Zari Formals", "Street Chic", "Silk Elegance", "More"].map((chip, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="px-6 py-2.5 rounded-full border border-grey-200 bg-white text-[11px] font-jakarta font-black uppercase tracking-[0.15em] text-grey-500 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-300"
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Section 2: Smooth Marquee */}
            <section className="py-8 bg-white overflow-hidden border-b border-grey-50">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...trendingTopics, ...trendingTopics].map((topic, i) => (
                        <div key={i} className="flex items-center gap-4 mx-12">
                            <div className="w-1.5 h-1.5 rounded-full bg-navy-900 shadow-[0_0_10px_rgba(10,25,47,0.3)]"></div>
                            <span className="text-navy-900 font-jakarta font-black text-[10px] uppercase tracking-[0.3em]">{topic}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Featured Articles Grid */}
            <section className="py-24 bg-grey-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 animate-slide-up">
                        <div className="text-[10px] font-jakarta font-black text-navy-400 uppercase tracking-[0.4em] mb-3">Curated for You</div>
                        <h2 className="text-5xl font-outfit font-bold text-navy-900 tracking-tight">Editor's Hot Picks</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredPicks.map((pick, i) => (
                            <div key={i} className="group animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative shadow-lg shadow-navy-100/20">
                                    <img src={pick.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={pick.title} />
                                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-500"></div>
                                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] py-3 bg-white text-navy-900 text-[10px] font-black uppercase tracking-widest rounded-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">Quick View</button>
                                </div>
                                <div className="text-left space-y-1">
                                    <span className="text-[9px] font-black text-grey-400 uppercase tracking-widest">{pick.brand}</span>
                                    <h4 className="text-sm font-bold text-navy-900 group-hover:text-navy-600 transition-colors truncate">{pick.title}</h4>
                                    <p className="text-sm font-black text-navy-900">{pick.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Horizontal Carousel */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
                    <div className="text-left animate-slide-up">
                        <div className="text-[10px] font-jakarta font-black text-navy-400 uppercase tracking-[0.4em] mb-2">Pulse Feed</div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-outfit font-bold text-navy-900 leading-none">Style Chronicles</h3>
                    </div>

                </div>

                <div className="overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex gap-4 md:gap-6 px-4 md:px-24 overflow-x-auto no-scrollbar pb-8"
                    >
                        {[...carouselArticles, ...carouselArticles, ...carouselArticles].map((article, i) => (
                            <div key={i} className="min-w-[240px] md:min-w-[380px] snap-start group relative bg-white rounded-3xl overflow-hidden border border-grey-100 shadow-sm hover:shadow-2xl transition-all duration-700 inline-block">
                                <div className="h-48 md:h-64 relative overflow-hidden">
                                    <img src={article.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={article.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-left whitespace-normal pr-4">
                                        <span className="bg-white/20 backdrop-blur-md text-white text-[8px] md:text-[9px] font-jakarta font-black px-2.5 py-1 rounded uppercase tracking-[0.2em] mb-2 md:mb-3 inline-block">{article.category}</span>
                                        <h4 className="text-lg md:text-2xl font-outfit font-bold text-white leading-tight">{article.title}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Section 5: The Style Ledger (Cinematic Article Slider) */}
            <section className="relative py-24 bg-white overflow-hidden border-t border-grey-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        {/* Image Side */}
                        <div className="w-full lg:w-3/5 relative group">
                            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl relative">
                                {ledgerArticles.map((art, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "absolute inset-0 transition-all duration-[1500ms] ease-in-out transform",
                                            idx === activeLedger ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-1 pointer-events-none"
                                        )}
                                    >
                                        <img src={art.img} className="w-full h-full object-cover" alt={art.title} />
                                        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/40 to-transparent"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-10 left-10 flex gap-3 z-20">
                                {ledgerArticles.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveLedger(idx)}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-500",
                                            idx === activeLedger ? "w-12 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-2/5 text-left space-y-10 relative">
                            <div className="animate-fade-in key={activeLedger}">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-navy-50 text-navy-900 mb-6 md:mb-8 border border-navy-100">
                                    <span className="w-2 h-2 rounded-full bg-navy-900 animate-pulse"></span>
                                    <span className="text-[10px] font-jakarta font-black uppercase tracking-[0.25em]">{ledgerArticles[activeLedger].tag}</span>
                                </div>
                                <h3 className="text-4xl md:text-6xl font-outfit font-bold text-navy-900 tracking-tight leading-[0.9] mb-6 md:mb-8 transition-transform duration-700">
                                    {ledgerArticles[activeLedger].title}
                                </h3>
                                <p className="text-lg md:text-xl font-jakarta font-medium text-grey-500 leading-relaxed mb-8 md:mb-10 min-h-[80px] md:min-h-[100px]">
                                    {ledgerArticles[activeLedger].description}
                                </p>
                                <button className="group flex items-center gap-4 text-navy-900 font-black text-sm uppercase tracking-widest hover:gap-6 transition-all duration-300">
                                    Continue Reading
                                    <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center group-hover:bg-black transition-colors">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </button>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 opacity-[0.03] select-none pointer-events-none">
                                <h4 className="text-[180px] font-black tracking-tighter text-navy-900 leading-none">
                                    0{activeLedger + 1}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: The Visionary Portal (Mind-blowing Surprise) */}
            <section className="relative py-32 bg-navy-900 overflow-hidden group/portal">
                <div className="absolute inset-0 holographic-blob bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-[120px]"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-12 animate-fade-in">
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-outfit font-bold text-white tracking-tighter leading-none mb-6 md:mb-8">
                            STYLE <span className="text-transparent border-t border-b border-white/30 backdrop-blur-sm px-4">BEYOND</span> REALITY.
                        </h2>
                        <p className="text-white text-lg md:text-xl font-jakarta font-bold max-w-2xl mx-auto leading-relaxed px-4">Step into the future of automated personal styling where every pixel is tailored to your DNA.</p>
                    </div>

                    <div className="relative inline-block group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-12 py-8 bg-black rounded-[2.5rem] border border-white/10 flex items-center gap-6 overflow-hidden">
                            <div className="animate-shimmer absolute inset-0 opacity-20 pointer-events-none"></div>
                            <div className="text-left">
                                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-1">Interactive Beta</span>
                                <h4 className="text-white text-3xl font-black tracking-tighter">Enter Visionary Portal</h4>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                <ArrowRight className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['AI Fit', 'Vision Sync', 'Holo Try-on', 'DNA Style'].map((feat, i) => (
                            <div key={i} className="py-4 px-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all cursor-crosshair">
                                {feat}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-grey-100 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-2xl font-outfit font-bold tracking-tight text-navy-900">StylistAI</span>
                            </div>
                            <p className="text-sm text-grey-500 leading-relaxed">Pioneering the future of fashion AI. Your personal stylist reborn through data.</p>
                        </div>

                        <div>
                            <h5 className="text-[11px] font-black text-navy-900 uppercase tracking-[0.2em] mb-6">Discovery</h5>
                            <ul className="space-y-4 text-sm text-grey-500 font-bold">
                                <li><Link to="/chat" className="hover:text-navy-900 transition-colors">AI Style Search</Link></li>
                                <li><Link to="/sales" className="hover:text-navy-900 transition-colors">Live Sale Tracker</Link></li>
                                <li><Link to="#" className="hover:text-navy-900 transition-colors">Trend Reports</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[11px] font-black text-navy-900 uppercase tracking-[0.2em] mb-6">Company</h5>
                            <ul className="space-y-4 text-sm text-grey-500 font-bold">
                                <li><Link to="#" className="hover:text-navy-900 transition-colors">About ZAL</Link></li>
                                <li><Link to="#" className="hover:text-navy-900 transition-colors">Our Ethos</Link></li>
                                <li><Link to="#" className="hover:text-navy-900 transition-colors">Partnerships</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[11px] font-black text-navy-900 uppercase tracking-[0.2em] mb-6">Stay Connected</h5>
                            <div className="flex gap-4">
                                {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                    <button key={i} className="w-10 h-10 rounded-xl bg-grey-50 flex items-center justify-center text-grey-400 hover:bg-navy-900 hover:text-white transition-all duration-300">
                                        <Icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-grey-50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] font-bold text-grey-400 uppercase tracking-widest">© 2026 StylistAI PERSONAL SHOPPER. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-8 text-[10px] font-bold text-grey-400 uppercase tracking-widest">
                            <Link to="#" className="hover:text-navy-900 transition-colors">Privacy Policy</Link>
                            <Link to="#" className="hover:text-navy-900 transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
