import { useState } from 'react';
import { MapPin, Eye, Info } from 'lucide-react';

const transfers = [
  {
    id: 'BTC-2025-001',
    destination: 'Restaurant XYZ, Bangalore',
    status: 'In Transit',
    statusColor: '#4CAF50',
    progress: 2,
    steps: [
      { label: 'Farm Departure', completed: true, time: 'Nov 28, 2:30 PM' },
      { label: 'En Route', completed: false, time: 'Current' },
      { label: 'Delivery Expected', completed: false, time: 'Nov 29, 9:00 AM' },
    ],
    distance: '45 km',
    eta: '~1.5 hours',
    vehicle: 'KA-01-AB-1234',
  },
  {
    id: 'BTC-2025-002',
    destination: 'Market ABC, Mumbai',
    status: 'Awaiting Approval',
    statusColor: '#FF9800',
    progress: 1,
    steps: [
      { label: 'Farm Departure', completed: true, time: 'Nov 27, 8:00 AM' },
      { label: 'Quality Check', completed: false, time: 'Pending' },
      { label: 'Delivery Expected', completed: false, time: 'Nov 30, 10:00 AM' },
    ],
    distance: '120 km',
    eta: '~4 hours',
    vehicle: 'MH-02-CD-5678',
  },
  {
    id: 'BTC-2025-003',
    destination: 'Wholesaler PQR, Delhi',
    status: 'In Transit',
    statusColor: '#4CAF50',
    progress: 2,
    steps: [
      { label: 'Farm Departure', completed: true, time: 'Nov 28, 6:00 AM' },
      { label: 'En Route', completed: false, time: 'Current' },
      { label: 'Delivery Expected', completed: false, time: 'Nov 28, 6:00 PM' },
    ],
    distance: '25 km',
    eta: '~45 minutes',
    vehicle: 'DL-03-EF-9012',
  },
];

export default function PendingTransfers() {
  const [filter, setFilter] = useState('All');
  const [selectedTransfer, setSelectedTransfer] = useState<typeof transfers[0] | null>(null);

  const filters = ['All', 'In Transit', 'Awaiting Approval', 'Delayed'];

  const filteredTransfers = transfers.filter((transfer) => {
    if (filter === 'All') return true;
    return transfer.status === filter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[#0F1419]">Pending Transfers</h1>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-2 rounded-lg text-sm transition-all duration-150
                ${
                  filter === f
                    ? 'bg-[#1A5F9E] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transfer Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTransfers.map((transfer, index) => (
          <div
            key={transfer.id}
            className="bg-white rounded-xl p-6 border-t-4 shadow-sm hover:shadow-lg transition-all duration-200"
            style={{
              borderTopColor: '#1A5F9E',
              animation: `fadeInLeft 300ms ease-out ${index * 100}ms both`,
            }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-[#0F1419] text-lg">Batch {transfer.id}</h3>
                  <span
                    className="px-3 py-1 text-white text-xs rounded-full"
                    style={{ backgroundColor: transfer.statusColor }}
                  >
                    {transfer.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#666666] text-sm">
                  <span>→</span>
                  <span>{transfer.destination}</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="text-[#666666]">Vehicle: {transfer.vehicle}</div>
                <div className="text-[#666666]">{transfer.distance} · {transfer.eta}</div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="mb-6">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-0"></div>
                <div
                  className="absolute top-5 left-0 h-1 bg-[#4CAF50] transition-all duration-500 -z-0"
                  style={{ width: `${(transfer.progress / 3) * 100}%` }}
                ></div>

                {transfer.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex flex-col items-center flex-1 z-10">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center mb-2
                        ${
                          step.completed
                            ? 'bg-[#4CAF50] text-white'
                            : stepIndex === transfer.progress - 1
                            ? 'bg-[#FF9800] text-white animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                        }
                      `}
                    >
                      {step.completed ? '✓' : stepIndex + 1}
                    </div>
                    <div className="text-center">
                      <div className="text-[#0F1419] text-sm mb-1">{step.label}</div>
                      <div className="text-[#999999] text-xs">{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="mb-4">
              <div className="h-40 bg-gradient-to-br from-[#E3F2FD] to-[#E8F5E9] rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Decorative route line */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 160">
                  <path
                    d="M 20 80 Q 100 40, 200 80 T 380 80"
                    stroke="#1A5F9E"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8 4"
                  />
                </svg>
                <div className="relative text-center">
                  <MapPin className="w-12 h-12 text-[#1A5F9E] mx-auto mb-2 animate-bounce" />
                  <p className="text-[#666666] text-sm">
                    {transfer.distance} remaining · {transfer.eta}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTransfer(transfer)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[#2D7A3E] text-[#2D7A3E] rounded-lg hover:bg-[#E8F5E9] hover:shadow-md transition-all duration-150"
              >
                <Eye className="w-4 h-4" />
                View Full Map
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#E8A314] text-white rounded-lg hover:bg-[#D49014] hover:shadow-md transition-all duration-150">
                <Info className="w-4 h-4" />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTransfers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-[#666666]">No transfers found matching your criteria.</p>
        </div>
      )}

      {/* Map Modal */}
      {selectedTransfer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTransfer(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-4xl w-full"
            style={{ animation: 'slideUp 300ms ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[#0F1419]">Live Tracking - Batch {selectedTransfer.id}</h2>
                <p className="text-[#666666] text-sm">{selectedTransfer.destination}</p>
              </div>
              <button
                onClick={() => setSelectedTransfer(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Full Map */}
            <div className="h-96 bg-gradient-to-br from-[#E3F2FD] to-[#E8F5E9] rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
              {/* Decorative route */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 400">
                <path
                  d="M 40 350 Q 200 250, 400 200 T 760 80"
                  stroke="#1A5F9E"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="12 6"
                />
                {/* Start point */}
                <circle cx="40" cy="350" r="8" fill="#2D7A3E" />
                {/* End point */}
                <circle cx="760" cy="80" r="8" fill="#E53935" />
                {/* Current position */}
                <circle cx="400" cy="200" r="12" fill="#FF9800">
                  <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div className="relative text-center z-10">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <MapPin className="w-16 h-16 text-[#FF9800] mx-auto mb-3 animate-bounce" />
                  <p className="text-[#0F1419] mb-2">Vehicle is en route</p>
                  <p className="text-[#666666] text-sm mb-1">{selectedTransfer.distance} remaining</p>
                  <p className="text-[#666666] text-sm">ETA: {selectedTransfer.eta}</p>
                  <p className="text-[#999999] text-xs mt-2">Last updated: 2 minutes ago</p>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                + Zoom In
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                - Zoom Out
              </button>
              <button className="flex-1 px-4 py-2 bg-[#2D7A3E] text-white rounded-lg hover:bg-[#236630] transition-colors">
                Refresh Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
