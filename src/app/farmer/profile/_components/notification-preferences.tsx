import { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, TestTube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface NotificationPreferencesProps {
  preferences: {
    email: {
      batchUpdates: boolean;
      transfers: boolean;
      systemAlerts: boolean;
      weeklyDigest: boolean;
    };
    sms: {
      criticalUpdates: boolean;
    };
    push: {
      enabled: boolean;
    };
    frequency: 'realtime' | 'daily' | 'weekly';
  };
  onUpdate: (preferences: any) => void;
}

export function NotificationPreferences({ preferences, onUpdate }: NotificationPreferencesProps) {
  const [prefs, setPrefs] = useState(preferences);
  const [isTestingNotification, setIsTestingNotification] = useState(false);

  const updatePreference = (category: string, key: string, value: boolean | string) => {
    const newPrefs = {
      ...prefs,
      [category]: typeof prefs[category] === 'object' 
        ? { ...prefs[category], [key]: value }
        : value
    };
    setPrefs(newPrefs);
    onUpdate(newPrefs);
  };

  const testNotification = async () => {
    setIsTestingNotification(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Test notification sent successfully!', {
      description: 'Check your selected notification channels.',
    });
    setIsTestingNotification(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <h4 className="font-medium">Email Notifications</h4>
          </div>
          <div className="space-y-3 ml-6">
            {[
              { key: 'batchUpdates', label: 'Batch Updates', description: 'Get notified when your batches are updated' },
              { key: 'transfers', label: 'Transfer Notifications', description: 'Notifications for completed transfers' },
              { key: 'systemAlerts', label: 'System Alerts', description: 'Important system maintenance and updates' },
              { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your weekly activity' }
            ].map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex-1">
                  <Label htmlFor={`email-${item.key}`} className="cursor-pointer">
                    {item.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
                <Switch
                  id={`email-${item.key}`}
                  checked={prefs.email[item.key]}
                  onCheckedChange={(checked) => updatePreference('email', item.key, checked)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <h4 className="font-medium">SMS Notifications</h4>
          </div>
          <div className="ml-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex-1">
                <Label htmlFor="sms-critical" className="cursor-pointer">
                  Critical Updates Only
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Only urgent notifications via SMS
                </p>
              </div>
              <Switch
                id="sms-critical"
                checked={prefs.sms.criticalUpdates}
                onCheckedChange={(checked) => updatePreference('sms', 'criticalUpdates', checked)}
              />
            </motion.div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <h4 className="font-medium">Push Notifications</h4>
          </div>
          <div className="ml-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex-1">
                <Label htmlFor="push-enabled" className="cursor-pointer">
                  Browser Push Notifications
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Receive notifications in your browser
                </p>
              </div>
              <Switch
                id="push-enabled"
                checked={prefs.push.enabled}
                onCheckedChange={(checked) => updatePreference('push', 'enabled', checked)}
              />
            </motion.div>
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="space-y-4">
          <h4 className="font-medium">Notification Frequency</h4>
          <div className="ml-6">
            <Select
              value={prefs.frequency}
              onValueChange={(value) => updatePreference('frequency', '', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Test Notification */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={testNotification}
            disabled={isTestingNotification}
            className="w-full flex items-center gap-2"
          >
            {isTestingNotification ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
              />
            ) : (
              <TestTube className="w-4 h-4" />
            )}
            {isTestingNotification ? 'Sending...' : 'Send Test Notification'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}