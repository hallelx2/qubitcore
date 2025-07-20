"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Shield, FileText, Brain, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const platforms = [
  {
    name: "Shield",
    href: "/shield",
    description: "The Developer's Quantum Shield",
    icon: Shield,
    color: "text-blue-500",
  },
  {
    name: "Ledger",
    href: "/ledger", 
    description: "The Trust Keeper",
    icon: FileText,
    color: "text-green-500",
  },
  {
    name: "Synapse",
    href: "/synapse",
    description: "The Collaboration Bridge",
    icon: Brain,
    color: "text-purple-500",
  },
  {
    name: "Aegis",
    href: "/aegis",
    description: "The Guardian Angel",
    icon: Heart,
    color: "text-red-500",
  },
];

export function QuantumNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-xl">QubitCore</span>
          <Badge variant="secondary" className="text-xs">
            Quantum Ready
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Platforms</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  {platforms.map((platform) => (
                    <NavigationMenuLink key={platform.name} asChild>
                      <Link
                        href={platform.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          pathname === platform.href && "bg-accent"
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <platform.icon className={cn("h-4 w-4", platform.color)} />
                          <div className="text-sm font-medium leading-none">
                            {platform.name}
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {platform.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/quantum-readiness" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  pathname === "/quantum-readiness" && "bg-accent"
                )}>
                  Quantum Readiness
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  pathname.startsWith("/docs") && "bg-accent"
                )}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Platforms</h3>
              {platforms.map((platform) => (
                <Link
                  key={platform.name}
                  href={platform.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-md p-2 text-sm transition-colors hover:bg-accent",
                    pathname === platform.href && "bg-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <platform.icon className={cn("h-4 w-4", platform.color)} />
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-xs text-muted-foreground">{platform.description}</div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="space-y-2">
              <Link
                href="/quantum-readiness"
                className="block rounded-md p-2 text-sm transition-colors hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quantum Readiness
              </Link>
              <Link
                href="/docs"
                className="block rounded-md p-2 text-sm transition-colors hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
            </div>

            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="ghost" size="sm" asChild className="flex-1">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}