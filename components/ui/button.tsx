import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-void font-bold shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30",
        outline:
          "border border-border-subtle bg-transparent hover:bg-white/5 hover:text-text-primary",
        secondary:
          "bg-surface text-text-primary border border-border-subtle hover:bg-white/5",
        ghost: "hover:bg-white/5 hover:text-text-primary",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-xl",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-2xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
