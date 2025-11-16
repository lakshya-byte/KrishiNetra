import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, User, ArrowUpRight, CheckCircle, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Textarea } from '../../../ui/textarea';
import { Label } from '../../../ui/label';

interface Dispute {
  id: string;
  batchId: string;
  issue: string;
  raisedBy: 'Farmer' | 'Distributor' | 'Retailer';
  raisedByName: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  description: string;
}

const sampleDisputes: Dispute[] = [
  {
    id: 'D001',
    batchId: 'B001',
    issue: 'Quality concerns with rice batch',
    raisedBy: 'Distributor',
    raisedByName: 'Priya Distributors',
    date: '2 hours ago',
    priority: 'High',
    description: 'The rice batch received shows signs of moisture damage and doesn\'t meet the quality standards mentioned in the contract.'
  },
  {
    id: 'D002',
    batchId: 'B003',
    issue: 'Delayed delivery dispute',
    raisedBy: 'Retailer',
    raisedByName: 'NutriMart',
    date: '1 day ago',
    priority: 'Medium',
    description: 'Turmeric batch was supposed to be delivered 3 days ago but still hasn\'t arrived at our warehouse.'
  },
  {
    id: 'D003',
    batchId: 'B005',
    issue: 'Pricing discrepancy',
    raisedBy: 'Farmer',
    raisedByName: 'Tropical Orchards',
    date: '2 days ago',
    priority: 'Low',
    description: 'The agreed price for mango batch was different from what was recorded in the blockchain.'
  },
  {
    id: 'D004',
    batchId: 'B002',
    issue: 'Documentation missing',
    raisedBy: 'Distributor',
    raisedByName: 'Grain Masters',
    date: '3 days ago',
    priority: 'Medium',
    description: 'Quality certification documents are missing for the wheat batch.'
  },
  {
    id: 'D005',
    batchId: 'B007',
    issue: 'Contamination alert',
    raisedBy: 'Retailer',
    raisedByName: 'Fresh Foods',
    date: '4 days ago',
    priority: 'High',
    description: 'Pesticide residue found in vegetable batch exceeds acceptable limits.'
  },
];

export function DisputeResolutionPanel() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolution, setResolution] = useState('');

  const getPriorityBadge = (priority: Dispute['priority']) => {
    const styles = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200',
    };
    return styles[priority];
  };

  const getRoleBadge = (role: Dispute['raisedBy']) => {
    const styles = {
      'Farmer': 'bg-green-50 text-green-700',
      'Distributor': 'bg-blue-50 text-blue-700',
      'Retailer': 'bg-purple-50 text-purple-700',
    };
    return styles[role];
  };

  const handleResolve = (dispute: Dispute) => {
    setSelectedDispute(dispute);
  };

  const handleEscalate = (disputeId: string) => {
    console.log(`Escalating dispute ${disputeId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Dispute Resolution</CardTitle>
                <p className="text-sm text-gray-600">Top 5 pending disputes requiring attention</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              View All Disputes
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {sampleDisputes.slice(0, 5).map((dispute, index) => (
              <motion.div
                key={dispute.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {dispute.batchId}
                      </Badge>
                      <Badge variant="outline" className={getPriorityBadge(dispute.priority)}>
                        {dispute.priority}
                      </Badge>
                      <Badge variant="secondary" className={getRoleBadge(dispute.raisedBy)}>
                        {dispute.raisedBy}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-1">{dispute.issue}</h4>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {dispute.raisedByName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dispute.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleResolve(dispute)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Resolve Dispute {dispute.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="issue">Issue</Label>
                            <p className="text-sm text-gray-600 mt-1">{dispute.issue}</p>
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <p className="text-sm text-gray-600 mt-1">{dispute.description}</p>
                          </div>
                          
                          <div>
                            <Label htmlFor="resolution">Resolution Notes</Label>
                            <Textarea
                              id="resolution"
                              placeholder="Enter your resolution notes..."
                              value={resolution}
                              onChange={(e) => setResolution(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              Mark as Resolved
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Save Draft
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEscalate(dispute.id)}
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Escalate
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}