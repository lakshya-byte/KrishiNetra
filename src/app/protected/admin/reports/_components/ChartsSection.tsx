import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MapPin, DollarSign, Wheat } from 'lucide-react';

// Sample data
const salesData = [
  { month: 'Jan', sales: 4000, transfers: 2400 },
  { month: 'Feb', sales: 3000, transfers: 1398 },
  { month: 'Mar', sales: 5000, transfers: 9800 },
  { month: 'Apr', sales: 4500, transfers: 3908 },
  { month: 'May', sales: 6000, transfers: 4800 },
  { month: 'Jun', sales: 5500, transfers: 3800 },
  { month: 'Jul', sales: 7000, transfers: 4300 },
];

const regionData = [
  { state: 'Punjab', batches: 2500, color: 'var(--forest-green)' },
  { state: 'Haryana', batches: 2200, color: 'var(--saffron-orange)' },
  { state: 'Uttar Pradesh', batches: 3200, color: 'var(--ashoka-blue)' },
  { state: 'Maharashtra', batches: 1800, color: 'var(--forest-green-light)' },
  { state: 'Tamil Nadu', batches: 1600, color: 'var(--saffron-orange-light)' },
];

const cropData = [
  { name: 'Rice', value: 35, color: 'var(--forest-green)' },
  { name: 'Wheat', value: 25, color: 'var(--saffron-orange)' },
  { name: 'Corn', value: 15, color: 'var(--ashoka-blue)' },
  { name: 'Sugarcane', value: 12, color: 'var(--forest-green-light)' },
  { name: 'Others', value: 13, color: 'var(--saffron-orange-light)' },
];

const priceRanges = [
  { stage: 'Farm Gate', min: 80, q1: 90, median: 100, q3: 110, max: 120 },
  { stage: 'Distributor', min: 95, q1: 105, median: 115, q3: 125, max: 135 },
  { stage: 'Retailer', min: 110, q1: 120, median: 130, q3: 140, max: 150 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const IndiaMap = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500 mb-4">Interactive Map of India</p>
        <div className="space-y-2">
          {regionData.map((region, index) => (
            <motion.div
              key={region.state}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:shadow-md transition-shadow"
              onMouseEnter={() => setHoveredState(region.state)}
              onMouseLeave={() => setHoveredState(null)}
            >
              <span className="font-medium">{region.state}</span>
              <Badge
                variant="secondary"
                className="bg-[var(--forest-green)] text-white"
              >
                {region.batches.toLocaleString()}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function ChartsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Sales Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
              <span>Sales Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stackId="1"
                  stroke="var(--forest-green)"
                  fill="var(--forest-green)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="transfers"
                  stackId="1"
                  stroke="var(--saffron-orange)"
                  fill="var(--saffron-orange)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transfer Volume by Region */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
              <span>Transfer Volume by Region</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IndiaMap />
          </CardContent>
        </Card>
      </motion.div>

      {/* Price Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
              <span>Price Distribution by Stage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priceRanges} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="min" fill="var(--forest-green-light)" />
                <Bar dataKey="median" fill="var(--forest-green)" />
                <Bar dataKey="max" fill="var(--forest-green-dark)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top 5 Crops */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wheat className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
              <span>Top 5 Crops Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cropData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {cropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}