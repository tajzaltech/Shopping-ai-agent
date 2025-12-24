import React from 'react';
import { cn } from '../../lib/utils';
import { Sparkles, User } from 'lucide-react';
import ProductCard from '../product/ProductCard';

const MessageBubble = ({ message, onProductClick }) => {
    const isUser = message.role === 'user';

    return (
        <div className={cn("flex w-full gap-2.5", isUser ? "justify-end" : "justify-start flex-col sm:flex-row")}>
            <div className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}>
                {/* Avatar */}
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm",
                    isUser ? "bg-grey-100" : "bg-gradient-to-br from-navy-700 to-navy-900"
                )}>
                    {isUser ? <User className="w-4 h-4 text-grey-500" /> : <Sparkles className="w-4 h-4 text-white" />}
                </div>

                <div className={cn(
                    "max-w-[85%] sm:max-w-[85%] space-y-2.5",
                    isUser ? "items-end flex flex-col" : "items-start"
                )}>
                    {/* User Image (if attached) */}
                    {message.imageUrl && isUser && (
                        <div className="rounded-xl overflow-hidden shadow-sm border border-grey-200">
                            <img
                                src={message.imageUrl}
                                alt="Uploaded"
                                className="w-40 h-40 object-cover"
                            />
                        </div>
                    )}

                    {/* Message Bubble - Scaled Down */}
                    <div className={cn(
                        "rounded-xl px-4 py-2.5 shadow-sm",
                        isUser
                            ? "bg-navy-800 text-white rounded-br-md"
                            : "bg-white border border-grey-200 text-grey-800 rounded-bl-md"
                    )}>
                        <div className="whitespace-pre-wrap text-[14px] leading-relaxed">
                            {message.content}
                        </div>
                    </div>

                    {/* Product Cards - Scaled Down */}
                    {message.products && message.products.length > 0 && (
                        <div className="w-full">
                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
                                {message.products.map(product => (
                                    <div key={product.id} className="h-full min-h-[340px]">
                                        <ProductCard
                                            product={product}
                                            onCardClick={onProductClick}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* AI Response Chips - Moved INSIDE for better alignment */}
                    {!isUser && message.chips && message.chips.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {message.chips.map((chip, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onProductClick?.({ type: 'chip', content: chip })}
                                    className="text-[10px] font-black tracking-widest uppercase bg-white border border-navy-200 text-navy-800 px-4 py-2.5 rounded-xl hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all shadow-sm active:scale-95 border-b-4 border-b-grey-100 hover:border-b-0 translate-y-[-4px] hover:translate-y-0"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
