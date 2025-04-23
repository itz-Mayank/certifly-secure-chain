
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { BrowserProvider, JsonRpcSigner } from "ethers";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: "student" | "institute" | null;
  address: string | null;
  signer: JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setUserType: (type: "student" | "institute") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<"student" | "institute" | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if MetaMask is installed
    const checkMetaMaskInstallation = () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        setIsMetaMaskInstalled(true);
        return true;
      } else {
        setIsMetaMaskInstalled(false);
        return false;
      }
    };

    const isInstalled = checkMetaMaskInstallation();
    
    // Only proceed with connection checks if MetaMask is installed
    if (isInstalled) {
      const checkConnection = async () => {
        if (window.ethereum && window.ethereum.selectedAddress) {
          try {
            const provider = new BrowserProvider(window.ethereum);
            const connectedSigner = await provider.getSigner();
            const connectedAddress = await connectedSigner.getAddress();
            
            setAddress(connectedAddress);
            setSigner(connectedSigner);
            
            // Check if we have a stored user type
            const savedUserType = localStorage.getItem("e-certify-user-type");
            if (savedUserType && (savedUserType === "student" || savedUserType === "institute")) {
              setUserType(savedUserType);
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error("Failed to connect to wallet:", error);
          }
        }
      };
      
      checkConnection();
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          // Re-authenticate with new account
          connectWallet();
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install MetaMask to continue.", {
        duration: 5000,
        action: {
          label: "Install MetaMask",
          onClick: () => window.open("https://metamask.io/download.html", "_blank")
        }
      });
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const connectedSigner = await provider.getSigner();
      const connectedAddress = await connectedSigner.getAddress();

      setAddress(connectedAddress);
      setSigner(connectedSigner);

      // Check if user already has a saved type
      const savedUserType = localStorage.getItem("e-certify-user-type");
      if (savedUserType && (savedUserType === "student" || savedUserType === "institute")) {
        setUserType(savedUserType);
        setIsAuthenticated(true);
        toast.success("Connected to wallet successfully!");
      }

    } catch (error) {
      console.error("Error connecting to wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setSigner(null);
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem("e-certify-user-type");
    toast.info("Disconnected from wallet.");
  };

  const handleSetUserType = (type: "student" | "institute") => {
    setUserType(type);
    localStorage.setItem("e-certify-user-type", type);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        address,
        signer,
        connectWallet,
        disconnectWallet,
        setUserType: handleSetUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
