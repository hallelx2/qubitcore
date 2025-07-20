"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';

export function MigrationPlanner() {
  return (
    <div className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            MIGRATION PLANNER
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Quantum-Safe Migration Roadmap
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Get a step-by-step migration plan tailored to your organization's needs, 
            timeline, and budget constraints.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Phase 1: Assessment</h3>
              <p className="text-sm text-slate-600">
                Complete cryptographic inventory and risk assessment
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Phase 2: Planning</h3>
              <p className="text-sm text-slate-600">
                Develop migration strategy and implementation timeline
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Phase 3: Implementation</h3>
              <p className="text-sm text-slate-600">
                Execute quantum-safe migration with ongoing support
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Migration?
            </h3>
            <p className="text-xl mb-6 text-purple-100">
              Get expert guidance and support for your quantum-safe migration journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-purple-600">
                Get Migration Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}