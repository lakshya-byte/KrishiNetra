'use client';

import { useState } from 'react';
import { Camera, Edit, Phone, Mail, MapPin, Award, Calendar, Globe, Bell, Lock, LogOut } from 'lucide-react';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function Profile() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        app: false,
    });
    const { user, loading } = useContext(AuthContext);
    console.log(user)
    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-[#0F1419]">My Profile</h1>
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:scale-[1.02] transition-all"
                >
                    <Edit className="w-4 h-4" />
                    {isEditMode ? 'Cancel Edit' : 'Edit Profile'}
                </button>
            </div>

            {/* Avatar Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 bg-[#E8A314] rounded-full flex items-center justify-center text-white text-4xl">
                        R
                    </div>
                    {isEditMode && (
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#2D7A3E] rounded-full flex items-center justify-center text-white hover:bg-[#236630] transition-all shadow-lg">
                            <Camera className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <h2 className="text-[#0F1419] mb-1">{user.userId.name}</h2>
                <p className="text-[#666666] text-sm mb-3">Farmer since {new Date(user.createdAt).getFullYear()}</p>
                <div className="flex items-center justify-center gap-2">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                        ))}
                    </div>
                    <span className="text-[#666666] text-sm">0/5</span>
                </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[#0F1419]">Contact Information</h3>
                        {!isEditMode && (
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-[#2D7A3E] mt-0.5" />
                            <div className="flex-1">
                                <div className="text-[#666666] text-sm mb-1">Phone</div>
                                {isEditMode ? (
                                    <input
                                        type="tel"
                                        defaultValue="+91-9876543210"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                    />
                                ) : (
                                    <div className="text-[#0F1419]">+91-{user.userId.phone}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-[#2D7A3E] mt-0.5" />
                            <div className="flex-1">
                                <div className="text-[#666666] text-sm mb-1">Email</div>
                                {isEditMode ? (
                                    <input
                                        type="email"
                                        defaultValue="raju@krishinetra.io"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                    />
                                ) : (
                                    <div className="text-[#0F1419]">{user.userId.email}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#2D7A3E] mt-0.5" />
                            <div className="flex-1">
                                <div className="text-[#666666] text-sm mb-1">Address</div>
                                {isEditMode ? (
                                    <textarea
                                        defaultValue="Village Rampur, District Amritsar, Punjab, India - 143001"
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                    />
                                ) : (
                                    <div className="text-[#0F1419]">
                                        {user.farmLocation[0]?.address}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
