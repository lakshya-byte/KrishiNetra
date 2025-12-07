'use client';
import { Package, IndianRupee, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const summaryCards = [
  {
    icon: Package,
    number: '12',
    label: 'Active Batches',
    subtext: '8 sold, 4 pending',
    bgColor: '#E8F5E9',
    borderColor: '#2D7A3E',
    iconColor: '#2D7A3E',
    numberColor: '#2D7A3E',
  },
  {
    icon: IndianRupee,
    number: '₹48,500',
    label: 'Total Earnings',
    subtext: '+12% vs last month',
    bgColor: '#FFF8E1',
    borderColor: '#E8A314',
    iconColor: '#E8A314',
    numberColor: '#E8A314',
  },
  {
    icon: Clock,
    number: '3',
    label: 'Action Needed',
    subtext: '2 transfers, 1 bid expiring',
    bgColor: '#FFF3E0',
    borderColor: '#FF9800',
    iconColor: '#FF9800',
    numberColor: '#FF9800',
  },
];

const recentActivity = [
  {
    text: 'Batch #342 sold to Restaurant XYZ',
    time: '2 hours ago',
    icon: '✓',
    iconColor: '#4CAF50',
  },
  {
    text: '₹4,000 received for tomato batch',
    time: '5 hours ago',
    icon: '₹',
    iconColor: '#E8A314',
  },
  {
    text: 'Bidding started on pepper batch',
    time: '1 day ago',
    icon: '⚡',
    iconColor: '#FF9800',
  },
  {
    text: 'Batch #340 approved on blockchain',
    time: '2 days ago',
    icon: '⛓',
    iconColor: '#1A5F9E',
  },
];

const earningsData = [
  { month: 'Jun', earnings: 28000 },
  { month: 'Jul', earnings: 35000 },
  { month: 'Aug', earnings: 42000 },
  { month: 'Sep', earnings: 38000 },
  { month: 'Oct', earnings: 52000 },
  { month: 'Nov', earnings: 48500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border-l-4 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: card.bgColor,
                borderLeftColor: card.borderColor,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Icon className="w-8 h-8 mb-3" style={{ color: card.iconColor }} />
                  <div className="text-3xl mb-1" style={{ color: card.numberColor }}>
                    {card.number}
                  </div>
                  <div className="text-[#0F1419] mb-1">{card.label}</div>
                  <div className="text-sm text-[#666666]">{card.subtext}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity - Left Column (60%) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-[#0F1419] mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#F5F5F5] transition-colors duration-150 cursor-pointer"
                style={{
                  animation: `slideInLeft 300ms ease-out ${index * 100}ms both`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${activity.iconColor}20` }}
                >
                  <span style={{ color: activity.iconColor }}>{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[#0F1419] text-sm">{activity.text}</div>
                  <div className="text-[#999999] text-xs mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats - Right Column (40%) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-[#0F1419] mb-6">Quick Stats</h2>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D7A3E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2D7A3E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666666" />
                <YAxis tick={{ fontSize: 12 }} stroke="#666666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#2D7A3E"
                  strokeWidth={3}
                  fill="url(#earningsGradient)"
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-[#666666] text-sm">Average earning:</span>
              <span className="text-[#0F1419]">₹32,000/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666] text-sm">Best month:</span>
              <span className="text-[#0F1419]">₹52,000 (October)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#666666] text-sm">Trend:</span>
              <span className="text-[#4CAF50] flex items-center gap-1">
                <span>↑</span> Upward trend
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
