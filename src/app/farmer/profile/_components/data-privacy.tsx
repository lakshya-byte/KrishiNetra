"use client"
import { useState } from 'react';
import { Download, Trash2, AlertTriangle, Shield, HelpCircle, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../ui/alert-dialog';
import { Progress } from '../../../ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export function DataPrivacy() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDataExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    const steps = [
      { message: 'Gathering profile data...', duration: 1000 },
      { message: 'Collecting batch information...', duration: 1500 },
      { message: 'Compiling activity logs...', duration: 1200 },
      { message: 'Generating export file...', duration: 800 },
      { message: 'Preparing download...', duration: 500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setExportProgress(((i + 1) / steps.length) * 100);
    }

    toast.success('Data export completed!', {
      description: 'Your data has been exported and will be emailed to you shortly.',
    });

    setIsExporting(false);
    setExportProgress(0);
  };

  const handleAccountDeactivation = async () => {
    setIsDeactivating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Account deactivated', {
      description: 'Your account has been temporarily deactivated. You can reactivate it anytime.',
    });
    setIsDeactivating(false);
  };

  const handleAccountDeletion = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast.success('Account deletion initiated', {
      description: 'Your account will be permanently deleted within 30 days.',
    });
    setIsDeleting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Data & Privacy Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Export */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Export Your Data</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of all your data including profile information, batches, 
              transfers, and activity history in JSON format.
            </p>
          </div>

          <AnimatePresence>
            {isExporting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 p-4 bg-primary/5 border border-primary/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                  />
                  <span className="text-sm font-medium">Exporting your data...</span>
                </div>
                <Progress value={exportProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  This may take a few minutes depending on your data size.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            onClick={handleDataExport}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Download My Data'}
          </Button>

          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Data Export Information</p>
              <ul className="text-blue-700 text-xs space-y-1">
                <li>• Export includes all personal data and activity logs</li>
                <li>• File will be sent to your registered email address</li>
                <li>• Export link expires after 7 days for security</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-4 pt-6 border-t border-border">
          <div>
            <h4 className="font-medium mb-2">Account Management</h4>
            <p className="text-sm text-muted-foreground">
              Manage your account status or permanently delete your data.
            </p>
          </div>

          <div className="space-y-3">
            {/* Deactivate Account */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-warning-amber/10 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-warning-amber" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Deactivate Account</p>
                      <p className="text-xs text-muted-foreground">
                        Temporarily disable your account
                      </p>
                    </div>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deactivate Account</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>
                      Deactivating your account will temporarily disable access to KrishiNetra. 
                      Your data will be preserved and you can reactivate your account anytime.
                    </p>
                    <div className="bg-warning-amber/10 border border-warning-amber/20 rounded p-3">
                      <p className="text-sm font-medium text-warning-amber mb-2">What happens when you deactivate:</p>
                      <ul className="text-xs text-warning-amber space-y-1">
                        <li>• Your profile becomes invisible to other users</li>
                        <li>• Active batches and transfers remain accessible to partners</li>
                        <li>• You'll stop receiving notifications</li>
                        <li>• You can reactivate by logging in again</li>
                      </ul>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleAccountDeactivation}
                    disabled={isDeactivating}
                    className="bg-warning-amber text-white hover:bg-warning-amber/90"
                  >
                    {isDeactivating ? 'Deactivating...' : 'Deactivate Account'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Delete Account */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start border-destructive/20 hover:bg-destructive/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-xs text-muted-foreground">
                        Permanently remove your account and data
                      </p>
                    </div>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-destructive">Delete Account Permanently</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-3">
                    <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <p className="font-medium text-destructive">This action cannot be undone</p>
                      </div>
                      <p className="text-sm">
                        Deleting your account will permanently remove all your data from KrishiNetra, 
                        including your profile, batches, transfers, and activity history.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Before you delete your account:</p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• Download your data if you want to keep a copy</li>
                        <li>• Complete any pending transfers</li>
                        <li>• Notify your partners about the account deletion</li>
                        <li>• Consider deactivating instead if you might return</li>
                      </ul>
                    </div>

                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm">
                        <strong>Grace Period:</strong> Your account will be marked for deletion and 
                        permanently removed after 30 days. You can contact support to recover it 
                        during this period.
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleAccountDeletion}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Support Contact */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Need Help?</p>
                <p className="text-sm text-muted-foreground">
                  Contact our support team for assistance
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}