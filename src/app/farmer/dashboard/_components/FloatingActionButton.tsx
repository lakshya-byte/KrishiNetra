import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { AddBatchModal } from './AddBatchModal';

export function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    setIsModalOpen(true);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
              >
                Add New Batch
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-saffron hover:bg-saffron-light shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleClick}
            >
              {/* Ripple effects */}
              {ripples.map((ripple) => (
                <motion.div
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                  }}
                  initial={{
                    width: 0,
                    height: 0,
                    x: '-50%',
                    y: '-50%',
                  }}
                  animate={{
                    width: 200,
                    height: 200,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                />
              ))}
              
              <Plus size={24} className="text-white relative z-10" />
            </Button>
          </motion.div>

          {/* Pulse animation ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-saffron"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      <AddBatchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}