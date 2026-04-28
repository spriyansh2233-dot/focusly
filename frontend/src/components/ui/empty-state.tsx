import { cn } from "@/lib/utils";
import { Body } from "./typography";
import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-10 px-6 space-y-4", className)}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-1 max-w-xs">
        <p className="font-bold text-foreground">{title}</p>
        <Body className="text-muted-foreground text-sm">{description}</Body>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
