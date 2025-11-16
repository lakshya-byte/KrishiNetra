import { useState } from 'react';
import { Camera, Check, ChevronRight, User } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { motion } from 'motion/react';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    memberSince: string;
    isVerified: boolean;
    avatar?: string;
  };
  onUpdateProfile: (data: any) => void;
}

export function ProfileHeader({ user, onUpdateProfile }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleSave = () => {
    onUpdateProfile({ name });
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'farmer': return 'bg-forest-green text-white';
      case 'distributor': return 'bg-saffron text-white';
      case 'retailer': return 'bg-ashoka-blue text-white';
      case 'admin': return 'bg-earth-brown text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Profile Photo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag and drop an image here, or click to select</p>
                  <Button className="mt-4">Choose File</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-semibold bg-input-background border border-border rounded px-3 py-1"
                />
                <Button onClick={handleSave} size="sm">
                  <Check className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                  Cancel
                </Button>
              </div>
            ) : (
              <motion.h1 
                className="text-2xl font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.02 }}
              >
                {user.name}
              </motion.h1>
            )}
            {user.isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Check className="w-5 h-5 text-success-green" />
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge className={getRoleBadgeColor(user.role)}>
              {user.role}
            </Badge>
            <span className="text-muted-foreground">Member since {user.memberSince}</span>
          </div>
          
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </motion.div>
  );
}