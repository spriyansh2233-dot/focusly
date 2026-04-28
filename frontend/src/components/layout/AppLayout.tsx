import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { MobileNav } from "./MobileNav";
import { useRouter, usePathname } from "next/navigation";

export function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/register";

    if (!token && !isPublicPage) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // Prevent hydration mismatch by returning null until mounted
  if (!mounted) return null;

  if (!authorized) return null;

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
          {children}
        </main>
      </div>

      {/* Mobile bottom nav — hidden on public pages */}
      {!isPublicPage && <MobileNav />}
    </div>
  );
}
