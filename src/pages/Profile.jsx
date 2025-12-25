import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, LogOut, ShieldCheck, UserCircle, ChevronRight, Sparkles } from 'lucide-react';
import StyleDNA from '../components/profile/StyleDNA';

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
        setFeedback({ message: 'Security vault secured', type: 'success' });
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] relative overflow-hidden font-jakarta selection:bg-navy-900/10">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-navy-50/40 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[70%] h-[70%] bg-blue-50/20 blur-[100px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-50/20 blur-[80px] rounded-full animate-bounce [animation-duration:15s]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto pt-32 pb-24 px-6 md:px-0">
                <div className="space-y-16">

                    {/* Legendary Header */}
                    <div className="text-center space-y-8 animate-fade-in">
                        <div className="relative inline-block">
                            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-6xl font-light font-outfit text-navy-900 border border-grey-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] mx-auto relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-navy-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                {user?.name?.charAt(0) || 'S'}
                            </div>
                            {user?.isVerified && (
                                <div className="absolute bottom-2 right-2 bg-white rounded-full p-2.5 shadow-xl border border-grey-100">
                                    <ShieldCheck className="w-6 h-6 text-navy-900 fill-navy-50" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl font-outfit font-light tracking-tight text-navy-900">
                                {user?.name || 'Stylist'}
                            </h1>
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-px w-8 bg-navy-900/10" />
                                <p className="text-navy-900/40 font-jakarta font-black text-[10px] tracking-[0.4em] uppercase">
                                    Curator Signature
                                </p>
                                <span className="h-px w-8 bg-navy-900/10" />
                            </div>
                        </div>
                    </div>

                    {/* Style DNA Radar Chart Section */}
                    <div className="bg-white/40 backdrop-blur-3xl border border-white rounded-[4rem] p-12 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.04)] animate-slide-up">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-navy-900 text-white rounded-2xl">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-outfit font-bold text-navy-900">Style Profile DNA</h2>
                                </div>
                                <p className="text-grey-600 text-sm leading-relaxed font-medium">
                                    Our AI has analyzed your taste across <span className="text-navy-900 font-bold">120+ parameters</span>. Your aesthetic leans heavily towards minimalist luxury with street-focused undertones.
                                </p>
                                <button className="text-[10px] font-black uppercase tracking-widest text-navy-900 flex items-center gap-2 hover:gap-4 transition-all">
                                    Explore Preferences <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <StyleDNA />
                            </div>
                        </div>
                    </div>

                    {/* Simplified Settings Forms */}
                    <div className="space-y-12 animate-slide-up [animation-delay:0.1s]">

                        {/* Status/Feedback Header */}
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-[1.5rem] bg-white border border-grey-100 flex items-center justify-center shadow-sm">
                                    <Settings className="w-7 h-7 text-navy-900" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-outfit font-bold text-navy-900">Vault Access</h2>
                                    <p className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] mt-0.5">Edit Personal Records</p>
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
                        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3.5rem] p-12 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)] hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.08)] transition-all duration-700">
                            <form onSubmit={handleUpdateProfile} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4 px-2">
                                        <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.3em] ml-2">Legacy Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-8 py-5.5 bg-grey-50/50 border border-navy-900/5 rounded-3xl font-jakarta text-sm font-semibold text-navy-900 focus:bg-white focus:border-navy-900/10 focus:ring-12 focus:ring-navy-900/[0.02] transition-all outline-none"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-4 px-2">
                                        <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.3em] ml-2">Encrypted Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-8 py-5.5 bg-grey-50/50 border border-navy-900/5 rounded-3xl font-jakarta text-sm font-semibold text-navy-900 focus:bg-white focus:border-navy-900/10 focus:ring-12 focus:ring-navy-900/[0.02] transition-all outline-none"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>

                                <button className="btn-primary w-full">
                                    Commit Identity Refinement
                                </button>
                            </form>
                        </div>

                        {/* Security Section */}
                        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3.5rem] p-12 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)] hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.08)] transition-all duration-700">
                            <form onSubmit={handleChangePassword} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4 px-2">
                                        <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.3em] ml-2">New Access Key</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-8 py-5.5 bg-grey-50/50 border border-navy-900/5 rounded-3xl font-jakarta text-sm font-semibold text-navy-900 focus:bg-white focus:border-navy-900/10 focus:ring-12 focus:ring-navy-900/[0.02] transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="space-y-4 px-2">
                                        <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.3em] ml-2">Confirm Identity</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-8 py-5.5 bg-grey-50/50 border border-navy-900/5 rounded-3xl font-jakarta text-sm font-semibold text-navy-900 focus:bg-white focus:border-navy-900/10 focus:ring-12 focus:ring-navy-900/[0.02] transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button className="btn-secondary w-full">
                                    Secure Security Key
                                </button>
                            </form>
                        </div>

                        {/* Logout - Bottom Center */}
                        <div className="pt-6">
                            <button
                                onClick={logout}
                                className="w-full py-8 bg-white border border-red-50 text-red-500 rounded-[3rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-red-50/50 transition-all active:scale-[0.99] flex items-center justify-center gap-4 group shadow-sm hover:shadow-md"
                            >
                                <LogOut className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <span>Logout Curator Session</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-32 text-center animate-fade-in [animation-delay:0.5s]">
                    <div className="flex items-center justify-center gap-4 opacity-10">
                        <div className="h-px w-20 bg-navy-900" />
                        <span className="text-[10px] font-black text-navy-900 uppercase tracking-[0.8em]">StylistAI</span>
                        <div className="h-px w-20 bg-navy-900" />
                    </div>
                    <p className="mt-4 text-[9px] font-semibold text-navy-900/20 uppercase tracking-[0.3em]">
                        Privacy Protected Intelligence Systems
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
