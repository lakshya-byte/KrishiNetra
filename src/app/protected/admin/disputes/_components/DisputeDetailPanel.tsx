import { useState } from 'react';
import { X, FileText, Image as ImageIcon, QrCode, Send, Loader2 } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import { Textarea } from '../../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Label } from '../../../ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Dispute {
  id: string;
  batchId: string;
  raisedBy: { role: string; name: string };
  dateRaised: string;
  issueType: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Escalated';
  description?: string;
  evidence?: Array<{ type: 'image' | 'document'; url: string; name: string }>;
}

interface Comment {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  message: string;
  avatar: string;
}

interface DisputeDetailPanelProps {
  dispute: Dispute | null;
  isOpen: boolean;
  onClose: () => void;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    role: 'Farmer',
    timestamp: '2024-01-15 10:30 AM',
    message: 'The wheat quality is not as per the agreed standards. There are visible black spots on several grains.',
    avatar: 'RK',
  },
  {
    id: '2',
    author: 'Priya Singh',
    role: 'Inspector',
    timestamp: '2024-01-15 02:45 PM',
    message: 'I will investigate this issue and provide a detailed report within 24 hours.',
    avatar: 'PS',
  },
  {
    id: '3',
    author: 'Admin User',
    role: 'Admin',
    timestamp: '2024-01-15 04:20 PM',
    message: 'Case has been assigned to senior inspector for detailed analysis.',
    avatar: 'AD',
  },
];

const mockEvidence = [
  { type: 'image' as const, url: '/wheat-sample-1.jpg', name: 'Wheat Sample 1' },
  { type: 'image' as const, url: '/wheat-sample-2.jpg', name: 'Wheat Sample 2' },
  { type: 'document' as const, url: '/quality-report.pdf', name: 'Quality Report' },
];

export function DisputeDetailPanel({ dispute, isOpen, onClose }: DisputeDetailPanelProps) {
  const [newComment, setNewComment] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success('Dispute updated successfully');
  };

  const handleResolve = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success('Dispute resolved successfully');
    onClose();
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      setNewComment('');
      toast.success('Comment added successfully');
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Farmer':
        return 'bg-green-500';
      case 'Inspector':
        return 'bg-blue-500';
      case 'Admin':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!dispute) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-krishinetra-border p-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="font-semibold text-lg">Dispute Details</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {dispute.id} • {dispute.batchId}
                      </span>
                      <Badge className={getStatusBadgeColor(dispute.status)}>
                        {dispute.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Dispute Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Dispute Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Raised By</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-100 text-green-700">
                          {dispute.raisedBy.role}
                        </Badge>
                        <span>{dispute.raisedBy.name}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Date & Time</Label>
                      <p className="mt-1">{dispute.dateRaised} 10:30 AM</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Issue Description</Label>
                    <p className="mt-1 text-sm">
                      {dispute.description || "The wheat quality is not as per the agreed standards. There are visible black spots on several grains which indicates possible fungal infection. This affects the entire batch and needs immediate attention."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle>Attached Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {mockEvidence.map((item, index) => (
                      <div
                        key={index}
                        className="border border-krishinetra-border rounded-lg p-3 hover:bg-krishinetra-gray cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {item.type === 'image' ? (
                            <ImageIcon className="h-8 w-8 text-saffron" />
                          ) : (
                            <FileText className="h-8 w-8 text-ashoka" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.type === 'image' ? 'Image' : 'Document'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Batch Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle>Batch Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-krishinetra-gray rounded-lg">
                    <div>
                      <h4 className="font-medium">Batch {dispute.batchId}</h4>
                      <p className="text-sm text-gray-600">Wheat • 500 KG • Grade A</p>
                      <p className="text-xs text-gray-500">Farmer: Rajesh Kumar</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <QrCode className="h-8 w-8 text-gray-600" />
                      </div>
                      <Button variant="link" size="sm" className="text-saffron">
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comment Thread */}
              <Card>
                <CardHeader>
                  <CardTitle>Comment Thread</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={`text-white text-xs ${getRoleColor(comment.role)}`}>
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <Badge className="text-xs bg-gray-100 text-gray-600">
                              {comment.role}
                            </Badge>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                            {comment.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-krishinetra-border">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <Button
                      onClick={handleSendComment}
                      disabled={!newComment.trim()}
                      className="bg-saffron hover:bg-saffron-dark text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Assign To</Label>
                      <Select value={assignedTo} onValueChange={setAssignedTo}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select admin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin1">Senior Inspector - Amit</SelectItem>
                          <SelectItem value="admin2">Quality Manager - Ravi</SelectItem>
                          <SelectItem value="admin3">Regional Head - Sunita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status Update</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="review">In Review</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Resolution Notes</Label>
                    <Textarea
                      placeholder="Add resolution notes..."
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-ashoka hover:bg-ashoka-dark text-white"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleResolve}
                      disabled={isLoading}
                      className="bg-forest hover:bg-forest-dark text-white"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Resolve Dispute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}