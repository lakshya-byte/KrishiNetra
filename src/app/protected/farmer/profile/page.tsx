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
  const {user,loading} = useContext(AuthContext);
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

        {/* Farm Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#0F1419]">Farm Details</h3>
            {!isEditMode && (
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E8A314] mt-0.5" />
              <div className="flex-1">
                <div className="text-[#666666] text-sm mb-1">Farm Size</div>
                {isEditMode ? (
                  <input
                    type="text"
                    defaultValue="2 hectares"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                  />
                ) : (
                  <div className="text-[#0F1419]">2 hectares</div>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#E8A314] mt-0.5" />
              <div className="flex-1">
                <div className="text-[#666666] text-sm mb-1">Main Crops</div>
                {isEditMode ? (
                  <input
                    type="text"
                    defaultValue="Tomatoes, Onions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                  />
                ) : (
                  <div className="text-[#0F1419]">Tomatoes, Onions</div>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#E8A314] mt-0.5" />
              <div className="flex-1">
                <div className="text-[#666666] text-sm mb-1">Certification</div>
                <div className="text-[#0F1419]">Organic certified</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#E8A314] mt-0.5" />
              <div className="flex-1">
                <div className="text-[#666666] text-sm mb-1">Years of Experience</div>
                <div className="text-[#0F1419]">25 years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-[#0F1419] mb-6">Verification Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Phone Verified', verified: true, date: 'Nov 28, 2024' },
            { label: 'Email Verified', verified: true, date: 'Nov 28, 2024' },
            { label: 'ID Verified', verified: true, date: 'Nov 27, 2024' },
            { label: 'Bank Account Verified', verified: true, date: 'Nov 26, 2024' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-[#E8F5E9] rounded-lg"
              style={{ animation: `fadeInUp 300ms ease-out ${index * 100}ms both` }}
            >
              <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <div className="text-[#0F1419] text-sm mb-1">{item.label}</div>
                <div className="text-[#666666] text-xs">Verified on {item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-[#0F1419] mb-6">Account Settings</h3>
        <div className="space-y-6">
          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#1A5F9E]" />
              <div>
                <div className="text-[#0F1419]">Language</div>
                <div className="text-[#666666] text-sm">Choose your preferred language</div>
              </div>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all">
              <option>हिंदी</option>
              <option>English</option>
              <option>ਪੰਜਾਬੀ</option>
            </select>
          </div>

          {/* Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-[#1A5F9E]" />
              <div>
                <div className="text-[#0F1419]">Notifications</div>
                <div className="text-[#666666] text-sm">Manage notification preferences</div>
              </div>
            </div>
            <div className="pl-8 space-y-3">
              {[
                { key: 'email', label: 'Email notifications' },
                { key: 'sms', label: 'SMS notifications' },
                { key: 'app', label: 'App notifications' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="text-[#0F1419]">{item.label}</span>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [item.key]: !notifications[item.key as keyof typeof notifications],
                      })
                    }
                    className={`
                      relative w-12 h-6 rounded-full transition-all duration-300
                      ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-[#4CAF50]'
                          : 'bg-gray-300'
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300
                        ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'left-6'
                            : 'left-0.5'
                        }
                      `}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#1A5F9E]" />
              <div>
                <div className="text-[#0F1419]">Two-Factor Authentication</div>
                <div className="text-[#666666] text-sm">Add an extra layer of security</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#1A5F9E] text-white rounded-lg hover:bg-[#144A7A] transition-all">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {isEditMode && (
          <button
            onClick={() => setIsEditMode(false)}
            className="w-full px-6 py-3 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm"
          >
            Save Changes
          </button>
        )}
        <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
          Change Password
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#E53935] text-[#E53935] rounded-lg hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
