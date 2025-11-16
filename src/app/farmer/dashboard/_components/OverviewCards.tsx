import React, { useState, useEffect } from 'react';
import { Package, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { motion } from 'motion/react';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

function AnimatedCounter({ end, duration, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

interface OverviewCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
  color: 'saffron' | 'blue' | 'green' | 'red';
  delay: number;
}

function OverviewCard({ title, value, icon: Icon, trend, suffix, color, delay }: OverviewCardProps) {
  const colorClasses = {
    saffron: 'bg-saffron text-white',
    blue: 'bg-ashoka-blue text-white',
    green: 'bg-forest-green text-white',
    red: 'bg-red-500 text-white',
  };

  const bgColorClasses = {
    saffron: 'bg-orange-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    red: 'bg-red-50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader className={`${colorClasses[color]} pb-3`}>
          <CardTitle className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-90">{title}</span>
            <Icon size={20} className="opacity-80" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              <AnimatedCounter end={value} duration={2} suffix={suffix} />
            </div>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp 
                  size={16} 
                  className={`mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} 
                />
                <span>{trend.value}% from last month</span>
              </div>
            )}
          </div>
          
          {/* Decorative background pattern */}
          <div className={`absolute top-0 right-0 w-20 h-20 ${bgColorClasses[color]} rounded-full -translate-y-10 translate-x-10 opacity-20`}></div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function OverviewCards() {
  const cards = [
    {
      title: 'Total Batches Created',
      value: 1247,
      icon: Package,
      trend: { value: 12, isPositive: true },
      color: 'saffron' as const,
      delay: 0.1,
    },
    {
      title: 'Pending Transfers',
      value: 23,
      icon: Clock,
      trend: { value: 5, isPositive: false },
      color: 'blue' as const,
      delay: 0.2,
    },
    {
      title: 'Successful Sales',
      value: 892,
      icon: TrendingUp,
      trend: { value: 18, isPositive: true },
      color: 'green' as const,
      delay: 0.3,
    },
    {
      title: 'Alerts & Warnings',
      value: 7,
      icon: AlertTriangle,
      color: 'red' as const,
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  );
}