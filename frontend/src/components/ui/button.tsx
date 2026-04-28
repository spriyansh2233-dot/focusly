import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-all duration-200 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]",
        outline:
          "border-border bg-transparent text-foreground hover:bg-interactive hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-interactive hover:text-foreground",
        ghost:
          "bg-transparent text-muted-foreground hover:text-foreground hover:bg-interactive",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-[15px] [&_svg]:size-5",
        sm: "h-9 px-4 text-[14px] [&_svg]:size-4",
        lg: "h-14 px-8 text-[16px] [&_svg]:size-6",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
