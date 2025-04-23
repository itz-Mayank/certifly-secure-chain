
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, ArrowRight, Users, Clock, AlertCircle, Upload, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const InstituteDashboard: React.FC = () => {
  const { address } = useAuth();
  const navigate = useNavigate();

  // Mock data for dashboard statistics
  const stats = [
    { 
      title: "Students", 
      value: "142", 
      icon: <Users className="h-5 w-5 text-primary" />,
      onClick: () => navigate("/institute/students")
    },
    { 
      title: "Certificates", 
      value: "87", 
      icon: <FileCheck className="h-5 w-5 text-green-500" />,
      onClick: () => navigate("/institute/certificates")
    },
    { 
      title: "Pending", 
      value: "5", 
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      onClick: () => navigate("/institute/pending")
    },
    { 
      title: "Issues", 
      value: "1", 
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      onClick: () => navigate("/institute/issues")
    }
  ];

  // Mock data for pending requests
  const pendingRequests = [
    {
      type: "Certificate Request",
      studentName: "John Doe",
      studentId: "0x1234...5678",
      requestDate: "2023-04-15",
      certificateType: "Bachelor Degree"
    },
    {
      type: "Certificate Request",
      studentName: "Jane Smith",
      studentId: "0x8765...4321",
      requestDate: "2023-04-14",
      certificateType: "Course Completion"
    },
    {
      type: "Institute Change",
      studentName: "Michael Brown",
      studentId: "0x9876...5432",
      requestDate: "2023-04-10",
      newInstitute: "Stanford University"
    }
  ];

  // Mock data for recent certificates
  const recentCertificates = [
    {
      studentName: "Alice Johnson",
      certificateTitle: "Master of Science in Data Science",
      issueDate: "2023-04-10",
      txHash: "0x1234...abcd"
    },
    {
      studentName: "Bob Williams",
      certificateTitle: "Bachelor of Technology",
      issueDate: "2023-04-08",
      txHash: "0xabcd...1234"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Institute Dashboard</h1>
        <p className="text-foreground/70 mb-8">Manage your students and certificates</p>
        
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
                  <Upload className="h-5 w-5" />
                  Upload Certificate
                </CardTitle>
                <CardDescription>
                  Create and issue a new certificate
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/institute/upload")}>
                  Upload Certificate
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Add Student
                </CardTitle>
                <CardDescription>
                  Register a new student to your institute
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/institute/students/add")}>
                  Add Student
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Requests
                </CardTitle>
                <CardDescription>
                  View and manage pending requests
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/institute/pending")}>
                  View Requests
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
            <Card className="glass-card border-white/10 h-full">
              <CardContent className="p-6">
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((request, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start p-3 rounded-lg ${
                          index < pendingRequests.length - 1 ? "border-b border-white/10" : ""
                        }`}
                      >
                        <div className="rounded-full bg-secondary p-2 mr-4">
                          {request.type.includes("Certificate") && <FileCheck className="h-4 w-4 text-amber-500" />}
                          {request.type.includes("Institute") && <Users className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{request.type}</p>
                          <p className="text-sm text-foreground/70">{request.studentName}</p>
                          <div className="text-xs text-foreground/50 mt-1">
                            <span>ID: {request.studentId} • </span>
                            {request.certificateType && <span>Type: {request.certificateType} • </span>}
                            {request.newInstitute && <span>New Institute: {request.newInstitute} • </span>}
                            <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground/70">
                    <p>No pending requests</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/10">
                <Button variant="ghost" className="w-full" onClick={() => navigate("/institute/pending")}>
                  View All Requests
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Recent Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Recent Certificates</h2>
            <Card className="glass-card border-white/10 h-full">
              <CardContent className="p-6">
                {recentCertificates.length > 0 ? (
                  <div className="space-y-4">
                    {recentCertificates.map((cert, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start p-3 rounded-lg ${
                          index < recentCertificates.length - 1 ? "border-b border-white/10" : ""
                        }`}
                      >
                        <div className="rounded-full bg-secondary p-2 mr-4">
                          <FileCheck className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{cert.certificateTitle}</p>
                          <p className="text-sm text-foreground/70">{cert.studentName}</p>
                          <div className="text-xs text-foreground/50 mt-1">
                            <span>Issued: {new Date(cert.issueDate).toLocaleDateString()} • </span>
                            <span>TX: {cert.txHash}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground/70">
                    <p>No certificates issued recently</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/10">
                <Button variant="ghost" className="w-full" onClick={() => navigate("/institute/certificates")}>
                  View All Certificates
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InstituteDashboard;
