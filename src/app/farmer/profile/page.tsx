"use client"
import { useState } from 'react';
import { NavigationHeader } from './_components/navigation-header';
import { ProfileHeader } from './_components/profile-header';
import { PersonalInfoForm } from './_components/personal-info-form';
import { AccountSettings } from './_components/account-settings';
import { ActivityDashboard } from './_components/activity-dashboard';
import { NotificationPreferences } from './_components/notification-preferences';
import { AppPreferences } from './_components/app-preferences';
import { DataPrivacy } from './_components/data-privacy';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { motion } from 'motion/react';
import { Toaster } from '../../ui/sonner';

// Mock data
const mockUser = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    location: 'Guntur, Andhra Pradesh',
    organization: 'Kumar Organic Farms',
    role: 'Farmer',
    memberSince: 'March 2023',
    isVerified: true,
    avatar: undefined,
    fullName: 'Rajesh Kumar'
};

const mockStats = {
    totalBatches: 127,
    successfulTransfers: 89,
    profileViews: 245,
    joinDate: '2023'
};

const mockActivities = [
    {
        id: '1',
        type: 'batch_created' as const,
        description: 'Created new batch: Organic Tomatoes',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        details: 'Batch ID: BT-2024-001, Quantity: 500kg, Expected harvest: January 15, 2024'
    },
    {
        id: '2',
        type: 'transfer_completed' as const,
        description: 'Transfer completed to Delhi Distributor',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        details: 'Transfer ID: TR-2024-089, Quantity: 300kg, Delivery confirmed'
    },
    {
        id: '3',
        type: 'profile_updated' as const,
        description: 'Updated contact information',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        details: 'Updated phone number and location details'
    },
    {
        id: '4',
        type: 'login' as const,
        description: 'Logged in from mobile device',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: 'Location: Guntur, Device: Android Mobile'
    }
];

const mockSessions = [
    {
        id: '1',
        device: 'Chrome on Windows',
        location: 'Guntur, Andhra Pradesh',
        lastActive: '2 minutes ago',
        current: true
    },
    {
        id: '2',
        device: 'Mobile App (Android)',
        location: 'Guntur, Andhra Pradesh',
        lastActive: '1 hour ago',
        current: false
    },
    {
        id: '3',
        device: 'Safari on iPhone',
        location: 'Hyderabad, Telangana',
        lastActive: '2 days ago',
        current: false
    }
];

const initialAccountSettings = {
    twoFactorEnabled: false,
    profileVisibility: 'public' as const,
    dataSharing: true,
    contactPreferences: {
        email: true,
        sms: false
    }
};

const initialNotificationPreferences = {
    email: {
        batchUpdates: true,
        transfers: true,
        systemAlerts: true,
        weeklyDigest: false
    },
    sms: {
        criticalUpdates: true
    },
    push: {
        enabled: true
    },
    frequency: 'realtime' as const
};

const initialAppPreferences = {
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    dashboardWidgets: {
        batchOverview: true,
        recentActivity: true,
        analytics: true,
        quickActions: true,
        notifications: true
    },
    defaultView: 'list' as const
};

export default function App() {
    const [user, setUser] = useState(mockUser);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [accountSettings, setAccountSettings] = useState(initialAccountSettings);
    const [notificationPreferences, setNotificationPreferences] = useState(initialNotificationPreferences);
    const [appPreferences, setAppPreferences] = useState(initialAppPreferences);

    const handleProfileUpdate = (data: any) => {
        setUser(prev => ({ ...prev, ...data }));
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
    };

    const handleSettingsUpdate = (settings: any) => {
        setAccountSettings(settings);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
    };

    const handleNotificationUpdate = (preferences: any) => {
        setNotificationPreferences(preferences);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
    };

    const handleAppPreferencesUpdate = (preferences: any) => {
        setAppPreferences(preferences);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-white to-white">
            <NavigationHeader
                user={user}
                hasUnsavedChanges={hasUnsavedChanges}
                lastSaved={lastSaved}
            />

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Profile Header */}
                    <ProfileHeader
                        user={user}
                        onUpdateProfile={handleProfileUpdate}
                    />

                    {/* Main Content - Responsive Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Profile Information (2/3 width on desktop) */}
                        <div className="lg:col-span-2 space-y-8">
                            <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                    <TabsTrigger value="security">Security</TabsTrigger>
                                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                                </TabsList>

                                <TabsContent value="personal" className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <PersonalInfoForm
                                            user={user}
                                            onUpdate={handleProfileUpdate}
                                        />
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="security" className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <AccountSettings
                                            settings={accountSettings}
                                            sessions={mockSessions}
                                            onUpdate={handleSettingsUpdate}
                                        />
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="privacy" className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <DataPrivacy />
                                    </motion.div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Right Column - Activity & Preferences (1/3 width on desktop) */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <ActivityDashboard
                                    stats={mockStats}
                                    activities={mockActivities}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <NotificationPreferences
                                    preferences={notificationPreferences}
                                    onUpdate={handleNotificationUpdate}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <AppPreferences
                                    preferences={appPreferences}
                                    onUpdate={handleAppPreferencesUpdate}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Toaster />
        </div>
    );
}