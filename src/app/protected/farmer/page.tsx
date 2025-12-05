'use client';

import { useState } from 'react';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';
import Dashboard from './_components/Dashboard';
import Batches from './_components/Batches';
import AddBatch from './_components/AddBatch';
import OngoingBidding from './_components/OngoingBidding';
import PendingTransfers from './_components/PendingTransfers';
import Analytics from './_components/Analytics';
import Profile from './_components/Profile';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function App() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'batches':
                return <Batches onAddBatch={() => setCurrentView('add-batch')} />;
            case 'add-batch':
                return <AddBatch onComplete={() => setCurrentView('batches')} />;
            case 'bidding':
                return <OngoingBidding />;
            case 'transfers':
                return <PendingTransfers />;
            case 'analytics':
                return <Analytics />;
            case 'profile':
                return <Profile />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebar
                currentView={currentView}
                onNavigate={setCurrentView}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="lg:ml-[280px] pt-16">
                <div className="p-4 md:p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
