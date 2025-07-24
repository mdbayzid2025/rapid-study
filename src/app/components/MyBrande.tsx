"use client"

import * as React from "react"
import { ChevronRight, Home, Folder } from "lucide-react"

// Utility function to merge class names (ShadCN style)
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[]
}

export default function MyBrande({ items=[
          { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
          { label: "Projects", href: "/projects", icon: <Folder className="w-4 h-4" /> },
          { label: "Design System" },
        ], className, ...props }: BreadcrumbProps) {
  return (
    <nav
      className={cn("flex items-center text-sm text-muted-foreground", className)}
      aria-label="Breadcrumb"
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                {item.icon}
                {item.label}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                {item.icon}
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// Example usage (you can remove or comment this in production)

