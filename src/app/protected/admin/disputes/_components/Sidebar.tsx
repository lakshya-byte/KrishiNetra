import { useState } from 'react';
import { Clock, CheckCircle, AlertTriangle, Settings, ChevronLeft } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    id: 'pending',
    label: 'Pending Disputes',
    icon: Clock,
    count: 12,
    active: true,
  },
  {
    id: 'resolved',
    label: 'Resolved Disputes',
    icon: CheckCircle,
    count: 45,
    active: false,
  },
  {
    id: 'escalations',
    label: 'Escalations',
    icon: AlertTriangle,
    count: 3,
    active: false,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    count: 0,
    active: false,
  },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('pending');

  return (
    <motion.aside
      className="bg-white border-r border-krishinetra-border h-full flex flex-col"
      initial={false}
      animate={{
        width: isCollapsed ? '64px' : '280px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-krishinetra-border">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-semibold text-gray-900"
            >
              Menu
            </motion.h2>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="hidden lg:flex"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                isActive 
                  ? 'bg-gradient-to-r from-saffron to-saffron-dark text-white' 
                  : 'hover:bg-krishinetra-gray'
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between flex-1 overflow-hidden"
                  >
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                    {item.count > 0 && (
                      <Badge 
                        variant={isActive ? "secondary" : "default"}
                        className={`ml-2 ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-saffron text-white'
                        }`}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-krishinetra-border">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-500 text-center"
            >
              KrishiNetra v2.0
              <br />
              Dispute Management
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}