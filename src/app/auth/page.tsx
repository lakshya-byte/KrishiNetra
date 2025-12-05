"use client"

import { useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './_components/ImageWithFallback';
import Signup from "./_components/Signup";
import Login from './_components/Login';
import { AuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';

export default function KrishiNetraAuth() {
    const {user,loading} = useContext(AuthContext);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

   useEffect(() => {
         if(!loading && user){
            if(user.userId.role === 'Farmer'){
                router.replace('/protected/farmer');
            }else if(user.userId.role === 'Distributor'){
                router.replace('/distributor/dashboard');
            }else if(user.userId.role === 'Retailer'){
                router.replace('/retailer/dashboard');
            }
         }
   }, [loading, user]);

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left side - Illustration (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-green-50 to-orange-50 items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-md"
                >
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm1lciUyMGNyb3BzJTIwZmllbGRzfGVufDF8fHx8MTc1OTA5MDgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Indian Agriculture"
                        className="w-full h-auto rounded-2xl shadow-lg"
                    />
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            Empowering Indian Agriculture
                        </h3>
                        <p className="text-gray-600">
                            Connect farmers, distributors, and retailers in a seamless digital ecosystem
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-6"
                        >
                            <div className="w-16 h-16 bg-linear-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">KN</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                Welcome to KrishiNetra
                            </h1>
                            <p className="text-gray-600">
                                Sign in to manage produce or create a new account
                            </p>
                        </motion.div>
                    </div>

                    {/* Form Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 lg:p-8"
                    >
                        {/* Tabs */}
                        <div className="flex mb-6 relative">
                            <div className="flex w-full bg-gray-50 rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('login')}
                                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${activeTab === 'login'
                                            ? 'bg-white shadow-sm text-orange-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setActiveTab('signup')}
                                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${activeTab === 'signup'
                                            ? 'bg-white shadow-sm text-orange-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                        {activeTab === 'signup' ? <Signup /> : <Login />}
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-8 text-sm text-gray-500"
                    >
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-blue-700 hover:text-blue-800 hover:underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-700 hover:text-blue-800 hover:underline">
                            Privacy Policy
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}