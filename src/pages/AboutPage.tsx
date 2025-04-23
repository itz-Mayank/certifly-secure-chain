
import React from "react";
import { motion } from "framer-motion";
import { Shield, BookCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">E-Certify</span>
          </h1>
          <p className="text-lg text-foreground/70 mb-8">
            Transforming certificate management and verification through
            blockchain technology and decentralized storage.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-foreground/70">
                E-Certify was born out of a vision to eliminate certificate fraud
                and simplify verification processes across educational institutions
                and corporations.
              </p>
              <p className="text-lg text-foreground/70">
                By leveraging blockchain technology, we provide an immutable and
                transparent system for issuing, storing, and verifying certificates
                that cannot be tampered with or forged.
              </p>
              <Button
                onClick={() => navigate("/register")}
                className="mt-4"
              >
                Join Our Platform
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="glass-card rounded-2xl p-8 relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"></div>
                <Shield className="h-32 w-32 text-primary/60 mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How E-Certify Works</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our solution combines blockchain security with user-friendly interfaces
              to revolutionize certificate management.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-primary" />,
                title: "Blockchain Immutability",
                description: "Every certificate is securely recorded on the Ethereum blockchain, ensuring permanent and tamper-proof verification."
              },
              {
                icon: <Lock className="h-12 w-12 text-primary" />,
                title: "Secure File Storage",
                description: "Certificate files are encrypted and stored using IPFS, providing decentralized and redundant storage."
              },
              {
                icon: <BookCheck className="h-12 w-12 text-primary" />,
                title: "Instant Verification",
                description: "Certificates can be instantly verified by employers or institutions using our simple verification tools."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-secondary/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Join E-Certify today and revolutionize how you manage and verify certificates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="text-lg"
            >
              Register Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              className="text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
