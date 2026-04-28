"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Body } from "@/components/ui/typography";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
};

let msgId = 0;

export function AICopilotChat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgId,
      role: "ai",
      content: "Hi! I'm Focusly, your AI Tutor. Ask me anything about your current topic and I'll explain it in a clear, beginner-friendly way.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  if (!mounted) return null;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((m) => [...m, { id: ++msgId, role: "user", content: text }]);
    setLoading(true);

    try {
      const resp = await fetchWithAuth("/tutor/ask", {
        method: "POST",
        body: JSON.stringify({ prompt: text }),
      });
      setMessages((m) => [...m, { id: ++msgId, role: "ai", content: resp.response ?? "I'm here to help! Could you rephrase that?" }]);
    } catch {
      setMessages((m) => [...m, { id: ++msgId, role: "ai", content: "Sorry, I had trouble reaching the server. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Tutor Chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] flex flex-col rounded-2xl border border-border/50 bg-background/90 backdrop-blur-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-primary/10">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Co-Pilot</p>
              <p className="text-xs text-muted-foreground">Powered by Gemini</p>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs ${msg.role === "ai" ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                  {msg.role === "ai" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "ai" ? "bg-muted rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything..."
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={sendMessage} disabled={loading || !input.trim()} className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
