import { useState } from 'react';
import { 
  Eye, 
  UserPlus, 
  ArrowUp, 
  Check, 
  Filter, 
  ChevronDown,
  ChevronUp,
  MoreHorizontal 
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../../../ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { motion } from 'motion/react';

interface Dispute {
  id: string;
  batchId: string;
  raisedBy: { role: string; name: string };
  dateRaised: string;
  issueType: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Escalated';
}

const mockDisputes: Dispute[] = [
  {
    id: 'DSP001',
    batchId: 'BT2024001',
    raisedBy: { role: 'Farmer', name: 'Rajesh Kumar' },
    dateRaised: '2024-01-15',
    issueType: 'Quality Concern',
    status: 'Pending',
  },
  {
    id: 'DSP002',
    batchId: 'BT2024002', 
    raisedBy: { role: 'Inspector', name: 'Priya Singh' },
    dateRaised: '2024-01-14',
    issueType: 'Documentation',
    status: 'In Review',
  },
  {
    id: 'DSP003',
    batchId: 'BT2024003',
    raisedBy: { role: 'Buyer', name: 'Mumbai Grains Ltd' },
    dateRaised: '2024-01-13',
    issueType: 'Transport Damage',
    status: 'Escalated',
  },
  {
    id: 'DSP004',
    batchId: 'BT2024004',
    raisedBy: { role: 'Farmer', name: 'Sunita Devi' },
    dateRaised: '2024-01-12',
    issueType: 'Payment Delay',
    status: 'Resolved',
  },
  {
    id: 'DSP005',
    batchId: 'BT2024005',
    raisedBy: { role: 'Inspector', name: 'Amit Sharma' },
    dateRaised: '2024-01-11',
    issueType: 'Quality Concern',
    status: 'Pending',
  },
];

interface DisputesTableProps {
  onViewDetails: (dispute: Dispute) => void;
}

type SortField = 'id' | 'batchId' | 'dateRaised' | 'status';
type SortDirection = 'asc' | 'desc';

export function DisputesTable({ onViewDetails }: DisputesTableProps) {
  const [disputes, setDisputes] = useState(mockDisputes);
  const [sortField, setSortField] = useState<SortField>('dateRaised');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Escalated':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Farmer':
        return 'bg-green-100 text-green-700';
      case 'Inspector':
        return 'bg-blue-100 text-blue-700';
      case 'Buyer':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="border-krishinetra-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            Pending Disputes
            <Badge className="bg-saffron text-white">
              {disputes.filter(d => d.status === 'Pending').length}
            </Badge>
          </CardTitle>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('In Review')}>
                  In Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Resolved')}>
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Escalated')}>
                  Escalated
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Issue Type
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setIssueTypeFilter('all')}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIssueTypeFilter('Quality Concern')}>
                  Quality Concern
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIssueTypeFilter('Documentation')}>
                  Documentation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIssueTypeFilter('Transport Damage')}>
                  Transport Damage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIssueTypeFilter('Payment Delay')}>
                  Payment Delay
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-krishinetra-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-krishinetra-gray">
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-1">
                    Dispute ID
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="h-3 w-3" /> : 
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('batchId')}
                >
                  <div className="flex items-center gap-1">
                    Batch ID
                    {sortField === 'batchId' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="h-3 w-3" /> : 
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Raised By</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('dateRaised')}
                >
                  <div className="flex items-center gap-1">
                    Date Raised
                    {sortField === 'dateRaised' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="h-3 w-3" /> : 
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute, index) => (
                <motion.tr
                  key={dispute.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-krishinetra-gray transition-colors cursor-pointer border-b border-krishinetra-border"
                >
                  <TableCell className="font-medium text-ashoka">
                    {dispute.id}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-saffron hover:text-saffron-dark"
                    >
                      {dispute.batchId}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge className={`text-xs w-fit ${getRoleBadgeColor(dispute.raisedBy.role)}`}>
                        {dispute.raisedBy.role}
                      </Badge>
                      <span className="text-sm">{dispute.raisedBy.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dispute.dateRaised}</TableCell>
                  <TableCell>{dispute.issueType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewDetails(dispute)}
                              className="h-8 w-8 p-0 hover:bg-saffron hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Details</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-ashoka hover:text-white"
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Assign</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-500 hover:text-white"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Escalate</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-forest hover:text-white"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Resolve</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}