import React, { useState } from 'react';
import { Send, Mic, Camera, Paperclip, X, Settings2, Sparkles, Heart, Moon, Briefcase, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const ChatInput = ({ onSend }) => {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConstraints, setShowConstraints] = useState(false);
    const [isPersonalized, setIsPersonalized] = useState(true);
    const [constraints, setConstraints] = useState({
        occasion: 'Any',
        budget: 'Any',
        style: 'Any'
    });
    const fileInputRef = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            // Append constraints to the message context if enabled
            const messageData = isPersonalized ? { text: input, constraints } : { text: input };
            onSend(messageData);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target?.result;
                if (typeof imageData === 'string') {
                    onSend({ type: 'image', content: imageData });
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset input
        e.target.value = '';
    };

    const handleVoiceClick = () => {
        if (!isRecording) {
            setIsRecording(true);
            // Simulate voice recording for 3 seconds
            setTimeout(() => {
                setIsRecording(false);
                onSend({ type: 'voice', content: "Voice message received!" });
            }, 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto w-full relative">
            {/* Constraints Popover */}
            {showConstraints && (
                <div className="absolute bottom-full mb-4 left-0 w-[calc(100vw-32px)] sm:w-72 bg-white rounded-3xl shadow-2xl border border-grey-100 p-4 z-50 animate-in slide-in-from-bottom-4 duration-300 mx-auto sm:mx-0">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-grey-50">
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "p-1.5 rounded-lg transition-colors",
                                isPersonalized ? "bg-navy-900/5 text-navy-900" : "bg-grey-50 text-grey-400"
                            )}>
                                <Settings2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-navy-900">Personalize AI</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsPersonalized(!isPersonalized)}
                                className={cn(
                                    "w-8 h-4.5 rounded-full relative transition-colors duration-300",
                                    isPersonalized ? "bg-navy-900" : "bg-grey-200"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-2.5 h-2.5 rounded-full bg-white transition-all duration-300",
                                    isPersonalized ? "left-4.5" : "left-1"
                                )} />
                            </button>
                            <button onClick={() => setShowConstraints(false)} className="p-1 hover:bg-grey-50 rounded-lg transition-colors">
                                <X className="w-4 h-4 text-grey-400" />
                            </button>
                        </div>
                    </div>

                    <div className={cn("space-y-4 transition-opacity duration-300", !isPersonalized && "opacity-40 pointer-events-none")}>
                        <div>
                            <label className="text-[9px] font-black text-grey-400 uppercase tracking-widest mb-2 block">Occasion</label>
                            <div className="grid grid-cols-3 gap-1.5">
                                {['Any', 'Wedding', 'Office', 'Casual', 'Party'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setConstraints({ ...constraints, occasion: opt })}
                                        className={cn(
                                            "py-1.5 px-2 rounded-lg border text-[10px] font-bold transition-all",
                                            constraints.occasion === opt ? "bg-navy-900 border-navy-900 text-white shadow-md" : "border-grey-100 text-grey-500 hover:border-navy-900/30"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-grey-400 uppercase tracking-widest mb-2 block">Budget Preference</label>
                            <div className="grid grid-cols-2 gap-1.5">
                                {['Any', 'Low', 'Mid', 'High'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setConstraints({ ...constraints, budget: opt })}
                                        className={cn(
                                            "py-1.5 px-2 rounded-lg border text-[10px] font-bold transition-all",
                                            constraints.budget === opt ? "bg-navy-900 border-navy-900 text-white shadow-md" : "border-grey-100 text-grey-500 hover:border-navy-900/30"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-grey-400 uppercase tracking-widest mb-2 block">Style Persona</label>
                            <div className="grid grid-cols-2 gap-1.5">
                                {['Any', 'Minimal', 'Rich', 'Fusion'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setConstraints({ ...constraints, style: opt })}
                                        className={cn(
                                            "py-1.5 px-2 rounded-lg border text-[10px] font-bold transition-all",
                                            constraints.style === opt ? "bg-navy-900 border-navy-900 text-white shadow-md" : "border-grey-100 text-grey-500 hover:border-navy-900/30"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-grey-50 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-grey-300">
                            {isPersonalized ? "Settings active" : "Personalization off"}
                        </span>
                        <button
                            onClick={() => setShowConstraints(false)}
                            className="text-[10px] font-black text-navy-900 uppercase tracking-widest hover:underline"
                        >
                            Save & Close
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="relative group/input">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <div className="relative rounded-3xl md:rounded-[2.5rem] border border-grey-200 shadow-sm focus-within:shadow-xl focus-within:border-navy-900/20 transition-all duration-500 flex items-end p-1.5 pr-2 sm:pr-4 pl-2 sm:pl-4">
                    {/* Constraints Button */}
                    <button
                        type="button"
                        onClick={() => setShowConstraints(!showConstraints)}
                        className={cn(
                            "mb-1 p-2.5 rounded-2xl transition-all flex items-center gap-2",
                            showConstraints ? "bg-navy-900 text-white shadow-xl rotate-90" : "text-grey-400 hover:bg-grey-50 hover:text-navy-900"
                        )}
                    >
                        <Settings2 className="w-5 h-5" />
                    </button>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your style identity..."
                        className="flex-1 py-3 px-4 bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-40 min-h-[48px] text-grey-900 placeholder:text-grey-400 font-medium"
                        rows={1}
                        style={{ height: 'auto', minHeight: '48px' }}
                    />

                    <div className="mb-1 flex items-center gap-1.5 pl-2 border-l border-grey-50">
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="p-2.5 text-grey-400 hover:text-navy-900 hover:bg-grey-50 rounded-2xl transition-all"
                            title="Upload Image"
                        >
                            <Camera className="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            className={cn(
                                "p-2.5 rounded-2xl transition-all",
                                isRecording ? "text-red-500 bg-red-50 animate-pulse" : "text-grey-400 hover:text-navy-900 hover:bg-grey-50"
                            )}
                            onClick={handleVoiceClick}
                            title="Voice Input"
                        >
                            <Mic className="w-5 h-5" />
                        </button>

                        <button
                            type="submit"
                            className="p-3 bg-navy-900 text-white rounded-2xl hover:bg-black transition-all shadow-lg shadow-navy-100 flex items-center justify-center active:scale-95 translate-x-1"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default ChatInput;
