import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../ui/collapsible';
import { motion, AnimatePresence } from 'motion/react';

interface EscalatedDispute {
  id: string;
  batchId: string;
  issueType: string;
  raisedBy: string;
  urgency: 'High' | 'Critical';
  daysOverdue: number;
}

const escalatedDisputes: EscalatedDispute[] = [
  {
    id: 'DSP003',
    batchId: 'BT2024003',
    issueType: 'Transport Damage',
    raisedBy: 'Mumbai Grains Ltd',
    urgency: 'Critical',
    daysOverdue: 5,
  },
  {
    id: 'DSP007',
    batchId: 'BT2024007',
    issueType: 'Quality Concern',
    raisedBy: 'Rajesh Kumar',
    urgency: 'High',
    daysOverdue: 3,
  },
  {
    id: 'DSP012',
    batchId: 'BT2024012',
    issueType: 'Payment Delay',
    raisedBy: 'Sunita Devi',
    urgency: 'High',
    daysOverdue: 2,
  },
];

export function EscalationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500 text-white animate-pulse-soft';
      case 'High':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  return (
    <Card className="border-krishinetra-border mt-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-krishinetra-gray transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Escalation Requests
                <Badge className="bg-red-100 text-red-700">
                  {escalatedDisputes.length}
                </Badge>
              </CardTitle>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-gray-600 mb-4">
                    These disputes require immediate attention and may need escalation to state-level administrators.
                  </p>
                  
                  {escalatedDisputes.map((dispute, index) => (
                    <motion.div
                      key={dispute.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{dispute.id}</span>
                            <span className="text-sm text-gray-600">•</span>
                            <span className="text-sm text-gray-600">{dispute.batchId}</span>
                            <Badge className={getUrgencyColor(dispute.urgency)}>
                              {dispute.urgency}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">{dispute.issueType}</span> • 
                            Raised by {dispute.raisedBy}
                          </div>
                          <div className="text-xs text-red-600 mt-1">
                            {dispute.daysOverdue} days overdue
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-700 hover:bg-red-100"
                        >
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white gap-2"
                        >
                          <ArrowUp className="h-4 w-4" />
                          Escalate to State Admin
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="pt-4 border-t border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-red-600">
                          {escalatedDisputes.filter(d => d.urgency === 'Critical').length}
                        </span> critical issues requiring immediate escalation
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        Escalate All Critical
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}