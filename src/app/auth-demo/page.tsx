import React from 'react';
import { AuthLayout, defaultTestimonials } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthDemoPage() {
  return (
    <AuthLayout testimonial={defaultTestimonials.signup}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-600 mt-2">Get started with QubitCore today</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Enter your full name" />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" />
          </div>
          
          <Button className="w-full" type="submit">
            Create Account
          </Button>
        </form>
        
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}