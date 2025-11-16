import { motion } from 'motion/react';
import { CheckCircle, Package, User, Calendar, IndianRupee, Truck, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';

interface TransferData {
  batch: {
    id: string;
    cropType: string;
    quantity: string;
    currentOwner: string;
  } | null;
  recipient: {
    name: string;
    company: string;
    location: string;
    type: string;
  } | null;
  transferDate: string;
  price: string;
  transportMethod: string;
  notes: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transferData: TransferData;
  isSubmitting: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  transferData,
  isSubmitting
}: ConfirmationModalProps) {
  const { batch, recipient, transferDate, price, transportMethod, notes } = transferData;

  if (!batch || !recipient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--saffron-orange)' }}
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span>Confirm Transfer</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center text-gray-600">
            <p>Please review the transfer details before confirming</p>
          </div>

          {/* Batch Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center space-x-2">
              <Package className="w-4 h-4" style={{ color: 'var(--ashoka-blue)' }} />
              <span>Batch Details</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Batch ID:</span>
                  <div className="font-medium">{batch.id}</div>
                </div>
                <div>
                  <span className="text-gray-500">Crop Type:</span>
                  <div className="font-medium">{batch.cropType}</div>
                </div>
                <div>
                  <span className="text-gray-500">Quantity:</span>
                  <div className="font-medium">{batch.quantity}</div>
                </div>
                <div>
                  <span className="text-gray-500">Current Owner:</span>
                  <div className="font-medium text-xs">{batch.currentOwner}</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recipient Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center space-x-2">
              <User className="w-4 h-4" style={{ color: 'var(--forest-green)' }} />
              <span>Transfer To</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{recipient.name}</div>
                  <div className="text-sm text-gray-600">{recipient.company}</div>
                  <div className="text-xs text-gray-500">{recipient.location}</div>
                </div>
                <Badge 
                  className="bg-blue-100 text-blue-800"
                >
                  {recipient.type}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Transfer Details */}
          <div className="space-y-3">
            <h3 className="font-medium">Transfer Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">Transfer Date:</span>
                </div>
                <span className="font-medium">{new Date(transferDate).toLocaleDateString()}</span>
              </div>

              {price && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">Value:</span>
                  </div>
                  <span className="font-medium text-green-600">₹{price}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">Transport:</span>
                </div>
                <span className="font-medium">{transportMethod}</span>
              </div>

              {notes && (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">Notes:</span>
                  </div>
                  <div className="text-sm bg-gray-50 p-2 rounded italic">
                    "{notes}"
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1"
              disabled={isSubmitting}
              style={{ backgroundColor: 'var(--saffron-orange)' }}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Processing...' : 'Confirm Transfer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}