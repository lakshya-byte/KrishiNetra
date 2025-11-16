"use client"

import { useState } from "react";
import { Play, Clock, Award, Filter, BookMarked, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Progress } from "../../../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { ImageWithFallback } from "./ImageWithFallback";

export function VideoTutorials() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const tutorials = [
    {
      id: 1,
      title: "Getting Started with KrishiNetra",
      description: "Complete overview of the platform and how to set up your first account",
      thumbnail: "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3klMjB0dXRvcmlhbHxlbnwxfHx8fDE3NTkyMDcyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "12:45",
      category: "beginner",
      role: "farmer",
      difficulty: "Beginner",
      rating: 4.8,
      views: 15420,
      completed: false,
      progress: 0,
      certificate: true,
      popular: true
    },
    {
      id: 2,
      title: "Advanced Batch Management",
      description: "Learn complex batch operations, transfers, and quality tracking",
      thumbnail: "https://images.unsplash.com/photo-1716248899980-cd202c37a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZhcm1pbmclMjBpbmRpYW4lMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTkyMDcyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "18:32",
      category: "advanced",
      role: "distributor",
      difficulty: "Advanced",
      rating: 4.9,
      views: 8934,
      completed: true,
      progress: 100,
      certificate: true,
      popular: false
    },
    {
      id: 3,
      title: "QR Code Scanning Best Practices",
      description: "Master QR code scanning techniques and troubleshoot common issues",
      thumbnail: "https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBoZWxwJTIwc3VwcG9ydCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NTkyMDcyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "8:15",
      category: "intermediate",
      role: "retailer",
      difficulty: "Intermediate",
      rating: 4.7,
      views: 12156,
      completed: false,
      progress: 35,
      certificate: false,
      popular: true
    },
    {
      id: 4,
      title: "Platform Administration Guide",
      description: "Complete guide for platform administrators and user management",
      thumbnail: "https://images.unsplash.com/photo-1748261500463-d15e624baf8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1OTE1NzQ0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "25:18",
      category: "advanced",
      role: "admin",
      difficulty: "Advanced",
      rating: 4.6,
      views: 3421,
      completed: false,
      progress: 0,
      certificate: true,
      popular: false
    },
    {
      id: 5,
      title: "Mobile App Tutorial",
      description: "Learn how to use KrishiNetra mobile app for field operations",
      thumbnail: "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3klMjB0dXRvcmlhbHxlbnwxfHx8fDE3NTkyMDcyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "14:27",
      category: "beginner",
      role: "farmer",
      difficulty: "Beginner",
      rating: 4.8,
      views: 9876,
      completed: false,
      progress: 60,
      certificate: false,
      popular: true
    },
    {
      id: 6,
      title: "Analytics and Reporting",
      description: "Generate insights and reports from your agricultural data",
      thumbnail: "https://images.unsplash.com/photo-1716248899980-cd202c37a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZhcm1pbmclMjBpbmRpYW4lMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTkyMDcyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "16:42",
      category: "intermediate",
      role: "distributor",
      difficulty: "Intermediate",
      rating: 4.7,
      views: 6543,
      completed: true,
      progress: 100,
      certificate: true,
      popular: false
    }
  ];

  const categories = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "farmer", label: "Farmer" },
    { value: "distributor", label: "Distributor" },
    { value: "retailer", label: "Retailer" },
    { value: "admin", label: "Administrator" }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === "all" || tutorial.category === selectedCategory;
    const matchesRole = selectedRole === "all" || tutorial.role === selectedRole;
    return matchesCategory && matchesRole;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20";
      case "Intermediate": return "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20";
      case "Advanced": return "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Video Tutorial Library
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn at your own pace with our comprehensive video tutorials
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <BookMarked className="w-4 h-4 mr-2" />
              Bookmarked
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </Button>
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="relative">
                <ImageWithFallback
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button className="bg-white/90 hover:bg-white text-slate-900 rounded-full w-16 h-16">
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tutorial.duration}
                </div>

                {/* Popular Badge */}
                {tutorial.popular && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#ff6b35] text-white">
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Completion Badge */}
                {tutorial.completed && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-[#22c55e] text-white flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                    {tutorial.difficulty}
                  </Badge>
                  {tutorial.certificate && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Certificate
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                  {tutorial.title}
                </h3>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {tutorial.description}
                </p>

                {/* Progress Bar */}
                {tutorial.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Progress</span>
                      <span>{tutorial.progress}%</span>
                    </div>
                    <Progress value={tutorial.progress} className="h-2" />
                  </div>
                )}

                {/* Rating and Views */}
                <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{tutorial.rating}</span>
                  </div>
                  <span>{tutorial.views.toLocaleString()} views</span>
                </div>

                <Button 
                  className="w-full" 
                  variant={tutorial.completed ? "outline" : "default"}
                >
                  {tutorial.completed ? "Watch Again" : 
                   tutorial.progress > 0 ? "Continue Watching" : "Start Tutorial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tutorial Series */}
        <div className="mt-16 bg-gradient-to-r from-[#ff6b35]/10 to-[#22c55e]/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Complete Learning Paths
            </h3>
            <p className="text-slate-600">
              Follow structured learning paths to master different aspects of KrishiNetra
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Farmer's Journey",
                description: "From setup to advanced batch management",
                lessons: 8,
                duration: "2h 15m",
                color: "from-[#22c55e] to-[#16a34a]"
              },
              {
                title: "Distributor Mastery",
                description: "Supply chain management and tracking",
                lessons: 6,
                duration: "1h 45m",
                color: "from-[#ff6b35] to-[#e55a2b]"
              },
              {
                title: "Platform Administration",
                description: "Complete admin and management guide",
                lessons: 10,
                duration: "3h 30m",
                color: "from-[#2563eb] to-[#1d4ed8]"
              }
            ].map((path, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${path.color} flex items-center justify-center`}>
                  <Award className="w-12 h-12 text-white" />
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">{path.title}</h4>
                  <p className="text-sm text-slate-600 mb-4">{path.description}</p>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <span>{path.lessons} lessons</span>
                    <span>{path.duration}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Start Learning Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}