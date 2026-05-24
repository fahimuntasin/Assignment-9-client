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
