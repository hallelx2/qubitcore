"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  AlertTriangle, 
  Shield, 
  Zap,
  Brain,
  Lock,
  Unlock,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  type: 'milestone' | 'threat' | 'opportunity' | 'deadline';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  impact: string[];
  recommendations: string[];
  isActual: boolean; // true for past events, false for predictions
}

interface IndustryImpact {
  industry: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timeToImpact: number;
  keyVulnerabilities: string[];
  icon: any;
  color: string;
}

const quantumTimeline: TimelineEvent[] = [
  {
    id: 'current_state',
    year: 2024,
    title: 'Current State: Classical Cryptography Dominance',
    description: 'Most organizations rely on RSA, ECC, and other classical cryptographic algorithms that are vulnerable to quantum attacks.',
    type: 'milestone',
    severity: 'medium',
    probability: 100,
    impact: ['Widespread use of quantum-vulnerable encryption', 'Growing awareness of quantum threats'],
    recommendations: ['Begin quantum readiness assessment', 'Start cryptographic inventory'],
    isActual: true
  },
  {
    id: 'nist_standards',
    year: 2024,
    title: 'NIST Post-Quantum Cryptography Standards Released',
    description: 'NIST finalizes standardization of post-quantum cryptographic algorithms, providing clear guidance for migration.',
    type: 'opportunity',
    severity: 'low',
    probability: 100,
    impact: ['Clear migration path available', 'Industry adoption begins'],
    recommendations: ['Evaluate NIST-approved algorithms', 'Plan migration strategy'],
    isActual: true
  },
  {
    id: 'early_adoption',
    year: 2025,
    title: 'Early Adopter Phase',
    description: 'Forward-thinking organizations begin implementing post-quantum cryptography in critical systems.',
    type: 'opportunity',
    severity: 'medium',
    probability: 90,
    impact: ['Competitive advantage for early adopters', 'Proof of concept implementations'],
    recommendations: ['Join early adopter programs', 'Pilot post-quantum implementations'],
    isActual: false
  },
  {
    id: 'quantum_advantage',
    year: 2026,
    title: 'Quantum Advantage Demonstrated',
    description: 'Quantum computers demonstrate clear advantage over classical computers in specific cryptographic problems.',
    type: 'threat',
    severity: 'high',
    probability: 80,
    impact: ['Increased urgency for migration', 'Market volatility in crypto-dependent sectors'],
    recommendations: ['Accelerate migration timeline', 'Increase security budgets'],
    isActual: false
  },
  {
    id: 'regulatory_mandates',
    year: 2027,
    title: 'Regulatory Mandates Begin',
    description: 'Government agencies and regulatory bodies begin mandating post-quantum cryptography for critical infrastructure.',
    type: 'deadline',
    severity: 'high',
    probability: 85,
    impact: ['Compliance requirements', 'Mandatory migration timelines'],
    recommendations: ['Ensure regulatory compliance', 'Accelerate critical system upgrades'],
    isActual: false
  },
  {
    id: 'cryptographically_relevant',
    year: 2029,
    title: 'Cryptographically Relevant Quantum Computer',
    description: 'First quantum computer capable of breaking RSA-2048 and ECC-256 is demonstrated, marking the end of classical cryptography security.',
    type: 'threat',
    severity: 'critical',
    probability: 70,
    impact: ['Classical encryption becomes obsolete', 'Massive security breaches possible', 'Economic disruption'],
    recommendations: ['Complete migration to post-quantum cryptography', 'Emergency response protocols'],
    isActual: false
  },
  {
    id: 'widespread_attacks',
    year: 2030,
    title: 'Widespread Quantum Attacks',
    description: 'Quantum computers become accessible enough for sophisticated attackers to break classical encryption at scale.',
    type: 'threat',
    severity: 'critical',
    probability: 60,
    impact: ['Mass data breaches', 'Financial system disruption', 'National security threats'],
    recommendations: ['Full post-quantum deployment', 'Incident response and recovery'],
    isActual: false
  },
  {
    id: 'quantum_safe_era',
    year: 2032,
    title: 'Quantum-Safe Era Begins',
    description: 'Organizations that successfully migrated to post-quantum cryptography operate securely in the quantum computing age.',
    type: 'opportunity',
    severity: 'low',
    probability: 95,
    impact: ['Secure operations for prepared organizations', 'Competitive advantage'],
    recommendations: ['Maintain quantum-safe posture', 'Continuous security monitoring'],
    isActual: false
  }
];

const industryImpacts: IndustryImpact[] = [
  {
    industry: 'Financial Services',
    riskLevel: 'critical',
    timeToImpact: 3,
    keyVulnerabilities: ['Payment processing', 'Trading systems', 'Customer data', 'Regulatory compliance'],
    icon: TrendingUp,
    color: 'red'
  },
  {
    industry: 'Healthcare',
    riskLevel: 'critical',
    timeToImpact: 4,
    keyVulnerabilities: ['Patient records', 'Medical devices', 'Research data', 'HIPAA compliance'],
    icon: Activity,
    color: 'red'
  },
  {
    industry: 'Government/Defense',
    riskLevel: 'critical',
    timeToImpact: 2,
    keyVulnerabilities: ['Classified information', 'Communication systems', 'Infrastructure control'],
    icon: Shield,
    color: 'red'
  },
  {
    industry: 'Technology',
    riskLevel: 'high',
    timeToImpact: 4,
    keyVulnerabilities: ['Cloud infrastructure', 'Customer data', 'Intellectual property'],
    icon: Brain,
    color: 'orange'
  },
  {
    industry: 'Energy/Utilities',
    riskLevel: 'high',
    timeToImpact: 5,
    keyVulnerabilities: ['Grid control systems', 'Customer data', 'Operational technology'],
    icon: Zap,
    color: 'orange'
  },
  {
    industry: 'Retail/E-commerce',
    riskLevel: 'medium',
    timeToImpact: 5,
    keyVulnerabilities: ['Payment processing', 'Customer data', 'Supply chain'],
    icon: Target,
    color: 'yellow'
  }
];

