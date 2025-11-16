import React, { useState } from 'react';
import { Eye, Edit2, Send, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { motion, AnimatePresence } from 'motion/react';

interface Batch {
  id: string;
  cropType: string;
  quantity: string;
  status: 'Completed' | 'Pending' | 'Issue';
  createdDate: string;
  location: string;
}

const mockBatches: Batch[] = [
  { id: 'B001', cropType: 'Rice', quantity: '500 kg', status: 'Completed', createdDate: '2024-01-15', location: 'Punjab' },
  { id: 'B002', cropType: 'Wheat', quantity: '750 kg', status: 'Pending', createdDate: '2024-01-14', location: 'Haryana' },
  { id: 'B003', cropType: 'Corn', quantity: '300 kg', status: 'Issue', createdDate: '2024-01-13', location: 'Uttar Pradesh' },
  { id: 'B004', cropType: 'Soybeans', quantity: '600 kg', status: 'Completed', createdDate: '2024-01-12', location: 'Madhya Pradesh' },
  { id: 'B005', cropType: 'Cotton', quantity: '400 kg', status: 'Pending', createdDate: '2024-01-11', location: 'Gujarat' },
  { id: 'B006', cropType: 'Rice', quantity: '800 kg', status: 'Completed', createdDate: '2024-01-10', location: 'West Bengal' },
  { id: 'B007', cropType: 'Sugarcane', quantity: '1200 kg', status: 'Pending', createdDate: '2024-01-09', location: 'Maharashtra' },
  { id: 'B008', cropType: 'Wheat', quantity: '550 kg', status: 'Issue', createdDate: '2024-01-08', location: 'Rajasthan' },
];

interface BatchDetailPanelProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
}

function BatchDetailPanel({ batch, isOpen, onClose }: BatchDetailPanelProps) {
  if (!batch) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Batch Details</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batch ID:</span>
                      <span className="font-medium">{batch.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Crop Type:</span>
                      <span className="font-medium">{batch.cropType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{batch.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{batch.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{batch.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={
                        batch.status === 'Completed' ? 'default' :
                        batch.status === 'Pending' ? 'secondary' : 'destructive'
                      }>
                        {batch.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Quality Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moisture Content:</span>
                      <span className="font-medium">12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purity:</span>
                      <span className="font-medium">98.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-medium">Grade A</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-saffron hover:bg-saffron-light">
                    Edit Batch
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Transfer
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function BatchTable() {
  const [sortField, setSortField] = useState<keyof Batch>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSort = (field: keyof Batch) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBatches = [...mockBatches].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedBatches.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedBatches = sortedBatches.slice(startIndex, startIndex + rowsPerPage);

  const handleViewBatch = (batch: Batch) => {
    setSelectedBatch(batch);
    setIsPanelOpen(true);
  };

  const SortableHeader = ({ field, children }: { field: keyof Batch; children: React.ReactNode }) => (
    <th 
      className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span className="font-medium text-gray-900">{children}</span>
        <div className="flex flex-col">
          <ChevronUp 
            size={12} 
            className={`${sortField === field && sortDirection === 'asc' ? 'text-saffron' : 'text-gray-400'}`} 
          />
          <ChevronDown 
            size={12} 
            className={`${sortField === field && sortDirection === 'desc' ? 'text-saffron' : 'text-gray-400'} -mt-1`} 
          />
        </div>
      </div>
    </th>
  );

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Batch List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <SortableHeader field="id">Batch ID</SortableHeader>
                  <SortableHeader field="cropType">Crop Type</SortableHeader>
                  <SortableHeader field="quantity">Quantity</SortableHeader>
                  <SortableHeader field="status">Status</SortableHeader>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedBatches.map((batch, index) => (
                    <motion.tr
                      key={batch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`border-b hover:bg-orange-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <button 
                          className="text-ashoka-blue hover:underline font-medium"
                          onClick={() => handleViewBatch(batch)}
                        >
                          {batch.id}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{batch.cropType}</td>
                      <td className="px-4 py-3 text-gray-900">{batch.quantity}</td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant={
                            batch.status === 'Completed' ? 'default' :
                            batch.status === 'Pending' ? 'secondary' : 'destructive'
                          }
                          className={
                            batch.status === 'Completed' ? 'bg-forest-green hover:bg-forest-green/80' :
                            batch.status === 'Pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                          }
                        >
                          {batch.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleViewBatch(batch)}
                            className="hover:bg-blue-100 hover:text-ashoka-blue"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="hover:bg-orange-100 hover:text-saffron"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="hover:bg-green-100 hover:text-forest-green"
                          >
                            <Send size={16} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {startIndex + 1}-{Math.min(startIndex + rowsPerPage, sortedBatches.length)} of {sortedBatches.length}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BatchDetailPanel 
        batch={selectedBatch}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
}