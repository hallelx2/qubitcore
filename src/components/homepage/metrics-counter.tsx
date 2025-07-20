"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Database, 
  Zap, 
  TrendingUp, 
  Award,
  Globe,
  Lock,
  CheckCircle,
  Star
} from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
    period: string;
  };
}

interface Certification {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'pending' | 'certified';
  validUntil?: string;
}

const metrics: Metric[] = [
  {
    id: 'data-protected',
    label: 'Data Protected',
    value: 2.3,
    suffix: 'TB',
    description: 'Total volume of sensitive data secured with quantum-resistant encryption',
    icon: <Database className="w-8 h-8" />,
    color: 'blue',
    trend: {
      direction: 'up',
      percentage: 340,
      period: 'this quarter'
    }
  },
  {
    id: 'threats-blocked',
    label: 'Quantum Threats Blocked',
    value: 1247,
    suffix: '',
    description: 'Potential quantum attacks prevented through proactive security measures',
    icon: <Shield className="w-8 h-8" />,
    color: 'red',
    trend: {
      direction: 'up',
      percentage: 89,
      period: 'this month'
    }
  },
  {
    id: 'organizations-secured',
    label: 'Organizations Secured',
    value: 156,
    suffix: '',
    description: 'Companies and institutions protected with QubitCore quantum-safe solutions',
    icon: <Users className="w-8 h-8" />,
    color: 'green',
    trend: {
      direction: 'up',
      percentage: 125,
      period: 'this year'
    }
  },
  {
    id: 'api-calls',
    label: 'API Calls Processed',
    value: 50.2,
    suffix: 'M',
    description: 'Total quantum-safe API operations executed across all platforms',
    icon: <Zap className="w-8 h-8" />,
    color: 'purple',
    trend: {
      direction: 'up',
      percentage: 450,
      period: 'since launch'
    }
  },
  {
    id: 'uptime',
    label: 'Platform Uptime',
    value: 99.97,
    suffix: '%',
    description: 'Guaranteed availability for mission-critical quantum security operations',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'emerald',
    trend: {
      direction: 'up',
      percentage: 0.03,
      period: 'improvement'
    }
  },
  {
    id: 'response-time',
    label: 'Average Response Time',
    value: 47,
    suffix: 'ms',
    description: 'Lightning-fast quantum-safe cryptographic operations',
    icon: <Zap className="w-8 h-8" />,
    color: 'orange',
    trend: {
      direction: 'down',
      percentage: 23,
      period: 'optimization'
    }
  }
];

const certifications: Certification[] = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    description: 'Security, availability, and confidentiality controls',
    icon: <Award className="w-6 h-6" />,
    status: 'certified',
    validUntil: '2025-12-31'
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information security management system',
    icon: <Lock className="w-6 h-6" />,
    status: 'certified',
    validUntil: '2025-08-15'
  },
  {
    id: 'nist-pqc',
    name: 'NIST PQC Compliant',
    description: 'Post-quantum cryptography standards',
    icon: <Shield className="w-6 h-6" />,
    status: 'certified'
  },
  {
    id: 'hipaa',
    name: 'HIPAA Compliant',
    description: 'Healthcare data protection standards',
    icon: <CheckCircle className="w-6 h-6" />,
    status: 'certified'
  },
  {
    id: 'gdpr',
    name: 'GDPR Compliant',
    description: 'European data protection regulation',
    icon: <Globe className="w-6 h-6" />,
    status: 'certified'
  },
  {
    id: 'fips140',
    name: 'FIPS 140-2 Level 3',
    description: 'Cryptographic module validation',
    icon: <Star className="w-6 h-6" />,
    status: 'pending'
  }
];

interface MetricsCounterProps {
  showTrends?: boolean;
  showCertifications?: boolean;
  animationDelay?: number;
}

