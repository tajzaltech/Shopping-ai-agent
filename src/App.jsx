import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import StoreLocator from './pages/StoreLocator';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import ShopTheLook from './pages/ShopTheLook';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Default - redirect to chat */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/chat" replace />
          </ProtectedRoute>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/trending" element={
          <ProtectedRoute>
            <ShopTheLook />
          </ProtectedRoute>
        } />
        <Route path="/stores" element={
          <ProtectedRoute>
            <StoreLocator />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<div className="p-10 text-center text-red-500">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
