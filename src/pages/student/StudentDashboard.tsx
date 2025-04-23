
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, ArrowRight, FileText, Send, Clock, History, Share2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const { address } = useAuth();
  const navigate = useNavigate();

  // Mock data for dashboard statistics
  const stats = [
    { 
      title: "Certificates", 
      value: "3", 
      icon: <FileCheck className="h-5 w-5 text-primary" />,
      onClick: () => navigate("/student/certificates")
    },
    { 
      title: "Pending", 
      value: "1", 
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      onClick: () => navigate("/student/pending")
    },
    { 
      title: "Shared", 
      value: "2", 
      icon: <Share2 className="h-5 w-5 text-green-500" />,
      onClick: () => navigate("/student/shared")
    },
    { 
      title: "Viewed", 
      value: "5", 
      icon: <History className="h-5 w-5 text-indigo-500" />,
      onClick: () => navigate("/student/history")
    }
  ];

  // Mock data for recent activities
  const activities = [
    {
      type: "Certificate Issued",
      title: "B.Sc. Computer Science",
      institute: "MIT University",
      date: "2023-04-15",
      time: "10:30 AM"
    },
    {
      type: "Certificate Viewed",
      title: "Web Development Certificate",
      viewer: "Tech Company Inc.",
      date: "2023-04-10",
      time: "02:15 PM"
    },
    {
      type: "Certificate Shared",
      title: "Blockchain Fundamentals",
      sharedWith: "example@company.com",
      date: "2023-04-05",
      time: "11:45 AM"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-foreground/70 mb-8">Manage your certificates and credentials</p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer" onClick={stat.onClick}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-foreground/70">{stat.title}</p>
                      <p className="text-3xl font-semibold mt-1">{stat.value}</p>
                    </div>
                    <div className="rounded-full bg-secondary p-3">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Request Certificate
                </CardTitle>
                <CardDescription>
                  Request a new certificate from your institute
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/student/request")}>
                  Make Request
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Certificate
                </CardTitle>
                <CardDescription>
                  Share your certificate with others
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/student/certificates")}>
                  View & Share
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Change Institute
                </CardTitle>
                <CardDescription>
                  Send request to change your institute
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/student/institute")}>
                  Request Change
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start p-3 rounded-lg ${
                        index < activities.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <div className="rounded-full bg-secondary p-2 mr-4">
                        {activity.type.includes("Issued") && <FileCheck className="h-4 w-4 text-green-500" />}
                        {activity.type.includes("Viewed") && <History className="h-4 w-4 text-indigo-500" />}
                        {activity.type.includes("Shared") && <Share2 className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.type}</p>
                        <p className="text-sm text-foreground/70">{activity.title}</p>
                        <div className="text-xs text-foreground/50 mt-1">
                          {activity.institute && <span>From {activity.institute} • </span>}
                          {activity.viewer && <span>By {activity.viewer} • </span>}
                          {activity.sharedWith && <span>With {activity.sharedWith} • </span>}
                          <span>{new Date(activity.date).toLocaleDateString()} at {activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-foreground/70">
                  <p>No recent activity found</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-white/10">
              <Button variant="ghost" className="w-full" onClick={() => navigate("/student/activity")}>
                View All Activity
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
