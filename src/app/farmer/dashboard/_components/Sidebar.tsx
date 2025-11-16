import React from 'react';
import { Home, Plus, ArrowRightLeft, BarChart3, HelpCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
  { id: 'add-batch', label: 'Add New Batch', icon: Plus },
  { id: 'transfer', label: 'Transfer Ownership', icon: ArrowRightLeft },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export function Sidebar({ isOpen, activeItem, onItemClick }: SidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => onItemClick('close')}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-50 h-full w-70 bg-white border-r border-gray-200 shadow-lg lg:relative lg:translate-x-0 lg:shadow-none"
        style={{ width: '280px' }}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron">
                <span className="font-semibold text-white">K</span>
              </div>
              <div>
                <h2 className="font-semibold text-ashoka-blue">KrishiNetra</h2>
                <p className="text-sm text-gray-500">Farmer Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start px-4 py-3 h-auto relative transition-all duration-200 ${
                      isActive 
                        ? 'bg-saffron/10 text-saffron border-r-2 border-saffron hover:bg-saffron/15' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-ashoka-blue'
                    }`}
                    onClick={() => onItemClick(item.id)}
                  >
                    <Icon 
                      size={20} 
                      className={`mr-3 ${isActive ? 'text-saffron' : 'text-ashoka-blue'}`} 
                    />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        className="absolute left-0 top-0 w-1 h-full bg-saffron rounded-r-full"
                      />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="rounded-lg bg-gradient-to-r from-forest-green to-forest-green/80 p-4 text-white">
              <h3 className="font-medium mb-1">Need Help?</h3>
              <p className="text-sm text-green-100 mb-3">
                Contact our support team for assistance
              </p>
              <Button 
                size="sm" 
                variant="secondary" 
                className="w-full bg-white text-forest-green hover:bg-gray-100"
              >
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}