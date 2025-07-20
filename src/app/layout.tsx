import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { QuantumNavigation } from "@/components/layout/quantum-navigation";
import { TrustFooter } from "@/components/layout/trust-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QubitCore - Quantum Security for the Modern World",
  description: "Protect your data against quantum threats with QubitCore's four quantum-resistant security platforms: Shield, Ledger, Synapse, and Aegis.",
  keywords: ["quantum security", "post-quantum cryptography", "quantum-resistant", "data protection", "cybersecurity"],
  authors: [{ name: "QubitCore Team" }],
  openGraph: {
    title: "QubitCore - Quantum Security for the Modern World",
    description: "Your data is already stolen. They're just waiting for the quantum key. Protect yourself with QubitCore.",
    type: "website",
    siteName: "QubitCore",
  },
  twitter: {
    card: "summary_large_image",
    title: "QubitCore - Quantum Security for the Modern World",
    description: "Your data is already stolen. They're just waiting for the quantum key.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <QuantumNavigation />
            <main className="flex-1">{children}</main>
            <TrustFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
