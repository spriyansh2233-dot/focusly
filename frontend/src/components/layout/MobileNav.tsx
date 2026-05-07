import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Pencil, BarChart2, Library } from "lucide-react";

const MOBILE_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn/react-hooks", label: "Learn", icon: BookOpen },
  { href: "/quiz/react-hooks", label: "Quiz", icon: Pencil },
  { href: "/insights", label: "Insights", icon: BarChart2 },
  { href: "/resources", label: "Resources", icon: Library },
];

export function MobileNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex border-t border-border bg-card/95 backdrop-blur-xl"
    >
      {MOBILE_NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            to={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-[10px] font-medium transition-colors
              ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon className={`w-5 h-5 ${active ? "scale-110" : ""} transition-transform`} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
