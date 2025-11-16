import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Calendar, MapPin, Eye, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

interface Batch {
  id: string;
  produce: string;
  farm: string;
  currentOwner: string;
  status: 'Harvested' | 'In Transit' | 'Processing' | 'Distributed' | 'Sold';
  location: string;
  lastUpdate: string;
}

const sampleBatches: Batch[] = [
  {
    id: 'B001',
    produce: 'Organic Rice',
    farm: 'Green Fields Farm',
    currentOwner: 'Rajesh Kumar',
    status: 'Harvested',
    location: 'Cuttack',
    lastUpdate: '2 hours ago'
  },
  {
    id: 'B002',
    produce: 'Wheat',
    farm: 'Sunrise Agriculture',
    currentOwner: 'Priya Distributors',
    status: 'In Transit',
    location: 'Bhubaneswar',
    lastUpdate: '4 hours ago'
  },
  {
    id: 'B003',
    produce: 'Turmeric',
    farm: 'Spice Valley',
    currentOwner: 'Golden Spices Ltd',
    status: 'Processing',
    location: 'Berhampur',
    lastUpdate: '1 day ago'
  },
  {
    id: 'B004',
    produce: 'Cashew',
    farm: 'Coastal Farms',
    currentOwner: 'NutriMart',
    status: 'Sold',
    location: 'Puri',
    lastUpdate: '2 days ago'
  },
  {
    id: 'B005',
    produce: 'Mango',
    farm: 'Tropical Orchards',
    currentOwner: 'Fresh Fruits Co',
    status: 'Distributed',
    location: 'Sambalpur',
    lastUpdate: '3 hours ago'
  },
];

export function BatchOversightPreview() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filteredBatches = sampleBatches.filter(batch => {
    const statusMatch = statusFilter === 'all' || batch.status === statusFilter;
    const regionMatch = regionFilter === 'all' || batch.location === regionFilter;
    return statusMatch && regionMatch;
  });

  const getStatusBadge = (status: Batch['status']) => {
    const styles = {
      'Harvested': 'bg-green-100 text-green-800 border-green-200',
      'In Transit': 'bg-blue-100 text-blue-800 border-blue-200',
      'Processing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Distributed': 'bg-purple-100 text-purple-800 border-purple-200',
      'Sold': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return styles[status];
  };

  const regions = [...new Set(sampleBatches.map(batch => batch.location))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg">Batch Oversight</CardTitle>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              View All Batches
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filters:</span>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Harvested">Harvested</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Distributed">Distributed</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>

            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Produce</TableHead>
                  <TableHead>Farm</TableHead>
                  <TableHead>Current Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch, index) => (
                  <motion.tr
                    key={batch.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{batch.id}</TableCell>
                    <TableCell>{batch.produce}</TableCell>
                    <TableCell>{batch.farm}</TableCell>
                    <TableCell>{batch.currentOwner}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(batch.status)}>
                        {batch.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {batch.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{batch.lastUpdate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}