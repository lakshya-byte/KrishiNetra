'use client';

import { useState } from 'react';
import Sidebar from './_components/Sidebar';


export default function App({children}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="lg:ml-[280px] pt-16">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
