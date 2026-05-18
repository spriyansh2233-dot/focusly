import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Icon } from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPaths, getPathConcepts } from "@/lib/api";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/learn/react-hooks", label: "Learn", icon: "BookOpen" },
  { href: "/quiz/react-hooks", label: "Take Quiz", icon: "Pencil" },
  { href: "/quiz/flashcards", label: "Flashcards", icon: "Layers" },
  { href: "/insights", label: "Insights", icon: "BarChart2" },
  { href: "/resources", label: "Resources", icon: "Library" },
  { href: "/notes", label: "Smart Notes", icon: "FileText" },
  { href: "/onboarding", label: "Onboarding", icon: "Map" },
];

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [activeConceptId, setActiveConceptId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      getPaths()
        .then((paths) => {
          if (paths && paths.length > 0) {
            setActivePathId(paths[0].id);
            getPathConcepts(paths[0].id).then((concepts) => {
              if (concepts && concepts.length > 0) {
                setActiveConceptId(concepts[0].id);
              }
            }).catch(() => {});
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Icon name="BrainCircuit" size={24} />
          Focusly
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          let finalHref = href;
          if (href === "/learn/react-hooks") {
            finalHref = activePathId ? `/learn/path/${activePathId}` : "/onboarding";
          } else if (href === "/quiz/react-hooks") {
            finalHref = activeConceptId ? `/quiz/${activeConceptId}` : "/onboarding";
          } else if (href === "/quiz/flashcards") {
            finalHref = activeConceptId ? `/quiz/flashcards` : "/onboarding";
          }

          const active = pathname === finalHref || pathname.startsWith(finalHref + "/");
          return (
            <Link key={href} to={finalHref}>
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all relative overflow-hidden cursor-pointer
                  ${active ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"}`}
              >
                {/* Subtle gradient glow on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
                  <Icon name={icon as any} size={18} className={active ? "text-primary" : "group-hover:text-primary transition-colors"} />
                </motion.div>
                <span className="relative z-10">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border space-y-2">
        {token ? (
          <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50/10 dark:hover:bg-red-500/10 transition-all relative overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon name="LogOut" size={18} className="group-hover:text-red-500 transition-colors" />
            <span className="relative z-10">Logout</span>
          </motion.div>
        ) : (
          <>
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all relative overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon name="LogIn" size={18} className="group-hover:text-primary transition-colors" />
                <span className="relative z-10">Login</span>
              </motion.div>
            </Link>
            <Link to="/register">
              <motion.div
                 whileHover={{ scale: 1.02, x: 4 }}
                 whileTap={{ scale: 0.98 }}
                 className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all relative overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon name="UserPlus" size={18} className="group-hover:text-primary transition-colors" />
                <span className="relative z-10">Register</span>
              </motion.div>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
