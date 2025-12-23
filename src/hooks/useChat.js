import { useState, useCallback, useEffect } from 'react';

// Generate unique ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export const useChat = () => {
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [chatMode, setChatMode] = useState('Default');

    // Load chat history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('chat-history');
        if (savedHistory) {
            const history = JSON.parse(savedHistory);
            setChatHistory(history);
            if (history.length > 0) {
                setCurrentChatId(history[0].id);
                setMessages(history[0].messages || []);
            }
        } else {
            startNewChat();
        }
    }, []);

    const saveToLocalStorage = (history) => {
        localStorage.setItem('chat-history', JSON.stringify(history));
    };

    const updateCurrentChat = useCallback((newMessages) => {
        if (!currentChatId) return;

        setChatHistory(prev => {
            const updated = prev.map(chat => {
                if (chat.id === currentChatId) {
                    const title = newMessages[0]?.content?.slice(0, 30) + '...' || 'New Chat';
                    return { ...chat, messages: newMessages, title };
                }
                return chat;
            });
            saveToLocalStorage(updated);
            return updated;
        });
    }, [currentChatId]);

    const startNewChat = useCallback(() => {
        const newChatId = generateId();
        const newChat = {
            id: newChatId,
            title: 'New Chat',
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

    const loadChat = useCallback((chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages(chat.messages || []);
        }
    }, [chatHistory]);

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
        const userMsg = {
            id: generateId(),
            role: 'user',
            content,
            timestamp: new Date()
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setIsLoading(true);

        setTimeout(() => {
            let aiResponse = {
                id: generateId(),
                role: 'ai',
                content: "I found some great options for you!",
                timestamp: new Date()
            };

            const lowerContent = content.toLowerCase();

            if (chatMode === 'Wedding') {
                aiResponse.content = "Wedding Mode Active! ✨ Since you're looking for formals, check out these premium ensembles from Junaid Jamshed and Khaadi. Perfect for Mehndi or Barat!";
                aiResponse.products = mockProducts.filter(p => ['Junaid Jamshed', 'Khaadi'].includes(p.brand));
            } else if (chatMode === 'Eid') {
                aiResponse.content = "Eid Mubarak! 🌙 Specially curated festive wear for you. These trending designs are selling fast at Dolmen Mall!";
                aiResponse.products = [mockProducts[0], mockProducts[3]];
            } else if (chatMode === 'Office') {
                aiResponse.content = "Formal & Sharp. 💼 Here are semi-formal kurtas and chinos from Outfitters that work perfectly for your office environment.";
                aiResponse.products = [mockProducts[2], mockProducts[3]];
            } else {
                if (lowerContent.includes('lawn') || lowerContent.includes('suit')) {
                    aiResponse.content = "For summer, lawn suits are perfect! Here are trending picks from Khaadi and Gul Ahmed:";
                    aiResponse.products = mockProducts.slice(0, 2);
                } else {
                    aiResponse.content = "Based on your style profile, here are some items you might love from Pakistani top brands:";
                    aiResponse.products = mockProducts.slice(0, 3);
                }
            }

            const finalMessages = [...newMessages, aiResponse];
            setMessages(finalMessages);
            updateCurrentChat(finalMessages);
            setIsLoading(false);
        }, 1500);
    }, [messages, updateCurrentChat, chatMode]);

    const sendImageMessage = useCallback((imageData) => {
        const userMsg = {
            id: generateId(),
            role: 'user',
            content: "Find me items similar to this:",
            imageUrl: imageData,
            timestamp: new Date()
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setIsLoading(true);

        setTimeout(() => {
            const aiResponse = {
                id: generateId(),
                role: 'ai',
                content: "I've analyzed your image! Here are similar items from Pakistani brands:",
                timestamp: new Date(),
                products: mockProducts.slice(0, 3)
            };

            const finalMessages = [...newMessages, aiResponse];
            setMessages(finalMessages);
            updateCurrentChat(finalMessages);
            setIsLoading(false);
        }, 2000);
    }, [messages, updateCurrentChat]);

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
        currentChatId,
        chatMode,
        setChatMode,
        scanBarcode
    };
};
