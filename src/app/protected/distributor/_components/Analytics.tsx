import { TrendingUp, DollarSign, Package, Star } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const summaryCards = [
  {
    icon: DollarSign,
    number: '₹2,48,500',
    label: 'Total Sales',
    change: '+18%',
    changeColor: '#4CAF50',
    iconColor: '#2D7A3E',
    bgColor: '#E8F5E9',
  },
  {
    icon: TrendingUp,
    number: '₹7.85/kg',
    label: 'Average Price',
    change: '+5%',
    changeColor: '#4CAF50',
    iconColor: '#E8A314',
    bgColor: '#FFF8E1',
  },
  {
    icon: Package,
    number: '28',
    label: 'Batches Sold',
    change: '+8',
    changeColor: '#666666',
    iconColor: '#1A5F9E',
    bgColor: '#E3F2FD',
  },
  {
    icon: Star,
    number: '4.8/5',
    label: 'Customer Satisfaction',
    change: '142 reviews',
    changeColor: '#666666',
    iconColor: '#E8A314',
    bgColor: '#FFF8E1',
  },
];

const salesTrendData = [
  { day: 'Day 1', sales: 8500 },
  { day: 'Day 5', sales: 12000 },
  { day: 'Day 10', sales: 9500 },
  { day: 'Day 15', sales: 15000 },
  { day: 'Day 20', sales: 13500 },
  { day: 'Day 25', sales: 18000 },
  { day: 'Day 30', sales: 16500 },
];

const cropDistributionData = [
  { name: 'Tomatoes', value: 35, color: '#2D7A3E' },
  { name: 'Onions', value: 25, color: '#E8A314' },
  { name: 'Peppers', value: 20, color: '#1A5F9E' },
  { name: 'Rice', value: 15, color: '#FF9800' },
  { name: 'Others', value: 5, color: '#999999' },
];

const priceComparisonData = [
  { crop: 'Tomatoes', yourPrice: 8.5, marketAvg: 7.5 },
  { crop: 'Onions', yourPrice: 6.8, marketAvg: 6.2 },
  { crop: 'Peppers', yourPrice: 12.2, marketAvg: 11.5 },
  { crop: 'Rice', yourPrice: 45, marketAvg: 43 },
  { crop: 'Cotton', yourPrice: 60, marketAvg: 58 },
];

const reviews = [
  {
    buyer: 'Restaurant XYZ',
    rating: 5,
    text: 'Great quality tomatoes, very fresh!',
    daysAgo: 3,
  },
  {
    buyer: 'Buyer #127',
    rating: 5,
    text: 'Excellent produce. Will order again.',
    daysAgo: 5,
  },
  {
    buyer: 'Market ABC',
    rating: 4,
    text: 'Good quality, timely delivery.',
    daysAgo: 7,
  },
];

export default function Analytics() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-[#0F1419]">Analytics & Insights</h1>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D7A3E] focus:ring-2 focus:ring-[#2D7A3E] focus:ring-opacity-20 transition-all">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>All time</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-xl p-6 shadow-sm"
              style={{
                backgroundColor: card.bgColor,
                animation: `fadeInUp 300ms ease-out ${index * 100}ms both`,
              }}
            >
              <Icon className="w-8 h-8 mb-3" style={{ color: card.iconColor }} />
              <div className="text-2xl mb-1" style={{ color: card.iconColor }}>
                {card.number}
              </div>
              <div className="text-[#0F1419] text-sm mb-1">{card.label}</div>
              <div className="text-xs" style={{ color: card.changeColor }}>
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-[#0F1419] mb-6">Sales Trend (Last 30 Days)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesTrendData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D7A3E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2D7A3E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#666666" />
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
                dataKey="sales"
                stroke="#2D7A3E"
                strokeWidth={3}
                fill="url(#salesGradient)"
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crop Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Crop Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-[#0F1419] mb-6">Crop Distribution</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={800}
                >
                  {cropDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {cropDistributionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-[#666666] text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Price Comparison */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-[#0F1419] mb-6">Price vs Market Average</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="crop" tick={{ fontSize: 12 }} stroke="#666666" />
                <YAxis tick={{ fontSize: 12 }} stroke="#666666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `₹${value}/kg`}
                />
                <Legend />
                <Bar
                  dataKey="yourPrice"
                  name="Your Price"
                  fill="#2D7A3E"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                />
                <Bar
                  dataKey="marketAvg"
                  name="Market Avg"
                  fill="#E0E0E0"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#0F1419]">Recent Reviews</h2>
          <button className="px-4 py-2 border-2 border-[#1A5F9E] text-[#1A5F9E] rounded-lg hover:bg-[#E3F2FD] transition-all">
            View All Reviews
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-l-4 border-[#E8A314] bg-[#FFF8E1] rounded-lg p-4"
              style={{ animation: `fadeInUp 300ms ease-out ${index * 100}ms both` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#0F1419]">{review.buyer}</span>
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[#666666] text-sm mb-2">"{review.text}"</p>
              <p className="text-[#999999] text-xs">{review.daysAgo} days ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
