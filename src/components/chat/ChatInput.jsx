import React, { useState } from 'react';
import { Send, Mic, Camera, Paperclip, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const ChatInput = ({ onSend }) => {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            // console.log('Sent:', input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full relative">
            <form onSubmit={handleSubmit} className="relative bg-white rounded-2xl shadow-sm border border-grey-300 focus-within:ring-2 focus-within:ring-navy-600/20 focus-within:border-navy-600 transition-all">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask for an outfit, or describe what you're looking for..."
                    className="w-full py-4 pl-4 pr-32 bg-transparent border-none focus:ring-0 resize-none max-h-40 min-h-[60px] text-grey-900 placeholder:text-grey-500"
                    rows={1}
                    style={{ height: 'auto', minHeight: '60px' }}
                // Note: In real app, use auto-resize logic
                />

                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    {/* Multi-modal buttons */}
                    <button
                        type="button"
                        className="p-2 text-grey-500 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
                        title="Upload Image"
                    >
                        <Camera className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            isRecording ? "text-red-500 bg-red-50 animate-pulse" : "text-grey-500 hover:text-navy-600 hover:bg-navy-50"
                        )}
                        onClick={() => setIsRecording(!isRecording)}
                        title="Voice Input"
                    >
                        <Mic className="w-5 h-5" />
                    </button>

                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 disabled:opacity-50 disabled:bg-grey-300 disabled:cursor-not-allowed transition-all ml-1 shadow-sm"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>

            <p className="text-center text-xs text-grey-400 mt-2">
                AI can make mistakes. Check important info.
            </p>
        </div>
    );
};

export default ChatInput;
