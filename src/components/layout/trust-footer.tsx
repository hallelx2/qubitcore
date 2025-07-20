import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, FileText, Brain, Heart, Github, Twitter, Linkedin } from "lucide-react";

const platforms = [
  { name: "Shield", href: "/shield", icon: Shield },
  { name: "Ledger", href: "/ledger", icon: FileText },
  { name: "Synapse", href: "/synapse", icon: Brain },
  { name: "Aegis", href: "/aegis", icon: Heart },
];

const resources = [
  { name: "Documentation", href: "/docs" },
  { name: "API Reference", href: "/docs/api" },
  { name: "Quantum Readiness", href: "/quantum-readiness" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "White Papers", href: "/resources" },
];

const company = [
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
  { name: "Security", href: "/security" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export function TrustFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-xl">QubitCore</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Protecting your data against quantum threats with four quantum-resistant security platforms.
            </p>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">
                SOC 2 Type II
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ISO 27001
              </Badge>
              <Badge variant="secondary" className="text-xs">
                NIST Approved
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://github.com/qubitcore">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://twitter.com/qubitcore">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://linkedin.com/company/qubitcore">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h3 className="font-semibold">Platforms</h3>
            <ul className="space-y-2">
              {platforms.map((platform) => (
                <li key={platform.name}>
                  <Link
                    href={platform.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <platform.icon className="h-4 w-4" />
                    <span>{platform.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Quantum Ready</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest quantum security insights and threat updates.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button size="sm">Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 QubitCore. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/security" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Built for the quantum age
          </div>
        </div>
      </div>
    </footer>
  );
}