import React, { useState } from 'react';
import { User, Users } from 'lucide-react';
import { cn } from '../../../lib/utils';

const StepBasicInfo = ({ initialData, onNext }) => {
    const [gender, setGender] = useState(initialData.gender || '');
    const [ageRange, setAgeRange] = useState(initialData.ageRange || '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gender || !ageRange) {
            setError('Please select both gender and age range');
            return;
        }
        onNext({ gender, ageRange });
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Let's get to know you</h2>
            <p className="text-grey-600 mb-8">We'll use this to find clothes that fit your lifestyle.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Gender Selection */}
                <div>
                    <label className="block text-sm font-medium text-navy-900 mb-3">Which department do you shop in?</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setGender('men')}
                            className={cn(
                                "p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all",
                                gender === 'men'
                                    ? "border-navy-600 bg-navy-50 text-navy-900 ring-2 ring-navy-600 ring-offset-2"
                                    : "border-grey-200 hover:border-navy-200 hover:bg-grey-50 text-grey-600"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center",
                                gender === 'men' ? "bg-navy-200" : "bg-grey-100"
                            )}>
                                <User className="w-6 h-6" />
                            </div>
                            <span className="font-semibold">Men</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setGender('women')}
                            className={cn(
                                "p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all",
                                gender === 'women'
                                    ? "border-navy-600 bg-navy-50 text-navy-900 ring-2 ring-navy-600 ring-offset-2"
                                    : "border-grey-200 hover:border-navy-200 hover:bg-grey-50 text-grey-600"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center",
                                gender === 'women' ? "bg-navy-200" : "bg-grey-100"
                            )}>
                                <User className="w-6 h-6" />
                            </div>
                            <span className="font-semibold">Women</span>
                        </button>
                    </div>
                </div>

                {/* Age Range */}
                <div>
                    <label className="block text-sm font-medium text-navy-900 mb-3">What's your age range?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['18-24', '25-34', '35-44', '45+'].map((range) => (
                            <button
                                key={range}
                                type="button"
                                onClick={() => setAgeRange(range)}
                                className={cn(
                                    "py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                                    ageRange === range
                                        ? "border-navy-600 bg-navy-600 text-white shadow-md"
                                        : "border-grey-300 text-grey-700 hover:border-navy-400 hover:bg-grey-50"
                                )}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="pt-4">
                    <button type="submit" className="w-full btn-primary py-4 text-lg">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepBasicInfo;
