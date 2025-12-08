'use client';

import {useEffect, useState} from 'react';
import {Search, Plus, Edit, Eye} from 'lucide-react';
import {apiClient, GET_FARMER_BATCHES} from '@/service/api';
import {useRouter} from 'next/navigation';

export default function Batches() {
    const router = useRouter();
    const [filter, setFilter] = useState('All');
    const [batchesData, setBatchesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['All', 'Listed', 'Bidding', 'InTransaction', 'SoldToDistributor'];

    useEffect(() => {
        const getBatches = async () => {
            const res = await apiClient.get(GET_FARMER_BATCHES);
            console.log(res);
            const data = res.data.data.map((batch: any) => ({
                id: batch._id,
                batchId: batch.batchId,
                name: batch.cropType,
                quantity: `${batch.availableQuantity} kg`,
                price: `₹${batch.pricePerKg}/kg`,
                rating: batch.rating.overall,
                status: batch.status,
                image: batch.images[0] || "https://res.cloudinary.com/ddmcleckw/image/upload/v1764937735/batches/z2d49xicqflkoqdeg21v.webp",
            }));
            console.log(data);
            setBatchesData(data);
        };
        getBatches();

    }, []);

    const filteredBatches = batchesData.filter((batch) => {
        const matchesFilter = filter === 'All' || batch.status === filter;
        const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-[#0F1419]">My Batches</h1>
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
                  px-4 py-2 rounded-lg text-sm transition-all duration-150
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
                        className="bg-white cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                        style={{
                            animation: `fadeInUp 300ms ease-out ${index * 100}ms both`,
                        }}
                        onClick={() => router.replace(`/protected/farmer/batches/${batch.id}`)}
                    >
                        {/* Image Section */}
                        <div className="relative h-40 overflow-hidden group">
                            <img
                                src={batch.image}
                                alt={batch.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs bg-gray-800 bg-opacity-75 border-2 border-white"
                            >
                                {batch.status}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="text-[#0F1419] text-lg">{batch.name}</h3>
                                <p className="text-[#666666] text-sm">{batch.quantity}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-[#E8A314] text-xl">{batch.price}</div>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-[#666666] text-sm">{batch.rating}/5</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-200">
                                <p className="text-[#999999] text-xs">Added {batch.daysAgo} days ago</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[#2D7A3E] text-[#2D7A3E] rounded-lg hover:bg-[#E8F5E9] transition-all duration-150">
                                    <Eye className="w-4 h-4"/>
                                    <span className="text-sm">View Details</span>
                                </button>
                                <button
                                    className="flex items-center justify-center px-4 py-2 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] transition-all duration-150">
                                    <Edit className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBatches.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl">
                    <p className="text-[#666666]">No batches found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
