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
                    onboardingCompleted: false
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
                const mockUser = {
                    id: 'user_' + Date.now(),
                    name,
                    email,
                    onboardingCompleted: false
                };

                setUser(mockUser);
                localStorage.setItem('shopping-agent-user', JSON.stringify(mockUser));
                setLoading(false);
                resolve(mockUser);
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
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
