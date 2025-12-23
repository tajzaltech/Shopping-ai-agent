import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Check } from 'lucide-react';

const StepBrands = ({ initialData, onNext, onBack }) => {
    const [selectedBrands, setSelectedBrands] = useState(initialData.brands || []);

    // Pakistani and popular brands available in Pakistan
    const popularBrands = [
        'Khaadi', 'Gul Ahmed', 'Alkaram', 'Junaid Jamshed', 'Sapphire',
        'Bonanza', 'Outfitters', 'Breakout', 'Levi\'s', 'Zara',
        'Nike', 'Adidas', 'Ethnic', 'Ideas', 'Sana Safinaz',
        'Edenrobe', 'Cambridge', 'Diners', 'Charcoal', 'Cougar'
    ];

    const toggleBrand = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ brands: selectedBrands });
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Favorite Brands</h2>
            <p className="text-grey-600 mb-8">Select brands you love or wear often.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {popularBrands.map((brand) => (
                        <button
                            key={brand}
                            type="button"
                            onClick={() => toggleBrand(brand)}
                            className={cn(
                                "py-3 px-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between",
                                selectedBrands.includes(brand)
                                    ? "border-navy-600 bg-navy-50 text-navy-900 ring-1 ring-navy-600"
                                    : "border-grey-200 hover:border-navy-300 bg-white text-grey-700"
                            )}
                        >
                            {brand}
                            {selectedBrands.includes(brand) && <Check className="w-4 h-4 text-navy-600" />}
                        </button>
                    ))}
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-6 py-4 border border-grey-300 rounded-lg text-grey-700 font-medium hover:bg-grey-50"
                    >
                        Back
                    </button>
                    <button type="submit" className="flex-1 btn-primary py-4 text-lg">
                        {selectedBrands.length > 0 ? `Continue (${selectedBrands.length})` : 'Skip / Continue'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepBrands;
