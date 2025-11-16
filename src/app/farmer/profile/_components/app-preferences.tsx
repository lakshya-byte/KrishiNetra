import { useState } from 'react';
import { Settings, Globe, Calendar, DollarSign, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { motion } from 'motion/react';

interface AppPreferencesProps {
  preferences: {
    language: string;
    dateFormat: string;
    timezone: string;
    currency: string;
    dashboardWidgets: {
      batchOverview: boolean;
      recentActivity: boolean;
      analytics: boolean;
      quickActions: boolean;
      notifications: boolean;
    };
    defaultView: 'list' | 'grid';
  };
  onUpdate: (preferences: any) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

const timezones = [
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
];

const currencies = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
];

const dateFormats = [
  { value: 'DD/MM/YYYY', label: '31/12/2024' },
  { value: 'MM/DD/YYYY', label: '12/31/2024' },
  { value: 'YYYY-MM-DD', label: '2024-12-31' },
  { value: 'DD MMM YYYY', label: '31 Dec 2024' },
];

export function AppPreferences({ preferences, onUpdate }: AppPreferencesProps) {
  const [prefs, setPrefs] = useState(preferences);

  const updatePreference = (key: string, value: any) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);
    onUpdate(newPrefs);
  };

  const updateWidgetPreference = (widget: string, enabled: boolean) => {
    const newWidgets = { ...prefs.dashboardWidgets, [widget]: enabled };
    const newPrefs = { ...prefs, dashboardWidgets: newWidgets };
    setPrefs(newPrefs);
    onUpdate(newPrefs);
  };

  return (
    <div className="space-y-6">
      {/* Interface Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Interface Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Preference */}
          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              value={prefs.language}
              onValueChange={(value) => updatePreference('language', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Format */}
          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select
              value={prefs.dateFormat}
              onValueChange={(value) => updatePreference('dateFormat', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select
              value={prefs.timezone}
              onValueChange={(value) => updatePreference('timezone', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={prefs.currency}
              onValueChange={(value) => updatePreference('currency', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.symbol}</span>
                      <span>{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Widget Preferences */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Dashboard Widgets</Label>
            <p className="text-sm text-muted-foreground">
              Choose which widgets to display on your dashboard
            </p>
            <div className="space-y-3">
              {[
                { key: 'batchOverview', label: 'Batch Overview', description: 'Summary of your batches and inventory' },
                { key: 'recentActivity', label: 'Recent Activity', description: 'Latest actions and updates' },
                { key: 'analytics', label: 'Analytics & Insights', description: 'Performance metrics and trends' },
                { key: 'quickActions', label: 'Quick Actions', description: 'Shortcut buttons for common tasks' },
                { key: 'notifications', label: 'Notifications', description: 'Important alerts and messages' }
              ].map((widget, index) => (
                <motion.div
                  key={widget.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <Checkbox
                    id={widget.key}
                    checked={prefs.dashboardWidgets[widget.key]}
                    onCheckedChange={(checked) => updateWidgetPreference(widget.key, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={widget.key} className="cursor-pointer font-medium">
                      {widget.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {widget.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Default View Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Default View for Batches</Label>
            <RadioGroup
              value={prefs.defaultView}
              onValueChange={(value) => updatePreference('defaultView', value)}
              className="space-y-3"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                <RadioGroupItem value="list" id="view-list" />
                <Label htmlFor="view-list" className="flex items-center gap-3 cursor-pointer flex-1">
                  <List className="w-4 h-4" />
                  <div>
                    <p className="font-medium">List View</p>
                    <p className="text-xs text-muted-foreground">Detailed table with sorting options</p>
                  </div>
                </Label>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                <RadioGroupItem value="grid" id="view-grid" />
                <Label htmlFor="view-grid" className="flex items-center gap-3 cursor-pointer flex-1">
                  <LayoutGrid className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Grid View</p>
                    <p className="text-xs text-muted-foreground">Card-based layout with visual previews</p>
                  </div>
                </Label>
              </motion.div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}