"use client"

import { useState } from 'react';
import { motion } from 'motion/react';
import { AdminHeader } from './_components/admin-header';
import { AdminSidebar } from './_components/admin-sidebar';
import { MetricsCards } from './_components/metrics-cards';
import { UserManagementPreview } from './_components/user-management-preview';
import { BatchOversightPreview } from './_components/batch-oversight-preview';
import { DisputeResolutionPanel } from './_components/dispute-resolution-panel';
import { AnalyticsSection } from './_components/analytics-section';
import { SystemHealthPanel } from './_components/system-health-panel';
import { FloatingActionButton } from './_components/floating-action-button';

export default function App() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <AdminHeader onToggleSidebar={toggleMobileMenu} />

            <div className="flex h-[calc(100vh-4rem)]">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <AdminSidebar
                        isCollapsed={sidebarCollapsed}
                        onToggle={toggleSidebar}
                        className="h-full"
                    />
                </div>

                {/* Mobile Sidebar Overlay */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50"
                            onClick={toggleMobileMenu}
                        />
                        <div className="relative w-64 bg-white">
                            <AdminSidebar
                                isCollapsed={false}
                                onToggle={toggleMobileMenu}
                                className="h-full"
                            />
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 lg:p-6 space-y-8">
                        {/* Welcome Section */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Welcome to KrishiNetra Admin Dashboard
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        Monitor and manage your agricultural supply chain platform
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    System Status: All services operational
                                </div>
                            </div>
                        </motion.div>

                        {/* Metrics Cards */}
                        <MetricsCards />

                        {/* Tables Section */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <UserManagementPreview />
                            <BatchOversightPreview />
                        </div>

                        {/* Dispute Resolution */}
                        <DisputeResolutionPanel />

                        {/* Analytics */}
                        <AnalyticsSection />

                        {/* System Health & Logs */}
                        <SystemHealthPanel />

                        {/* Footer */}
                        <motion.footer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.6 }}
                            className="border-t border-gray-200 pt-8 mt-12"
                        >
                            <div className="text-center text-sm text-gray-500 space-y-2">
                                <p>© 2024 KrishiNetra - Government of Odisha</p>
                                <div className="flex justify-center gap-4">
                                    <a href="#" className="hover:text-orange-600 transition-colors">
                                        Privacy Policy
                                    </a>
                                    <a href="#" className="hover:text-orange-600 transition-colors">
                                        Terms of Service
                                    </a>
                                    <a href="#" className="hover:text-orange-600 transition-colors">
                                        Support
                                    </a>
                                </div>
                            </div>
                        </motion.footer>
                    </div>
                </main>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton />
        </div>
    );
}