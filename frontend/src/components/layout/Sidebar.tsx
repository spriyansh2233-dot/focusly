"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/learn/react-hooks", label: "Learn", icon: "BookOpen" },
  { href: "/quiz/react-hooks", label: "Take Quiz", icon: "Pencil" },
  { href: "/insights", label: "Insights", icon: "BarChart2" },
  { href: "/resources", label: "Resources", icon: "Library" },
  { href: "/notes", label: "Smart Notes", icon: "FileText" },
  { href: "/onboarding", label: "Onboarding", icon: "Map" },
];

export function Sidebar() {
  const pathname = usePathname();

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
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}>
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
        <Link href="/login">
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
        <Link href="/register">
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
      </div>
    </aside>
  );
}
