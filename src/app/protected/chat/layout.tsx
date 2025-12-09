'use client';

import { useState } from 'react';
import Sidebar from "@/app/components/Sidebar";


export default function App({children}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="lg:ml-[280px] ">
                <div className=" ">
                    {children}
                </div>
            </main>
        </div>
    );
}
