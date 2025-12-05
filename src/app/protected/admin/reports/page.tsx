"use client"


import { useState } from 'react';
import { Toaster } from '../../ui/sonner';
import { ReportsHeader } from './_components/ReportsHeader';
import { ReportsSidebar } from './_components/ReportsSidebar';
import { SummaryCards } from './_components/SummaryCards';
import { FiltersPanel } from './_components/FiltersPanel';
import { ChartsSection } from './_components/ChartsSection';
import { CustomReportBuilder } from './_components/CustomReportBuilder';
import { ReportsTable } from './_components/ReportsTable';
import { FloatingActionButton } from './_components/FloatingActionButton';

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeReport, setActiveReport] = useState('summary');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeReport) {
            case 'summary':
                return (
                    <>
                        <SummaryCards />
                        <FiltersPanel />
                        <ChartsSection />
                    </>
                );
            case 'sales':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--ashoka-blue)' }}>
                                Sales Reports
                            </h2>
                            <p className="text-gray-600">Detailed sales analytics and performance metrics</p>
                        </div>
                        <FiltersPanel />
                        <ChartsSection />
                    </>
                );
            case 'transfer':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--ashoka-blue)' }}>
                                Transfer Reports
                            </h2>
                            <p className="text-gray-600">Supply chain transfer tracking and logistics data</p>
                        </div>
                        <FiltersPanel />
                        <ChartsSection />
                    </>
                );
            case 'custom':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--ashoka-blue)' }}>
                                Custom Reports
                            </h2>
                            <p className="text-gray-600">Build and manage custom reports tailored to your needs</p>
                        </div>
                        <CustomReportBuilder />
                    </>
                );
            default:
                return (
                    <>
                        <SummaryCards />
                        <FiltersPanel />
                        <ChartsSection />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[var(--krishinetra-cream)] font-sans">
            {/* Header */}
            <ReportsHeader onToggleSidebar={toggleSidebar} />

            <div className="flex h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <ReportsSidebar
                    isOpen={isSidebarOpen}
                    activeReport={activeReport}
                    onReportChange={setActiveReport}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-6">
                        {renderContent()}

                        {/* Reports Table - Show on all sections except custom */}
                        {activeReport !== 'custom' && (
                            <>
                                <div className="mt-8">
                                    <ReportsTable />
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton />

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                    },
                }}
            />
        </div>
    );
}