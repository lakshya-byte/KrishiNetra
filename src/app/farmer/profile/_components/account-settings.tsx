import { useState } from 'react';
import { Shield, Key, Monitor, Eye, EyeOff, Smartphone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Switch } from '../../../ui/switch';
import { Progress } from '../../../ui/progress';
import { Badge } from '../../../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../ui/collapsible';
import { motion, AnimatePresence } from 'motion/react';

interface AccountSettingsProps {
  settings: {
    twoFactorEnabled: boolean;
    profileVisibility: 'public' | 'private' | 'contacts';
    dataSharing: boolean;
    contactPreferences: {
      email: boolean;
      sms: boolean;
    };
  };
  sessions: Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }>;
  onUpdate: (settings: any) => void;
}

export function AccountSettings({ settings, sessions, onUpdate }: AccountSettingsProps) {
  const [currentSettings, setCurrentSettings] = useState(settings);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...currentSettings, [key]: value };
    setCurrentSettings(newSettings);
    onUpdate(newSettings);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPassword(prev => ({ ...prev, [field]: value }));
    if (field === 'new') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 25) return 'bg-destructive';
    if (strength < 50) return 'bg-warning-amber';
    if (strength < 75) return 'bg-saffron';
    return 'bg-success-green';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const revokeSession = (sessionId: string) => {
    // Handle session revocation
    console.log('Revoking session:', sessionId);
  };

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Change Password */}
          <Collapsible open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Change Password
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4 p-4 border border-border rounded-lg"
              >
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword.current ? 'text' : 'password'}
                      value={password.current}
                      onChange={(e) => handlePasswordChange('current', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword.new ? 'text' : 'password'}
                      value={password.new}
                      onChange={(e) => handlePasswordChange('new', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password.new && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={passwordStrength} 
                          className={`h-2 flex-1 ${getPasswordStrengthColor(passwordStrength)}`}
                        />
                        <span className="text-xs font-medium">
                          {getPasswordStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password should contain at least 8 characters with uppercase, lowercase, numbers, and symbols.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword.confirm ? 'text' : 'password'}
                      value={password.confirm}
                      onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full">Update Password</Button>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch
              checked={currentSettings.twoFactorEnabled}
              onCheckedChange={(checked) => updateSetting('twoFactorEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Control who can see your profile information
              </p>
              <div className="space-y-2">
                {[
                  { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
                  { value: 'contacts', label: 'Contacts Only', description: 'Only your connections' },
                  { value: 'private', label: 'Private', description: 'Only you can view' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={currentSettings.profileVisibility === option.value}
                      onChange={() => updateSetting('profileVisibility', option.value)}
                      className="text-primary"
                    />
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-muted-foreground">
                  Allow KrishiNetra to use your data for analytics
                </p>
              </div>
              <Switch
                checked={currentSettings.dataSharing}
                onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Badge variant="secondary" className="bg-success-green/10 text-success-green">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {session.location}
                      </span>
                      <span>Last active: {session.lastActive}</span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => revokeSession(session.id)}
                  >
                    Revoke
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}