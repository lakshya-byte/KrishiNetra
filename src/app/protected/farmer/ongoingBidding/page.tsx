'use client';

import { useState, useEffect } from 'react';
import { Eye, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bids = [
  {
    id: 1,
    batchName: 'Premium Tomatoes',
    status: 'Auction Active',
    timeRemaining: 9900, // seconds
    currentBid: 8.5,
    numBids: 7,
    initialPrice: 8.0,
    bidHistory: [
      { time: '10:00', price: 8.0 },
      { time: '10:15', price: 8.1 },
      { time: '10:30', price: 8.2 },
      { time: '10:45', price: 8.35 },
      { time: '11:00', price: 8.5 },
    ],
  },
  {
    id: 2,
    batchName: 'Organic Onions',
    status: 'Auction Active',
    timeRemaining: 1500, // seconds
    currentBid: 6.8,
    numBids: 12,
    initialPrice: 6.0,
    bidHistory: [
      { time: '09:00', price: 6.0 },
      { time: '09:20', price: 6.2 },
      { time: '09:40', price: 6.5 },
      { time: '10:00', price: 6.7 },
      { time: '10:20', price: 6.8 },
    ],
  },
  {
    id: 3,
    batchName: 'Fresh Green Peppers',
    status: 'Auction Active',
    timeRemaining: 7200,
    currentBid: 12.2,
    numBids: 5,
    initialPrice: 12.0,
    bidHistory: [
      { time: '11:00', price: 12.0 },
      { time: '11:15', price: 12.1 },
      { time: '11:30', price: 12.2 },
    ],
  },
];

export default function OngoingBidding() {
  const [filter, setFilter] = useState('All');
  const [selectedBid, setSelectedBid] = useState<typeof bids[0] | null>(null);
  const [countdown, setCountdown] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initial: { [key: number]: number } = {};
    bids.forEach((bid) => {
      initial[bid.id] = bid.timeRemaining;
    });
    setCountdown(initial);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (updated[Number(key)] > 0) {
            updated[Number(key)] -= 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const getTimeColor = (seconds: number) => {
    if (seconds > 7200) return '#4CAF50'; // Green > 2h
    if (seconds > 1800) return '#FF9800'; // Orange 30min-2h
    return '#E53935'; // Red < 30min
  };

  const filters = ['All', 'Ending Soon', 'High Bids'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[#0F1419]">Ongoing Bidding</h1>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-2 rounded-lg text-sm transition-all duration-150
                ${
                  filter === f
                    ? 'bg-[#E8A314] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bidding Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bids.map((bid, index) => {
          const timeLeft = countdown[bid.id] || 0;
          const timeColor = getTimeColor(timeLeft);

          return (
            <div
              key={bid.id}
              className="bg-white rounded-xl p-6 border-l-4 border-[#E8A314] shadow-sm hover:shadow-lg transition-all duration-200"
              style={{
                animation: `fadeInLeft 300ms ease-out ${index * 100}ms both`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#0F1419] text-lg mb-1">{bid.batchName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#E8F5E9] text-[#2D7A3E] text-xs rounded-full animate-pulse">
                      {bid.status}
                    </span>
                  </div>
                </div>
                <div
                  className="text-right"
                  style={{
                    animation: timeLeft < 60 ? 'pulse 1s infinite' : 'none',
                  }}
                >
                  <div className="text-xs text-[#666666] mb-1">Time Remaining</div>
                  <div className="text-lg" style={{ color: timeColor }}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Bid Info */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-[#666666] text-sm mb-1">Current Highest Bid</div>
                  <div className="text-[#E8A314] text-2xl">₹{bid.currentBid.toFixed(2)}/kg</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] text-sm">{bid.numBids} bids from buyers</span>
                  <span className="text-[#999999] text-sm line-through">
                    ₹{bid.initialPrice.toFixed(2)}/kg
                  </span>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-24 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bid.bidHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#999" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#999" domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      formatter={(value: number) => `₹${value.toFixed(2)}/kg`}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#E8A314"
                      strokeWidth={2}
                      dot={{ fill: '#E8A314', r: 4 }}
                      animationDuration={500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedBid(bid)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[#2D7A3E] text-[#2D7A3E] rounded-lg hover:bg-[#E8F5E9] hover:shadow-md transition-all duration-150"
                >
                  <Eye className="w-4 h-4" />
                  View All Bids
                </button>
                <button
                  disabled={timeLeft < 60}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-150
                    ${
                      timeLeft < 60
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#E8A314] text-white hover:bg-[#D49014] hover:shadow-md'
                    }
                  `}
                >
                  <Check className="w-4 h-4" />
                  Accept Bid
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bid History Modal */}
      {selectedBid && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBid(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full"
            style={{ animation: 'slideUp 300ms ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#0F1419]">Bid History - {selectedBid.batchName}</h2>
              <button
                onClick={() => setSelectedBid(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[
                { bidder: 'Buyer #127', amount: 8.5, time: '2 minutes ago', isHighest: true },
                { bidder: 'Restaurant ABC', amount: 8.35, time: '15 minutes ago', isHighest: false },
                { bidder: 'Buyer #089', amount: 8.2, time: '30 minutes ago', isHighest: false },
                { bidder: 'Market XYZ', amount: 8.1, time: '45 minutes ago', isHighest: false },
                { bidder: 'Buyer #045', amount: 8.0, time: '1 hour ago', isHighest: false },
              ].map((bid, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-4 rounded-lg border-2
                    ${bid.isHighest ? 'bg-[#FFF8E1] border-[#E8A314]' : 'bg-white border-gray-200'}
                  `}
                  style={{ animation: `fadeInUp 200ms ease-out ${index * 50}ms both` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#0F1419]">{bid.bidder}</span>
                      {bid.isHighest && (
                        <span className="px-2 py-0.5 bg-[#E8A314] text-white text-xs rounded-full">
                          Highest
                        </span>
                      )}
                      {!bid.isHighest && (
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                          Outbid
                        </span>
                      )}
                    </div>
                    <div className="text-[#999999] text-xs mt-1">{bid.time}</div>
                  </div>
                  <div className="text-[#E8A314] text-lg">₹{bid.amount.toFixed(2)}/kg</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
