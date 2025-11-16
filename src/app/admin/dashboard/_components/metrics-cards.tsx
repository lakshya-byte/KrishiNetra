import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Package, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: number;
  suffix?: string;
  delay?: number;
}

function MetricCard({ title, value, icon: Icon, trend, suffix = '', delay = 0 }: MetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(interval);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const isPositiveTrend = trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <div className="p-2 bg-orange-50 rounded-lg">
            <Icon className="h-5 w-5 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {animatedValue.toLocaleString()}{suffix}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {isPositiveTrend ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(trend)}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
            <div className="w-16 h-8">
              {/* Mini sparkline placeholder */}
              <svg className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  points="0,24 4,20 8,22 12,18 16,20 20,16 24,18 28,14 32,16 36,12 40,14 44,10 48,12 52,8 56,10 60,6 64,8"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function MetricsCards() {
  const metrics = [
    {
      title: 'Total Users',
      value: 15420,
      icon: Users,
      trend: 12.5,
      delay: 0,
    },
    {
      title: 'Active Batches',
      value: 2847,
      icon: Package,
      trend: 8.2,
      delay: 200,
    },
    {
      title: 'Pending Disputes',
      value: 23,
      icon: AlertTriangle,
      trend: -15.3,
      delay: 400,
    },
    {
      title: 'Blockchain Health',
      value: 2.4,
      icon: Activity,
      trend: 5.1,
      suffix: 's',
      delay: 600,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}