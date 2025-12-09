"use client"

import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '@/context/AuthProvider';
import {
    User,
    LogOut,
    ChevronDown,
    Bell,
    LayoutDashboard
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import Axios

const Nav = () => {
    const { user, loading, setUser } = useContext(AuthContext);
    // console.log(user, loading, setUser, "user and loading")
    const [openDropdown, setOpenDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- 🟢 AXIOS LOGOUT HANDLER ---
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8000/api/auth/logout', {
                withCredentials: true // CRITICAL: Allows browser to handle the Set-Cookie header
            });

            if (setUser) setUser(null);
            setOpenDropdown(false);
            router.push('/auth');

        } catch (error) {
            console.error("Logout failed", error);

        }
    };

    return (
        <nav
            className={`
                sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
                ${scrolled
                ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50 py-2'
                : 'bg-background border-b border-transparent py-4'
            }
            `}
        >
            <div className='container mx-auto px-4 md:px-6 flex flex-row items-center justify-between'>

                {/* --- Logo Section --- */}
                <div className='flex items-center gap-3 group cursor-pointer'>
                    <div onClick={() => router.push('/home')} className='relative overflow-hidden rounded-full p-1 transition-transform duration-500 group-hover:rotate-12'>
                        <img
                            src='/logo.svg'
                            alt="KrishiNetra Logo"
                            className='h-10 w-10 object-contain drop-shadow-md'
                        />
                        <div className="absolute inset-0 rounded-full border border-saffron/30 animate-spin-slow opacity-0 group-hover:opacity-100" />
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-bold leading-none tracking-tight'>
                            <span className="bg-gradient-to-r from-saffron via-ashoka-blue to-forest-green bg-clip-text text-transparent">
                                KrishiNetra
                            </span>
                        </h1>
                        <span className='text-[10px] font-medium text-muted-foreground tracking-widest uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                            Empowering Farmers
                        </span>
                    </div>
                </div>

                {/* --- Center: Role Badge --- */}
                {user && (
                    <div className='hidden md:flex items-center gap-2 animate-fade-in'>
                        <div className={`
                            px-4 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 shadow-sm
                //            // ${user.userId.role === 'farmer'
                            // ? 'bg-forest-green/10 text-forest-green border-forest-green/20'
                            // : 'bg-ashoka-blue/10 text-ashoka-blue border-ashoka-blue/20'
                        }
                        `}>
                            <LayoutDashboard size={14} />
                            <span className="capitalize">{user.userId.role} Dashboard</span>
                        </div>
                    </div>
                )}

                {/* --- Right Actions --- */}
                <div className='flex items-center gap-4'>
                    {loading ? (
                        <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
                    ) : user ? (
                        <div className='flex items-center gap-3' ref={dropdownRef}>
                            <button className='p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative'>
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                            </button>

                            {/* User Profile Trigger */}
                            <div className='relative'>
                                <button
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                    className={`
                                        flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border transition-all duration-200
                                        ${openDropdown
                                        ? 'bg-muted border-primary/20 ring-2 ring-primary/5'
                                        : 'bg-background border-border hover:border-primary/30 hover:shadow-sm'
                                    }
                                    `}
                                >
                                    <div className='h-8 w-8 rounded-full bg-gradient-to-br from-saffron-light to-saffron flex items-center justify-center text-white font-bold shadow-sm'>
                                        {/*{user.userId.name.charAt(0).toUpperCase()}*/}
                                    </div>
                                    <div className='hidden sm:flex flex-col items-start'>
                                        {/*<p className='text-sm font-medium leading-none text-foreground'>{user.userId.name}</p>*/}
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`text-muted-foreground transition-transform duration-300 ${openDropdown ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {openDropdown && (
                                    <div className='absolute top-full right-0 mt-2 w-56 rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm shadow-xl animate-slide-up origin-top-right overflow-hidden z-50'>
                                        <div className='p-3 border-b border-border/50'>
                                            {/*<p className='text-sm font-medium text-foreground'>{user.userId.name}</p>*/}
                                            {/*<p className='text-xs text-muted-foreground truncate'>{user.email || 'user@krishinetra.com'}</p>*/}
                                        </div>
                                        <div className='p-1'>
                                            <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'>
                                                <LayoutDashboard size={16} />
                                                <span onClick={()=>router.push("/protected/farmer/dashboard")}>Dashboard</span>
                                            </button>
                                            <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'>
                                                <User size={16} />
                                                <span onClick={()=>router.push("/protected/farmer/dashboard")}>Profile</span>
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors'
                                            >
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center gap-3 animate-fade-in'>
                            <button onClick={()=>router.push("/auth")} className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2'>
                                Login
                            </button>
                            <button className='
                                relative overflow-hidden rounded-lg px-5 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300
                                bg-gradient-to-r from-forest-green to-forest-green-dark
                                hover:shadow-forest-green/25 hover:-translate-y-0.5
                                active:scale-95
                                hover:indian-glow
                            '>
                                <span className='relative z-10'>Sign Up</span>
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav