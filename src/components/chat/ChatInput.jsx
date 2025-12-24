import React, { useState } from 'react';
import { Send, Mic, Camera, Paperclip, X, Settings2, Sparkles, Heart, Moon, Briefcase, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const ChatInput = ({ onSend }) => {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConstraints, setShowConstraints] = useState(false);
    const [constraints, setConstraints] = useState({
        occasion: 'Default',
        budget: 'Mid',
        style: 'Modern'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            // Append constraints to the message context if needed
            // For now, just send the input
            onSend(input);
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
        <div className="max-w-4xl mx-auto w-full relative">
            {/* Constraints Popover */}
            {showConstraints && (
                <div className="absolute bottom-full mb-4 left-0 w-80 bg-white rounded-3xl shadow-2xl border border-grey-100 p-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Settings2 className="w-4 h-4 text-navy-900" />
                            <span className="text-xs font-black uppercase tracking-widest text-navy-900">Personalize AI</span>
                        </div>
                        <button onClick={() => setShowConstraints(false)} className="p-2 hover:bg-grey-50 rounded-xl transition-colors">
                            <X className="w-4 h-4 text-grey-400" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-grey-400 uppercase tracking-widest mb-3 block">Occasion</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Wedding', 'Office', 'Casual', 'Party'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setConstraints({ ...constraints, occasion: opt })}
                                        className={cn(
                                            "py-2 px-3 rounded-xl border text-[11px] font-bold transition-all",
                                            constraints.occasion === opt ? "bg-navy-900 border-navy-900 text-white shadow-lg" : "border-grey-100 text-grey-500 hover:border-navy-900"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-grey-400 uppercase tracking-widest mb-3 block">Budget Preference</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Low', 'Mid', 'High'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setConstraints({ ...constraints, budget: opt })}
                                        className={cn(
                                            "py-2 px-3 rounded-xl border text-[11px] font-bold transition-all",
                                            constraints.budget === opt ? "bg-navy-900 border-navy-900 text-white shadow-lg" : "border-grey-100 text-grey-500 hover:border-navy-900"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-grey-400 uppercase tracking-widest mb-3 block">Style Persona</label>
                            <div className="flex flex-wrap gap-2">
                                {['Minimal', 'Rich', 'Fusion'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setConstraints({ ...constraints, style: opt })}
                                        className={cn(
                                            "py-2 px-4 rounded-xl border text-[11px] font-bold transition-all",
                                            constraints.style === opt ? "bg-navy-900 border-navy-900 text-white shadow-lg" : "border-grey-100 text-grey-500 hover:border-navy-900"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-grey-50 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-grey-300">Applied automatically</span>
                        <button
                            onClick={() => setShowConstraints(false)}
                            className="text-[11px] font-black text-navy-900 uppercase tracking-widest hover:underline"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="relative group/input">
                <div className="relative rounded-[2.5rem] border border-grey-200 shadow-sm focus-within:shadow-xl focus-within:border-navy-900/20 transition-all duration-500 flex items-end p-1.5 pr-4 pl-4">
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
                            onClick={() => setIsRecording(!isRecording)}
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
