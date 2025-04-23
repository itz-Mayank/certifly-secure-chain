
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, BookCheck, Lock, Calendar, Badge, UserCheck } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Blockchain Secured",
      description: "Certificates are secured on Ethereum blockchain with immutable records"
    },
    {
      icon: <BookCheck className="h-10 w-10 text-primary" />,
      title: "Instant Verification",
      description: "Instantly verify certificates with on-chain proof of authenticity"
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Encrypted Storage",
      description: "Files are AES encrypted before being stored on IPFS"
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Timed Sharing",
      description: "Share your certificates with time-based access links"
    },
    {
      icon: <Badge className="h-10 w-10 text-primary" />,
      title: "Multi-sig Security",
      description: "Multi-signature wallets ensure both parties maintain control"
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Institute Validation",
      description: "Only authorized institutes can issue certificates"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.section 
        className="py-20 md:py-32 bg-secondary relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="text-gradient">Secure</span> your credentials with blockchain
                </h1>
                <p className="text-lg text-foreground/80 mb-8 max-w-lg">
                  E-Certify provides a decentralized platform for issuing, managing, and verifying academic and professional certificates using blockchain technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate("/register")}
                    className="text-lg py-6"
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/about")}
                    className="text-lg py-6"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div 
                className="glass-card rounded-3xl p-6 md:p-8 h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-20 w-20 text-primary/50 animate-pulse-slow" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Blockchain</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Our platform combines blockchain security with user-friendly interfaces to provide the most secure certificate management solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl p-6 flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-secondary relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your certificates?</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Join E-Certify today and experience the future of certificate management with blockchain technology.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/register")}
            className="text-lg py-6 px-8"
          >
            Get Started Now
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
