import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(59);
    const navigate = useNavigate();
    const { verifyEmail, user } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullCode = code.join('');
        if (fullCode.length < 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await verifyEmail(fullCode);
            navigate('/chat');
        } catch (err) {
            setError('Invalid verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-grey-50 flex items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="w-full max-w-md bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-grey-100 p-6 sm:p-10 text-center animate-slide-up">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-navy-50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8">
                    <Mail className="w-8 h-8 md:w-10 md:h-10 text-navy-900" />
                </div>

                <div className="space-y-2 md:space-y-3 mb-8 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-black text-navy-900 tracking-tight">Check your email</h1>
                    <p className="text-sm md:text-base text-grey-500 font-medium leading-relaxed">
                        We've sent a 6-digit verification code to <br />
                        <span className="text-navy-900 font-bold">{user?.email || 'your email'}</span>
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="flex justify-between gap-1.5 md:gap-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-10 h-14 md:w-12 md:h-16 text-center text-xl md:text-2xl font-black bg-grey-50 border border-grey-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-navy-500/10 focus:border-navy-500 transition-all text-navy-900 placeholder:text-grey-300"
                                required
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-navy-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-navy-100 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                        {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-grey-50 space-y-4">
                    <p className="text-sm text-grey-500 font-medium">
                        Didn't receive the code?
                    </p>
                    <button
                        onClick={() => setTimer(59)}
                        disabled={timer > 0}
                        className="flex items-center gap-2 mx-auto text-navy-600 hover:text-navy-900 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`w-4 h-4 ${timer > 0 ? 'animate-spin' : ''}`} />
                        {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
