import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending an email
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" /> Get in touch
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
              We'd love to hear from you.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
            
            <div className="space-y-6 text-foreground">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium group-hover:text-primary transition-colors">hello@focusly.app</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium group-hover:text-primary transition-colors">Join our Discord Community</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <Card className="p-8 md:p-10 shadow-2xl border-border bg-card/50 backdrop-blur-xl relative overflow-hidden rounded-3xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                    Thanks for reaching out. We'll get back to you shortly.
                  </p>
                  <Button variant="outline" className="h-12 px-8 rounded-full border-border bg-muted/50 hover:bg-muted text-foreground" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full p-4 rounded-xl border border-border bg-background/50 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@example.com" 
                      className="w-full p-4 rounded-xl border border-border bg-background/50 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="How can we help you?" 
                      className="w-full p-4 rounded-xl border border-border bg-background/50 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground shadow-inner"
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-xl mt-4 shadow-lg hover:shadow-xl transition-all">
                    Send Message <Send className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
