import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Send, Mic, Camera, ShoppingBag, Zap, TrendingUp, Palette, Plus, MessageSquare, PanelLeftClose, PanelLeft, X, Image as ImageIcon, Scan, Briefcase, Moon, Heart, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';
import ProductDetailPanel from '../product/ProductDetailPanel';

const ChatLayout = () => {
    const { messages, isLoading, sendMessage, sendImageMessage, chatHistory, startNewChat, loadChat, deleteChat, currentChatId, chatMode, setChatMode, scanBarcode } = useChat();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const messagesEndRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
    const [activeProduct, setActiveProduct] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const hasProcessedInitial = useRef(false);

    // Initial check for mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle initial prompt from Home/Landing
    useEffect(() => {
        if (location.state?.initialPrompt && !hasProcessedInitial.current) {
            hasProcessedInitial.current = true;
            const prompt = location.state.initialPrompt;
            navigate(location.pathname, { replace: true, state: {} });
            startNewChat(prompt);
            setTimeout(() => {
                sendMessage(prompt);
            }, 200);
        }
    }, [location.state, sendMessage, navigate, location.pathname, startNewChat]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const modes = [
        { name: 'Default', icon: Sparkles },
        { name: 'Wedding', icon: Heart },
        { name: 'Eid', icon: Moon },
        { name: 'Office', icon: Briefcase },
    ];

    const userName = user?.name?.split(' ')[0] || 'there';

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-grey-50 overflow-hidden relative">
            {/* Sidebar */}
            <aside className={cn(
                "bg-white border-r border-grey-200 flex-shrink-0 transition-all duration-300 flex flex-col z-40 lg:z-20",
                "fixed lg:relative h-full top-0 left-0 lg:h-auto",
                sidebarOpen ? "w-[280px] sm:w-72 translate-x-0" : "w-0 overflow-hidden sm:-translate-x-full lg:translate-x-0"
            )}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-grey-100">
                    <button
                        onClick={() => startNewChat()}
                        className="w-full bg-navy-900 text-white rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 hover:bg-navy-800 transition-all font-bold text-sm shadow-lg shadow-navy-100"
                    >
                        <Plus className="w-4 h-4" />
                        New Chat
                    </button>
                </div>

                {/* Chat History List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
                    <div className="text-[10px] font-black text-grey-400 uppercase tracking-widest px-2 mb-2">Recent Chats</div>
                    {chatHistory.map((chat) => (
                        <div
                            key={chat.id}
                            className={cn(
                                "group relative flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all",
                                currentChatId === chat.id ? "bg-navy-50 text-navy-900" : "text-grey-500 hover:bg-grey-50 hover:text-navy-900"
                            )}
                            onClick={() => loadChat(chat.id)}
                        >
                            <MessageSquare className={cn("w-4 h-4 shrink-0", currentChatId === chat.id ? "text-navy-600" : "text-grey-400")} />
                            <div className="flex-1 truncate">
                                <p className="text-[13px] font-bold truncate leading-tight">{chat.title || 'New Chat'}</p>
                                <p className="text-[11px] opacity-60 font-medium">{chat.date}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chat.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all absolute right-2"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-navy-900/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Toggle Sidebar Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-50 bg-white border border-grey-200 p-2.5 rounded-r-2xl shadow-xl hover:bg-grey-50 transition-all duration-300",
                    sidebarOpen ? "left-[280px] sm:left-72" : "left-0"
                )}
            >
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4 text-navy-900" /> : <PanelLeft className="w-4 h-4 text-navy-900" />}
            </button>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:20px_20px]">
                    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 md:px-6">
                                <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
                                    <Sparkles className="w-8 h-8 text-navy-600" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-black text-navy-900 mb-2">Hello, {user?.name || 'Stylist'}!</h2>
                                <p className="text-xs sm:text-sm text-grey-500 mb-8 max-w-[280px] sm:max-w-sm mx-auto">I'm your AI personal shopper. Ask me anything about Pakistani fashion and trends.</p>

                                {/* Quick Start Chips - Scaled Down */}
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 animate-slide-up">
                                    {[
                                        "Luxury Lawn",
                                        "Bargain Hunt",
                                        "Wedding Guest",
                                        "RTW Sale"
                                    ].map(suggest => (
                                        <button
                                            key={suggest}
                                            onClick={() => sendMessage(suggest)}
                                            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-grey-100 rounded-xl text-[9px] sm:text-[10px] font-black text-navy-900 hover:bg-navy-50 hover:border-navy-500 transition-all shadow-sm active:scale-95 border-b-2 border-b-grey-100 hover:border-b-0 translate-y-[-2px] hover:translate-y-0 uppercase tracking-widest"
                                        >
                                            {suggest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    onProductClick={(p) => {
                                        if (p.type === 'chip') {
                                            sendMessage(p.content);
                                        } else {
                                            setActiveProduct(p);
                                            setIsPanelOpen(true);
                                        }
                                    }}
                                />
                            ))
                        )}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-navy-600 animate-pulse" />
                                </div>
                                <div className="bg-white border border-grey-100 rounded-xl px-4 py-2.5 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-navy-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-navy-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-navy-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Auth Overlay - Centered over the entire chat area */}
                    {!user && messages?.filter(m => m.role === 'user').length >= 1 && !isLoading && !location.state?.initialPrompt && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                            {/* Background Blur covering messages and input */}
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[6px] rounded-t-3xl"></div>

                            <div className="relative bg-white border border-grey-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 max-w-md w-full text-center space-y-6 sm:space-y-8 animate-slide-up mx-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-navy-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto rotate-12">
                                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-navy-900 -rotate-12" />
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight leading-tight">
                                        Sign in to find <br /> <span className="text-navy-400 font-light italic">your style</span>
                                    </h3>
                                    <p className="text-xs sm:text-base text-grey-500 font-medium leading-relaxed">
                                        Unlock exclusive curations and one-click fashion discovery.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="w-full bg-navy-900 text-white rounded-xl sm:rounded-2xl py-4 sm:py-5 font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-navy-100 active:scale-[0.98]"
                                    >
                                        Log In Now
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="w-full bg-white text-navy-900 border border-grey-100 rounded-xl sm:rounded-2xl py-4 sm:py-5 font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-grey-50 transition-all active:scale-[0.98]"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Input Area */}
                <div className="p-4 px-6 relative">
                    <ChatInput onSend={sendMessage} onImageUpload={sendImageMessage} />
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

export default ChatLayout;
