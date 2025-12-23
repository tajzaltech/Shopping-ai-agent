import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Sparkles, ShoppingBag, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signup(name, email, password);
            navigate('/onboarding');
        } catch (err) {
            setError('Could not create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        "Personalized style recommendations",
        "AI-powered fit predictions",
        "Voice & image search",
        "Exclusive deals & early access"
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Hero */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-800 via-navy-900 to-black relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-navy-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                        <Sparkles className="w-10 h-10" />
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4 text-center">
                        Your AI Stylist Awaits
                    </h1>
                    <p className="text-lg text-white/70 text-center max-w-md mb-10">
                        Join thousands of fashion-forward shoppers who found their perfect style with StylistAI.
                    </p>

                    <div className="space-y-4 w-full max-w-sm">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-white/80">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-grey-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-navy-900">Stylist<span className="text-navy-600">AI</span></span>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-grey-200 p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-navy-900 mb-2">Create Account</h2>
                            <p className="text-grey-600">Start your personalized style journey</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-grey-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3.5 border border-grey-300 rounded-xl focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500 transition-all text-grey-900 placeholder:text-grey-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-grey-700 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-3.5 border border-grey-300 rounded-xl focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500 transition-all text-grey-900 placeholder:text-grey-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-grey-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a strong password"
                                        className="w-full pl-12 pr-12 py-3.5 border border-grey-300 rounded-xl focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500 transition-all text-grey-900 placeholder:text-grey-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-400 hover:text-grey-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <input type="checkbox" className="w-4 h-4 mt-1 rounded border-grey-300 text-navy-600 focus:ring-navy-500" required />
                                <span className="text-sm text-grey-600">
                                    I agree to the <a href="#" className="text-navy-600 hover:underline">Terms of Service</a> and <a href="#" className="text-navy-600 hover:underline">Privacy Policy</a>
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-navy-800 text-white rounded-xl font-semibold hover:bg-navy-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? 'Creating account...' : 'Get Started'}
                                {!isLoading && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-grey-600">
                                Already have an account?{' '}
                                <Link to="/signin" className="text-navy-600 hover:text-navy-800 font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
