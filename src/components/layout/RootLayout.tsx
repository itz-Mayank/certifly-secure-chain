
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

const RootLayout: React.FC = () => {
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

export default RootLayout;
