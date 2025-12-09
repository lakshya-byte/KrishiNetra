'use client';

import {useEffect, useState} from 'react';
import {Search, Plus, Edit, Eye} from 'lucide-react';
import {apiClient, GET_ALL_BATCHES} from '@/service/api';
import {useRouter} from 'next/navigation';

// Helper function to calculate "Days Ago"
const calculateDaysAgo = (dateString: string) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export default function Batches() {
    const router = useRouter();
    const [filter, setFilter] = useState('All');
    const [batchesData, setBatchesData] = useState<any[]>([]); // Added simple type safety
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // Added loading state

    const filters = ['All', 'Listed', 'Bidding', 'InTransaction', 'SoldToDistributor'];

    useEffect(() => {
        const getBatches = async () => {
            try {
                const res = await apiClient.get(GET_ALL_BATCHES);

                // Safety check to ensure data exists
                if (res?.data?.data) {
                    const mappedData = res.data.data.map((batch: any) => ({
                        id: batch._id,
                        batchId: batch.batchId,
                        name: batch.cropType, // Connected: cropType
                        quantity: `${batch.availableQuantity} kg`, // Connected: availableQuantity
                        price: `₹${batch.pricePerKg}/kg`, // Connected: pricePerKg
                        rating: batch.rating?.overall || 0, // Connected: rating.overall with fallback
                        status: batch.status,
                        // Connected: Checks if images array exists and has items, else uses default
                        image: (batch.images && batch.images.length > 0)
                            ? batch.images[0]
                            : "https://res.cloudinary.com/ddmcleckw/image/upload/v1764937735/batches/z2d49xicqflkoqdeg21v.webp",
                        daysAgo: calculateDaysAgo(batch.createdAt), // Connected: Helper function
                    }));

                    setBatchesData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching batches:", error);
            } finally {
                setLoading(false);
            }
        };
        getBatches();
    }, []);

    const filteredBatches = batchesData.filter((batch) => {
        const matchesFilter = filter === 'All' || batch.status === filter;
        const matchesSearch = batch.name?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <div className="p-8 text-center">Loading batches...</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-[#0F1419] font-bold text-2xl">My Batches</h1>
                <button
                    onClick={() => router.replace('/protected/farmer/addBatch')}
                    className="flex items-center gap-2 px-6 py-3 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-sm"
                >
                    <Plus className="w-5 h-5"/>
                    <span>Add New Batch</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`
                  px-4 py-2 rounded-lg text-sm transition-all duration-150 font-medium
                  ${filter === f
                                    ? 'bg-[#E8A314] text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                `}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search batches by crop name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Batch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBatches.map((batch, index) => (
                    <div
                        key={batch.id}
                        className="bg-white cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border border-transparent hover:border-gray-100"
                        style={{
                            animation: `fadeInUp 300ms ease-out ${index * 100}ms both`,
                        }}
                        onClick={() => router.replace(`/protected/distributor/batches/${batch.id}`)}
                    >
                        {/* Image Section */}
                        <div className="relative h-40 overflow-hidden group bg-gray-100">
                            <img
                                src={batch.image}
                                alt={batch.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-medium border-2 border-white shadow-sm
                                    ${batch.status === 'Listed' ? 'bg-green-600' :
                                    batch.status === 'Bidding' ? 'bg-blue-600' : 'bg-gray-800'}
                                `}
                            >
                                {batch.status}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[#0F1419] text-lg font-semibold capitalize">{batch.name}</h3>
                                    <p className="text-[#666666] text-sm font-medium">{batch.quantity}</p>
                                </div>
                                <div className="text-[#E8A314] text-lg font-bold">{batch.price}</div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                    ID: {batch.batchId}
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-[#666666] text-sm font-medium">{batch.rating}/5</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-[#999999] text-xs">Added {batch.daysAgo} days ago</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.replace(`/protected/farmer/batches/${batch.id}`);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#2D7A3E] text-[#2D7A3E] rounded-lg hover:bg-[#E8F5E9] transition-all duration-150 shadow-sm"
                                >
                                    <Eye className="w-4 h-4"/>
                                    <span className="text-sm font-medium">View</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Add edit logic here
                                    }}
                                    className="flex items-center justify-center px-4 py-2 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] transition-all duration-150 shadow-sm"
                                >
                                    <Edit className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!loading && filteredBatches.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No batches found</h3>
                    <p className="text-[#666666] mt-1">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}