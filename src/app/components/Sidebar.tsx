"use client";

import React, { useContext } from 'react';
import {
    Home,
    Package,
    Plus,
    Gavel,
    BarChart3,
    User,
    X,
    MessageSquare
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';

export default function Sidebar({ isOpen, onClose }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useContext(AuthContext);

    // Fallback to 'farmer' if user isn't loaded yet to prevent hydration mismatch, 
    // or handle loading state if preferred.
    const role = (user?.userId?.role || 'farmer').toLowerCase();
    let basePath = "/protected";
    console.log("User Role in Sidebar:", role);
    if(role === 'retailer'){
        basePath = `/protected/retailer`;
    }else if(role === 'farmer'){
        basePath = `/protected/farmer`;
    }else if(role === 'distributor'){
        basePath = `/protected/distributor`;
    }

    // Navigation Configuration
    // 'roles' array defines who can see it. If undefined, everyone sees it.
    const navItems = [
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: Home
        },
        {
            path: '/batches',
            label: 'Batches',
            icon: Package
        },
        {
            path: '/addBatch',
            label: 'Add Batch',
            icon: Plus,
            roles: ['farmer'] 
        },
        {
            path: '/viewResidues',
            label: 'View Residues',
            icon: Package,
            roles: ['distributor'] 
        },
        {
            path: '/createResidue',
            label: 'Create Residue',
            icon: Plus,
            roles: ['farmer'] 
        },
        {
            path: '/profile',
            label: 'Profile',
            icon: User
        },
        {
            path: '/protected/chat', 
            label: 'Chat',
            icon: MessageSquare 
        },
    ];

    // Filter items based on the current user role
    const visibleNavItems = navItems.filter(item =>
        (item?.roles?.includes(role)) || !item.roles 
    );

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed top-16 left-0 bottom-0 w-[280px] bg-white border-r border-gray-200 z-40
                    transition-transform duration-300 ease-out shadow-sm
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2 mt-4">
                    {visibleNavItems.map((item) => {
                        const Icon = item.icon;

                        // Construct the full URL for this item
                        const fullPath =
                        item.label === "Chat"
                            ? "/protected/chat"
                            : `${basePath}${item.path}`;

                        // Check if active (exact match or sub-path match)
                        const isActive = pathname === fullPath || pathname.startsWith(`${fullPath}/`);

                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    router.replace(fullPath);
                                    // Optional: Close sidebar on mobile when clicked
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200 font-medium
                                    ${isActive
                                    ? 'bg-orange-50 text-orange-700 shadow-sm border border-orange-100' // Saffron-light theme
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                                `}
                            >
                                <Icon
                                    className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-500'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className="text-sm">{item.label}</span>

                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-600" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Optional: User Role Badge at bottom */}
                <div className="absolute bottom-6 left-4 right-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs uppercase">
                            {role.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Logged in as</p>
                            <p className="text-sm font-semibold text-gray-800 capitalize">{role}</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}