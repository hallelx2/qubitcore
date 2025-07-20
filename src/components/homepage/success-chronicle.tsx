"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Quote, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Play,
  Building,
  Award,
  Zap
} from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

interface CustomerStory {
  id: string;
  company: string;
  industry: string;
  size: string;
  logo: string;
  challenge: string;
  solution: string;
  implementation: string;
  results: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  metrics: Metric[];
  timeline: string;
  platform: 'shield' | 'ledger' | 'synapse' | 'aegis';
  featured: boolean;
}

const customerStories: CustomerStory[] = [
  {
    id: 'healthtech-startup',
    company: 'MedSecure',
    industry: 'Healthcare Technology',
    size: '50-200 employees',
    logo: '🏥',
    challenge: 'A fast-growing healthtech startup needed to secure patient data while maintaining rapid development velocity. Their existing encryption was vulnerable to quantum threats, putting long-term patient privacy at risk.',
    solution: 'Implemented QubitCore Shield APIs across their entire platform, replacing vulnerable RSA encryption with quantum-resistant algorithms in just 2 weeks.',
    implementation: 'Integrated Shield\'s encryption and digital signature APIs into their patient portal, mobile app, and backend services with minimal code changes.',
    results: 'Achieved quantum-safe security without slowing development. Passed HIPAA audits with flying colors and gained competitive advantage in enterprise sales.',
    testimonial: {
      quote: "QubitCore Shield transformed our security posture overnight. What would have taken months of cryptography research took us just days to implement. Our patients' data is now protected for decades, not just today.",
      author: 'Dr. Sarah Chen',
      role: 'CTO & Co-founder',
      avatar: '👩‍💻'
    },
    metrics: [
      {
        label: 'Implementation Time',
        value: '2 weeks',
        change: '85% faster',
        trend: 'up',
        icon: <Clock className="w-4 h-4" />
      },
      {
        label: 'Security Score',
        value: '98/100',
        change: '+45 points',
        trend: 'up',
        icon: <Shield className="w-4 h-4" />
      },
      {
        label: 'Enterprise Deals',
        value: '+340%',
        change: 'vs previous quarter',
        trend: 'up',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        label: 'Development Velocity',
        value: 'Maintained',
        change: 'No slowdown',
        trend: 'stable',
        icon: <Zap className="w-4 h-4" />
      }
    ],
    timeline: '3 months',
    platform: 'shield',
    featured: true
  },
  {
    id: 'fintech-scale',
    company: 'PaymentFlow',
    industry: 'Financial Technology',
    size: '200-500 employees',
    logo: '💳',
    challenge: 'A rapidly scaling fintech company processing $2B+ annually needed immutable transaction records for regulatory compliance and audit trails that would remain valid even after quantum computers arrive.',
    solution: 'Deployed QubitCore Ledger to create quantum-resistant witness records for every transaction, ensuring permanent audit trails and regulatory compliance.',
    implementation: 'Integrated Ledger\'s witnessing API into their transaction processing pipeline, creating immutable proof chains for all financial operations.',
    results: 'Achieved 100% audit success rate, reduced compliance costs by 60%, and gained trust of major enterprise clients requiring quantum-safe financial records.',
    testimonial: {
      quote: "Ledger gave us something no other solution could: mathematical certainty that our transaction records will remain valid forever. Our auditors love it, our clients trust it, and our compliance team sleeps better at night.",
      author: 'Marcus Rodriguez',
      role: 'Head of Security',
      avatar: '👨‍💼'
    },
    metrics: [
      {
        label: 'Transactions Witnessed',
        value: '$2.1B',
        change: '100% coverage',
        trend: 'up',
        icon: <DollarSign className="w-4 h-4" />
      },
      {
        label: 'Audit Success Rate',
        value: '100%',
        change: '+15% improvement',
        trend: 'up',
        icon: <CheckCircle className="w-4 h-4" />
      },
      {
        label: 'Compliance Costs',
        value: '-60%',
        change: 'Annual savings',
        trend: 'up',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        label: 'Enterprise Clients',
        value: '+125%',
        change: 'Growth rate',
        trend: 'up',
        icon: <Building className="w-4 h-4" />
      }
    ],
    timeline: '6 months',
    platform: 'ledger',
    featured: true
  },
  {
    id: 'ai-research',
    company: 'CollabAI Research',
    industry: 'Artificial Intelligence',
    size: '100-300 employees',
    logo: '🧠',
    challenge: 'A consortium of hospitals wanted to train AI models on sensitive patient data without sharing raw information. Traditional federated learning solutions lacked quantum-safe privacy guarantees.',
    solution: 'Used QubitCore Synapse to enable secure multi-party AI training with quantum-enhanced differential privacy, allowing breakthrough medical AI development.',
    implementation: 'Connected 12 hospitals through Synapse\'s federated learning platform, training cancer detection models without exposing patient data.',
    results: 'Achieved 94% accuracy in cancer detection while maintaining perfect privacy. Model now deployed across 50+ hospitals, potentially saving thousands of lives.',
    testimonial: {
      quote: "Synapse made the impossible possible. We trained world-class AI models on the most sensitive data imaginable, with mathematical proof that patient privacy was never compromised. This is the future of medical AI.",
      author: 'Dr. Alex Kim',
      role: 'Director of AI Research',
      avatar: '👨‍⚕️'
    },
    metrics: [
      {
        label: 'Model Accuracy',
        value: '94%',
        change: '+12% vs individual training',
        trend: 'up',
        icon: <Award className="w-4 h-4" />
      },
      {
        label: 'Hospitals Connected',
        value: '12',
        change: 'Multi-site collaboration',
        trend: 'up',
        icon: <Users className="w-4 h-4" />
      },
      {
        label: 'Privacy Guarantee',
        value: '100%',
        change: 'Mathematical proof',
        trend: 'stable',
        icon: <Shield className="w-4 h-4" />
      },
      {
        label: 'Deployment Scale',
        value: '50+ hospitals',
        change: 'Rapid adoption',
        trend: 'up',
        icon: <TrendingUp className="w-4 h-4" />
      }
    ],
    timeline: '8 months',
    platform: 'synapse',
    featured: true
  }
];

