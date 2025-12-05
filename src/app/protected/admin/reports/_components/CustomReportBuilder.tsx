"use client"

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Badge } from '../../../ui/badge';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Table, 
  Map, 
  Target,
  Save,
  Settings,
  Grid3X3,
  Trash2
} from 'lucide-react';

interface Widget {
  id: string;
  type: string;
  name: string;
  icon: React.ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WidgetType {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const widgetTypes: WidgetType[] = [
  { id: 'line', name: 'Line Chart', icon: LineChart, description: 'Time series data visualization' },
  { id: 'bar', name: 'Bar Chart', icon: BarChart3, description: 'Categorical data comparison' },
  { id: 'pie', name: 'Pie Chart', icon: PieChart, description: 'Distribution visualization' },
  { id: 'table', name: 'Data Table', icon: Table, description: 'Tabular data display' },
  { id: 'map', name: 'Map View', icon: Map, description: 'Geographic data visualization' },
  { id: 'kpi', name: 'KPI Card', icon: Target, description: 'Key performance indicators' },
];

function DraggableWidget({ widgetType }: { widgetType: WidgetType }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    item: { widgetType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = widgetType.icon;

  return (
    <motion.div
      ref={drag}
      className={`p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-move hover:border-[var(--ashoka-blue)] transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-center space-y-2">
        <Icon className="h-8 w-8 mx-auto" style={{ color: 'var(--ashoka-blue)' }} />
        <div>
          <p className="font-medium text-sm">{widgetType.name}</p>
          <p className="text-xs text-gray-500">{widgetType.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CanvasWidget({ widget, onRemove }: { widget: Widget; onRemove: (id: string) => void }) {
  const Icon = widget.icon;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute bg-white border-2 border-[var(--ashoka-blue)] rounded-lg p-4 shadow-lg group"
      style={{
        left: widget.x,
        top: widget.y,
        width: widget.width,
        height: widget.height,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
          <span className="font-medium text-sm">{widget.name}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(widget.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
      <div className="h-20 bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
        <p className="text-xs text-gray-500">Widget Preview</p>
      </div>
    </motion.div>
  );
}

function DropCanvas({ widgets, onDrop, onRemoveWidget }: {
  widgets: Widget[];
  onDrop: (item: any, monitor: any) => void;
  onRemoveWidget: (id: string) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => onDrop(item, monitor),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative w-full h-96 border-2 border-dashed rounded-lg transition-colors ${
        isOver ? 'border-[var(--ashoka-blue)] bg-blue-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      {widgets.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Grid3X3 className="h-12 w-12 mx-auto text-gray-400" />
            <p className="text-gray-500">Drag widgets here to build your report</p>
          </div>
        </div>
      ) : (
        widgets.map((widget) => (
          <CanvasWidget
            key={widget.id}
            widget={widget}
            onRemove={onRemoveWidget}
          />
        ))
      )}
    </div>
  );
}

export function CustomReportBuilder() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  const handleDrop = (item: any, monitor: any) => {
    const offset = monitor.getDropResult() || monitor.getClientOffset();
    if (!offset) return;

    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type: item.widgetType.id,
      name: item.widgetType.name,
      icon: item.widgetType.icon,
      x: Math.max(0, offset.x - 250), // Adjust for container offset
      y: Math.max(0, offset.y - 200),
      width: 200,
      height: 150,
    };

    setWidgets(prev => [...prev, newWidget]);
    setSelectedWidget(newWidget);
    setIsConfigModalOpen(true);
  };

  const handleRemoveWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const handleSaveReport = () => {
    if (!reportName.trim()) {
      alert('Please enter a report name');
      return;
    }

    // Simulate saving
    console.log('Saving report:', {
      name: reportName,
      description: reportDescription,
      widgets: widgets,
    });
    
    alert('Report saved successfully!');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" style={{ color: 'var(--ashoka-blue)' }} />
            <span>Custom Report Builder</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Widget Panel */}
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">Available Widgets</h3>
              <div className="space-y-3">
                {widgetTypes.map((widgetType) => (
                  <DraggableWidget key={widgetType.id} widgetType={widgetType} />
                ))}
              </div>
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Report Canvas</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
                    </Badge>
                    <Button
                      onClick={handleSaveReport}
                      disabled={widgets.length === 0}
                      className="bg-[var(--forest-green)] hover:bg-[var(--forest-green-dark)] text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Layout
                    </Button>
                  </div>
                </div>

                <DropCanvas
                  widgets={widgets}
                  onDrop={handleDrop}
                  onRemoveWidget={handleRemoveWidget}
                />

                {/* Report Details */}
                {widgets.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <Label htmlFor="reportName">Report Name</Label>
                      <Input
                        id="reportName"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="Enter report name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportDescription">Description</Label>
                      <Input
                        id="reportDescription"
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        placeholder="Brief description"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widget Configuration Modal */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Widget</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Widget Type</Label>
              <Input value={selectedWidget?.name || ''} disabled />
            </div>
            <div>
              <Label>Data Source</Label>
              <select className="w-full p-2 border rounded">
                <option>Sales Data</option>
                <option>Transfer Records</option>
                <option>Batch Information</option>
                <option>Regional Statistics</option>
              </select>
            </div>
            <div>
              <Label>Time Range</Label>
              <select className="w-full p-2 border rounded">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsConfigModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setIsConfigModalOpen(false)}
                className="bg-[var(--ashoka-blue)] hover:bg-[var(--ashoka-blue-dark)] text-white"
              >
                Apply Configuration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}