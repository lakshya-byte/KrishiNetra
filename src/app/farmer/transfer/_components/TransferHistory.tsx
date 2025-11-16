import { useState } from 'react';
import { ArrowRight, Calendar, Package, CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';
import { Card } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';
import { motion } from 'motion/react';

interface Transfer {
  id: string;
  batchId: string;
  from: string;
  to: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  value?: string;
  notes?: string;
}

const mockTransfers: Transfer[] = [
  {
    id: 'TXN001',
    batchId: 'BTC001',
    from: 'Rajesh Kumar Farm',
    to: 'AgriDistribute Co.',
    date: '2024-01-20',
    status: 'Completed',
    value: '₹45,000',
    notes: 'Standard delivery'
  },
  {
    id: 'TXN002',
    batchId: 'BTC002',
    from: 'Green Valley Cooperative',
    to: 'Fresh Market Store',
    date: '2024-01-19',
    status: 'Pending',
    value: '₹38,500'
  },
  {
    id: 'TXN003',
    batchId: 'BTC003',
    from: 'Sunrise Agro',
    to: 'Organic Mart',
    date: '2024-01-18',
    status: 'Failed',
    value: '₹22,000',
    notes: 'Transport issue'
  },
  {
    id: 'TXN004',
    batchId: 'BTC004',
    from: 'Fresh Produce Ltd',
    to: 'Green Supply Chain',
    date: '2024-01-17',
    status: 'Completed',
    value: '₹15,750'
  },
  {
    id: 'TXN005',
    batchId: 'BTC005',
    from: 'Valley Farms',
    to: 'Farm to Table Ltd',
    date: '2024-01-16',
    status: 'Completed',
    value: '₹67,200'
  },
  {
    id: 'TXN006',
    batchId: 'BTC006',
    from: 'Harvest Co-op',
    to: 'City Fresh Mart',
    date: '2024-01-15',
    status: 'Pending',
    value: '₹29,400'
  }
];

export function TransferHistory() {
  const [hoveredTransfer, setHoveredTransfer] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TooltipProvider>
      <Card className="p-6 h-fit">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transfers</h2>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View All
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockTransfers.map((transfer, index) => (
            <motion.div
              key={transfer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer ${
                hoveredTransfer === transfer.id
                  ? 'shadow-md border-blue-200 bg-blue-50'
                  : 'hover:shadow-sm hover:border-gray-300'
              }`}
              onMouseEnter={() => setHoveredTransfer(transfer.id)}
              onMouseLeave={() => setHoveredTransfer(null)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-600 hover:underline">
                      {transfer.batchId}
                    </span>
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span className="truncate max-w-24">{transfer.from}</span>
                    <motion.div
                      animate={hoveredTransfer === transfer.id ? { x: 5 } : { x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                    <span className="truncate max-w-24">{transfer.to}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(transfer.date).toLocaleDateString()}</span>
                    </div>
                    {transfer.value && (
                      <span className="font-medium text-gray-700">{transfer.value}</span>
                    )}
                  </div>

                  {transfer.notes && (
                    <div className="mt-2 text-xs text-gray-500 italic">
                      "{transfer.notes}"
                    </div>
                  )}
                </div>

                <div className="ml-4">
                  <Tooltip>
                    <TooltipTrigger>
                      {getStatusIcon(transfer.status)}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Status: {transfer.status}</p>
                      {transfer.status === 'Pending' && (
                        <p className="text-xs">Awaiting confirmation</p>
                      )}
                      {transfer.status === 'Failed' && transfer.notes && (
                        <p className="text-xs">Reason: {transfer.notes}</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Expanded details on hover */}
              <motion.div
                initial={false}
                animate={{
                  height: hoveredTransfer === transfer.id ? 'auto' : 0,
                  opacity: hoveredTransfer === transfer.id ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {hoveredTransfer === transfer.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">Transfer ID:</span>
                        <div className="font-mono">{transfer.id}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <div>{new Date(transfer.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {mockTransfers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No recent transfers found</p>
            <p className="text-sm">Your transfer history will appear here</p>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
}