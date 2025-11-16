import React from 'react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gray-50 border-t border-gray-200 py-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron">
              <span className="font-semibold text-white">K</span>
            </div>
            <span className="font-semibold text-ashoka-blue">KrishiNetra</span>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center space-x-8 text-sm">
            <a 
              href="#" 
              className="text-gray-600 hover:text-ashoka-blue transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-ashoka-blue transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-ashoka-blue transition-colors duration-200"
            >
              Contact Us
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-ashoka-blue transition-colors duration-200"
            >
              Help Center
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            <p>© {currentYear} KrishiNetra. All rights reserved.</p>
            <p className="mt-1">Empowering farmers through digital agriculture solutions.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}