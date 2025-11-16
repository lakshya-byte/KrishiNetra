import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Server, Database, Wifi, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { ScrollArea } from '../../../ui/scroll-area';

interface NodeStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'syncing';
  blockHeight: number;
  latency: number;
}

interface AuditLogEntry {
  id: string;
  event: string;
  timestamp: string;
  user: string;
  details: string;
}

const nodeStatuses: NodeStatus[] = [
  { id: 'node-1', name: 'Primary Node (Mumbai)', status: 'online', blockHeight: 1247832, latency: 45 },
  { id: 'node-2', name: 'Secondary Node (Delhi)', status: 'online', blockHeight: 1247831, latency: 52 },
  { id: 'node-3', name: 'Backup Node (Chennai)', status: 'syncing', blockHeight: 1247820, latency: 78 },
  { id: 'node-4', name: 'Archive Node (Kolkata)', status: 'online', blockHeight: 1247832, latency: 38 },
];

const auditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    event: 'User Created',
    timestamp: '2024-01-15 14:32:15',
    user: 'admin@krishinetra.gov.in',
    details: 'Created new farmer account for Rajesh Kumar (ID: U001)'
  },
  {
    id: 'log-2',
    event: 'Batch Status Updated',
    timestamp: '2024-01-15 14:28:42',
    user: 'system',
    details: 'Batch B001 status changed from "Harvested" to "In Transit"'
  },
  {
    id: 'log-3',
    event: 'Dispute Resolved',
    timestamp: '2024-01-15 14:15:38',
    user: 'admin@krishinetra.gov.in',
    details: 'Dispute D004 marked as resolved for batch B002'
  },
  {
    id: 'log-4',
    event: 'System Maintenance',
    timestamp: '2024-01-15 13:45:22',
    user: 'system',
    details: 'Scheduled maintenance completed for node synchronization'
  },
  {
    id: 'log-5',
    event: 'Data Export',
    timestamp: '2024-01-15 13:30:17',
    user: 'analytics@krishinetra.gov.in',
    details: 'Monthly report exported for December 2024'
  },
];

export function SystemHealthPanel() {
  const [copiedLog, setCopiedLog] = useState<string>('');

  const getStatusBadge = (status: NodeStatus['status']) => {
    const styles = {
      online: 'bg-green-100 text-green-800 border-green-200',
      offline: 'bg-red-100 text-red-800 border-red-200',
      syncing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return styles[status];
  };

  const getStatusIcon = (status: NodeStatus['status']) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-3 w-3" />;
      case 'offline':
        return <Server className="h-3 w-3" />;
      case 'syncing':
        return <Database className="h-3 w-3" />;
    }
  };

  const copyToClipboard = async (text: string, logId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLog(logId);
      setTimeout(() => setCopiedLog(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Health Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">System Health</CardTitle>
                <p className="text-sm text-gray-600">Real-time blockchain node status</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nodeStatuses.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1">
                      {getStatusIcon(node.status)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{node.name}</p>
                      <p className="text-sm text-gray-600">
                        Block: {node.blockHeight.toLocaleString()} | Latency: {node.latency}ms
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusBadge(node.status)}>
                    {node.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Audit Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <p className="text-sm text-gray-600">Latest 5 audit log entries</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {auditLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {log.event}
                          </Badge>
                          <span className="text-xs text-gray-500">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-900 mb-1">{log.details}</p>
                        <p className="text-xs text-gray-600">by {log.user}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                        onClick={() => copyToClipboard(
                          `[${log.timestamp}] ${log.event}: ${log.details} (by ${log.user})`,
                          log.id
                        )}
                      >
                        {copiedLog === log.id ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}