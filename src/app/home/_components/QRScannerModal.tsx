import { useState, useEffect } from 'react';
import { X, Camera, AlertCircle, CheckCircle, Scan } from 'lucide-react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { toast } from 'sonner';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const [hasCamera, setHasCamera] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Check camera availability
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCamera(false);
        toast.error('Camera not supported on this device', {
          description: 'Please use a device with camera support to scan QR codes',
        });
      }
    }
  }, [isOpen]);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      // Simulate camera access and QR scanning
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful scan
      const mockProductData = "KRISHI-PROD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setScannedData(mockProductData);
      
      toast.success('QR Code scanned successfully!', {
        description: 'Product information retrieved',
      });
      
      setIsScanning(false);
    } catch (error) {
      setIsScanning(false);
      toast.error('Failed to access camera', {
        description: 'Please allow camera permissions and try again',
      });
    }
  };

  const handleClose = () => {
    setIsScanning(false);
    setScannedData(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-gray-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-forest-green">
            <Scan className="h-5 w-5" />
            Scan Product QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!hasCamera ? (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Camera not supported on this device. Please try on a mobile device or computer with camera access.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Camera Preview Area */}
              <div className="relative bg-gray-100 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300">
                {!isScanning && !scannedData && (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Position the QR code within the frame</p>
                    <p className="text-sm text-gray-500">Ensure good lighting for best results</p>
                  </div>
                )}
                
                {isScanning && (
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-saffron rounded-lg mx-auto mb-4 animate-pulse">
                        <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-lg flex items-center justify-center">
                          <Scan className="h-8 w-8 text-saffron animate-bounce" />
                        </div>
                      </div>
                      <div className="absolute inset-0 border-2 border-saffron rounded-lg animate-ping opacity-25"></div>
                    </div>
                    <p className="text-forest-green font-medium">Scanning...</p>
                    <p className="text-sm text-gray-500">Hold steady</p>
                  </div>
                )}
                
                {scannedData && (
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-forest-green mx-auto mb-4" />
                    <p className="text-forest-green font-medium mb-2">Product Found!</p>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Product ID:</p>
                      <p className="font-mono text-sm text-ashoka-blue font-semibold">{scannedData}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-sm font-medium text-ashoka-blue mb-2">Scanning Instructions:</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Allow camera access when prompted</li>
                  <li>• Hold your device steady</li>
                  <li>• Ensure the QR code is clearly visible</li>
                  <li>• Good lighting improves accuracy</li>
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {!scannedData && (
                  <Button
                    onClick={startScanning}
                    disabled={isScanning}
                    className="flex-1 bg-saffron hover:bg-saffron-dark text-white"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera
                      </>
                    )}
                  </Button>
                )}
                
                {scannedData && (
                  <Button
                    onClick={() => {
                      toast.success('Redirecting to product details...');
                      handleClose();
                    }}
                    className="flex-1 bg-forest-green hover:bg-forest-green-dark text-white"
                  >
                    View Product Details
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}