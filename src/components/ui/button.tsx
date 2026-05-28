import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_-1px_0_0_rgba(255,255,255,0.1)_inset] hover:bg-primary/90 hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.1),0_-1px_0_0_rgba(255,255,255,0.15)_inset] active:shadow-[0_0_0_0_transparent,0_-1px_0_0_rgba(0,0,0,0.05)_inset] aria-expanded:bg-primary/90",
        outline:
          "border border-input bg-background shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:bg-muted/50 hover:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06)] active:shadow-none aria-expanded:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:bg-secondary/90 hover:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06)] active:shadow-none aria-expanded:bg-secondary/90",
        ghost:
          "hover:bg-muted/50 hover:text-foreground active:bg-muted aria-expanded:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_-1px_0_0_rgba(255,255,255,0.1)_inset] hover:bg-destructive/90 active:shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
        plastic:
          "relative overflow-hidden bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-white shadow-[0_4px_12px_rgba(22,163,74,0.4),0_1px_0_rgba(255,255,255,0.2)_inset,0_-2px_0_rgba(0,0,0,0.15)_inset] hover:shadow-[0_6px_20px_rgba(22,163,74,0.5),0_1px_0_rgba(255,255,255,0.25)_inset,0_-2px_0_rgba(0,0,0,0.15)_inset] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-[0_2px_6px_rgba(22,163,74,0.3),0_1px_0_rgba(255,255,255,0.1)_inset,0_-1px_0_rgba(0,0,0,0.2)_inset] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] before:skew-x-[-15deg] hover:before:animate-[shine-sweep_0.8s_ease-out]",
      },
      size: {
        default: "h-9 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        lg: "h-11 gap-2 px-6 text-base rounded-xl has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
