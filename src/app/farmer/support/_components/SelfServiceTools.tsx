"use client"


import { useState } from "react";
import { Activity, Wifi, Camera, Globe, Download, Search, History, Save, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Progress } from "../../../ui/progress";
import { Alert, AlertDescription } from "../../../ui/alert";

export function SelfServiceTools() {
  const [connectionTest, setConnectionTest] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState([
    "How to create batch",
    "QR scanner troubleshooting",
    "Transfer ownership guide",
    "Account settings",
    "Mobile app download"
  ]);

  const systemStatus = {
    api: { status: "operational", uptime: "99.9%" },
    blockchain: { status: "operational", uptime: "99.8%" },
    database: { status: "operational", uptime: "99.95%" },
    storage: { status: "maintenance", uptime: "99.7%" }
  };

  const runConnectionTest = () => {
    setConnectionTest("testing");
    
    // Simulate connection test
    setTimeout(() => {
      const results = {
        internet: Math.random() > 0.1,
        server: Math.random() > 0.05,
        speed: Math.floor(Math.random() * 100) + 20,
        latency: Math.floor(Math.random() * 50) + 10
      };
      setDiagnosticResults(results);
      setConnectionTest(results.internet && results.server ? "success" : "error");
    }, 3000);
  };

  const runBrowserCheck = () => {
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.includes("Chrome");
    const isFirefox = userAgent.includes("Firefox");
    const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
    
    return {
      browser: isChrome ? "Chrome" : isFirefox ? "Firefox" : isSafari ? "Safari" : "Other",
      compatible: isChrome || isFirefox,
      version: "Latest"
    };
  };

  const checkCameraAccess = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        alert("Camera access is working properly!");
      })
      .catch(() => {
        alert("Camera access denied or not available. Please check browser settings.");
      });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-[#22c55e]" />;
      case "maintenance":
        return <AlertCircle className="w-4 h-4 text-[#f59e0b]" />;
      case "error":
        return <XCircle className="w-4 h-4 text-[#ef4444]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-[#22c55e]";
      case "maintenance":
        return "text-[#f59e0b]";
      case "error":
        return "text-[#ef4444]";
      default:
        return "text-slate-400";
    }
  };

  const browserCheck = runBrowserCheck();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Self-Service Tools
          </h2>
          <p className="text-lg text-slate-600">
            Diagnose issues and find solutions on your own
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* System Status Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#22c55e]" />
                System Status Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(systemStatus).map(([service, data]) => (
                  <div key={service} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(data.status)}
                      <div>
                        <div className="font-medium text-slate-900 capitalize">
                          {service.replace(/([A-Z])/g, ' $1')}
                        </div>
                        <div className={`text-sm capitalize ${getStatusColor(data.status)}`}>
                          {data.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900">{data.uptime}</div>
                      <div className="text-xs text-slate-500">Uptime</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Overall System Health</span>
                  <span className="text-sm font-medium text-[#22c55e]">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2" />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Scheduled Maintenance:</strong> Storage service will be under maintenance on Dec 15, 2024, 2:00-4:00 AM IST.
                </AlertDescription>
              </Alert>

              <Button variant="outline" className="w-full">
                Subscribe to Status Updates
              </Button>
            </CardContent>
          </Card>

          {/* Diagnostic Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2563eb]" />
                Account Diagnostic Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Connection Test */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  Connection Test
                </h4>
                
                {connectionTest === "testing" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Testing connection...</span>
                      <span>Please wait</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                )}

                {diagnosticResults && connectionTest !== "testing" && (
                  <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>Internet:</span>
                        <span className={diagnosticResults.internet ? "text-[#22c55e]" : "text-[#ef4444]"}>
                          {diagnosticResults.internet ? "Connected" : "Failed"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Server:</span>
                        <span className={diagnosticResults.server ? "text-[#22c55e]" : "text-[#ef4444]"}>
                          {diagnosticResults.server ? "Reachable" : "Unreachable"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span>{diagnosticResults.speed} Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latency:</span>
                        <span>{diagnosticResults.latency} ms</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={runConnectionTest}
                  disabled={connectionTest === "testing"}
                  className="w-full"
                  variant="outline"
                >
                  {connectionTest === "testing" ? "Testing..." : "Run Connection Test"}
                </Button>
              </div>

              {/* Browser Compatibility */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Browser Compatibility
                </h4>
                
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Browser:</span>
                      <span>{browserCheck.browser}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compatible:</span>
                      <span className={browserCheck.compatible ? "text-[#22c55e]" : "text-[#ef4444]"}>
                        {browserCheck.compatible ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span>{browserCheck.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>JavaScript:</span>
                      <span className="text-[#22c55e]">Enabled</span>
                    </div>
                  </div>
                </div>

                {!browserCheck.compatible && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      For the best experience, please use Chrome or Firefox browsers.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Camera/Microphone Check */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Camera & Permissions
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={checkCameraAccess} variant="outline" size="sm">
                    Test Camera
                  </Button>
                  <Button variant="outline" size="sm">
                    Clear Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Base Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#ff6b35]" />
                Advanced Knowledge Base Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search help articles, guides, tutorials..."
                  className="pl-10 pr-4"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Recent Searches
                </h4>
                
                <div className="space-y-2">
                  {searchHistory.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2 hover:bg-slate-50"
                    >
                      <History className="w-3 h-3 mr-2 text-slate-400" />
                      {search}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Save className="w-3 h-3 mr-1" />
                    Save Search
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-1" />
                    Export Results
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Search Features</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Auto-complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Typo tolerance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Result highlighting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Smart suggestions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offline Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-[#8b5cf6]" />
                Offline Support Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Download for Offline Access</h4>
                
                <div className="space-y-3">
                  {[
                    { title: "Quick Start Guide", size: "2.5 MB", format: "PDF" },
                    { title: "Complete User Manual", size: "8.2 MB", format: "PDF" },
                    { title: "Troubleshooting Guide", size: "1.8 MB", format: "PDF" },
                    { title: "Video Tutorials Pack", size: "156 MB", format: "ZIP" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-600">{item.size} • {item.format}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Offline Features</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Downloadable help articles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Printable troubleshooting guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Offline video tutorials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                    <span>Emergency contact information</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}