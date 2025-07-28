"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

interface AuthLayoutProps {
  children: React.ReactNode
  testimonial: Testimonial
  className?: string
}

export function AuthLayout({ children, testimonial, className }: AuthLayoutProps) {
  return (
    <div className={cn("min-h-screen flex", className)}>
      {/* Left side - Dark background with testimonial */}
      <div className="hidden lg:flex lg:w-3/5 bg-black text-white flex-col justify-between p-12">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-8 leading-tight">
              QubitCore
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Quantum-ready security solutions for the future of digital infrastructure
            </p>
          </div>
        </div>
        
        {/* Testimonial at bottom */}
        <div className="border-t border-gray-800 pt-8">
          <blockquote className="text-lg italic mb-4">
            "{testimonial.quote}"
          </blockquote>
          <div className="text-sm text-gray-400">
            <div className="font-semibold text-white">{testimonial.author}</div>
            <div>{testimonial.role}</div>
            <div>{testimonial.company}</div>
          </div>
        </div>
      </div>

      {/* Right side - White background with form */}
      <div className="flex-1 lg:w-2/5 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}