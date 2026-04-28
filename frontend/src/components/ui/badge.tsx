import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-3 py-1 text-[13px] font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-border hover:bg-muted",
        success: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/20",
        warning: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 hover:bg-[#F59E0B]/20",
        error: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20 hover:bg-[#EF4444]/20",
        info: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/20",
        outline: "border-border text-foreground hover:bg-muted",
        ghost: "border-transparent hover:bg-muted hover:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
