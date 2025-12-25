import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, ShoppingBag, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/chat');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            await loginWithGoogle();
            navigate('/chat');
        } catch (err) {
            setError('Google authentication failed.');
        }
    };

    return (
        <div className="min-h-screen bg-grey-50 flex items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="w-full max-w-xl">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6 md:mb-10 text-center space-y-3 md:space-y-4">
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-navy-900 rounded-2xl md:rounded-[1.25rem] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                            <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <span className="text-2xl md:text-3xl font-black text-navy-900 tracking-tighter">Stylist<span className="text-navy-600">AI</span></span>
                    </Link>
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-black text-navy-900 tracking-tight leading-none">Welcome Back</h2>
                        <p className="text-sm md:text-base text-grey-500 font-medium">Continue your style journey with StylistAI</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-grey-100 p-6 sm:p-10 md:p-12">
                    {/* Google Auth Button */}
                    <button
                        onClick={handleGoogleAuth}
                        className="w-full flex items-center justify-center gap-3 py-4.5 px-4 bg-white border border-grey-200 rounded-2xl font-bold text-navy-900 hover:bg-grey-50 hover:border-grey-300 transition-all active:scale-[0.98] mb-8"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-grey-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-grey-400 font-bold uppercase tracking-widest text-[10px]">or sign in with email</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-navy-900 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400 group-focus-within:text-navy-900 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full pl-12 pr-4 py-4 bg-grey-50 border border-grey-200 rounded-2xl focus:ring-4 focus:ring-navy-500/10 focus:border-navy-500 transition-all text-navy-900 placeholder:text-grey-400 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black text-navy-900 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-[10px] font-black text-navy-400 uppercase tracking-widest hover:text-navy-900 transition-colors">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400 group-focus-within:text-navy-900 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-grey-50 border border-grey-200 rounded-2xl focus:ring-4 focus:ring-navy-500/10 focus:border-navy-500 transition-all text-navy-900 placeholder:text-grey-400 font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-400 hover:text-navy-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-1">
                            <input type="checkbox" className="w-5 h-5 rounded-lg border-grey-300 text-navy-900 focus:ring-navy-500 cursor-pointer" />
                            <span className="text-sm text-grey-500 font-medium tracking-tight">Keep me signed in for 30 days</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-navy-900 text-white rounded-[1.25rem] font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-navy-100 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            {!isLoading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-grey-50 text-center">
                        <p className="text-grey-500 font-medium">
                            New here?{' '}
                            <Link to="/signup" className="text-navy-900 font-black hover:text-black transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
