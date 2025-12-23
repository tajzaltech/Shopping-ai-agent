import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Mic, Camera, ShoppingBag, Zap, TrendingUp, Palette, Plus, MessageSquare, PanelLeftClose, PanelLeft, X, Image as ImageIcon, Scan, Briefcase, Moon, Heart, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import MessageBubble from './MessageBubble';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';
import ProductDetailPanel from '../product/ProductDetailPanel';

const ChatLayout = () => {
    const { messages, isLoading, sendMessage, sendImageMessage, chatHistory, startNewChat, loadChat, deleteChat, currentChatId, chatMode, setChatMode, scanBarcode } = useChat();
    const { user } = useAuth();

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [showScanner, setShowScanner] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Voice recognition setup
    const recognitionRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setInput(transcript);
            };

            recognitionRef.current.onend = () => setIsRecording(false);
            recognitionRef.current.onerror = () => setIsRecording(false);
        }
    }, []);

    const toggleVoiceRecording = () => {
        if (!recognitionRef.current) return alert('Voice recognition not supported');
        isRecording ? recognitionRef.current.stop() : recognitionRef.current.start();
        setIsRecording(!isRecording);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleScan = () => {
        setShowScanner(true);
        setTimeout(() => {
            setShowScanner(false);
            scanBarcode();
        }, 3000);
    };

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
                <div className="p-4 border-b border-grey-100">
                    <button onClick={startNewChat} className="flex items-center gap-2 w-full px-4 py-3 bg-navy-800 text-white rounded-xl font-semibold hover:bg-navy-900 transition-colors shadow-md">
                        <Plus className="w-5 h-5" /> New Chat
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <p className="px-3 py-2 text-xs font-bold text-grey-400 uppercase tracking-wider">Recent Chats</p>
                    {chatHistory.map((chat) => (
                        <div key={chat.id} className="group relative">
                            <button
                                onClick={() => loadChat(chat.id)}
                                className={cn(
                                    "w-full text-left px-3 py-3 rounded-xl text-sm flex items-start gap-3 transition-all pr-12",
                                    currentChatId === chat.id ? "bg-navy-50 border border-navy-200" : "hover:bg-grey-100"
                                )}
                            >
                                <MessageSquare className={cn("w-4 h-4 mt-0.5 flex-shrink-0", currentChatId === chat.id ? "text-navy-600" : "text-grey-400")} />
                                <div className="min-w-0">
                                    <div className={cn("font-medium truncate", currentChatId === chat.id ? "text-navy-800" : "text-grey-700")}>{chat.title}</div>
                                    <div className="text-xs text-grey-400">{chat.date}</div>
                                </div>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chat.id);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-grey-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
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
            <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-grey-50 to-white relative">
                {/* Occasion Modes Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-md border-b border-grey-100 px-4 py-3 overflow-x-auto no-scrollbar">
                    <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
                        {modes.map((mode) => (
                            <button
                                key={mode.name}
                                onClick={() => setChatMode(mode.name)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                    chatMode === mode.name
                                        ? "bg-navy-800 text-white shadow-lg scale-105"
                                        : "bg-white border border-grey-200 text-grey-600 hover:border-navy-300"
                                )}
                            >
                                <mode.icon className="w-4 h-4" />
                                {mode.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-4 py-6">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-navy-700 to-navy-900 rounded-2xl flex items-center justify-center shadow-xl">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                                </div>
                                <h1 className="text-3xl font-bold text-navy-900 mb-2">Hi {userName}! 👋</h1>
                                <p className="text-grey-600 text-lg max-w-md mb-8">
                                    {chatMode === 'Default' ? "I'm your personal AI stylist. Tell me what you're looking for today." : `Active Mode: ${chatMode}. Searching specifically for ${chatMode.toLowerCase()} wear!`}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        message={msg}
                                        onProductClick={(product) => {
                                            setActiveProduct(product);
                                            setIsPanelOpen(true);
                                        }}
                                    />
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3 animate-pulse">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center flex-shrink-0">
                                            <ShoppingBag className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="bg-white border border-grey-200 px-5 py-4 rounded-2xl shadow-sm italic text-grey-500 text-sm">Finding {chatMode.toLowerCase()} matches...</div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Scanner Overlay */}
                {showScanner && (
                    <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-6 text-white text-center">
                        <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-navy-500/20 animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-navy-400 animate-scan shadow-2xl"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Scan className="w-24 h-24 opacity-20" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Scanning Barcode...</h2>
                        <p className="text-white/60">Searching all Pakistani stores for best prices</p>
                    </div>
                )}

                {/* Input Area */}
                <div className="sticky bottom-0 border-t border-grey-200 bg-white/80 backdrop-blur-lg">
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="relative bg-white rounded-2xl border border-grey-300 shadow-lg focus-within:border-navy-500 transition-all">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={`Ask for ${chatMode.toLowerCase()} outfits...`}
                                    className="w-full py-4 pl-5 pr-44 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[56px] text-base"
                                    rows={1}
                                />
                                <div className="absolute right-3 bottom-3 flex items-center gap-1">
                                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2.5 text-grey-400 hover:text-navy-600 hover:bg-navy-50 rounded-xl" title="Image Search"><Camera className="w-5 h-5" /></button>
                                    <button type="button" onClick={handleScan} className="p-2.5 text-grey-400 hover:text-navy-600 hover:bg-navy-50 rounded-xl" title="Scan Barcode"><Scan className="w-5 h-5" /></button>
                                    <button type="button" onClick={toggleVoiceRecording} className={cn("p-2.5 rounded-xl transition-colors", isRecording ? "bg-red-100 text-red-500 animate-pulse" : "text-grey-400 hover:text-navy-600 hover:bg-navy-50")} title="Voice Input"><Mic className="w-5 h-5" /></button>
                                    <button type="submit" disabled={!input.trim()} className="p-2.5 bg-navy-800 text-white rounded-xl hover:bg-navy-900 disabled:bg-grey-200 ml-1 shadow-md"><Send className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Image Preview Overlay */}
                {imagePreview && (
                    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-grey-200 p-4 z-40 max-w-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-grey-700">Image Preview</span>
                            <button onClick={() => setImagePreview(null)} className="p-1 hover:bg-grey-100 rounded-full"><X className="w-4 h-4" /></button>
                        </div>
                        <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover rounded-xl mb-3" />
                        <button onClick={() => { sendImageMessage(imagePreview); setImagePreview(null); }} className="w-full py-2.5 bg-navy-800 text-white rounded-xl font-bold">Find Similar Items</button>
                    </div>
                )}
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
