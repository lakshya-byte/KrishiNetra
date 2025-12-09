'use client';

import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wheat, MapPin, Calendar, Share2, Download,
    Clock, Truck, Award, DollarSign,
    TrendingUp, AlertCircle, CheckCircle2,
    ArrowUpRight
} from 'lucide-react';
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AuthContext } from '@/context/AuthProvider';
import { useParams, useRouter } from 'next/navigation';
import {
    apiClient,
    GET_BATCH_BY_ID,
    POST_PLACE_BID
} from '@/service/api';
import Spinner from "@/app/components/Spinner";

// --- HELPER FUNCTIONS ---
const toReadable = (date: string | Date): string => {
    if(!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

// FIX: Always return an object to match State type
function getTimeRemaining(closingDate: string) {
    if (!closingDate) return { text: "N/A", isUrgent: false };

    const now = new Date();
    const end = new Date(closingDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return { text: "Expired", isUrgent: false };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return { text: `${days}d ${hours}h ${minutes}m`, isUrgent: days < 1 };
}

// --- MOCK CHART DATA ---
const priceData = [
    { stage: 'Farmer Base', price: 25 },
    { stage: 'Avg Market', price: 35 },
    { stage: 'Retail Est.', price: 55 },
];

export default function DistributorBatchDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useContext(AuthContext);

    // State
    const [batchData, setBatchData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details');

    // Bidding State
    const [bidAmount, setBidAmount] = useState('');
    const [placingBid, setPlacingBid] = useState(false);

    // Initial state matches the object structure
    const [timeLeft, setTimeLeft] = useState({ text: 'Loading...', isUrgent: false });

    // Fetch Data
    useEffect(() => {
        const fetchBatchData = async () => {
            try {
                const res = await apiClient.get(`${GET_BATCH_BY_ID}/${id}`);
                setBatchData(res.data.data);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to load batch details");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBatchData();
    }, [id]);

    // Timer Interval
    useEffect(() => {
        if (!batchData?.bidding?.closingDate) return;

        const updateTimer = () => {
            setTimeLeft(getTimeRemaining(batchData.bidding.closingDate));
        };

        // Initial call
        updateTimer();

        const timer = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(timer);
    }, [batchData]);

    // --- HANDLER: PLACE BID ---
    const handlePlaceBid = async () => {
        if (!bidAmount || isNaN(Number(bidAmount))) {
            return toast.error("Please enter a valid amount");
        }

        // Validation: Bid must be higher than current max or base price
        const currentMax = batchData.bidding?.bids?.length > 0
            ? Math.max(...batchData.bidding.bids.map((b: any) => b.bidPricePerKg))
            : batchData.pricePerKg;

        if (Number(bidAmount) <= currentMax) {
            return toast.error(`Bid must be higher than ₹${currentMax}`);
        }

        setPlacingBid(true);

        try {
            const payload = {
                id: batchData._id,
                bidPricePerKg: Number(bidAmount)
            };

            const res = await apiClient.post(POST_PLACE_BID, payload);

            if (res.status === 200) {
                toast.success('🎉 Bid placed successfully!');

                const newBid = {
                    distributorId: user?.userId?.name || "You",
                    bidPricePerKg: Number(bidAmount),
                    bidDate: new Date().toISOString()
                };

                // Optimistic Update
                setBatchData((prev: any) => ({
                    ...prev,
                    bidding: {
                        ...prev.bidding,
                        bids: [...(prev.bidding?.bids || []), newBid]
                    }
                }));
                setBidAmount('');
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to place bid";
            toast.error(msg);
        } finally {
            setPlacingBid(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Spinner /></div>;
    if (!batchData) return <div className="p-10 text-center">Batch not found</div>;

    const isBiddingOpen = batchData.status === 'Bidding' && batchData.bidding?.status === 'Open';
    const highestBid = batchData.bidding?.bids?.length > 0
        ? Math.max(...batchData.bidding.bids.map((b: any) => b.bidPricePerKg))
        : 0;

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">

            {/* --- HERO HEADER --- */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Wheat className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-gray-900">{batchData.cropType}</h1>
                                <Badge variant="outline" className="text-xs bg-gray-50 border-gray-300">
                                    {batchData.batchId}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {batchData.farmLocation || batchData.location}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.back()}>Back</Button>
                        <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2"/> Share</Button>
                        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2"/> QR</Button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN: DETAILS --- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. KEY STATS CARDS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="mb-2 p-2 bg-green-50 rounded-full text-green-600"><Truck className="h-5 w-5"/></div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Quantity</p>
                                    <p className="text-lg font-bold text-gray-900">{batchData.quantity || batchData.availableQuantity} kg</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="mb-2 p-2 bg-blue-50 rounded-full text-blue-600"><Calendar className="h-5 w-5"/></div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Harvested</p>
                                    <p className="text-lg font-bold text-gray-900">{new Date(batchData.harvestDate).toLocaleDateString(undefined, {month:'short', year:'2-digit'})}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="mb-2 p-2 bg-yellow-50 rounded-full text-yellow-600"><Award className="h-5 w-5"/></div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Grade</p>
                                    <p className="text-lg font-bold text-gray-900">{batchData.additionalDetails?.grade || 'A'}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="mb-2 p-2 bg-purple-50 rounded-full text-purple-600"><DollarSign className="h-5 w-5"/></div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Base Price</p>
                                    <p className="text-lg font-bold text-gray-900">₹{batchData.pricePerKg}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 2. IMAGE GALLERY (Placeholder for now) */}
                        <div className="aspect-video w-full bg-gray-200 rounded-2xl overflow-hidden relative group">
                            <img
                                src={batchData.images?.[0] || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=2000"}
                                alt="Crop"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
                                Verified by KrishiNetra
                            </div>
                        </div>

                        {/* 3. TABS SECTION */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <div className="border-b px-4">
                                    <TabsList className="bg-transparent h-14 w-full justify-start gap-8">
                                        <TabsTrigger value="details" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 text-gray-500 data-[state=active]:text-orange-600">Specifications</TabsTrigger>
                                        <TabsTrigger value="history" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 text-gray-500 data-[state=active]:text-orange-600">Provenance</TabsTrigger>
                                        <TabsTrigger value="chart" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 text-gray-500 data-[state=active]:text-orange-600">Price Trend</TabsTrigger>
                                    </TabsList>
                                </div>

                                <CardContent className="p-6 bg-white min-h-[300px]">
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'details' && (
                                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold text-gray-900">Crop Details</h3>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between border-b border-dashed pb-2">
                                                            <span className="text-gray-500">Moisture Content</span>
                                                            <span className="font-medium text-gray-900">{batchData.additionalDetails?.moistureContent || '12'}%</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-dashed pb-2">
                                                            <span className="text-gray-500">Nitrogen</span>
                                                            <span className="font-medium text-gray-900">{batchData.additionalDetails?.nitrogen || 'N/A'}%</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-dashed pb-2">
                                                            <span className="text-gray-500">Yield Percentage</span>
                                                            <span className="font-medium text-gray-900">{batchData.additionalDetails?.yieldPercentage || 'N/A'}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 rounded-xl p-4">
                                                    <h3 className="font-semibold text-gray-900 mb-2">Farmer Note</h3>
                                                    <p className="text-sm text-gray-600 italic">"This batch was grown using organic compost. No synthetic pesticides were used in the last cycle."</p>
                                                    <div className="mt-4 flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>FK</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-900">Farmer Verification</p>
                                                            <p className="text-[10px] text-green-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> KYC Verified</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        {activeTab === 'chart' && (
                                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="h-[250px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={priceData}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                        <XAxis dataKey="stage" axisLine={false} tickLine={false} />
                                                        <YAxis axisLine={false} tickLine={false} />
                                                        <Tooltip contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}} />
                                                        <Bar dataKey="price" fill="#F97316" radius={[4, 4, 0, 0]} barSize={40} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Tabs>
                        </Card>
                    </div>

                    {/* --- RIGHT COLUMN: BIDDING CONSOLE (STICKY) --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* CONSOLE CARD */}
                            <Card className={`border-none shadow-xl overflow-hidden ${isBiddingOpen ? 'ring-2 ring-green-500/20' : 'opacity-80'}`}>
                                <div className={`h-2 w-full ${isBiddingOpen ? 'bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse' : 'bg-gray-300'}`} />
                                <CardHeader className="bg-white pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Bidding Console</CardTitle>
                                        {isBiddingOpen ? (
                                            <Badge className="bg-red-100 text-red-600 hover:bg-red-200 border-red-200 animate-pulse">
                                                ● LIVE
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">CLOSED</Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="bg-white p-6 space-y-6">

                                    {/* Timer & Top Bid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <p className="text-xs text-gray-500 font-medium uppercase">Time Left</p>
                                            <div className={`text-xl font-bold flex items-center gap-1 ${timeLeft.isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                                                <Clock className="h-4 w-4"/> {timeLeft.text}
                                            </div>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                                            <p className="text-xs text-orange-600 font-medium uppercase">Highest Bid</p>
                                            <div className="text-xl font-bold text-gray-900 flex items-center gap-1">
                                                ₹ {highestBid || batchData.pricePerKg}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bidding Input Area */}
                                        <div className="space-y-4">
                                            <h1>Enter quantity you want to buy:</h1>
                                            <input className='' placeholder='Entter the quantity you want to buy:'> </input>
                                        </div>
                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <CheckCircle2 className="h-3 w-3 text-green-500"/> Secure Transaction via Blockchain
                                    </div>
                                </CardContent>
                            </Card>

                            {/* LIVE FEED */}
                            <Card className="border-none shadow-sm bg-transparent">
                                <CardHeader className="px-0 pt-0 pb-3">
                                    <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4"/> Recent Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-0 space-y-3">
                                    {batchData.bidding?.bids?.length > 0 ? (
                                        // Sort desc by price, take top 5
                                        [...batchData.bidding.bids].sort((a:any,b:any) => b.bidPricePerKg - a.bidPricePerKg).slice(0, 5).map((bid: any, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{opacity:0, x:-10}}
                                                animate={{opacity:1, x:0}}
                                                className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        {i === 0 ? '👑' : `#${i+1}`}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {bid.distributorId?.toString().substring(0,8) || 'Distributor'}...
                                                        </p>
                                                        <p className="text-[10px] text-gray-400">{toReadable(bid.bidDate)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`font-bold ${i === 0 ? 'text-green-600' : 'text-gray-700'}`}>₹{bid.bidPricePerKg}</span>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 text-center italic py-4">No bids yet. Be the first!</p>
                                    )}
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}