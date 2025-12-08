'use client';

import { useState } from 'react';
import Sidebar from './_components/Sidebar';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import path from 'path';


export default function App({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname().split('/').slice(2);
    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="lg:ml-[280px] pt-16">
                <div className="p-4 md:p-8">
                    <div className='flex flex-col gap-4'>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                            <Home className="h-4 w-4" />
                            {pathname.map((segment, index) => (
                                <span key={index} className="flex items-center space-x-2">
                                    <ChevronRight className="h-4 w-4" />
                                    <span className={index === pathname.length - 1 ? 'text-foreground' : ''}>
                                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                    </span>
                                </span>
                            ))}
                        </div>
                        <div>
                            {children}  
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
