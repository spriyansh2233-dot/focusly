import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function TopNav() {
  return (
    <header className="h-16 flex-shrink-0 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs or Search could go here */}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Icon name="Bell" size={20} />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
          U
        </div>
      </div>
    </header>
  )
}
