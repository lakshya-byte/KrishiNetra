"use client"

import React, { useState, useEffect } from 'react';
import { Header } from './_components/Header';
import { Sidebar } from './_components/Sidebar';
import { OverviewCards } from './_components/OverviewCards';
import { BatchTable } from './_components/BatchTable';
import { SalesTrendChart } from './_components/SalesTrendChart';
import { RecentActivityFeed } from './_components/RecentActivityFeed';
import { FloatingActionButton } from './_components/FloatingActionButton';
import { Footer } from './_components/Footer';
import { Toaster } from "../../ui/sonner";
import { motion } from 'motion/react';

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMenuToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuItemClick = (item) => {
        if (item === 'close') {
            setIsSidebarOpen(false);
            return;
        }

        setActiveMenuItem(item);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeItem={activeMenuItem}
                    onItemClick={handleMenuItemClick}
                />

                {/* Main Content */}
                <motion.main
                    className={`flex-1 transition-all duration-300 ${
                        isSidebarOpen && !isMobile ? 'lg:ml-0' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        {/* Welcome Section */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                Welcome back, Farmer!
                            </h1>
                            <p className="text-gray-600">
                                Here's an overview of your farming operations and batch management.
                            </p>
                        </motion.div>

                        {/* Overview Cards */}
                        <OverviewCards />

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                            {/* Left Column - Batch Table (2/3 width) */}
                            <div className="lg:col-span-2">
                                <BatchTable />
                            </div>

                            {/* Right Column - Recent Activity (1/3 width) */}
                            <div className="lg:col-span-1">
                                <RecentActivityFeed />
                            </div>
                        </div>

                        {/* Sales Trend Chart */}
                        <SalesTrendChart />
                    </div>
                </motion.main>
            </div>

            {/* Footer */}
            <Footer />

            {/* Floating Action Button */}
            <FloatingActionButton />

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'white',
                    },
                    className: 'border-l-4 border-l-saffron',
                }}
            />
        </div>
    );
}
