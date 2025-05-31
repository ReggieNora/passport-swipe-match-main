
import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const mockupFrameVariants = cva(
  "relative overflow-hidden rounded-lg border",
  {
    variants: {
      size: {
        small: "p-1",
        medium: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const MockupFrame = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof mockupFrameVariants>
>(({ className, size, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(mockupFrameVariants({ size }), className)}
    {...props}
  >
    {children}
  </div>
));
MockupFrame.displayName = "MockupFrame";

const mockupVariants = cva("w-full h-auto rounded-md overflow-hidden", {
  variants: {
    type: {
      desktop: "aspect-[16/10]",
      mobile: "aspect-[9/16] max-w-xs mx-auto",
      tablet: "aspect-[4/3]",
      responsive: "aspect-video",
    },
  },
  defaultVariants: {
    type: "desktop",
  },
});

const Mockup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof mockupVariants>
>(({ className, type, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(mockupVariants({ type }), className)}
    {...props}
  >
    {children}
  </div>
));
Mockup.displayName = "Mockup";

export { Mockup, MockupFrame };
