import { Link } from 'react-router-dom';

import { Code, Share2, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-12 border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Focusly Logo" width={32} height={32} className="rounded-lg object-contain" />
              <h3 className="text-xl font-bold text-foreground">Focusly</h3>
            </div>
            <p className="max-w-xs mb-6 text-sm leading-relaxed">
              Study Smarter. Remember Longer. The AI-powered companion built for real students.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Code className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
              <li><Link to="#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Sign up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} Focusly Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
}
