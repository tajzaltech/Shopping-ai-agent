import React from 'react';
import { X, Ruler, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const FitAnalysisModal = ({ isOpen, onClose, product }) => {
    const { user } = useAuth();
    if (!isOpen) return null;

    // Mock analysis logic based on product + user mock
    const fitStatus = product.fitConfidence > 85 ? 'Excellent' : product.fitConfidence > 60 ? 'Good' : 'Risky';

    const getStatusColor = (status) => {
        switch (status) {
            case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
            case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'Risky': return 'text-amber-600 bg-amber-50 border-amber-200';
            default: return 'text-grey-600 bg-grey-50 border-grey-200';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl animate-scale-up overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-grey-400 hover:text-navy-900 rounded-full hover:bg-grey-100 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-navy-100 rounded-xl flex items-center justify-center text-navy-600">
                            <Ruler className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-navy-900">Fit Analysis</h2>
                            <p className="text-sm text-grey-500">Powered by AI & User Reviews</p>
                        </div>
                    </div>

                    {/* Main Status */}
                    <div className={cn("p-4 rounded-xl border flex items-start gap-3 mb-6", getStatusColor(fitStatus))}>
                        {fitStatus === 'Excellent' ? <CheckCircle className="w-6 h-6 shrink-0" /> :
                            fitStatus === 'Risky' ? <AlertTriangle className="w-6 h-6 shrink-0" /> :
                                <HelpCircle className="w-6 h-6 shrink-0" />}
                        <div>
                            <h3 className="font-bold text-lg mb-1">{fitStatus} Match ({product.fitConfidence}%)</h3>
                            <p className="text-sm opacity-90">
                                Based on your size profile (Regular Fit) and brand sizing for {product.brand}.
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mb-8">
                        <div>
                            <h4 className="font-semibold text-navy-900 mb-2">Why it fits you</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm text-grey-600">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Matches your preference for <strong>Relaxed</strong> vibe.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-grey-600">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>{product.brand} runs true to size for 85% of users.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-grey-600">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Length is perfect for your height range.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 bg-grey-50 rounded-xl">
                            <h4 className="font-semibold text-navy-900 mb-1">Recommendation</h4>
                            <p className="text-grey-600 text-sm">
                                We recommend size <strong>Medium</strong> for the best fit.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <button
                        onClick={onClose}
                        className="w-full btn-primary py-3"
                    >
                        Got it
                    </button>
                    <p className="text-center text-xs text-grey-400 mt-4">
                        AI fit predictions are estimates based on available data.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FitAnalysisModal;
