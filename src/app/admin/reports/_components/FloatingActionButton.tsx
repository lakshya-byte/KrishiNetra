import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Plus, FileText, BarChart3, Settings } from 'lucide-react';
import { CustomReportBuilder } from './CustomReportBuilder';

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);

  const actionItems = [
    {
      icon: FileText,
      label: 'Quick Report',
      action: () => {
        console.log('Create quick report');
        setIsExpanded(false);
      }
    },
    {
      icon: BarChart3,
      label: 'Custom Dashboard',
      action: () => {
        setIsReportBuilderOpen(true);
        setIsExpanded(false);
      }
    },
    {
      icon: Settings,
      label: 'Report Template',
      action: () => {
        console.log('Create template');
        setIsExpanded(false);
      }
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Action Items */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 space-y-3"
              >
                {actionItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <motion.span
                        className="bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.label}
                      </motion.span>
                      <Button
                        size="sm"
                        onClick={item.action}
                        className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl text-gray-700 hover:text-[var(--ashoka-blue)]"
                      >
                        <Icon className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-14 h-14 rounded-full bg-[var(--saffron-orange)] hover:bg-[var(--saffron-orange-dark)] text-white shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="h-6 w-6" />
              </motion.div>
              
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: isExpanded ? 2 : 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>

          {/* Label */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-16 top-1/2 transform -translate-y-1/2"
              >
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  New Report
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Report Builder Modal */}
      <Dialog open={isReportBuilderOpen} onOpenChange={setIsReportBuilderOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
              <span>Create Custom Report</span>
            </DialogTitle>
          </DialogHeader>
          <CustomReportBuilder />
        </DialogContent>
      </Dialog>
    </>
  );
}