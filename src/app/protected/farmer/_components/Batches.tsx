import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Eye } from 'lucide-react';
import { apiClient, GET_FARMER_BATCHES } from '@/service/api';
import { set } from 'date-fns';
import { id } from 'date-fns/locale';

interface BatchesProps {
  onAddBatch: () => void;
}

const batches = [
  {
    id: 'BTC-2025-001',
    name: 'Tomatoes',
    quantity: '500 kg',
    price: '₹8/kg',
    rating: 4.8,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
    daysAgo: 3,
    statusColor: '#4CAF50',
  },
  {
    id: 'BTC-2025-002',
    name: 'Onions',
    quantity: '750 kg',
    price: '₹6/kg',
    rating: 4.5,
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400',
    daysAgo: 7,
    statusColor: '#1A5F9E',
  },
  {
    id: 'BTC-2025-003',
    name: 'Green Peppers',
    quantity: '300 kg',
    price: '₹12/kg',
    rating: 4.9,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400',
    daysAgo: 1,
    statusColor: '#4CAF50',
  },
  {
    id: 'BTC-2025-004',
    name: 'Rice',
    quantity: '1000 kg',
    price: '₹45/kg',
    rating: 4.7,
    status: 'Pending Approval',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    daysAgo: 2,
    statusColor: '#FF9800',
  },
  {
    id: 'BTC-2025-005',
    name: 'Cotton',
    quantity: '400 kg',
    price: '₹60/kg',
    rating: 4.6,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8dd6?w=400',
    daysAgo: 5,
    statusColor: '#4CAF50',
  },
  {
    id: 'BTC-2025-006',
    name: 'Potatoes',
    quantity: '850 kg',
    price: '₹5/kg',
    rating: 4.4,
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    daysAgo: 10,
    statusColor: '#1A5F9E',
  },
];

export default function Batches({ onAddBatch }: BatchesProps) {
  const [filter, setFilter] = useState('All');
  const [batchesData, setBatchesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Active', 'Sold', 'Pending', 'Completed'];

    useEffect(() => {
        const getBatches = async () => {
            const res = await apiClient.get(GET_FARMER_BATCHES);
            console.log(res);
            const data = res.data.data.map((batch: any) => ({
                id: batch.batchId,
                name: batch.cropType,
                quantity: `${batch.availableQuantity} kg`,
                price: `₹${batch.pricePerKg}/kg`,
                rating: batch.rating.overall,
                status: batch.status,
                image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', // Placeholder image
            }));
            console.log(data);
            setBatchesData(data);
        };
        getBatches();

    }, []);

  const filteredBatches = batchesData.filter((batch) => {
    const matchesFilter = filter === 'All' || batch.status === filter || 
      (filter === 'Pending' && batch.status === 'Pending Approval');
    const matchesSearch = batch.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[#0F1419]">My Batches</h1>
        <button
          onClick={onAddBatch}
          className="flex items-center gap-2 px-6 py-3 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-sm"
        >
          <Plus className="w-5 h-5" />
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
                  ${
                    filter === f
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            style={{
              animation: `fadeInUp 300ms ease-out ${index * 100}ms both`,
            }}
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
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[#2D7A3E] text-[#2D7A3E] rounded-lg hover:bg-[#E8F5E9] transition-all duration-150">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] transition-all duration-150">
                  <Edit className="w-4 h-4" />
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
