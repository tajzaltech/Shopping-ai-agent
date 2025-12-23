import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, ArrowLeft } from 'lucide-react';

const StepLocation = ({ data, onNext, onBack }) => {
    const [city, setCity] = useState(data.city || '');
    const [area, setArea] = useState(data.area || '');
    const [isDetecting, setIsDetecting] = useState(false);

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsDetecting(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                // For demo, we'll set a Pakistani location
                setCity('Karachi');
                setArea('DHA');
                setIsDetecting(false);
            },
            (error) => {
                console.error('Location error:', error);
                setIsDetecting(false);
                alert('Could not detect location. Please enter manually.');
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onNext({ city, area });
        }
    };

    // Pakistani cities
    const popularCities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar'];

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-navy-600" />
                </div>
                <h2 className="text-2xl font-bold text-navy-900 mb-2">Your Location</h2>
                <p className="text-grey-600">
                    Help us find stores and inventory near you
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Auto-detect button */}
                <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetecting}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-navy-50 text-navy-800 rounded-xl font-semibold hover:bg-navy-100 transition-colors border border-navy-200"
                >
                    <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin' : ''}`} />
                    {isDetecting ? 'Detecting...' : 'Use My Current Location'}
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-grey-200"></div>
                    <span className="text-sm text-grey-400">or enter manually</span>
                    <div className="flex-1 h-px bg-grey-200"></div>
                </div>

                {/* City Input */}
                <div>
                    <label className="block text-sm font-medium text-grey-700 mb-2">City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                        className="w-full px-4 py-3.5 border border-grey-300 rounded-xl focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500 transition-all text-grey-900 placeholder:text-grey-400"
                    />
                </div>

                {/* Popular cities */}
                <div>
                    <p className="text-xs font-medium text-grey-500 mb-2">Popular cities:</p>
                    <div className="flex flex-wrap gap-2">
                        {popularCities.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setCity(c)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${city === c
                                        ? 'bg-navy-800 text-white'
                                        : 'bg-grey-100 text-grey-600 hover:bg-grey-200'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Area/Neighborhood (optional) */}
                <div>
                    <label className="block text-sm font-medium text-grey-700 mb-2">
                        Area <span className="text-grey-400">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. DHA, Gulberg, F-7"
                        className="w-full px-4 py-3.5 border border-grey-300 rounded-xl focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500 transition-all text-grey-900 placeholder:text-grey-400"
                    />
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 py-3.5 border border-grey-300 text-grey-700 rounded-xl font-semibold hover:bg-grey-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={!city.trim()}
                        className="flex-1 py-3.5 bg-navy-800 text-white rounded-xl font-semibold hover:bg-navy-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        Complete
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepLocation;