export function ThreatTimeline() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);

  // Auto-advance timeline when playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentYear(prev => {
        if (prev >= 2032) {
          setIsPlaying(false);
          return 2032;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimeline = () => {
    setIsPlaying(false);
    setCurrentYear(2024);
    setSelectedYear(null);
  };

  const getEventColor = (event: TimelineEvent) => {
    switch (event.type) {
      case 'threat': return 'border-red-500 bg-red-50';
      case 'deadline': return 'border-orange-500 bg-orange-50';
      case 'opportunity': return 'border-green-500 bg-green-50';
      case 'milestone': return 'border-blue-500 bg-blue-50';
      default: return 'border-slate-500 bg-slate-50';
    }
  };

  const getEventIcon = (event: TimelineEvent) => {
    switch (event.type) {
      case 'threat': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'deadline': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'opportunity': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'milestone': return <Target className="w-5 h-5 text-blue-600" />;
      default: return <Calendar className="w-5 h-5 text-slate-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const yearsUntilQuantumThreat = 2029 - new Date().getFullYear();
  const progressToQuantumThreat = ((new Date().getFullYear() - 2024) / (2029 - 2024)) * 100;

  return (
    <div className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            QUANTUM THREAT TIMELINE
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            The Quantum Computing Timeline
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Understand when quantum computers will threaten current encryption and 
            what your organization needs to do to prepare for the quantum era.
          </p>
        </motion.div>

        {/* Quantum Threat Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Quantum Threat Countdown</h3>
              <div className="text-6xl font-bold mb-4">
                {yearsUntilQuantumThreat} Years
              </div>
              <p className="text-xl mb-6 text-red-100">
                Until cryptographically relevant quantum computers threaten current encryption
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span>2024 (Now)</span>
                  <span>2029 (Quantum Threat)</span>
                </div>
                <Progress value={progressToQuantumThreat} className="h-4 bg-red-800" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <Button
            onClick={handlePlayPause}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause Timeline' : 'Play Timeline'}
          </Button>
          
          <Button
            variant="outline"
            onClick={resetTimeline}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Reset to 2024
          </Button>
          
          <div className="text-sm text-slate-600">
            Current Year: <span className="font-semibold">{currentYear}</span>
          </div>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Quantum Computing Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quantumTimeline.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: event.year <= currentYear ? 1 : 0.3,
                      x: 0,
                      scale: selectedYear === event.year ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setSelectedYear(selectedYear === event.year ? null : event.year)}
                    className={`
                      relative cursor-pointer transition-all p-6 rounded-lg border-2
                      ${getEventColor(event)}
                      ${selectedYear === event.year ? 'ring-2 ring-blue-500' : ''}
                      ${event.year <= currentYear ? '' : 'opacity-50'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-current flex items-center justify-center">
                          {getEventIcon(event)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {event.year}
                          </Badge>
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                          {!event.isActual && (
                            <Badge variant="outline" className="text-xs">
                              {event.probability}% probability
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-slate-600 mb-4">{event.description}</p>
                        
                        {selectedYear === event.year && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div>
                              <h4 className="font-semibold text-slate-900 mb-2">Impact:</h4>
                              <ul className="space-y-1">
                                {event.impact.map((impact, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                    {impact}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-slate-900 mb-2">Recommendations:</h4>
                              <ul className="space-y-1">
                                {event.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0">
                        {event.year <= currentYear ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Industry Impact Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Industry Impact Analysis</CardTitle>
              <p className="text-slate-600">
                Different industries face varying levels of quantum threat urgency based on their data sensitivity and regulatory requirements.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industryImpacts.map((industry) => {
                  const IconComponent = industry.icon;
                  return (
                    <Card key={industry.industry} className="bg-slate-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg bg-${industry.color}-100`}>
                            <IconComponent className={`w-6 h-6 text-${industry.color}-600`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{industry.industry}</h3>
                            <Badge className={getSeverityColor(industry.riskLevel)}>
                              {industry.riskLevel} risk
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-slate-700">Time to Impact:</p>
                            <p className="text-lg font-bold text-slate-900">{industry.timeToImpact} years</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Key Vulnerabilities:</p>
                            <ul className="space-y-1">
                              {industry.keyVulnerabilities.map((vuln, idx) => (
                                <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                                  {vuln}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Don't Wait for the Quantum Threat
              </h3>
              <p className="text-xl mb-6 text-orange-100">
                Start your quantum-safe migration today. The organizations that prepare now 
                will thrive in the quantum era, while others face catastrophic security failures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-orange-600">
                  Start Quantum Assessment
                  <Brain className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  Get Migration Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}