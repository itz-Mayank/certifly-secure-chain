
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import React from 'react';

// Layouts
import RootLayout from "@/components/layout/RootLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Public Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";

// Student Pages
import StudentDashboard from "@/pages/student/StudentDashboard";

// Institute Pages
import InstituteDashboard from "@/pages/institute/InstituteDashboard";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<RootLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/register" element={<AuthPage />} />
                </Route>
                
                {/* Student Routes */}
                <Route path="/student" element={<DashboardLayout userType="student" />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  {/* Additional student routes would go here */}
                </Route>
                
                {/* Institute Routes */}
                <Route path="/institute" element={<DashboardLayout userType="institute" />}>
                  <Route path="dashboard" element={<InstituteDashboard />} />
                  {/* Additional institute routes would go here */}
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
