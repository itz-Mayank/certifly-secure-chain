
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { Shield, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const AuthPage: React.FC = () => {
  const { connectWallet, setUserType, address, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedUserType, setSelectedUserType] = useState<"student" | "institute">("student");
  const [otp, setOtp] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  // Determine which tab to show based on URL
  const isRegisterPage = location.pathname === "/register";
  const defaultTab = isRegisterPage ? "register" : "login";

  // Handle automatic redirection if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = location.state?.from || 
        (selectedUserType === "student" ? "/student/dashboard" : "/institute/dashboard");
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, selectedUserType, location.state]);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast.success("Wallet connected successfully");
    } catch (error) {
      toast.error("Failed to connect wallet. Please make sure MetaMask is installed.");
    }
  };

  // Handle OTP verification and registration/login
  const handleAuthenticate = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!otp) {
      toast.error("Please enter the verification code");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, we would verify OTP against a backend service
      // For now, we'll just simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set user type in auth context
      setUserType(selectedUserType);
      
      const actionType = isRegisterPage ? "registered" : "logged in";
      toast.success(`Successfully ${actionType} as ${selectedUserType}`);
      
      // Redirect to appropriate dashboard
      navigate(selectedUserType === "student" ? "/student/dashboard" : "/institute/dashboard");
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate OTP sending
  const sendOtp = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setOtpSent(true);
    toast.info("OTP sent to your registered email/phone");
    // In a real app, this would trigger an API call to send an OTP
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gradient">
          Welcome to E-Certify
        </h2>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="register" onClick={() => navigate("/register", { replace: true })}>Register</TabsTrigger>
            <TabsTrigger value="login" onClick={() => navigate("/login", { replace: true })}>Login</TabsTrigger>
          </TabsList>

          {/* Registration Tab */}
          <TabsContent value="register">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Connect your wallet and select your account type to register.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <RadioGroup 
                      defaultValue="student" 
                      className="flex gap-4"
                      onValueChange={(value) => setSelectedUserType(value as "student" | "institute")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student">Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="institute" id="institute" />
                        <Label htmlFor="institute">Institute</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Connect Wallet Button */}
                  <Button 
                    variant={address ? "outline" : "default"} 
                    onClick={handleConnectWallet} 
                    className="w-full"
                    disabled={!!address}
                  >
                    {address ? "Wallet Connected" : "Connect Wallet"}
                  </Button>
                  
                  {/* Wallet Status */}
                  {address && (
                    <div className="p-3 bg-primary/10 rounded-lg text-sm break-all">
                      <p className="font-medium">Connected Address:</p>
                      <p className="text-foreground/80">{address}</p>
                    </div>
                  )}

                  {/* OTP Section - Only shown if wallet is connected */}
                  {address && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <Label htmlFor="otp">Verification Code</Label>
                          <Input 
                            id="otp" 
                            placeholder="Enter OTP" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={sendOtp}
                          disabled={otpSent}
                        >
                          {otpSent ? "OTP Sent" : "Send OTP"}
                        </Button>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={handleAuthenticate}
                        disabled={!otp || isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Register"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                  Connect your wallet to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <RadioGroup 
                      defaultValue="student" 
                      className="flex gap-4"
                      onValueChange={(value) => setSelectedUserType(value as "student" | "institute")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="login-student" />
                        <Label htmlFor="login-student">Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="institute" id="login-institute" />
                        <Label htmlFor="login-institute">Institute</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Connect Wallet Button */}
                  <Button 
                    variant={address ? "outline" : "default"} 
                    onClick={handleConnectWallet} 
                    className="w-full"
                    disabled={!!address}
                  >
                    {address ? "Wallet Connected" : "Connect Wallet"}
                  </Button>
                  
                  {/* Wallet Status */}
                  {address && (
                    <div className="p-3 bg-primary/10 rounded-lg text-sm break-all">
                      <p className="font-medium">Connected Address:</p>
                      <p className="text-foreground/80">{address}</p>
                    </div>
                  )}

                  {/* OTP Section - Only shown if wallet is connected */}
                  {address && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <Label htmlFor="login-otp">Verification Code</Label>
                          <Input 
                            id="login-otp" 
                            placeholder="Enter OTP" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={sendOtp}
                          disabled={otpSent}
                        >
                          {otpSent ? "OTP Sent" : "Send OTP"}
                        </Button>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={handleAuthenticate}
                        disabled={!otp || isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Login"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AuthPage;
