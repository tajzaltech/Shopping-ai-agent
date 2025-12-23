import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Settings, Package, LogOut, Wallet, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const Profile = () => {
    const { user, logout } = useAuth();

    // Mock onboarding data if not present on user object
    const profileData = user?.profileData || {
        gender: 'Female',
        ageRange: '25-34',
        styles: ['Minimalist', 'Chic'],
        colors: ['Black', 'Navy', 'White'],
        fit: 'Regular'
    };

    return (
        <div className="min-h-screen bg-grey-50 pt-20 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-grey-100 overflow-hidden">
                    {/* Style Khata (Budget Tracker) */}
                    <div className="bg-white rounded-3xl shadow-xl border border-grey-200 p-8 mb-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Wallet className="w-32 h-32 text-navy-900" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-navy-900">Expense Ledger 💰</h2>
                                    <p className="text-grey-600">Monthly fashion budget tracker</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-grey-400 uppercase tracking-widest">Spent this month</span>
                                    <div className="text-2xl font-black text-navy-900">Rs. 18,500</div>
                                </div>
                            </div>

                            {/* Budget Progress */}
                            <div className="mb-10">
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-grey-700">Budget Limit: Rs. 30,000</span>
                                    <span className="text-navy-600">62% Used</span>
                                </div>
                                <div className="h-4 bg-grey-100 rounded-full overflow-hidden border border-grey-200">
                                    <div
                                        className="h-full bg-navy-800 transition-all duration-1000 ease-out flex items-center justify-end px-2"
                                        style={{ width: '62%' }}
                                    >
                                        <div className="w-1 h-2 bg-white/30 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Brand Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-bold text-grey-400 uppercase tracking-widest mb-4">Top Brands</h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Khaadi', amount: 8500, color: 'bg-navy-800' },
                                            { name: 'Sapphire', amount: 6000, color: 'bg-navy-600' },
                                            { name: 'Outfitters', amount: 4000, color: 'bg-navy-400' }
                                        ].map((item) => (
                                            <div key={item.name} className="flex items-center gap-4">
                                                <div className="w-24 text-sm font-bold text-grey-700">{item.name}</div>
                                                <div className="flex-1 h-2 bg-grey-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full", item.color)}
                                                        style={{ width: `${(item.amount / 18500) * 100}%` }}
                                                    />
                                                </div>
                                                <div className="w-20 text-right text-sm font-bold text-navy-900">Rs. {item.amount.toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-navy-800 font-bold mb-2">
                                        <Sparkles className="w-5 h-5" />
                                        AI Savings Tip
                                    </div>
                                    <p className="text-navy-700/80 text-sm leading-relaxed">
                                        You've spent most of your budget on lawn. **Gul Ahmed** just started a 30% flat sale at Lucky One Mall. You could save approx **Rs. 2,500** on your next purchase!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="bg-navy-900 px-8 py-10 text-white flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white/20">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h1 className="text-white/60 text-2xl font-bold">{user?.name || 'User Name'}</h1>
                            <p className="text-white/60">{user?.email || 'user@example.com'}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Style Profile Section */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-navy-600" />
                                Your Style Profile
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-grey-50 rounded-xl border border-grey-100">
                                    <span className="text-xs font-bold text-grey-500 uppercase">Fit Preference</span>
                                    <p className="font-semibold text-navy-900 mt-1">{profileData.fit}</p>
                                </div>
                                <div className="p-4 bg-grey-50 rounded-xl border border-grey-100">
                                    <span className="text-xs font-bold text-grey-500 uppercase">Age Range</span>
                                    <p className="font-semibold text-navy-900 mt-1">{profileData.ageRange}</p>
                                </div>
                                <div className="p-4 bg-grey-50 rounded-xl border border-grey-100">
                                    <span className="text-xs font-bold text-grey-500 uppercase">Favorite Styles</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {profileData.styles?.map(s => (
                                            <span key={s} className="px-2 py-1 bg-white rounded-md text-xs font-medium border border-grey-200">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-grey-50 rounded-xl border border-grey-100">
                                    <span className="text-xs font-bold text-grey-500 uppercase">Preferred Colors</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {profileData.colors?.map(c => (
                                            <span key={c} className="px-2 py-1 bg-white rounded-md text-xs font-medium border border-grey-200">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <button className="p-4 flex items-center gap-4 bg-white border border-grey-200 rounded-xl hover:border-navy-300 hover:shadow-md transition-all text-left">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy-900">Order History</h3>
                                    <p className="text-xs text-grey-500">Track returns and past orders</p>
                                </div>
                            </button>
                            <button className="p-4 flex items-center gap-4 bg-white border border-grey-200 rounded-xl hover:border-navy-300 hover:shadow-md transition-all text-left">
                                <div className="w-10 h-10 bg-grey-100 text-grey-600 rounded-full flex items-center justify-center">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy-900">Settings</h3>
                                    <p className="text-xs text-grey-500">Notifications, password, etc</p>
                                </div>
                            </button>
                        </div>

                        {/* Logout */}
                        <div className="mt-10 pt-6 border-t border-grey-100">
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
