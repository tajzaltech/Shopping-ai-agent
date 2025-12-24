import { useState, useCallback, useEffect } from 'react';

// Generate unique ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export const useChat = () => {
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [chatMode, setChatMode] = useState('Default');

    const saveToLocalStorage = (history) => {
        localStorage.setItem('chat-history', JSON.stringify(history));
    };

    const startNewChat = useCallback((initialPrompt = null) => {
        const newChatId = generateId();
        const newChat = {
            id: newChatId,
            title: (typeof initialPrompt === 'string') ? (initialPrompt.slice(0, 30) + (initialPrompt.length > 30 ? '...' : '')) : 'New Chat',
            date: 'Just now',
            messages: []
        };

        setChatHistory(prev => {
            const updated = [newChat, ...prev];
            saveToLocalStorage(updated);
            return updated;
        });

        setCurrentChatId(newChatId);
        setMessages([]);
    }, []);

    // Load chat history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('chat-history');
        if (savedHistory) {
            const history = JSON.parse(savedHistory);
            setChatHistory(history);
            if (history.length > 0) {
                setCurrentChatId(history[0].id);
                setMessages(history[0].messages || []);
            } else {
                startNewChat();
            }
        } else {
            startNewChat();
        }
    }, [startNewChat]);

    const updateCurrentChat = useCallback((newMessages) => {
        if (!currentChatId) return;

        setChatHistory(prev => {
            const updated = prev.map(chat => {
                if (chat.id === currentChatId) {
                    const firstUserMsg = newMessages.find(m => m.role === 'user');
                    const newTitle = firstUserMsg ? (firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '')) : chat.title;
                    return { ...chat, messages: newMessages, title: newTitle || 'New Chat' };
                }
                return chat;
            });
            saveToLocalStorage(updated);
            return updated;
        });
    }, [currentChatId]);

    const loadChat = useCallback((chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages(chat.messages || []);
        }
    }, [chatHistory]);

    const deleteChat = useCallback((chatId) => {
        setChatHistory(prev => {
            const updated = prev.filter(c => c.id !== chatId);
            saveToLocalStorage(updated);
            return updated;
        });

        if (currentChatId === chatId) {
            setMessages([]);
            setCurrentChatId(null);
        }
    }, [currentChatId]);

    // Pakistani products mock data with PKR prices
    const mockProducts = [
        {
            id: 1,
            brand: "Khaadi",
            name: "Unstitched Lawn 3-Piece Suit",
            price: 4990,
            originalPrice: 6500,
            imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
            matchScore: 95,
            fitConfidence: 12
        },
        {
            id: 2,
            brand: 'Gul Ahmed',
            name: 'Premium Lawn Collection - Blue',
            price: 3490,
            originalPrice: 3890,
            imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400',
            matchScore: 88,
            fitConfidence: 8
        },
        {
            id: 3,
            brand: 'Outfitters',
            name: 'Slim Fit Chinos - Olive',
            price: 2999,
            imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=400',
            matchScore: 82,
            fitConfidence: 15
        },
        {
            id: 4,
            brand: 'Junaid Jamshed',
            name: 'Kurta Shalwar Set - White',
            price: 5490,
            originalPrice: 6990,
            imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
            matchScore: 90,
            fitConfidence: 10
        }
    ];

    const sendMessage = useCallback((content) => {
        if (!content.trim()) return;

        const userMsg = {
            id: generateId(),
            role: 'user',
            content,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        // Simulated AI Power-Up Logic
        setTimeout(() => {
            const aiResponseId = generateId();
            let aiResponse = {
                id: aiResponseId,
                role: 'ai',
                content: "",
                fullContent: "I found some great options for you!",
                timestamp: new Date(),
                chips: ["Similar items", "Show in Red", "Price drop?"]
            };

            const lowerContent = content.toLowerCase();

            if (chatMode === 'Wedding') {
                aiResponse.fullContent = "Wedding Mode Active! ✨ Since you're looking for formals, check out these premium ensembles. Perfect for Mehndi or Barat!";
                aiResponse.products = mockProducts.filter(p => ['Junaid Jamshed', 'Khaadi'].includes(p.brand));
                aiResponse.chips = ["Gold Embroidery", "Velvet Suits", "Jewelry Matches"];
            } else if (chatMode === 'Eid') {
                aiResponse.fullContent = "Eid Mubarak! 🌙 Specially curated festive wear for you. These trending designs are selling fast!";
                aiResponse.products = [mockProducts[0], mockProducts[3]];
                aiResponse.chips = ["Cotton Silk", "New Arrivals", "Dolmen Mall Stock"];
            } else if (chatMode === 'Office') {
                aiResponse.fullContent = "Formal & Sharp. 💼 Here are semi-formal options that work perfectly for your office environment.";
                aiResponse.products = [mockProducts[2], mockProducts[3]];
                aiResponse.chips = ["Wash & Wear", "Cotton Suits", "Office Shoes"];
            } else {
                if (lowerContent.includes('lawn') || lowerContent.includes('suit')) {
                    aiResponse.fullContent = "For summer, lawn suits are perfect! Here are trending picks from top brands:";
                    aiResponse.products = mockProducts.slice(0, 2);
                    aiResponse.chips = ["Digital Print", "Embroidered", "Under 5000"];
                } else {
                    aiResponse.fullContent = "Based on your style profile, here are some items you might love:";
                    aiResponse.products = mockProducts.slice(0, 3);
                    aiResponse.chips = ["Daily Wear", "New Trends", "Best Sellers"];
                }
            }

            // Add AI response message (initially empty content)
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);

            // Simulate Streaming
            let currentText = "";
            const words = aiResponse.fullContent.split(" ");
            let wordIndex = 0;

            const interval = setInterval(() => {
                if (wordIndex < words.length) {
                    currentText += (wordIndex === 0 ? "" : " ") + words[wordIndex];
                    setMessages(prev => prev.map(m => m.id === aiResponseId ? { ...m, content: currentText } : m));
                    wordIndex++;
                } else {
                    clearInterval(interval);
                    // Update final content and chat history
                    setMessages(prev => {
                        const finalMessages = prev.map(m => m.id === aiResponseId ? { ...m, content: aiResponse.fullContent } : m);
                        updateCurrentChat(finalMessages);
                        return finalMessages;
                    });
                }
            }, 20);

        }, 1000);
    }, [updateCurrentChat, chatMode]);

    const sendImageMessage = useCallback((imageData) => {
        const userMsg = {
            id: generateId(),
            role: 'user',
            content: "Find me items similar to this:",
            imageUrl: imageData,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        setTimeout(() => {
            const aiResponse = {
                id: generateId(),
                role: 'ai',
                content: "I've analyzed your image! Here are similar items from Pakistani brands:",
                timestamp: new Date(),
                products: mockProducts.slice(0, 3)
            };

            setMessages(prev => {
                const updated = [...prev, aiResponse];
                updateCurrentChat(updated);
                return updated;
            });
            setIsLoading(false);
        }, 2000);
    }, [updateCurrentChat]);

    const scanBarcode = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            const aiResponse = {
                id: generateId(),
                role: 'ai',
                content: `**Scanner Match!** 🔍 I found this item at **Gul Ahmed**. It's currently **Rs. 3,490** (15% cheaper than your current store!). Would you like me to find the nearest Gul Ahmed store?`,
                timestamp: new Date(),
                products: [mockProducts[1]]
            };
            const newMessages = [...messages, aiResponse];
            setMessages(newMessages);
            updateCurrentChat(newMessages);
            setIsLoading(false);
        }, 2000);
    }, [messages, updateCurrentChat]);

    return {
        messages,
        isLoading,
        sendMessage,
        sendImageMessage,
        chatHistory,
        startNewChat,
        loadChat,
        deleteChat,
        currentChatId,
        chatMode,
        setChatMode,
        scanBarcode
    };
};
