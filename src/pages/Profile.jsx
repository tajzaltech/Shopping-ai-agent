import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, LogOut, ShieldCheck, UserCircle, ChevronRight } from 'lucide-react';

const Profile = () => {
    const { user, logout, updateProfile } = useAuth();
    const [name, setName] = React.useState(user?.name || '');
    const [email, setEmail] = React.useState(user?.email || '');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [feedback, setFeedback] = React.useState({ message: '', type: '' });

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        try {
            updateProfile({ name, email });
            setFeedback({ message: 'Identity updated successfully', type: 'success' });
            setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
        } catch (err) {
            setFeedback({ message: 'Failed to update identity', type: 'error' });
        }
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setFeedback({ message: 'Passwords do not match', type: 'error' });
            return;
        }
        // Mock password change
        setFeedback({ message: 'Security vault secured', type: 'success' });
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] relative overflow-hidden font-sans selection:bg-navy-900/10">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-navy-50/40 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[70%] h-[70%] bg-blue-50/20 blur-[100px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-50/20 blur-[80px] rounded-full animate-bounce [animation-duration:15s]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto pt-32 pb-24 px-6">
                <div className="space-y-16">

                    {/* Simplified Cinematic Header */}
                    <div className="text-center space-y-8 animate-fade-in">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-5xl font-extralight text-navy-900 border border-grey-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] mx-auto relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-navy-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                {user?.name?.charAt(0) || 'S'}
                            </div>
                            {user?.isVerified && (
                                <div className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-sm border border-grey-100">
                                    <ShieldCheck className="w-5 h-5 text-navy-600 fill-navy-50" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-light tracking-tight text-navy-900 uppercase">
                                {user?.name || 'Stylist'}
                            </h1>
                            <p className="text-grey-400 font-medium text-xs tracking-[0.3em] uppercase">
                                Account Identity
                            </p>
                        </div>
                    </div>

                    {/* Simplified Settings Forms */}
                    <div className="space-y-12 animate-slide-up [animation-delay:0.1s]">

                        {/* Status/Feedback Header */}
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-grey-100 flex items-center justify-center shadow-sm">
                                    <Settings className="w-6 h-6 text-navy-900" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-navy-900 uppercase tracking-[0.25em]">Credentials</h2>
                                    <p className="text-[9px] font-bold text-navy-400 uppercase tracking-widest mt-0.5 opacity-60 text-left">Manage your identity</p>
                                </div>
                            </div>

                            {feedback.message && (
                                <div className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] animate-scale-in border shadow-lg backdrop-blur-md ${feedback.type === 'success' ? "bg-emerald-50/80 text-emerald-600 border-emerald-100 shadow-emerald-500/10" : "bg-red-50/80 text-red-600 border-red-100 shadow-red-500/10"
                                    }`}>
                                    {feedback.message}
                                </div>
                            )}
                        </div>

                        {/* Identity Section */}
                        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] p-12 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)]">
                            <form onSubmit={handleUpdateProfile} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3 px-2">
                                        <label className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.25em] ml-1">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-7 py-5 bg-grey-50/50 border border-navy-900/5 rounded-2xl text-[13px] font-semibold text-navy-900 placeholder:text-grey-300 focus:bg-white focus:border-navy-900/10 focus:ring-8 focus:ring-navy-900/[0.02] transition-all duration-500 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-3 px-2">
                                        <label className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.25em] ml-1">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-7 py-5 bg-grey-50/50 border border-navy-900/5 rounded-2xl text-[13px] font-semibold text-navy-900 placeholder:text-grey-300 focus:bg-white focus:border-navy-900/10 focus:ring-8 focus:ring-navy-900/[0.02] transition-all duration-500 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-6 bg-navy-900 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all duration-500 active:scale-[0.99] relative overflow-hidden group/btn">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                    Update Identity
                                </button>
                            </form>
                        </div>

                        {/* Security Section */}
                        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] p-12 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)] pb-12">
                            <form onSubmit={handleChangePassword} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3 px-2">
                                        <label className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.25em] ml-1">New Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-7 py-5 bg-grey-50/50 border border-navy-900/5 rounded-2xl text-[13px] font-semibold text-navy-900 placeholder:text-grey-300 focus:bg-white focus:border-navy-900/10 focus:ring-8 focus:ring-navy-900/[0.02] transition-all duration-500 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="space-y-3 px-2">
                                        <label className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.25em] ml-1">Confirm Identity</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-7 py-5 bg-grey-50/50 border border-navy-900/5 rounded-2xl text-[13px] font-semibold text-navy-900 placeholder:text-grey-300 focus:bg-white focus:border-navy-900/10 focus:ring-8 focus:ring-navy-900/[0.02] transition-all duration-500 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-5 bg-white border-2 border-navy-900 text-navy-900 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-navy-900 hover:text-white transition-all duration-500 shadow-sm active:scale-[0.99]">
                                    Secure Password
                                </button>
                            </form>
                        </div>

                        {/* Logout - Bottom Center */}
                        <div className="pt-6">
                            <button
                                onClick={logout}
                                className="w-full py-6 bg-white border border-red-50 text-red-500 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-50/50 transition-all active:scale-[0.99] flex items-center justify-center gap-3 group"
                            >
                                <LogOut className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-28 text-center animate-fade-in [animation-delay:0.5s]">
                    <p className="text-[10px] font-black text-navy-900/10 uppercase tracking-[0.5em]">
                        Privacy Systems — StylistAI
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
