import { useState, useEffect } from 'react';
import { Package, TrendingUp, Eye, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { ScrollArea } from '../../../ui/scroll-area';
import { motion } from 'motion/react';

interface ActivityDashboardProps {
  stats: {
    totalBatches: number;
    successfulTransfers: number;
    profileViews: number;
    joinDate: string;
  };
  activities: Array<{
    id: string;
    type: 'batch_created' | 'transfer_completed' | 'profile_updated' | 'login';
    description: string;
    timestamp: Date;
    details?: string;
  }>;
}

function CountUpAnimation({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function ActivityDashboard({ stats, activities }: ActivityDashboardProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'batch_created': return <Package className="w-4 h-4 text-forest-green" />;
      case 'transfer_completed': return <TrendingUp className="w-4 h-4 text-success-green" />;
      case 'profile_updated': return <Eye className="w-4 h-4 text-saffron" />;
      default: return <Calendar className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'batch_created': return 'bg-forest-green/10 text-forest-green border-forest-green/20';
      case 'transfer_completed': return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'profile_updated': return 'bg-saffron/10 text-saffron border-saffron/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-green/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-forest-green" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Batches</p>
                  <p className="text-xl font-semibold">
                    <CountUpAnimation end={stats.totalBatches} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-green/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success-green" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Successful Transfers</p>
                  <p className="text-xl font-semibold">
                    <CountUpAnimation end={stats.successfulTransfers} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                  <p className="text-xl font-semibold">
                    <CountUpAnimation end={stats.profileViews} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ashoka-blue/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-ashoka-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-lg font-semibold">{stats.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <Badge variant="outline" className={getActivityBadgeColor(activity.type)}>
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                    {activity.details && (
                      <div className="mt-2">
                        <button
                          onClick={() => toggleExpanded(activity.id)}
                          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          {expandedItems.has(activity.id) ? (
                            <>
                              <ChevronUp className="w-3 h-3" />
                              Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" />
                              Show details
                            </>
                          )}
                        </button>
                        {expandedItems.has(activity.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-3 bg-background border border-border rounded text-xs"
                          >
                            {activity.details}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}