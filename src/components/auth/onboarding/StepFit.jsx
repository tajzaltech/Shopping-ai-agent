import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Shirt, Check } from 'lucide-react';

const StepFit = ({ initialData, onNext, onBack }) => {
    const [fit, setFit] = useState(initialData.fitPreference || '');
    const [error, setError] = useState('');

    const fitOptions = [
        { id: 'snug', label: 'Snug / Slim', desc: 'Body-hugging fit' },
        { id: 'regular', label: 'Regular', desc: 'Classic comfortable fit' },
        { id: 'relaxed', label: 'Relaxed', desc: 'Loose but tailored' },
        { id: 'oversized', label: 'Oversized', desc: 'Baggy and streetwear style' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fit) {
            setError('Please select a fit preference');
            return;
        }
        onNext({ fitPreference: fit });
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">How do you like your clothes to fit?</h2>
            <p className="text-grey-600 mb-8">This helps us recommend the right size.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fitOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setFit(option.id)}
                            className={cn(
                                "p-6 border-2 rounded-xl text-left transition-all relative overflow-hidden group",
                                fit === option.id
                                    ? "border-navy-600 bg-navy-50 ring-2 ring-navy-600 ring-offset-2"
                                    : "border-grey-200 hover:border-navy-300 bg-white"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                    fit === option.id ? "bg-navy-200 text-navy-800" : "bg-grey-100 text-grey-500 group-hover:bg-grey-200"
                                )}>
                                    <Shirt className="w-5 h-5" />
                                </div>
                                {fit === option.id && <Check className="w-5 h-5 text-navy-600" />}
                            </div>

                            <h3 className={cn("font-bold text-lg mb-1", fit === option.id ? "text-navy-900" : "text-grey-900")}>
                                {option.label}
                            </h3>
                            <p className={cn("text-sm", fit === option.id ? "text-navy-700" : "text-grey-500")}>
                                {option.desc}
                            </p>
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-6 py-4 border border-grey-300 rounded-lg text-grey-700 font-medium hover:bg-grey-50"
                    >
                        Back
                    </button>
                    <button type="submit" className="flex-1 btn-primary py-4 text-lg">
                        Finish Setup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepFit;
