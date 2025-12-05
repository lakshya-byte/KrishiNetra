import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1890 },
  { month: 'Mar', users: 2800 },
  { month: 'Apr', users: 3908 },
  { month: 'May', users: 4800 },
  { month: 'Jun', users: 6300 },
  { month: 'Jul', users: 7200 },
  { month: 'Aug', users: 8900 },
  { month: 'Sep', users: 10200 },
  { month: 'Oct', users: 12100 },
  { month: 'Nov', users: 13800 },
  { month: 'Dec', users: 15420 },
];

const batchThroughputData = [
  { month: 'Jan', batches: 45 },
  { month: 'Feb', batches: 78 },
  { month: 'Mar', batches: 123 },
  { month: 'Apr', batches: 156 },
  { month: 'May', batches: 189 },
  { month: 'Jun', batches: 234 },
  { month: 'Jul', batches: 267 },
  { month: 'Aug', batches: 298 },
  { month: 'Sep', batches: 312 },
  { month: 'Oct', batches: 345 },
  { month: 'Nov', batches: 378 },
  { month: 'Dec', batches: 423 },
];

const disputesTrendData = [
  { month: 'Jan', disputes: 12, resolved: 10 },
  { month: 'Feb', disputes: 18, resolved: 15 },
  { month: 'Mar', disputes: 24, resolved: 20 },
  { month: 'Apr', disputes: 19, resolved: 17 },
  { month: 'May', disputes: 31, resolved: 28 },
  { month: 'Jun', disputes: 28, resolved: 25 },
  { month: 'Jul', disputes: 22, resolved: 20 },
  { month: 'Aug', disputes: 26, resolved: 23 },
  { month: 'Sep', disputes: 20, resolved: 18 },
  { month: 'Oct', disputes: 25, resolved: 22 },
  { month: 'Nov', disputes: 18, resolved: 16 },
  { month: 'Dec', disputes: 23, resolved: 20 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState('growth');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="growth" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                User Growth
              </TabsTrigger>
              <TabsTrigger 
                value="throughput"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Batch Throughput
              </TabsTrigger>
              <TabsTrigger 
                value="disputes"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Disputes Trend
              </TabsTrigger>
            </TabsList>

            <TabsContent value="growth" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-80"
              >
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">Monthly User Growth</h3>
                  <p className="text-sm text-gray-600">Total registered users over the past 12 months</p>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#FF7A00"
                      strokeWidth={3}
                      dot={{ fill: '#FF7A00', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#FF7A00', strokeWidth: 2, fill: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </TabsContent>

            <TabsContent value="throughput" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-80"
              >
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">Monthly Batch Throughput</h3>
                  <p className="text-sm text-gray-600">Number of batches processed through the system</p>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={batchThroughputData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="batches" 
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </TabsContent>

            <TabsContent value="disputes" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-80"
              >
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">Disputes Trend</h3>
                  <p className="text-sm text-gray-600">Monthly disputes raised and resolved</p>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={disputesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="disputes"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#fecaca"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stackId="2"
                      stroke="#22c55e"
                      fill="#bbf7d0"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}