import { useState } from 'react';
import { Plus, Upload, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export function FloatingActionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    batchId: '',
    issueType: '',
    description: '',
    attachments: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsModalOpen(false);
    setFormData({
      batchId: '',
      issueType: '',
      description: '',
      attachments: [],
    });
    
    toast.success('New dispute created successfully');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-saffron to-saffron-dark text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="sm"
        >
          <motion.div
            animate={{ rotate: isModalOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-6 w-6" />
          </motion.div>
        </Button>
        
        {/* FAB Label */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap"
        >
          New Dispute
          <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
        </motion.div>
      </motion.div>

      {/* Create Dispute Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-saffron to-saffron-dark rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
              Create New Dispute
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Batch ID */}
            <div>
              <Label htmlFor="batchId">Batch ID</Label>
              <Input
                id="batchId"
                placeholder="Enter batch ID (e.g., BT2024001)"
                value={formData.batchId}
                onChange={(e) => setFormData(prev => ({ ...prev, batchId: e.target.value }))}
                required
              />
            </div>

            {/* Issue Type */}
            <div>
              <Label htmlFor="issueType">Issue Type</Label>
              <Select 
                value={formData.issueType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, issueType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quality-concern">Quality Concern</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="transport-damage">Transport Damage</SelectItem>
                  <SelectItem value="payment-delay">Payment Delay</SelectItem>
                  <SelectItem value="certification">Certification Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            {/* Attachments */}
            <div>
              <Label htmlFor="attachments">Attachments</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="attachments"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('attachments')?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                  <span className="text-xs text-gray-500">
                    Images, PDF, DOC files
                  </span>
                </div>

                {/* Attached Files */}
                <AnimatePresence>
                  {formData.attachments.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between p-2 bg-krishinetra-gray rounded border"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-saffron bg-opacity-20 rounded flex items-center justify-center">
                          <Upload className="h-4 w-4 text-saffron" />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-40">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.batchId || !formData.issueType || !formData.description}
                className="flex-1 bg-gradient-to-r from-saffron to-saffron-dark text-white"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Create Dispute'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}