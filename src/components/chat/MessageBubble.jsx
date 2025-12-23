import React from 'react';
import { cn } from '../../lib/utils';
import { Sparkles, User } from 'lucide-react';
import ProductCard from '../product/ProductCard';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={cn("flex w-full gap-3", isUser ? "justify-end" : "justify-start")}>
            {/* AI Avatar */}
            {!isUser && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
            )}

            <div className={cn(
                "max-w-[85%] sm:max-w-[75%] space-y-3",
                isUser ? "items-end flex flex-col" : "items-start"
            )}>
                {/* User Image (if attached) */}
                {message.imageUrl && isUser && (
                    <div className="rounded-2xl overflow-hidden shadow-md border border-grey-200">
                        <img
                            src={message.imageUrl}
                            alt="Uploaded"
                            className="w-48 h-48 object-cover"
                        />
                    </div>
                )}

                {/* Message Bubble */}
                <div className={cn(
                    "rounded-2xl px-5 py-3.5 shadow-sm",
                    isUser
                        ? "bg-navy-800 text-white rounded-br-md"
                        : "bg-white border border-grey-200 text-grey-800 rounded-bl-md"
                )}>
                    <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                        {message.content}
                    </div>
                </div>

                {/* Product Cards */}
                {message.products && message.products.length > 0 && (
                    <div className="w-full">
                        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 max-w-2xl">
                            {message.products.map(product => (
                                <div key={product.id} className="h-[380px]">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="w-10 h-10 rounded-xl bg-grey-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <User className="w-5 h-5 text-grey-600" />
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
