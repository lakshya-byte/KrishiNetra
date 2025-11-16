import { useState, useRef, useEffect } from "react";
import { Camera, FlipHorizontal, Zap, ZapOff, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Card, CardContent } from "../../../ui/card";

interface ScannerInterfaceProps {
  onScanSuccess: (batchId: string) => void;
}

export function ScannerInterface({ onScanSuccess }: ScannerInterfaceProps) {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (cameraEnabled && isScanning) {
      const interval = setInterval(() => {
        setScanlinePosition(prev => (prev + 2) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [cameraEnabled, isScanning]);

  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraEnabled(true);
      setIsScanning(true);
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const handleScan = () => {
    // Simulate successful scan after animation
    setTimeout(() => {
      onScanSuccess("KN-2024-001-TOM");
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (batchId.trim()) {
      onScanSuccess(batchId);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualSubmit();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-6">
        {/* Camera Viewfinder */}
        <div className="relative mb-6">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            {cameraEnabled ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48 border-2 border-white rounded-lg">
                    {/* Corner Brackets */}
                    <motion.div
                      className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[var(--krishinetra-saffron)]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[var(--krishinetra-saffron)]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[var(--krishinetra-saffron)]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[var(--krishinetra-saffron)]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                    
                    {/* Scanning Line */}
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-[var(--krishinetra-saffron)] shadow-lg"
                      style={{ top: `${scanlinePosition}%` }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Camera access needed to scan QR codes</p>
                  <Button 
                    onClick={enableCamera}
                    className="bg-[var(--krishinetra-saffron)] hover:bg-[var(--krishinetra-saffron-light)] text-white"
                  >
                    Enable Camera
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          {cameraEnabled && (
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="outline" size="sm">
                <FlipHorizontal className="w-4 h-4" />
              </Button>
              <Button 
                variant={flashEnabled ? "default" : "outline"} 
                size="sm"
                onClick={() => setFlashEnabled(!flashEnabled)}
              >
                {flashEnabled ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
              </Button>
              <Button 
                onClick={handleScan}
                className="bg-[var(--krishinetra-saffron)] hover:bg-[var(--krishinetra-saffron-light)] text-white px-8"
              >
                Scan
              </Button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Manual Input */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Enter Batch ID manually (e.g., KN-2024-001-TOM)"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          
          <Button 
            onClick={handleManualSubmit}
            disabled={!batchId.trim()}
            className="w-full bg-[var(--krishinetra-ashoka-blue)] hover:bg-[var(--krishinetra-ashoka-blue-light)] text-white"
          >
            Trace Product
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}