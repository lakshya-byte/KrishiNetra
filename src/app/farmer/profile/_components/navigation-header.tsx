import { useState, useEffect } from 'react';
import { Check, Bell, User, Home, ChevronRight, Save } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Badge } from '../../../ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../../ui/breadcrumb';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationHeaderProps {
  user: {
    name: string;
    avatar?: string;
  };
  hasUnsavedChanges: boolean;
  lastSaved?: Date;
}

export function NavigationHeader({ user, hasUnsavedChanges, lastSaved }: NavigationHeaderProps) {
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  useEffect(() => {
    if (lastSaved) {
      setShowSaveIndicator(true);
      const timer = setTimeout(() => setShowSaveIndicator(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-6">
            {/* KrishiNetra Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-forest-green to-saffron rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KN</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-forest-green to-saffron bg-clip-text text-transparent">
                KrishiNetra
              </span>
            </motion.div>

            {/* Page Title and Breadcrumb */}
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold mb-1">Profile Settings</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Center - Save Status */}
          <div className="flex-1 flex justify-center">
            <AnimatePresence>
              {showSaveIndicator && lastSaved && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-success-green/10 text-success-green px-3 py-1 rounded-full border border-success-green/20"
                >
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    All changes saved
                  </span>
                </motion.div>
              )}
              {hasUnsavedChanges && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-warning-amber/10 text-warning-amber px-3 py-1 rounded-full border border-warning-amber/20"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Unsaved changes
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - User Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-saffron text-white text-xs">
                  3
                </Badge>
              </Button>
            </motion.div>

            {/* User Avatar */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">Farmer</p>
              </div>
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>

        {/* Mobile Page Title */}
        <div className="md:hidden pb-4">
          <h1 className="text-lg font-semibold mb-1">Profile Settings</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="flex items-center gap-1 text-sm">
                  <Home className="w-3 h-3" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3 h-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </header>
  );
}