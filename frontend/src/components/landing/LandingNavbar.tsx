import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Focusly Logo" width={32} height={32} className="rounded-lg object-contain" />
          <span className="text-xl font-bold text-foreground">Focusly</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link to="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
          <Link to="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Log In
            </Link>
            <Link to="/register">
              <Button size="sm" className="rounded-full shadow-sm hover:scale-105 transition-transform">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link to="#features" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-foreground"
              >
                Features
              </Link>
              <Link to="#how-it-works" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-foreground"
              >
                How it works
              </Link>
              <Link to="#faq" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-foreground"
              >
                FAQ
              </Link>
              <hr className="border-border" />
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">
                Log In
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full rounded-xl">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
