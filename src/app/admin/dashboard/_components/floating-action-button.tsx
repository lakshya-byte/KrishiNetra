import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, UserPlus, Package, FileText, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'add-user',
    label: 'Add User',
    icon: UserPlus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 hover:bg-blue-200',
  },
  {
    id: 'create-batch',
    label: 'Create Batch',
    icon: Package,
    color: 'text-green-600',
    bgColor: 'bg-green-100 hover:bg-green-200',
  },
  {
    id: 'run-report',
    label: 'Run Report',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 hover:bg-purple-200',
  },
];

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQuickAction = (actionId: string) => {
    console.log(`Executing quick action: ${actionId}`);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Quick Action Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <div className="absolute bottom-16 right-0 space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: index * 0.1
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0, 
                        y: 20,
                        transition: {
                          duration: 0.2,
                          delay: (quickActions.length - 1 - index) * 0.05
                        }
                      }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 + 0.1 }
                        }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200"
                      >
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                          {action.label}
                        </span>
                      </motion.div>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            className={`h-12 w-12 rounded-full shadow-lg ${action.bgColor} ${action.color} border-2 border-white hover:shadow-xl transition-all duration-200`}
                            onClick={() => handleQuickAction(action.id)}
                          >
                            <Icon className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>{action.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={toggleExpanded}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isExpanded ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Settings className="h-6 w-6" />
                  )}
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isExpanded ? 'Close Quick Actions' : 'Quick Actions'}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Backdrop */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 -z-10"
              onClick={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}