"use client"

import { useState } from 'react';
import { Header } from './_components/Header';
import { Sidebar } from './_components/Sidebar';
import { AnalyticsWidgets } from './_components/AnalyticsWidgets';
import { DisputesTable } from './_components/DisputesTable';
import { DisputeDetailPanel } from './_components/DisputeDetailPanel';
import { EscalationPanel } from './_components/EscalationPanel';
import { FloatingActionButton } from './_components/FloatingActionButton';
import { Toaster } from '../../ui/sonner';
import { motion } from 'motion/react';

interface Dispute {
    id: string;
    batchId: string;
    raisedBy: { role: string; name: string };
    dateRaised: string;
    issueType: string;
    status: 'Pending' | 'In Review' | 'Resolved' | 'Escalated';
}

export default function App() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleViewDetails = (dispute: Dispute) => {
        setSelectedDispute(dispute);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setSelectedDispute(null);
    };

    return (
        <div className="h-screen flex flex-col bg-krishinetra-gray">
            {/* Header */}
            <Header
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Hidden on mobile when collapsed */}
                <div className={`${isSidebarCollapsed ? 'hidden lg:block' : 'block'} flex-shrink-0`}>
                    <Sidebar
                        isCollapsed={isSidebarCollapsed}
                        onToggle={handleToggleSidebar}
                    />
                </div>

                {/* Main Content */}
                <motion.main
                    className="flex-1 overflow-auto"
                    layout
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className="p-6 space-y-6">
                        {/* Page Title */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Dispute Resolution</h1>
                                    <p className="text-gray-600 mt-1">
                                        Manage and resolve disputes efficiently across the KrishiNetra platform
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="hidden md:flex items-center gap-6 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-saffron">12</div>
                                        <div className="text-xs text-gray-600">Pending</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-forest">45</div>
                                        <div className="text-xs text-gray-600">Resolved</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-red-600">3</div>
                                        <div className="text-xs text-gray-600">Escalated</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Analytics Widgets */}
                        <AnalyticsWidgets />

                        {/* Disputes Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <DisputesTable onViewDetails={handleViewDetails} />
                        </motion.div>

                        {/* Escalation Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <EscalationPanel />
                        </motion.div>
                    </div>
                </motion.main>
            </div>

            {/* Dispute Detail Panel */}
            <DisputeDetailPanel
                dispute={selectedDispute}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
            />

            {/* Floating Action Button */}
            <FloatingActionButton />

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#ffffff',
                        border: '1px solid var(--krishinetra-border)',
                        color: '#1f2937',
                    },
                }}
            />

            {/* Mobile Sidebar Overlay */}
            {!isSidebarCollapsed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={handleToggleSidebar}
                />
            )}
        </div>
    );
}