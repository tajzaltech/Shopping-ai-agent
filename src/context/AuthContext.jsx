import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for saved user on load
        const savedUser = localStorage.getItem('shopping-agent-user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse user data');
                localStorage.removeItem('shopping-agent-user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login logic
        setLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock success for any email currently
                const mockUser = {
                    id: 'user_123',
                    name: email.split('@')[0],
                    email: email,
                };

                setUser(mockUser);
                localStorage.setItem('shopping-agent-user', JSON.stringify(mockUser));
                setLoading(false);
                resolve(mockUser);
            }, 1000);
        });
    };

    const signup = async (name, email, password) => {
        // Mock signup logic
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = {
                    id: 'user_' + Date.now(),
                    name,
                    email,
                    isVerified: false
                };

                setUser(newUser);
                localStorage.setItem('shopping-agent-user', JSON.stringify(newUser));
                setLoading(false);
                resolve(newUser);
            }, 1000);
        });
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const googleUser = {
                    id: 'google_' + Date.now(),
                    name: 'Google User',
                    email: 'google@user.com',
                    isVerified: true
                };
                setUser(googleUser);
                localStorage.setItem('shopping-agent-user', JSON.stringify(googleUser));
                setLoading(false);
                resolve(googleUser);
            }, 1000);
        });
    };

    const verifyEmail = async (code) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code.length === 6) {
                    const verifiedUser = { ...user, isVerified: true };
                    setUser(verifiedUser);
                    localStorage.setItem('shopping-agent-user', JSON.stringify(verifiedUser));
                    setLoading(false);
                    resolve(true);
                } else {
                    setLoading(false);
                    reject(new Error('Invalid code'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('shopping-agent-user');
        navigate('/signin');
    };

    const updateProfile = (data) => {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('shopping-agent-user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, verifyEmail, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
