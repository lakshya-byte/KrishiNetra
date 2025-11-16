import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { motion } from 'motion/react';

const salesData = [
  { month: 'Jan', transfers: 65, sales: 58, revenue: 45000 },
  { month: 'Feb', transfers: 72, sales: 68, revenue: 52000 },
  { month: 'Mar', transfers: 68, sales: 62, revenue: 48000 },
  { month: 'Apr', transfers: 85, sales: 78, revenue: 61000 },
  { month: 'May', transfers: 91, sales: 84, revenue: 67000 },
  { month: 'Jun', transfers: 88, sales: 81, revenue: 64000 },
  { month: 'Jul', transfers: 95, sales: 89, revenue: 71000 },
  { month: 'Aug', transfers: 102, sales: 94, revenue: 76000 },
  { month: 'Sep', transfers: 98, sales: 91, revenue: 73000 },
  { month: 'Oct', transfers: 87, sales: 82, revenue: 66000 },
  { month: 'Nov', transfers: 93, sales: 86, revenue: 69000 },
  { month: 'Dec', transfers: 108, sales: 98, revenue: 82000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

interface AnimatedLineProps {
  data: typeof salesData;
  dataKey: string;
  stroke: string;
  strokeWidth: number;
  dot?: boolean;
}

function AnimatedLine({ data, dataKey, stroke, strokeWidth, dot }: AnimatedLineProps) {
  const [pathLength, setPathLength] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Line
      type="monotone"
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dot={dot && animationComplete}
      activeDot={{ r: 6, stroke: stroke, strokeWidth: 2, fill: 'white' }}
      strokeDasharray={animationComplete ? "0" : "1000"}
      strokeDashoffset={animationComplete ? "0" : "1000"}
      style={{
        transition: 'stroke-dashoffset 2s ease-in-out'
      }}
    />
  );
}

export function SalesTrendChart() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Monthly Sales Trend</span>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-forest-green"></div>
                <span className="text-gray-600">Transfers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-saffron"></div>
                <span className="text-gray-600">Sales</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {isVisible && (
                  <>
                    <AnimatedLine
                      data={salesData}
                      dataKey="transfers"
                      stroke="var(--forest-green)"
                      strokeWidth={3}
                      dot={false}
                    />
                    <AnimatedLine
                      data={salesData}
                      dataKey="sales"
                      stroke="var(--saffron)"
                      strokeWidth={3}
                      dot={false}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Summary Statistics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-forest-green">1,106</p>
              <p className="text-sm text-gray-600">Total Transfers This Year</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-saffron">1,021</p>
              <p className="text-sm text-gray-600">Total Sales This Year</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-ashoka-blue">₹7,84,000</p>
              <p className="text-sm text-gray-600">Total Revenue This Year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}