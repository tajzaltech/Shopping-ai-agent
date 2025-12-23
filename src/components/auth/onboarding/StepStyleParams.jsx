import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Check, ArrowLeft } from 'lucide-react';

const StepStyleParams = ({ initialData, onNext, onBack }) => {
    const [categories, setCategories] = useState(initialData.styleCategories || []);
    const [colors, setColors] = useState(initialData.colors || []);
    const [budget, setBudget] = useState(initialData.budget || '');
    const [error, setError] = useState('');

    const styleOptions = [
        'Casual', 'Formal', 'Streetwear', 'Business Casual',
        'Minimalist', 'Vintage', 'Bohemian', 'Sporty'
    ];

    const colorOptions = [
        { name: 'Neutrals', hex: '#E5E7EB' },
        { name: 'Blacks', hex: '#000000' },
        { name: 'Blues', hex: '#3B82F6' },
        { name: 'Earth Tones', hex: '#D97706' },
        { name: 'Pastels', hex: '#FCA5A5' },
        { name: 'Vibrant', hex: '#EF4444' }
    ];

    const budgetOptions = ['$ (Low)', '$$ (Medium)', '$$$ (High)', '$$$$ (Luxury)'];

    const toggleCategory = (cat) => {
        if (categories.includes(cat)) {
            setCategories(categories.filter(c => c !== cat));
        } else {
            setCategories([...categories, cat]);
        }
    };

    const toggleColor = (color) => {
        if (colors.includes(color)) {
            setColors(colors.filter(c => c !== color));
        } else {
            setColors([...colors, color]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categories.length === 0 || colors.length === 0 || !budget) {
            setError('Please select at least one option for each section');
            return;
        }
        onNext({ styleCategories: categories, colors, budget });
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Define your style</h2>
            <p className="text-grey-600 mb-8">What dictates your fashion choices?</p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Categories */}
                <div>
                    <label className="block text-sm font-medium text-navy-900 mb-3">Styles you like (Pick multiple)</label>
                    <div className="flex flex-wrap gap-3">
                        {styleOptions.map((style) => (
                            <button
                                key={style}
                                type="button"
                                onClick={() => toggleCategory(style)}
                                className={cn(
                                    "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
                                    categories.includes(style)
                                        ? "border-navy-600 bg-navy-600 text-white shadow-sm"
                                        : "border-grey-300 text-grey-700 hover:border-navy-400 bg-white"
                                )}
                            >
                                {style}
                                {categories.includes(style) && <Check className="w-3 h-3" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <label className="block text-sm font-medium text-navy-900 mb-3">Colors you prefer</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {colorOptions.map((color) => (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => toggleColor(color.name)}
                                className={cn(
                                    "p-3 rounded-xl border flex items-center gap-3 transition-all",
                                    colors.includes(color.name)
                                        ? "border-navy-600 bg-navy-50 ring-1 ring-navy-600"
                                        : "border-grey-200 hover:border-navy-300 bg-white"
                                )}
                            >
                                <div
                                    className="w-6 h-6 rounded-full border border-grey-200 shadow-sm"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <span className={cn("text-sm font-medium", colors.includes(color.name) ? "text-navy-900" : "text-grey-700")}>
                                    {color.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Budget */}
                <div>
                    <label className="block text-sm font-medium text-navy-900 mb-3">Budget Range</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {budgetOptions.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setBudget(option)}
                                className={cn(
                                    "py-3 px-2 rounded-lg border text-sm font-medium transition-all",
                                    budget === option
                                        ? "border-navy-600 bg-navy-600 text-white shadow-md"
                                        : "border-grey-300 text-grey-700 hover:border-navy-400 hover:bg-grey-50"
                                )}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
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
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepStyleParams;
