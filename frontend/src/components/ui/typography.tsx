import * as React from "react"
import { cn } from "@/lib/utils"

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-4xl font-bold tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-3xl font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-2xl font-semibold text-foreground", className)}
      {...props}
    />
  )
}

export function Body({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[15px] leading-6 text-foreground", className)}
      {...props}
    />
  )
}

export function Caption({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[13px] leading-5 tracking-wide text-muted-foreground", className)}
      {...props}
    />
  )
}

export function Code({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn("relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-[14px] text-foreground border border-border", className)}
      {...props}
    />
  )
}
