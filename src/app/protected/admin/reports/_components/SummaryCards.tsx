import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../../../ui/card';
import { ArrowUpIcon, ArrowDownIcon, Package, Truck, Clock, DollarSign } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend: number;
  sparklineData: number[];
  delay: number;
}

function SummaryCard({ title, value, icon: Icon, trend, sparklineData, delay }: SummaryCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Count-up animation
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const isPositiveTrend = trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{title}</p>
              <div className="space-y-1">
                <motion.p 
                  className="text-3xl font-bold"
                  style={{ color: 'var(--ashoka-blue)' }}
                  animate={{ scale: displayValue === value ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {displayValue.toLocaleString()}
                </motion.p>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 text-sm ${
                    isPositiveTrend ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveTrend ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    <span>{Math.abs(trend)}%</span>
                  </div>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <div className="p-3 rounded-full bg-gray-100 group-hover:bg-[var(--forest-green)] group-hover:text-white transition-colors duration-300">
                <Icon className="h-6 w-6" />
              </div>
              
              {/* Mini Sparkline */}
              <div className="w-20 h-8">
                <svg width="100%" height="100%" viewBox="0 0 80 32">
                  <motion.polyline
                    fill="none"
                    stroke="var(--forest-green)"
                    strokeWidth="2"
                    points={sparklineData.map((point, index) => 
                      `${(index * 80) / (sparklineData.length - 1)},${32 - (point * 28) / 100}`
                    ).join(' ')}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: delay + 0.5 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SummaryCards() {
  const summaryData = [
    {
      title: 'Total Batches Tracked',
      value: 12548,
      icon: Package,
      trend: 8.2,
      sparklineData: [20, 35, 45, 30, 60, 70, 85, 75, 90, 100]
    },
    {
      title: 'Total Transfers',
      value: 8394,
      icon: Truck,
      trend: 12.5,
      sparklineData: [15, 25, 40, 35, 55, 65, 45, 70, 85, 95]
    },
    {
      title: 'Avg Time in Transit',
      value: 36,
      icon: Clock,
      trend: -5.3,
      sparklineData: [80, 70, 60, 65, 55, 45, 50, 40, 35, 30]
    },
    {
      title: 'Total Revenue Generated',
      value: 2847563,
      icon: DollarSign,
      trend: 15.7,
      sparklineData: [10, 20, 25, 40, 55, 65, 70, 80, 90, 100]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((data, index) => (
        <SummaryCard
          key={data.title}
          {...data}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
}