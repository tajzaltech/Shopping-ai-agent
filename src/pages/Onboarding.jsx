import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag } from 'lucide-react';
import StepBasicInfo from '../components/auth/onboarding/StepBasicInfo';
import StepStyleParams from '../components/auth/onboarding/StepStyleParams';
import StepBrands from '../components/auth/onboarding/StepBrands';
import StepFit from '../components/auth/onboarding/StepFit';
import StepLocation from '../components/auth/onboarding/StepLocation';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: '',
        ageRange: '',
        styleCategories: [],
        colors: [],
        budget: '',
        brands: [],
        fitPreference: '',
        city: '',
        area: ''
    });
    const { updateProfile } = useAuth();
    const navigate = useNavigate();

    const totalSteps = 5;
    const stepLabels = ['Info', 'Style', 'Brands', 'Fit', 'Location'];

    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleComplete({ ...formData, ...data });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = async (finalData) => {
        // Save to profile and redirect to chat
        updateProfile({ ...finalData, onboardingCompleted: true });
        navigate('/chat');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-grey-50 to-white flex flex-col">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-grey-200 px-4 py-4 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-navy-800 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-navy-900 hidden sm:inline">Stylist<span className="text-navy-600">AI</span></span>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {stepLabels.map((label, index) => (
                            <div key={label} className="flex items-center">
                                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all ${index + 1 < step
                                    ? 'bg-green-500 text-white'
                                    : index + 1 === step
                                        ? 'bg-navy-900 text-white'
                                        : 'bg-grey-200 text-grey-500'
                                    }`}>
                                    {index + 1 < step ? '✓' : index + 1}
                                </div>
                                {index < stepLabels.length - 1 && (
                                    <div className={`w-3 sm:w-6 h-0.5 mx-0.5 md:mx-1 transition-all ${index + 1 < step ? 'bg-green-500' : 'bg-grey-200'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
                <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-grey-200 overflow-hidden animate-fade-in">
                    <div className="p-6 sm:p-10">
                        {step === 1 && (
                            <StepBasicInfo
                                initialData={formData}
                                onNext={handleNext}
                            />
                        )}
                        {step === 2 && (
                            <StepStyleParams
                                initialData={formData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {step === 3 && (
                            <StepBrands
                                initialData={formData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {step === 4 && (
                            <StepFit
                                initialData={formData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {step === 5 && (
                            <StepLocation
                                data={formData}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Onboarding;