export function MetricsCounter({ 
  showTrends = true, 
  showCertifications = true,
  animationDelay = 0 
}: MetricsCounterProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <div ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: animationDelay }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            REAL-TIME METRICS
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Quantum Security in Numbers
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            See the real impact of quantum-safe security. These numbers represent 
            organizations and data protected from the quantum threat today.
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: animationDelay + (index * 0.1) }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`
                      p-3 rounded-xl
                      ${metric.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                      ${metric.color === 'red' ? 'bg-red-100 text-red-600' : ''}
                      ${metric.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                      ${metric.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                      ${metric.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                      ${metric.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
                    `}>
                      {metric.icon}
                    </div>
                    
                    {showTrends && metric.trend && (
                      <Badge className={`
                        ${metric.trend.direction === 'up' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                      `}>
                        <TrendingUp className={`
                          w-3 h-3 mr-1 
                          ${metric.trend.direction === 'down' ? 'rotate-180' : ''}
                        `} />
                        {metric.trend.percentage}%
                      </Badge>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {metric.prefix}
                      {hasAnimated ? (
                        <CountUp
                          end={metric.value}
                          duration={2}
                          decimals={metric.value % 1 !== 0 ? 1 : 0}
                          preserveValue
                        />
                      ) : (
                        '0'
                      )}
                      {metric.suffix}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      {metric.label}
                    </h3>
                    
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>

                  {showTrends && metric.trend && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                          {metric.trend.direction === 'up' ? '↗' : '↘'} {metric.trend.percentage}% {metric.trend.period}
                        </span>
                        <span className={`
                          font-semibold
                          ${metric.trend.direction === 'up' ? 'text-green-600' : 'text-blue-600'}
                        `}>
                          {metric.trend.direction === 'up' ? 'Growing' : 'Optimized'}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: animationDelay + 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Trusted by Industry Leaders</h3>
                <p className="text-blue-100">
                  Join hundreds of organizations already protecting their future with quantum-safe security
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">
                    {hasAnimated ? (
                      <CountUp end={500} duration={2} suffix="+" preserveValue />
                    ) : (
                      '0+'
                    )}
                  </div>
                  <div className="text-blue-100">Organizations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">
                    {hasAnimated ? (
                      <CountUp end={50} duration={2} suffix="B+" preserveValue />
                    ) : (
                      '0B+'
                    )}
                  </div>
                  <div className="text-blue-100">Data Value Secured</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">
                    {hasAnimated ? (
                      <CountUp end={99.97} duration={2} decimals={2} suffix="%" preserveValue />
                    ) : (
                      '0%'
                    )}
                  </div>
                  <div className="text-blue-100">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Expert Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Certifications */}
        {showCertifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: animationDelay + 1.0 }}
          >
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Security Certifications & Compliance
                  </h3>
                  <p className="text-slate-600">
                    Our commitment to security is validated by industry-leading certifications
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: animationDelay + 1.2 + (index * 0.1) }}
                      className="text-center"
                    >
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3
                        ${cert.status === 'certified' ? 'bg-green-100 text-green-600' : ''}
                        ${cert.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                        ${cert.status === 'active' ? 'bg-blue-100 text-blue-600' : ''}
                      `}>
                        {cert.icon}
                      </div>
                      
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                        {cert.name}
                      </h4>
                      
                      <p className="text-xs text-slate-600 mb-2">
                        {cert.description}
                      </p>
                      
                      <Badge className={`
                        text-xs
                        ${cert.status === 'certified' ? 'bg-green-600' : ''}
                        ${cert.status === 'pending' ? 'bg-yellow-600' : ''}
                        ${cert.status === 'active' ? 'bg-blue-600' : ''}
                      `}>
                        {cert.status === 'certified' ? 'Certified' : ''}
                        {cert.status === 'pending' ? 'Pending' : ''}
                        {cert.status === 'active' ? 'Active' : ''}
                      </Badge>
                      
                      {cert.validUntil && (
                        <div className="text-xs text-slate-400 mt-1">
                          Valid until {new Date(cert.validUntil).getFullYear()}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}