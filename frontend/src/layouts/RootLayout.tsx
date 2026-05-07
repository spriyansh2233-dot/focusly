import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AICopilotChat } from "@/components/chat/AICopilotChat";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout() {
  return (
    
      <div className="app-root">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Outlet />
          <Toaster />
          <AICopilotChat />
        </ThemeProvider>
      </div>
    
  );
}
