import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { MobileNav } from "./MobileNav";
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from "../ErrorBoundary";

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/register";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar — hidden on mobile and public pages */}
      {!isPublicPage && (
        <div className="hidden md:flex">
          <Sidebar />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        {!isPublicPage && <TopNav />}
        <main
          className={`flex-1 overflow-auto ${!isPublicPage ? 'p-4 md:p-6 pb-20 md:pb-6' : ''}`}
          id="main-content"
          aria-label="Main content"
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* Mobile bottom nav — hidden on public pages */}
      {!isPublicPage && <MobileNav />}
    </div>
  );
}
