'use client';

import React, { useState, useEffect, useContext, use, useRef } from 'react';
import { motion } from 'motion/react';
import {
    Wheat,
    MapPin,
    Calendar,
    User,
    Share2,
    Download,
    Edit3,
    Bell,
    Home,
    ChevronRight,
    QrCode,
    Check,
    Clock,
    Truck,
    Store,
    Award,
    DollarSign,
    History,
    MessageSquare,
    Copy,
    Heart,
    ChevronUp,
} from 'lucide-react';
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Separator } from '@/ui/separator';
import { Textarea } from '@/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AuthContext } from '@/context/AuthProvider';
import { useParams } from 'next/navigation';
import { apiClient, GET_BATCH_BY_ID, POST_ENLIST_BATCH, POST_START_BIDDING } from '@/service/api';
import { set } from 'date-fns';
import Spinner from "@/app/components/Spinner";
// Mock data for the batch
const batchData = {
    id:"DLFSDfljdlfjsdlkfjlsdkfj",
    batchId: 'BT-2024-001',
    cropType: 'Wheat',
    quantity: '500 kg',
    status: 'Created',
    harvestDate: '2024-12-15',
    farmLocation: 'Punjab, India',
    currentOwner: 'Green Valley Distributors',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BT-2024-001',
    farmer: {
        name: 'Rajesh Kumar',
        avatar: '/placeholder-farmer.jpg',
        location: 'Amritsar, Punjab'
    },
    distributor: {
        name: 'Green Valley Distributors',
        avatar: '/placeholder-distributor.jpg',
        location: 'Delhi, India'
    },
    retailer: {
        name: 'Fresh Mart',
        avatar: '/placeholder-retailer.jpg',
        location: 'Mumbai, India'
    }
};

const priceData = [
    { stage: 'Farmer', price: 25, color: '#228B22' },
    { stage: 'Distributor', price: 35, color: '#FF9933' },
    { stage: 'Retailer', price: 45, color: '#000080' },
    { stage: 'Consumer', price: 55, color: '#32CD32' }
];

const certifications = [
    {
        id: 1,
        name: 'Organic Certification',
        authority: 'APEDA',
        validUntil: '2025-12-31',
        icon: Award
    },
    {
        id: 2,
        name: 'Quality Grade A',
        authority: 'FCI',
        validUntil: '2025-06-30',
        icon: Award
    },
    {
        id: 3,
        name: 'Pesticide Free',
        authority: 'FSSAI',
        validUntil: '2025-12-31',
        icon: Award
    }
];

const transactions = [
    {
        id: 1,
        hash: '0x1a2b3c4d5e6f7g8h9i0j',
        timestamp: '2024-12-15 10:30 AM',
        action: 'Batch Created',
        gasfee: '0.001 ETH',
        status: 'Confirmed'
    },
    {
        id: 2,
        hash: '0x2b3c4d5e6f7g8h9i0j1k',
        timestamp: '2024-12-16 02:15 PM',
        action: 'Transferred to Distributor',
        gasfee: '0.002 ETH',
        status: 'Confirmed'
    },
    {
        id: 3,
        hash: '0x3c4d5e6f7g8h9i0j1k2l',
        timestamp: '2024-12-18 11:45 AM',
        action: 'Quality Verified',
        gasfee: '0.001 ETH',
        status: 'Confirmed'
    }
];

const timelineSteps = [
    {
        id: 1,
        title: 'Farmer',
        name: 'Rajesh Kumar',
        location: 'Amritsar, Punjab',
        date: '2024-12-15',
        time: '10:30 AM',
        status: 'completed',
        icon: User,
        avatar: '/placeholder-farmer.jpg'
    },
    {
        id: 2,
        title: 'Distributor',
        name: 'Green Valley Distributors',
        location: 'Delhi, India',
        date: '2024-12-16',
        time: '02:15 PM',
        status: 'completed',
        icon: Truck,
        avatar: '/placeholder-distributor.jpg'
    },
    {
        id: 3,
        title: 'Retailer',
        name: 'Fresh Mart',
        location: 'Mumbai, India',
        date: '2024-12-20',
        time: 'Expected',
        status: 'current',
        icon: Store,
        avatar: '/placeholder-retailer.jpg'
    },
    {
        id: 4,
        title: 'Consumer',
        name: 'End Customer',
        location: 'Mumbai, India',
        date: '2024-12-22',
        time: 'Expected',
        status: 'pending',
        icon: User,
        avatar: '/placeholder-consumer.jpg'
    }
];

