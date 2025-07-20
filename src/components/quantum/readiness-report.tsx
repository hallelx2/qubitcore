"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export function ReadinessReport() {
  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <FileText className="w-4 h-4 mr-2" />
            READINESS REPORT
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Personalized Quantum Readiness Report
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Get a detailed analysis of your quantum readiness assessment results with 
            specific recommendations tailored to your organization.
          </p>
        </motion.div>

        <Card className="bg-white shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-6">📊</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Complete the Assessment First
            </h3>
            <p className="text-slate-600">
              Your personalized readiness report will appear here after completing the quantum readiness assessment above.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}