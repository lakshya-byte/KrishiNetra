import { useState } from 'react';
import { Search, Wheat, Package, Calendar, User } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Card } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Batch {
  id: string;
  cropType: string;
  quantity: string;
  status: 'Available' | 'In Transit' | 'Processing';
  harvestDate: string;
  currentOwner: string;
  image?: string;
}

const mockBatches: Batch[] = [
  {
    id: 'BTC001',
    cropType: 'Wheat',
    quantity: '500 kg',
    status: 'Available',
    harvestDate: '2024-01-15',
    currentOwner: 'Rajesh Kumar Farm'
  },
  {
    id: 'BTC002',
    cropType: 'Rice',
    quantity: '750 kg',
    status: 'Available',
    harvestDate: '2024-01-12',
    currentOwner: 'Green Valley Cooperative'
  },
  {
    id: 'BTC003',
    cropType: 'Corn',
    quantity: '300 kg',
    status: 'Processing',
    harvestDate: '2024-01-10',
    currentOwner: 'Sunrise Agro'
  },
  {
    id: 'BTC004',
    cropType: 'Tomato',
    quantity: '200 kg',
    status: 'Available',
    harvestDate: '2024-01-18',
    currentOwner: 'Fresh Produce Ltd'
  }
];

interface BatchSelectorProps {
  selectedBatch: Batch | null;
  onBatchSelect: (batch: Batch) => void;
}

export function BatchSelector({ selectedBatch, onBatchSelect }: BatchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBatches = mockBatches.filter(batch =>
    batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCropIcon = (cropType: string) => {
    switch (cropType.toLowerCase()) {
      case 'wheat':
        return <Wheat className="w-4 h-4" style={{ color: 'var(--saffron-orange)' }} />;
      case 'rice':
        return <Package className="w-4 h-4" style={{ color: 'var(--forest-green)' }} />;
      default:
        return <Package className="w-4 h-4" style={{ color: 'var(--ashoka-blue)' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Select Batch *</label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between h-12 ${
              selectedBatch ? 'border-2' : ''
            }`}
            style={{
              borderColor: selectedBatch ? 'var(--saffron-orange)' : undefined
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedBatch ? (
              <div className="flex items-center space-x-2">
                {getCropIcon(selectedBatch.cropType)}
                <span>{selectedBatch.id} - {selectedBatch.cropType}</span>
              </div>
            ) : (
              <span className="text-gray-500">Search by Batch ID or crop type</span>
            )}
            <Search className="w-4 h-4" />
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 z-10 mt-2"
              >
                <Card className="p-4 shadow-lg border-2 max-h-80 overflow-y-auto">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search batches..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredBatches.map((batch, index) => (
                      <motion.div
                        key={batch.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
                        onClick={() => {
                          onBatchSelect(batch);
                          setIsOpen(false);
                          setSearchTerm('');
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getCropIcon(batch.cropType)}
                            <div>
                              <div className="font-medium">{batch.id}</div>
                              <div className="text-sm text-gray-500">
                                {batch.cropType} • {batch.quantity}
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(batch.status)}>
                            {batch.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}

                    {filteredBatches.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No batches found matching your search
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Batch Details Preview */}
      <AnimatePresence>
        {selectedBatch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-gray-50">
              <h3 className="font-medium mb-3">Selected Batch Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Batch ID</div>
                    <div className="font-medium">{selectedBatch.id}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getCropIcon(selectedBatch.cropType)}
                  <div>
                    <div className="text-sm text-gray-500">Crop Type</div>
                    <div className="font-medium">{selectedBatch.cropType}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Quantity</div>
                    <div className="font-medium">{selectedBatch.quantity}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Harvest Date</div>
                    <div className="font-medium">{new Date(selectedBatch.harvestDate).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 col-span-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Current Owner</div>
                    <div className="font-medium">{selectedBatch.currentOwner}</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}