import React, { useState } from 'react';
import { Package, ArrowRightLeft, AlertCircle, CheckCircle, Clock, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Activity {
  id: string;
  type: 'batch_created' | 'transfer_completed' | 'alert' | 'quality_check' | 'sale_completed';
  message: string;
  timestamp: string;
  batchId?: string;
  details?: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'transfer_completed',
    message: 'Batch B001 transferred to Distributor ABC',
    timestamp: '2 minutes ago',
    batchId: 'B001',
    details: 'Rice - 500kg transferred successfully'
  },
  {
    id: '2',
    type: 'batch_created',
    message: 'New batch B008 created for Wheat crop',
    timestamp: '15 minutes ago',
    batchId: 'B008',
    details: '750kg of premium wheat registered'
  },
  {
    id: '3',
    type: 'alert',
    message: 'Quality check required for Batch B005',
    timestamp: '1 hour ago',
    batchId: 'B005',
    details: 'Moisture levels need verification'
  },
  {
    id: '4',
    type: 'sale_completed',
    message: 'Batch B003 sold to Retailer XYZ',
    timestamp: '2 hours ago',
    batchId: 'B003',
    details: 'Corn - 300kg sold for ₹15,000'
  },
  {
    id: '5',
    type: 'quality_check',
    message: 'Quality check completed for Batch B007',
    timestamp: '3 hours ago',
    batchId: 'B007',
    details: 'Grade A certification received'
  },
  {
    id: '6',
    type: 'transfer_completed',
    message: 'Batch B004 transferred to Processor DEF',
    timestamp: '4 hours ago',
    batchId: 'B004',
    details: 'Soybeans - 600kg transferred'
  },
  {
    id: '7',
    type: 'batch_created',
    message: 'New batch B009 created for Cotton crop',
    timestamp: '5 hours ago',
    batchId: 'B009',
    details: '400kg of organic cotton registered'
  },
  {
    id: '8',
    type: 'alert',
    message: 'Batch B002 requires immediate attention',
    timestamp: '6 hours ago',
    batchId: 'B002',
    details: 'Temperature monitoring alert'
  },
];

function getActivityIcon(type: Activity['type']) {
  switch (type) {
    case 'batch_created':
      return <Package size={16} className="text-saffron" />;
    case 'transfer_completed':
      return <ArrowRightLeft size={16} className="text-forest-green" />;
    case 'alert':
      return <AlertCircle size={16} className="text-red-500" />;
    case 'quality_check':
      return <CheckCircle size={16} className="text-blue-500" />;
    case 'sale_completed':
      return <CheckCircle size={16} className="text-forest-green" />;
    default:
      return <Clock size={16} className="text-gray-400" />;
  }
}

function getActivityColor(type: Activity['type']) {
  switch (type) {
    case 'batch_created':
      return 'bg-orange-50 border-orange-200';
    case 'transfer_completed':
      return 'bg-green-50 border-green-200';
    case 'alert':
      return 'bg-red-50 border-red-200';
    case 'quality_check':
      return 'bg-blue-50 border-blue-200';
    case 'sale_completed':
      return 'bg-green-50 border-green-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
}

interface ActivityItemProps {
  activity: Activity;
  index: number;
}

function ActivityItem({ activity, index }: ActivityItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`p-4 rounded-lg border ${getActivityColor(activity.type)} hover:shadow-sm transition-all duration-200`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getActivityIcon(activity.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-900 font-medium">
                {activity.message}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
                {activity.batchId && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {activity.batchId}
                  </Badge>
                )}
              </div>
            </div>
            
            {activity.details && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex-shrink-0 p-1 h-auto"
              >
                <MoreVertical size={14} />
              </Button>
            )}
          </div>
          
          <AnimatePresence>
            {isExpanded && activity.details && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 pt-2 border-t border-gray-200"
              >
                <p className="text-xs text-gray-600">{activity.details}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function RecentActivityFeed() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, mockActivities.length));
      setIsLoading(false);
    }, 500);
  };

  const visibleActivities = mockActivities.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Activity</span>
            <Badge variant="secondary" className="text-xs">
              {mockActivities.length} activities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {visibleActivities.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </div>
          
          {visibleCount < mockActivities.length && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="w-full border-dashed border-gray-300 hover:border-saffron hover:text-saffron"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-saffron border-t-transparent rounded-full"
                  />
                ) : (
                  `Load More (${mockActivities.length - visibleCount} remaining)`
                )}
              </Button>
            </div>
          )}
          
          {visibleCount >= mockActivities.length && (
            <div className="text-center pt-4 text-gray-500 text-sm">
              No more activities to show
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}