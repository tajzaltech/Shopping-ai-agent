import React, { useState, useEffect } from 'react';
import { X, Camera, Upload, Sparkles, Check, RefreshCcw, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const VirtualTryOnModal = ({ isOpen, onClose, product }) => {
    const [step, setStep] = useState('upload'); // upload, processing, result
    const [userPhoto, setUserPhoto] = useState(null);
    const [processingProgress, setProcessingProgress] = useState(0);

    useEffect(() => {
        if (step === 'processing') {
            const interval = setInterval(() => {
                setProcessingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStep('result');
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    if (!isOpen) return null;

    const handleUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserPhoto(reader.result);
                setStep('processing');
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-md" onClick={onClose}></div>

            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-full max-h-[85vh]">
                <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-grey-100/50 hover:bg-grey-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-navy-900" />
                </button>

                {/* Left Side: Product Details */}
                <div className="w-full md:w-1/3 bg-grey-50 p-8 border-r border-grey-100 flex flex-col">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-lg">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="text-xs font-black text-navy-500 uppercase tracking-widest block mb-2">{product.brand}</span>
                        <h3 className="text-xl font-bold text-navy-900 mb-2">{product.name}</h3>
                        <div className="text-lg font-black text-navy-800">Rs. {product.price?.toLocaleString()}</div>
                    </div>
                </div>

                {/* Right Side: Try-On Action */}
                <div className="flex-1 p-8 flex flex-col relative overflow-hidden">
                    {step === 'upload' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-navy-50 rounded-3xl flex items-center justify-center mb-6 border-2 border-dashed border-navy-200">
                                <User className="w-10 h-10 text-navy-400" />
                            </div>
                            <h2 className="text-3xl font-black text-navy-900 mb-3 tracking-tight">AI Virtual Mirror</h2>
                            <p className="text-grey-600 mb-8 max-w-sm">Upload a full-body photo to see how this ensemble fits your profile.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-grey-200 rounded-3xl hover:border-navy-400 hover:bg-navy-50 transition-all cursor-pointer group">
                                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                    <Upload className="w-8 h-8 text-grey-400 group-hover:text-navy-600 mb-2" />
                                    <span className="text-sm font-bold text-grey-600 group-hover:text-navy-900">Upload Photo</span>
                                </label>
                                <button className="flex flex-col items-center justify-center p-6 bg-grey-50 rounded-3xl hover:bg-grey-100 border-2 border-transparent transition-all">
                                    <Camera className="w-8 h-8 text-grey-400 mb-2" />
                                    <span className="text-sm font-bold text-grey-600">Take Photo</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="relative w-48 h-48 bg-grey-100 rounded-3xl overflow-hidden mb-8 border-2 border-navy-100 shadow-inner">
                                <img src={userPhoto} alt="Original" className="w-full h-full object-cover opacity-40 blur-sm" />
                                <div className="absolute inset-x-0 top-0 bg-navy-500/20 animate-scan height-1"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-12 h-12 text-navy-600 animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-navy-900 mb-2">Analyzing Silhouette...</h2>
                            <div className="w-full max-w-xs h-2 bg-grey-100 rounded-full overflow-hidden mb-3 border border-grey-200">
                                <div
                                    className="h-full bg-navy-800 transition-all duration-300 ease-out"
                                    style={{ width: `${processingProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm font-bold text-grey-400 uppercase tracking-widest">{processingProgress}% Complete</p>
                        </div>
                    )}

                    {step === 'result' && (
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-navy-900 tracking-tight">AI Preview Generated ✨</h2>
                                <button
                                    onClick={() => setStep('upload')}
                                    className="flex items-center gap-2 text-sm font-bold text-navy-600 hover:text-navy-900 transition-colors"
                                >
                                    <RefreshCcw className="w-4 h-4" /> Try different photo
                                </button>
                            </div>

                            <div className="flex-1 relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-grey-900">
                                <img
                                    src={userPhoto}
                                    alt="Result"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                {/* Mock Overlay: Dressing the image */}
                                <div className="absolute inset-0 bg-navy-900/10 pointer-events-none"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[120%] h-[120%] bg-gradient-to-t from-navy-900/40 via-transparent to-transparent"></div>
                                </div>
                                <img
                                    src={product.imageUrl}
                                    alt="Product Overlay"
                                    className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-90 scale-110 translate-y-4 filter drop-shadow(0 20px 30px rgba(0,0,0,0.5))"
                                />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-lg font-bold text-navy-900 tracking-tight">Perfect Fit Score: 98%</span>
                                        </div>
                                        <p className="text-sm text-grey-600 font-medium">AI analysis confirms the **{product.brand}** tailoring will match your silhouette perfectly. The fabric drape is optimized for your height.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-8 py-5 bg-navy-800 text-white rounded-2xl font-black text-xl shadow-xl shadow-navy-200 hover:bg-navy-900 transition-all active:scale-95 flex items-center justify-center gap-3">
                                <ShoppingBag className="w-6 h-6" />
                                Add to Style List
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOnModal;
