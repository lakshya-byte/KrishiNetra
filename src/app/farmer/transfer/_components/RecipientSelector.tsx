import { useState, useEffect } from 'react';
import { ChevronDown, Building2, Store, MapPin, Search } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Card } from '../../../ui/card';
import { Label } from '../../../ui/label';
import { motion, AnimatePresence } from 'motion/react';

interface Recipient {
  id: string;
  name: string;
  company: string;
  location: string;
  type: 'Distributor' | 'Retailer';
}

const mockRecipients: Recipient[] = [
  {
    id: 'DIST001',
    name: 'Amit Sharma',
    company: 'AgriDistribute Co.',
    location: 'Delhi, India',
    type: 'Distributor'
  },
  {
    id: 'DIST002',
    name: 'Priya Patel',
    company: 'Green Supply Chain',
    location: 'Mumbai, India',
    type: 'Distributor'
  },
  {
    id: 'RET001',
    name: 'Suresh Kumar',
    company: 'Fresh Market Store',
    location: 'Bangalore, India',
    type: 'Retailer'
  },
  {
    id: 'RET002',
    name: 'Meera Singh',
    company: 'Organic Mart',
    location: 'Chennai, India',
    type: 'Retailer'
  },
  {
    id: 'DIST003',
    name: 'Rajesh Gupta',
    company: 'Farm to Table Ltd',
    location: 'Pune, India',
    type: 'Distributor'
  }
];

interface RecipientSelectorProps {
  selectedRole: 'Distributor' | 'Retailer' | null;
  selectedRecipient: Recipient | null;
  onRoleSelect: (role: 'Distributor' | 'Retailer') => void;
  onRecipientSelect: (recipient: Recipient) => void;
}

export function RecipientSelector({
  selectedRole,
  selectedRecipient,
  onRoleSelect,
  onRecipientSelect
}: RecipientSelectorProps) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [recipientDropdownOpen, setRecipientDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipients = mockRecipients.filter(recipient => {
    const matchesRole = !selectedRole || recipient.type === selectedRole;
    const matchesSearch = !searchTerm || 
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesSearch;
  });

  // Reset recipient selection when role changes
  useEffect(() => {
    if (selectedRecipient && selectedRole && selectedRecipient.type !== selectedRole) {
      onRecipientSelect(null as any);
    }
  }, [selectedRole, selectedRecipient, onRecipientSelect]);

  const getRoleIcon = (role: string) => {
    return role === 'Distributor' ? 
      <Building2 className="w-4 h-4" /> : 
      <Store className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div>
        <Label className="block text-sm font-medium mb-2">Recipient Role *</Label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between h-12"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          >
            {selectedRole ? (
              <div className="flex items-center space-x-2">
                {getRoleIcon(selectedRole)}
                <span>{selectedRole}</span>
              </div>
            ) : (
              <span className="text-gray-500">Select recipient role</span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
          </Button>

          <AnimatePresence>
            {roleDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 z-10 mt-2"
              >
                <Card className="p-2 shadow-lg border-2">
                  {['Distributor', 'Retailer'].map((role) => (
                    <div
                      key={role}
                      className="flex items-center space-x-2 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                      onClick={() => {
                        onRoleSelect(role as 'Distributor' | 'Retailer');
                        setRoleDropdownOpen(false);
                      }}
                    >
                      {getRoleIcon(role)}
                      <span>{role}</span>
                    </div>
                  ))}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Recipient Selection */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: selectedRole ? 1 : 0.5 }}
        className={selectedRole ? '' : 'pointer-events-none'}
      >
        <div>
          <Label className="block text-sm font-medium mb-2">Select Recipient *</Label>
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between h-12"
              disabled={!selectedRole}
              onClick={() => setRecipientDropdownOpen(!recipientDropdownOpen)}
            >
              {selectedRecipient ? (
                <div className="flex items-center space-x-2">
                  {getRoleIcon(selectedRecipient.type)}
                  <div className="text-left">
                    <div className="font-medium">{selectedRecipient.name}</div>
                    <div className="text-xs text-gray-500">{selectedRecipient.company}</div>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">
                  {selectedRole ? `Select a ${selectedRole.toLowerCase()}` : 'Select role first'}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${recipientDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            <AnimatePresence>
              {recipientDropdownOpen && selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 z-10 mt-2"
                >
                  <Card className="p-4 shadow-lg border-2 max-h-80 overflow-y-auto">
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search recipients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="space-y-2">
                      {filteredRecipients.map((recipient, index) => (
                        <motion.div
                          key={recipient.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
                          onClick={() => {
                            onRecipientSelect(recipient);
                            setRecipientDropdownOpen(false);
                            setSearchTerm('');
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            {getRoleIcon(recipient.type)}
                            <div className="flex-1">
                              <div className="font-medium">{recipient.name}</div>
                              <div className="text-sm text-gray-600">{recipient.company}</div>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {recipient.location}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {filteredRecipients.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          No {selectedRole?.toLowerCase()}s found matching your search
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Recent Recipients Quick Select */}
      {selectedRole && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Label className="block text-sm font-medium mb-2">Recent {selectedRole}s</Label>
          <div className="flex flex-wrap gap-2">
            {filteredRecipients.slice(0, 3).map((recipient) => (
              <Button
                key={recipient.id}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto p-2 text-xs hover:bg-blue-50"
                onClick={() => onRecipientSelect(recipient)}
              >
                <div className="flex items-center space-x-1">
                  {getRoleIcon(recipient.type)}
                  <span>{recipient.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}