interface SuccessChronicleProps {
  showMetrics?: boolean;
  maxStories?: number;
  platform?: 'shield' | 'ledger' | 'synapse' | 'aegis';
}

export function SuccessChronicle({ 
  showMetrics = true, 
  maxStories = 3,
  platform 
}: SuccessChronicleProps) {
  const [selectedStory, setSelectedStory] = useState<CustomerStory | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const filteredStories = platform 
    ? customerStories.filter(story => story.platform === platform)
    : customerStories.slice(0, maxStories);

  const handleStorySelect = (story: CustomerStory) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            SUCCESS STORIES
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Real Results from Real Companies
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            See how forward-thinking organizations are already protecting their future 
            with QubitCore's quantum-safe security solutions.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => handleStorySelect(story)}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{story.logo}</div>
                      <div>
                        <h3 className="font-bold text-slate-900">{story.company}</h3>
                        <p className="text-sm text-slate-500">{story.industry}</p>
                      </div>
                    </div>
                    
                    <Badge className={`
                      ${story.platform === 'shield' ? 'bg-blue-600' : ''}
                      ${story.platform === 'ledger' ? 'bg-green-600' : ''}
                      ${story.platform === 'synapse' ? 'bg-purple-600' : ''}
                      ${story.platform === 'aegis' ? 'bg-red-600' : ''}
                    `}>
                      {story.platform}
                    </Badge>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {story.challenge}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Key Metrics Preview */}
                  {showMetrics && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {story.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            {metric.icon}
                          </div>
                          <div className="font-bold text-slate-900">{metric.value}</div>
                          <div className="text-xs text-slate-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Testimonial Preview */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{story.testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{story.testimonial.author}</p>
                        <p className="text-xs text-slate-500">{story.testimonial.role}</p>
                      </div>
                    </div>
                    
                    <blockquote className="text-sm text-slate-600 italic line-clamp-3">
                      "{story.testimonial.quote.substring(0, 120)}..."
                    </blockquote>
                  </div>

                  <Button variant="outline" className="w-full group">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8">
                Trusted by Industry Leaders Worldwide
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Organizations Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">$50B+</div>
                  <div className="text-blue-100">Data Value Secured</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <div className="text-blue-100">Uptime Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Expert Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Story Modal */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{selectedStory.logo}</div>
                      <div>
                        <h2 className="text-3xl font-bold text-slate-900">{selectedStory.company}</h2>
                        <p className="text-slate-600">{selectedStory.industry} • {selectedStory.size}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" onClick={handleCloseModal}>
                      ✕
                    </Button>
                  </div>

                  {/* Story Sections */}
                  <div className="space-y-8">
                    {/* Challenge */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">The Challenge</h3>
                      <p className="text-slate-700 leading-relaxed">{selectedStory.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">The Solution</h3>
                      <p className="text-slate-700 leading-relaxed">{selectedStory.solution}</p>
                    </div>

                    {/* Implementation */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Implementation</h3>
                      <p className="text-slate-700 leading-relaxed">{selectedStory.implementation}</p>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Results</h3>
                      <p className="text-slate-700 leading-relaxed mb-6">{selectedStory.results}</p>
                      
                      {/* Detailed Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedStory.metrics.map((metric, idx) => (
                          <Card key={idx} className="text-center p-4">
                            <div className="flex items-center justify-center mb-2">
                              {metric.icon}
                            </div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                            <div className="text-sm text-slate-600 mb-1">{metric.label}</div>
                            <div className={`
                              text-xs font-semibold
                              ${metric.trend === 'up' ? 'text-green-600' : ''}
                              ${metric.trend === 'down' ? 'text-red-600' : ''}
                              ${metric.trend === 'stable' ? 'text-blue-600' : ''}
                            `}>
                              {metric.change}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <Card className="bg-slate-50 border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Quote className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                          <div>
                            <blockquote className="text-lg text-slate-700 italic mb-4">
                              "{selectedStory.testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{selectedStory.testimonial.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-slate-900">{selectedStory.testimonial.author}</p>
                                <p className="text-slate-600">{selectedStory.testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Start Your Success Story
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}