const comments = [
    {
        id: 1,
        user: 'Rajesh Kumar',
        role: 'Farmer',
        avatar: '/placeholder-farmer.jpg',
        comment: 'High quality wheat harvest this season. Organic farming methods used.',
        timestamp: '2024-12-15 11:00 AM',
        likes: 5
    },
    {
        id: 2,
        user: 'Green Valley Distributors',
        role: 'Distributor',
        avatar: '/placeholder-distributor.jpg',
        comment: 'Quality inspection completed. Ready for transport to retailer.',
        timestamp: '2024-12-17 09:30 AM',
        likes: 3
    }
];

// Main App Component
export default function App() {
    const [activeTab, setActiveTab] = useState('details');
    const [loading , setLoading] = useState(true); 
    const effectRan = useRef(false);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [qrHovered, setQrHovered] = useState(false);
    const [viewEnlistBatchModal, setViewEnlistBatchModal] = useState(false);
    const [batchData, setBatchData] = useState({} as any);
    const [viewBiddingForm, setViewBiddingForm] = useState(false);
    const [closingDate, setClosingDate] = useState('');

    useEffect(() => {
        if(effectRan.current) return;
        const fetchBatchData = async () => {
            try {
                const res = await apiClient.get(`${GET_BATCH_BY_ID}/${id}`);
                setBatchData(res.data.data);
                console.log(res.data.data);
                toast.success('Batch data fetched successfully!');
            } catch (error) {
                console.error('Failed to fetch batch data:', error);
            }finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchBatchData();
        }
        effectRan.current = true;
    }, [id]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 border-green-200';
            case 'In Transit': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Delivered': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const downloadQR = () => {
        const link = document.createElement('a');
        link.href = batchData.qrCode;
        link.download = `${batchData.batchId}-qr-code.png`;
        link.click();
        toast.success('QR Code downloaded successfully!');
    };

    const handleEnlistBatch = async() => {
        try{
            console.log(batchData)
            const payload = {
                id:batchData._id,
            }
            const res = await apiClient.post(POST_ENLIST_BATCH, payload);
            if(res.data.status === 200){
                toast.success('Batch enlisted successfully!');
            } else {
                toast.error('Failed to enlist batch.');
            }
        } catch (error) {
            toast.error('An error occurred while enlisting the batch.');
            console.log(error);
        }finally {
            setViewEnlistBatchModal(false);
        }
    }

    const handleStartBidding = async() => {
        const payload = {
            id:batchData._id,
            closingDate:closingDate
        }
        try{
            const res = await apiClient.post(POST_START_BIDDING, payload);
            console.log(res);
        }catch(error){
            console.log(error);
        }

    if(loading){
        return(
            <div className="min-h-screen flex justify-center items-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
                <div className="flex justify-end items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        QR
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                </div>
            <main className="container mx-auto px-4 py-6 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="bg-linear-to-r from-orange-50 to-white border-orange-200">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Wheat className="h-8 w-8" style={{ color: '#FF9933' }} />
                                            <div>
                                                <h2 className="text-2xl font-semibold">{batchData.batchId}</h2>
                                                <p className="text-muted-foreground">{batchData.cropType}</p>
                                            </div>
                                        </div>
                                        <Badge className={`${getStatusColor(batchData.status)} px-3 py-1`}>
                                            {batchData.status}
                                        </Badge>
                                        <Badge variant="secondary" className="px-3 py-1">
                                            {batchData.quantity}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Harvest Date</p>
                                                <p className="font-medium">{batchData.harvestDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Farm Location</p>
                                                <p className="font-medium">{batchData.farmLocation}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Current Owner</p>
                                                <p className="font-medium">{batchData.currentOwner}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center space-y-2">
                                    <motion.div
                                        className="cursor-pointer border-2 border-dashed border-orange-200 rounded-lg p-2"
                                        whileHover={{ scale: qrHovered ? 1.1 : 1.05 }}
                                        onHoverStart={() => setQrHovered(true)}
                                        onHoverEnd={() => setQrHovered(false)}
                                        onClick={downloadQR}
                                    >
                                        <QrCode className="h-24 w-24" style={{ color: '#FF9933' }} />
                                    </motion.div>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Click to download QR code
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                {/* <ProvenanceTimeline /> */}

                {/* -------------- ACTIONS ----------------------- */}
                <div className='bg-white p-4 rounded-lg border'>
                    <div>
                        <div>
                            <h1 className='font-bold text-lg'>Actions</h1>
                        </div>
                        <div className='flex flex-wrap gap-4 mt-4'>
                            {batchData.status === 'Created' &&
                                <button 
                                    onClick={() => setViewEnlistBatchModal(true)}
                                    className='flex items-center gap-2 px-4 py-2 border-[#F57C00] border-2 rounded-lg text-[#F57C00] cursor-pointer hover:bg-[#F57C00] hover:text-white transition-all duration-150'>
                                    <Check className='h-4 w-4' />
                                    <p>Enlist Batch</p>
                                </button>
                            }   
                            {viewEnlistBatchModal && 
                            <div className='fixed z-50 w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
                                <div className='bg-white rounded-lg p-6'>
                                    <h2 className='text-xl font-semibold mb-4'>Confirm Enlist Batch</h2>
                                    <p>Are you sure you want to enlist this batch on the marketplace?</p>
                                    <button 
                                        className='mt-3 py-2 px-4 border-[#F57C00] border-2 rounded-lg text-[#F57C00] cursor-pointer hover:bg-[#F57C00] hover:text-white transition-all duration-150' 
                                        onClick={() => handleEnlistBatch()}>Confirm</button>
                                    <button 
                                        onClick={() => setViewEnlistBatchModal(false)} 
                                        className='py-2 px-4 border-gray-600 border-2 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-150 ml-4'>Cancel</button>
                                </div>
                            </div>
                            }
                            {(batchData.status === 'Listed' && !viewBiddingForm)  &&
                                <button 
                                    onClick={() => setViewBiddingForm(true)}
                                    className='flex items-center gap-2 px-4 py-2 border-[#F57C00] border-2 rounded-lg text-[#F57C00] cursor-pointer hover:bg-[#F57C00] hover:text-white transition-all duration-150'>
                                    <Check className='h-4 w-4' />
                                    <p>Start Bidding</p>
                                </button>
                            }
                            {viewBiddingForm &&
                                <div>
                                    <h1>Start Bidding</h1>
                                    <div>
                                        <label>Enter Closing Date: </label>
                                        <input
                                            type="date"
                                            value={formData.harvestDate}
                                            onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                                        />
                                        <button 
                                            onClick={() => setViewBiddingForm(true)}
                                            className='flex items-center gap-2 px-4 py-2 border-[#F57C00] border-2 rounded-lg text-[#F57C00] cursor-pointer hover:bg-[#F57C00] hover:text-white transition-all duration-150'>
                                            <Check className='h-4 w-4' />
                                            <p>Start Bidding</p>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="details" className="flex items-center space-x-2">
                                        <Wheat className="h-4 w-4" />
                                        <span className="hidden sm:inline">Product Details</span>
                                        <span className="sm:hidden">Details</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="certifications" className="flex items-center space-x-2">
                                        <Award className="h-4 w-4" />
                                        <span className="hidden sm:inline">Certifications</span>
                                        <span className="sm:hidden">Certs</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="pricing" className="flex items-center space-x-2">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="hidden sm:inline">Price Transparency</span>
                                        <span className="sm:hidden">Price</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="transactions" className="flex items-center space-x-2">
                                        <History className="h-4 w-4" />
                                        <span className="hidden sm:inline">Transaction History</span>
                                        <span className="sm:hidden">History</span>
                                    </TabsTrigger>
                                </TabsList>

                                <div className="mt-6">
                                    <TabsContent value="details" className="space-y-4">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h3 className="font-semibold">Specifications</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between py-2 border-b">
                                                        <span className="text-muted-foreground">Crop Variety</span>
                                                        <span className="font-medium">HD-2967 (High Yielding)</span>
                                                    </div>
                                                    <div className="flex justify-between py-2 border-b">
                                                        <span className="text-muted-foreground">Grade</span>
                                                        <span className="font-medium">Grade A</span>
                                                    </div>
                                                    <div className="flex justify-between py-2 border-b">
                                                        <span className="text-muted-foreground">Moisture Content</span>
                                                        <span className="font-medium">12.5%</span>
                                                    </div>
                                                    <div className="flex justify-between py-2 border-b">
                                                        <span className="text-muted-foreground">Protein Content</span>
                                                        <span className="font-medium">11.8%</span>
                                                    </div>
                                                    <div className="flex justify-between py-2 border-b">
                                                        <span className="text-muted-foreground">Organic Certified</span>
                                                        <span className="font-medium text-green-600">Yes</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="font-semibold">Image Gallery</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* <ImageWithFallback */}
                                                    {/* //     src="https://images.unsplash.com/photo-1729041221905-0519efecaa92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWlucyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1OTIwNzM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                //     alt="Wheat grains"
                //     className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                // />
                // <ImageWithFallback
                //     src="https://images.unsplash.com/photo-1666987570506-f8c3e05b6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm0lMjBjcm9wc3xlbnwxfHx8fDE3NTkyMDczNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                //     alt="Farm field"
                //     className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                // />
                // <ImageWithFallback
                //     src="https://images.unsplash.com/photo-1695150601855-f545034a070a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyaWNlJTIwZmFybWluZyUyMGluZGlhfGVufDF8fHx8MTc1OTE2MDMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                //     alt="Rice farming"
                //     className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                // /> */}
                                                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                                                        +2 more photos
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="certifications" className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {certifications.length > 0 ?
                                                (certifications.map((cert) => (
                                                    <motion.div
                                                        key={cert.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        className="cursor-pointer"
                                                    >
                                                        <Card className="h-full">
                                                            <CardContent className="p-4">
                                                                <div className="flex items-start space-x-3">
                                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                                        <cert.icon className="h-5 w-5 text-green-600" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h4 className="font-medium">{cert.name}</h4>
                                                                        <p className="text-sm text-muted-foreground">by {cert.authority}</p>
                                                                        <p className="text-xs text-muted-foreground mt-2">
                                                                            Valid until: {cert.validUntil}
                                                                        </p>
                                                                        <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                                                                            <Download className="h-3 w-3 mr-1" />
                                                                            Download
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                ))) : <>
                                                    <h1>No certificates found.</h1>
                                                </>}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="pricing" className="space-y-4">
                                        <PriceTransparencyTab />
                                    </TabsContent>

                                    <TabsContent value="transactions" className="space-y-4">
                                        <TransactionHistoryTab />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>

                <CommentsSection />
            </main>
        </div>
    );
}


// Timeline Component
const ProvenanceTimeline = () => {
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Truck className="h-5 w-5" style={{ color: '#000080' }} />
                        <span>Provenance Timeline</span>
                    </CardTitle>
                    <CardDescription>
                        Track the journey of this batch from farm to consumer
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        {/* Desktop Timeline */}
                        <div className="hidden lg:flex justify-between items-center relative">
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-linear-to-r from-green-500 via-orange-500 to-blue-500 opacity-30"></div>

                            {timelineSteps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    className="flex flex-col items-center space-y-2 relative z-10 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                                        step.status === 'current' ? 'bg-orange-500 border-orange-500 text-white' :
                                            'bg-gray-200 border-gray-300 text-gray-500'
                                        }`}>
                                        {step.status === 'completed' ? (
                                            <Check className="h-5 w-5" />
                                        ) : step.status === 'current' ? (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Clock className="h-5 w-5" />
                                            </motion.div>
                                        ) : (
                                            <step.icon className="h-5 w-5" />
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <p className="font-medium text-sm">{step.title}</p>
                                        <p className="text-xs text-muted-foreground">{step.name}</p>
                                        <p className="text-xs text-muted-foreground">{step.date}</p>
                                    </div>

                                    {/* Expandable details */}
                                    {selectedStep === step.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-16 bg-white border rounded-lg shadow-lg p-4 w-64 z-20"
                                        >
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={step.avatar} />
                                                    <AvatarFallback>{step.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{step.name}</p>
                                                    <p className="text-xs text-muted-foreground">{step.location}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                <p>Date: {step.date}</p>
                                                <p>Time: {step.time}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Timeline */}
                        <div className="lg:hidden space-y-4">
                            {timelineSteps.map((step, index) => (
                                <div key={step.id} className="flex items-start space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                                        step.status === 'current' ? 'bg-orange-500 border-orange-500 text-white' :
                                            'bg-gray-200 border-gray-300 text-gray-500'
                                        }`}>
                                        {step.status === 'completed' ? (
                                            <Check className="h-4 w-4" />
                                        ) : step.status === 'current' ? (
                                            <Clock className="h-4 w-4" />
                                        ) : (
                                            <step.icon className="h-4 w-4" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{step.title}</p>
                                                <p className="text-sm text-muted-foreground">{step.name}</p>
                                                <p className="text-sm text-muted-foreground">{step.location}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">{step.date}</p>
                                                <p className="text-xs text-muted-foreground">{step.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Price Transparency Tab
const PriceTransparencyTab = () => {
    const [selectedBar, setSelectedBar] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {priceData.map((item) => (
                    <Card key={item.stage} className="text-center">
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{item.stage}</p>
                                <p className="text-xl font-semibold">₹{item.price}</p>
                                <p className="text-xs text-muted-foreground">per kg</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Price Breakdown Chart</CardTitle>
                    <CardDescription>
                        Price progression from farmer to consumer
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={priceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [`₹${value}`, 'Price per kg']}
                                    labelFormatter={(label) => `Stage: ${label}`}
                                />
                                <Bar
                                    dataKey="price"
                                    fill="#FF9933"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Transaction History Tab
const TransactionHistoryTab = () => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Transaction hash copied to clipboard!');
    };

    return (
        <div className="space-y-4">
            {transactions.map((transaction) => (
                <Card key={transaction.id}>
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">{transaction.action}</Badge>
                                    <Badge className="bg-green-100 text-green-800">
                                        {transaction.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {transaction.timestamp}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {transaction.hash.substring(0, 20)}...
                                    </code>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(transaction.hash)}
                                        className="h-6 w-6 p-0"
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Gas Fee</p>
                                <p className="font-medium">{transaction.gasfee}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

// Comments Section
const CommentsSection = () => {
    const [newComment, setNewComment] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const addComment = () => {
        if (newComment.trim()) {
            toast.success('Comment added successfully!');
            setNewComment('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5" style={{ color: '#228B22' }} />
                            <span>Comments & Notes</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                    </CardTitle>
                </CardHeader>

                {isExpanded && (
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-medium text-sm">{comment.user}</p>
                                            <Badge variant="outline" className="text-xs">
                                                {comment.role}
                                            </Badge>
                                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                        </div>
                                        <p className="text-sm">{comment.comment}</p>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm" className="h-6 p-1">
                                                <Heart className="h-3 w-3 mr-1" />
                                                {comment.likes}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-20"
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-muted-foreground">
                                    {newComment.length}/500 characters
                                </p>
                                <Button onClick={addComment} disabled={!newComment.trim()}>
                                    Add Comment
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </motion.div>
    );
};