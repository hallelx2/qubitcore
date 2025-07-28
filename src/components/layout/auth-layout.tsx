import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface AuthLayoutProps {
  children: React.ReactNode;
  testimonial: TestimonialData;
  className?: string;
}

export function AuthLayout({ children, testimonial, className }: AuthLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col lg:flex-row", className)}>
      {/* Left side - Dark background with testimonial */}
      <div className="bg-black text-white flex-1 lg:flex-[3] flex flex-col justify-between p-8 lg:p-12">
        {/* Top content area - can be used for branding/logo */}
        <div className="flex-1">
          <div className="max-w-md">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              QubitCore
            </h1>
            <p className="text-lg text-gray-300">
              Quantum-ready security solutions for the future
            </p>
          </div>
        </div>
        
        {/* Bottom testimonial section */}
        <div className="max-w-md">
          <blockquote className="text-lg lg:text-xl font-medium mb-6">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">
                {testimonial.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-400">
                {testimonial.role}, {testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - White background with form */}
      <div className="bg-white flex-1 lg:flex-[2] flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

// Default testimonials for different auth pages
export const defaultTestimonials = {
  signup: {
    quote: "Changing the future of security with a quantum leap",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechCorp"
  },
  login: {
    quote: "QubitCore's security features give us confidence in our quantum-ready infrastructure",
    author: "Michael Rodriguez",
    role: "Security Director", 
    company: "SecureFlow"
  }
} as const;