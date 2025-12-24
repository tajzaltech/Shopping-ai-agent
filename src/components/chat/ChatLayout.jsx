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
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeProduct, setActiveProduct] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const hasProcessedInitial = useRef(false);

    // Handle initial prompt from Home/Landing
    useEffect(() => {
        if (location.state?.initialPrompt && !hasProcessedInitial.current) {
            hasProcessedInitial.current = true;
            const prompt = location.state.initialPrompt;

            // Clear state immediately to prevent re-triggers
            navigate(location.pathname, { replace: true, state: {} });

            // Force a NEW chat for Home-to-Chat transition to ensure fresh message count
            startNewChat(prompt);

            // Delay slightly to ensure useChat states (messages, currentChatId) have updated
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
                "bg-white border-r border-grey-200 flex-shrink-0 transition-all duration-300 flex flex-col z-20",
                sidebarOpen ? "w-72" : "w-0 overflow-hidden"
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
                                <p className="text-[11px] opacity-60 font-medium">Just now</p>
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

            {/* Toggle Sidebar Button */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-grey-200 p-2 rounded-r-lg shadow-md hover:bg-grey-50 transition-all" style={{ left: sidebarOpen ? '288px' : '0' }}>
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4 text-grey-600" /> : <PanelLeft className="w-4 h-4 text-grey-600" />}
            </button>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:20px_20px]">
                    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                                <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
                                    <Sparkles className="w-8 h-8 text-navy-600" />
                                </div>
                                <h2 className="text-2xl font-black text-navy-900 mb-2">Hello, {user?.name || 'Stylist'}!</h2>
                                <p className="text-sm text-grey-500 mb-8 max-w-sm">I'm your AI personal shopper. Ask me anything about Pakistani fashion and trends.</p>

                                {/* Quick Start Chips - Scaled Down */}
                                <div className="flex flex-wrap justify-center gap-2.5 animate-slide-up">
                                    {[
                                        "Luxury Lawn Catalog 🌸",
                                        "Bargain Hunt Today ⚡",
                                        "Shaadi Guest Looks 💎",
                                        "Ready to Wear Sale 👗"
                                    ].map(suggest => (
                                        <button
                                            key={suggest}
                                            onClick={() => sendMessage(suggest)}
                                            className="px-4 py-2.5 bg-white border border-grey-100 rounded-xl text-[10px] font-black text-navy-900 hover:bg-navy-50 hover:border-navy-500 transition-all shadow-sm active:scale-95 border-b-2 border-b-grey-100 hover:border-b-0 translate-y-[-2px] hover:translate-y-0 uppercase tracking-widest"
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

                            <div className="relative bg-white border border-grey-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-10 max-w-md w-full text-center space-y-8 animate-slide-up">
                                <div className="w-20 h-20 bg-navy-50 rounded-3xl flex items-center justify-center mx-auto rotate-12 rotate">
                                    <Zap className="w-10 h-10 text-navy-900 -rotate-12" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-navy-900 tracking-tight leading-tight">
                                        Sign in to find <br /> <span className="text-navy-400 font-light italic">your style</span>
                                    </h3>
                                    <p className="text-grey-500 font-medium text-base leading-relaxed">
                                        Unlock exclusive curations, price drop alerts, and one-click fashion discovery.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="w-full bg-navy-900 text-white rounded-2xl py-5 font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-navy-100 active:scale-[0.98]"
                                    >
                                        Log In Now
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="w-full bg-white text-navy-900 border border-grey-100 rounded-2xl py-5 font-black text-sm uppercase tracking-widest hover:bg-grey-50 transition-all active:scale-[0.98]"
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
