import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-grey-100 font-sans text-grey-900">
            <Navbar />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
