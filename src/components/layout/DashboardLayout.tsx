
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  userType: "student" | "institute";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType }) => {
  const { isAuthenticated, userType: authUserType } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user type doesn't match required type, redirect to appropriate dashboard
  if (authUserType !== userType) {
    const redirectPath = authUserType === "student" ? "/student/dashboard" : "/institute/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background">
        <Outlet />
      </main>
      <footer className="bg-secondary py-4 text-center text-sm text-foreground/50">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} E-Certify | Powered by Blockchain Technology
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
