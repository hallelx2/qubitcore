"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  FileText, 
  Brain, 
  Heart, 
  ArrowRight, 
  Code, 
  Building, 
  Users, 
  Activity,
  Zap,
  Lock,
  Globe
} from 'lucide-react';
import Link from 'next/link';

interface Platform {
  id: 'shield' | 'ledger' | 'synapse' | 'aegis';
  name: string;
  tagline: string;
  story: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  audience: string;
  keyFeature: string;
  useCases: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const platforms: Platform[] = [
  {
    id: 'shield',
    name: 'Shield',
    tagline: 'The Developer\'s Quantum Shield',
    story: 'Protect any application with quantum-resistant APIs',
    description: 'Simple, powerful APIs that make quantum-resistant security as easy as a REST call. From encryption to digital signatures, Shield protects your code from the quantum threat.',
    icon: <Shield className="w-8 h-8" />,
    color: 'blue',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    audience: 'Developers & Startups',
    keyFeature: 'Quantum-Safe APIs',
    useCases: ['API Security', 'Data Encryption', 'Digital Signatures', 'Key Management'],
    metrics: [
      { label: 'API Calls Protected', value: '2.3M+' },
      { label: 'Developers Using', value: '1,247' },
      { label: 'Response Time', value: '<50ms' }
    ]
  },
  {
    id: 'ledger',
    name: 'Ledger',
    tagline: 'The Trust Keeper',
    story: 'Guarantee transaction integrity forever',
    description: 'Immutable witness service that creates quantum-resistant proof chains for your most critical transactions. When trust matters forever, Ledger delivers.',
    icon: <FileText className="w-8 h-8" />,
    color: 'green',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    audience: 'Financial Services',
    keyFeature: 'Immutable Proof Chains',
    useCases: ['Transaction Witnessing', 'Audit Trails', 'Compliance Reporting', 'Contract Integrity'],
    metrics: [
      { label: 'Transactions Witnessed', value: '$2.1B' },
      { label: 'Financial Institutions', value: '156' },
      { label: 'Audit Success Rate', value: '100%' }
    ]
  },
  {
    id: 'synapse',
    name: 'Synapse',
    tagline: 'The Collaboration Bridge',
    story: 'Train AI on sensitive data without seeing it',
    description: 'Quantum-secured federated learning that enables unprecedented AI collaboration. Train on the world\'s most sensitive data while keeping it completely private.',
    icon: <Brain className="w-8 h-8" />,
    color: 'purple',
    bgGradient: 'from-purple-500/10 to-violet-500/10',
    audience: 'AI & Research Teams',
    keyFeature: 'Federated Learning',
    useCases: ['Collaborative AI', 'Privacy-Preserving ML', 'Multi-Party Training', 'Secure Inference'],
    metrics: [
      { label: 'AI Models Trained', value: '847' },
      { label: 'Data Sources Connected', value: '3,200+' },
      { label: 'Privacy Guarantee', value: '100%' }
    ]
  },
  {
    id: 'aegis',
    name: 'Aegis',
    tagline: 'The Guardian Angel',
    story: 'Protect patient data for a lifetime',
    description: 'Healthcare-focused quantum security that protects patient data from birth to beyond. Because health information is sensitive for life, not just today.',
    icon: <Heart className="w-8 h-8" />,
    color: 'red',
    bgGradient: 'from-red-500/10 to-pink-500/10',
    audience: 'Healthcare Organizations',
    keyFeature: 'Lifetime Data Protection',
    useCases: ['EHR Security', 'Device Identity', 'Telemedicine', 'Genetic Data Protection'],
    metrics: [
      { label: 'Patient Records Protected', value: '2.8M' },
      { label: 'Healthcare Providers', value: '89' },
      { label: 'HIPAA Compliance', value: '100%' }
    ]
  }
];

interface FourPlatformsJourneyProps {
  selectedPlatform?: Platform['id'];
  onPlatformSelect?: (platform: Platform['id']) => void;
}

export function FourPlatformsJourney({ selectedPlatform, onPlatformSelect }: FourPlatformsJourneyProps) {
  const [hoveredPlatform, setHoveredPlatform] = useState<Platform['id'] | null>(null);
  const [selectedCard, setSelectedCard] = useState<Platform['id'] | null>(selectedPlatform || null);

  const handlePlatformClick = (platformId: Platform['id']) => {
    setSelectedCard(platformId);
    onPlatformSelect?.(platformId);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            QUANTUM-READY SOLUTIONS
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Four Guardians Against the Quantum Threat
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Each platform tells a unique story of protection, designed for different heroes 
            in the quantum security journey. Choose your path to quantum readiness.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Globe className="w-4 h-4" />
            <span>Trusted by 500+ organizations worldwide</span>
          </div>
        </motion.div>

        {/* Platform Grid - Upstash Inspired */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredPlatform(platform.id)}
              onHoverEnd={() => setHoveredPlatform(null)}
              onClick={() => handlePlatformClick(platform.id)}
              className="cursor-pointer"
            >
              <Card className={`
                h-full transition-all duration-300 border-2 hover:shadow-2xl
                ${selectedCard === platform.id 
                  ? `border-${platform.color}-500 shadow-xl` 
                  : 'border-slate-200 hover:border-slate-300'
                }
                ${hoveredPlatform === platform.id ? 'scale-105' : ''}
                bg-gradient-to-br ${platform.bgGradient} backdrop-blur-sm
              `}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-br 
                      ${platform.color === 'blue' ? 'from-blue-500 to-cyan-500' : ''}
                      ${platform.color === 'green' ? 'from-green-500 to-emerald-500' : ''}
                      ${platform.color === 'purple' ? 'from-purple-500 to-violet-500' : ''}
                      ${platform.color === 'red' ? 'from-red-500 to-pink-500' : ''}
                      text-white shadow-lg
                    `}>
                      {platform.icon}
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {platform.audience}
                    </Badge>
                  </div>

                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {platform.name}
                  </CardTitle>
                  
                  <p className={`
                    text-lg font-semibold mb-3
                    ${platform.color === 'blue' ? 'text-blue-600' : ''}
                    ${platform.color === 'green' ? 'text-green-600' : ''}
                    ${platform.color === 'purple' ? 'text-purple-600' : ''}
                    ${platform.color === 'red' ? 'text-red-600' : ''}
                  `}>
                    {platform.tagline}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Key Feature */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-semibold text-slate-700">Key Feature</span>
                    </div>
                    <p className="text-slate-600 text-sm">{platform.keyFeature}</p>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-semibold text-slate-700">Use Cases</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {platform.useCases.map((useCase, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/50 rounded-lg">
                    {platform.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`
                          text-lg font-bold
                          ${platform.color === 'blue' ? 'text-blue-600' : ''}
                          ${platform.color === 'green' ? 'text-green-600' : ''}
                          ${platform.color === 'purple' ? 'text-purple-600' : ''}
                          ${platform.color === 'red' ? 'text-red-600' : ''}
                        `}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={`/${platform.id}`}>
                    <Button className={`
                      w-full group transition-all duration-300
                      ${platform.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                      ${platform.color === 'green' ? 'bg-green-600 hover:bg-green-700' : ''}
                      ${platform.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                      ${platform.color === 'red' ? 'bg-red-600 hover:bg-red-700' : ''}
                      text-white
                    `}>
                      Explore {platform.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Why Choose QubitCore?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Developer First</h4>
                  <p className="text-slate-600 text-sm">
                    Simple APIs that make quantum security accessible to every developer
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Enterprise Ready</h4>
                  <p className="text-slate-600 text-sm">
                    Scalable, compliant solutions trusted by Fortune 500 companies
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Future Proof</h4>
                  <p className="text-slate-600 text-sm">
                    Quantum-resistant security that protects your data forever
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8">
                  Start Your Quantum Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}