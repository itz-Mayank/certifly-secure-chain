
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Shield, Shield, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const { isAuthenticated, userType, address, connectWallet, disconnectWallet } = useAuth();
  const navigate = useNavigate();

  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const navItems = [
    { 
      name: "Home", 
      path: "/", 
      shown: true 
    },
    { 
      name: "Dashboard", 
      path: userType === "student" ? "/student/dashboard" : "/institute/dashboard", 
      shown: isAuthenticated 
    },
    { 
      name: "Certificates", 
      path: userType === "student" ? "/student/certificates" : "/institute/certificates", 
      shown: isAuthenticated 
    },
    { 
      name: "About", 
      path: "/about", 
      shown: true 
    }
  ];

  return (
    <header className="w-full bg-secondary bg-opacity-70 backdrop-blur-lg border-b border-white/10 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient">E-Certify</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {navItems.filter(item => item.shown).map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </motion.nav>
        
        {/* Actions area */}
        <motion.div 
          className="hidden md:flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-full px-4 py-1 text-sm">
                {formatAddress(address || "")}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnectWallet}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={connectWallet}>
              <Shield className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </motion.div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-secondary/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-6 mt-8">
              {navItems.filter(item => item.shown).map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="text-foreground/80 hover:text-primary transition-colors text-lg"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <div className="mb-4 bg-muted rounded-full px-4 py-2 text-sm inline-block">
                      {formatAddress(address || "")}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={disconnectWallet}
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button onClick={connectWallet} className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
