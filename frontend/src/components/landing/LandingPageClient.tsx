import { LandingNavbar } from "./LandingNavbar";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { FaqSection } from "./FaqSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <LandingNavbar />
      
      <main>
        <HeroSection />
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        
        <div id="faq">
          <FaqSection />
        </div>
        
        <div id="contact">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
