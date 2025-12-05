import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../../../ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowLeftRight, 
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../../ui/utils';

interface ReportsSidebarProps {
  isOpen: boolean;
  activeReport: string;
  onReportChange: (report: string) => void;
}

const sidebarItems = [
  { id: 'summary', label: 'Summary Report', icon: BarChart3 },
  { id: 'sales', label: 'Sales Report', icon: TrendingUp },
  { id: 'transfer', label: 'Transfer Report', icon: ArrowLeftRight },
  { id: 'custom', label: 'Custom Reports', icon: Settings },
];

export function ReportsSidebar({ isOpen, activeReport, onReportChange }: ReportsSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? (isCollapsed ? 80 : 280) : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "bg-white border-r border-gray-200 overflow-hidden h-full",
        "lg:relative lg:translate-x-0",
        !isOpen && "lg:w-0"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold" style={{ color: 'var(--ashoka-blue)' }}>
              Reports Menu
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeReport === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 transition-all duration-200",
                  isActive && "bg-[var(--ashoka-blue)] text-white shadow-lg",
                  !isActive && "hover:bg-gray-100 text-gray-700",
                  isCollapsed && "px-3"
                )}
                onClick={() => onReportChange(item.id)}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}