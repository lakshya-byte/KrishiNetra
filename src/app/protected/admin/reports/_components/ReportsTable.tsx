import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/pagination';
import { 
  Download, 
  Share, 
  Trash2, 
  Search, 
  FileText,
  Calendar,
  User
} from 'lucide-react';
import { toast } from 'sonner';

interface Report {
  id: string;
  name: string;
  type: 'Sales' | 'Transfer' | 'Summary' | 'Custom';
  createdDate: string;
  lastRun: string;
  createdBy: string;
  status: 'Active' | 'Archived';
}

const sampleReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Sales Analysis',
    type: 'Sales',
    createdDate: '2024-01-15',
    lastRun: '2024-01-20',
    createdBy: 'John Doe',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Regional Transfer Summary',
    type: 'Transfer',
    createdDate: '2024-01-10',
    lastRun: '2024-01-19',
    createdBy: 'Jane Smith',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Quarterly Overview',
    type: 'Summary',
    createdDate: '2024-01-05',
    lastRun: '2024-01-18',
    createdBy: 'Mike Johnson',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Crop Performance Dashboard',
    type: 'Custom',
    createdDate: '2024-01-01',
    lastRun: '2024-01-17',
    createdBy: 'Sarah Wilson',
    status: 'Archived'
  },
  {
    id: '5',
    name: 'Weekly Distribution Report',
    type: 'Transfer',
    createdDate: '2023-12-28',
    lastRun: '2024-01-16',
    createdBy: 'Tom Brown',
    status: 'Active'
  }
];

export function ReportsTable() {
  const [reports, setReports] = useState<Report[]>(sampleReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  const reportsPerPage = 5;

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + reportsPerPage);

  const handleDownload = async (reportId: string, reportName: string) => {
    setIsDownloading(reportId);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsDownloading(null);
    toast.success(`Report "${reportName}" downloaded successfully!`);
  };

  const handleShare = (reportId: string, reportName: string) => {
    // Simulate sharing (copy link to clipboard)
    const shareLink = `https://krishinetra.com/reports/${reportId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success(`Share link for "${reportName}" copied to clipboard!`);
  };

  const handleDelete = (reportId: string, reportName: string) => {
    if (window.confirm(`Are you sure you want to delete "${reportName}"?`)) {
      setReports(prev => prev.filter(report => report.id !== reportId));
      toast.success(`Report "${reportName}" deleted successfully!`);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sales':
        return 'bg-[var(--forest-green)] text-white';
      case 'Transfer':
        return 'bg-[var(--saffron-orange)] text-white';
      case 'Summary':
        return 'bg-[var(--ashoka-blue)] text-white';
      case 'Custom':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
            <span>Downloadable Reports</span>
          </div>
          <Badge variant="secondary">
            {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Search Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports by name, type, or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(report.createdDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(report.lastRun).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{report.createdBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(report.id, report.name)}
                        disabled={isDownloading === report.id}
                        className="hover:bg-green-100 hover:text-green-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(report.id, report.name)}
                        className="hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(report.id, report.name)}
                        className="hover:bg-red-100 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reports found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}