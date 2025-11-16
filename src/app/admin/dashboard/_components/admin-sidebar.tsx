import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Package,
  AlertTriangle,
  BarChart3,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { cn } from '../../../ui/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'batches', label: 'Batch Oversight', icon: Package },
  { id: 'disputes', label: 'Dispute Resolution', icon: AlertTriangle },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'System Settings', icon: Settings },
  { id: 'logs', label: 'Logs & Audit', icon: FileText },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function AdminSidebar({ isCollapsed, onToggle, className }: AdminSidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <motion.div
      className={cn(
        "relative h-full bg-white border-r border-gray-200 flex flex-col",
        className
      )}
      animate={{ width: isCollapsed ? 60 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-8 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="h-6 w-6 rounded-full p-0 bg-white border shadow-md hover:shadow-lg transition-shadow"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-3 w-3" />
          </motion.div>
        </Button>
      </div>

      {/* Logo Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0">
            <span className="text-white font-semibold text-sm">KN</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="font-semibold text-gray-900 whitespace-nowrap">KrishiNetra</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">Admin Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 h-auto transition-all duration-200",
                    isActive
                      ? "bg-orange-50 text-orange-700 border-r-2 border-orange-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    isCollapsed && "justify-center px-2"
                  )}
                  onClick={() => setActiveItem(item.id)}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "" : "mr-3")} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-500 text-center"
            >
              © KrishiNetra
              <br />
              Government of Odisha
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}