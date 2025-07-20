"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Target,
  Building,
  Database,
  Users,
  Clock,
  Zap
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: 'industry' | 'data' | 'security' | 'timeline' | 'compliance';
  options: {
    value: string;
    label: string;
    score: number;
    risk: 'low' | 'medium' | 'high' | 'critical';
  }[];
}

interface AssessmentResult {
  score: number;
  level: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendations: string[];
  platforms: string[];
  urgency: string;
}

const questions: Question[] = [
  {
    id: 'industry',
    question: 'What industry best describes your organization?',
    category: 'industry',
    options: [
      { value: 'healthcare', label: 'Healthcare & Life Sciences', score: 10, risk: 'critical' },
      { value: 'finance', label: 'Financial Services & Banking', score: 10, risk: 'critical' },
      { value: 'government', label: 'Government & Defense', score: 10, risk: 'critical' },
      { value: 'technology', label: 'Technology & Software', score: 8, risk: 'high' },
      { value: 'education', label: 'Education & Research', score: 7, risk: 'high' },
      { value: 'retail', label: 'Retail & E-commerce', score: 6, risk: 'medium' },
      { value: 'manufacturing', label: 'Manufacturing & Industrial', score: 5, risk: 'medium' },
      { value: 'other', label: 'Other', score: 4, risk: 'low' }
    ]
  },
  {
    id: 'data_sensitivity',
    question: 'What type of sensitive data does your organization handle?',
    category: 'data',
    options: [
      { value: 'pii_health', label: 'Personal Health Information (PHI)', score: 10, risk: 'critical' },
      { value: 'financial', label: 'Financial Records & Payment Data', score: 10, risk: 'critical' },
      { value: 'government', label: 'Classified or Government Data', score: 10, risk: 'critical' },
      { value: 'pii_personal', label: 'Personal Identifiable Information (PII)', score: 8, risk: 'high' },
      { value: 'intellectual', label: 'Intellectual Property & Trade Secrets', score: 8, risk: 'high' },
      { value: 'customer', label: 'Customer Data & Communications', score: 6, risk: 'medium' },
      { value: 'business', label: 'Business Operations Data', score: 4, risk: 'medium' },
      { value: 'public', label: 'Mostly Public Information', score: 2, risk: 'low' }
    ]
  },
  {
    id: 'data_retention',
    question: 'How long do you need to keep your sensitive data secure?',
    category: 'data',
    options: [
      { value: 'lifetime', label: 'Lifetime (50+ years)', score: 10, risk: 'critical' },
      { value: 'decades', label: '10-50 years', score: 9, risk: 'critical' },
      { value: 'years', label: '5-10 years', score: 7, risk: 'high' },
      { value: 'short_term', label: '1-5 years', score: 5, risk: 'medium' },
      { value: 'temporary', label: 'Less than 1 year', score: 2, risk: 'low' }
    ]
  },
  {
    id: 'current_security',
    question: 'What encryption standards are you currently using?',
    category: 'security',
    options: [
      { value: 'rsa_old', label: 'RSA-1024 or older standards', score: 10, risk: 'critical' },
      { value: 'mixed', label: 'Mix of old and new standards', score: 8, risk: 'high' },
      { value: 'rsa_2048', label: 'RSA-2048, AES-256', score: 6, risk: 'medium' },
      { value: 'modern', label: 'Modern standards (ECC, AES-256)', score: 4, risk: 'medium' },
      { value: 'post_quantum', label: 'Already using post-quantum cryptography', score: 1, risk: 'low' },
      { value: 'unsure', label: 'Not sure what we\'re using', score: 9, risk: 'critical' }
    ]
  },
  {
    id: 'compliance',
    question: 'Which compliance requirements apply to your organization?',
    category: 'compliance',
    options: [
      { value: 'multiple', label: 'Multiple (HIPAA, SOX, PCI-DSS, etc.)', score: 10, risk: 'critical' },
      { value: 'hipaa', label: 'HIPAA (Healthcare)', score: 9, risk: 'critical' },
      { value: 'sox', label: 'SOX (Financial)', score: 9, risk: 'critical' },
      { value: 'pci', label: 'PCI-DSS (Payment Processing)', score: 8, risk: 'high' },
      { value: 'gdpr', label: 'GDPR (EU Privacy)', score: 7, risk: 'high' },
      { value: 'basic', label: 'Basic industry standards', score: 5, risk: 'medium' },
      { value: 'none', label: 'No specific compliance requirements', score: 2, risk: 'low' }
    ]
  },
  {
    id: 'timeline',
    question: 'When do you plan to address quantum security threats?',
    category: 'timeline',
    options: [
      { value: 'already_breached', label: 'We\'ve already had security incidents', score: 10, risk: 'critical' },
      { value: 'immediate', label: 'Immediately (within 3 months)', score: 2, risk: 'low' },
      { value: 'short_term', label: 'Within the next year', score: 4, risk: 'medium' },
      { value: 'medium_term', label: 'Within 2-3 years', score: 6, risk: 'medium' },
      { value: 'long_term', label: 'Eventually (3+ years)', score: 8, risk: 'high' },
      { value: 'no_plans', label: 'No current plans', score: 10, risk: 'critical' }
    ]
  }
];

const getAssessmentResult = (totalScore: number, answers: Record<string, string>): AssessmentResult => {
  const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);
  const percentage = (totalScore / maxScore) * 100;

  if (percentage >= 80) {
    return {
      score: percentage,
      level: 'critical',
      title: 'Critical Quantum Vulnerability',
      description: 'Your organization faces immediate and severe quantum security risks. Action is required now.',
      recommendations: [
        'Implement post-quantum cryptography immediately',
        'Audit all existing encrypted data and systems',
        'Develop quantum security migration plan',
        'Consider QubitCore Aegis for healthcare data or Shield for general protection',
        'Establish quantum security governance and policies'
      ],
      platforms: ['shield', 'ledger', 'synapse', 'aegis'],
      urgency: 'Immediate action required - your data is at risk today'
    };
  } else if (percentage >= 60) {
    return {
      score: percentage,
      level: 'high',
      title: 'High Quantum Risk',
      description: 'Significant quantum security gaps exist. You should prioritize quantum readiness planning.',
      recommendations: [
        'Begin post-quantum cryptography evaluation',
        'Inventory sensitive data and encryption usage',
        'Start with QubitCore Shield for API security',
        'Plan quantum security roadmap for next 12 months',
        'Train security team on quantum threats'
      ],
      platforms: ['shield', 'ledger'],
      urgency: 'Action needed within 6 months'
    };
  } else if (percentage >= 40) {
    return {
      score: percentage,
      level: 'medium',
      title: 'Moderate Quantum Exposure',
      description: 'Some quantum security concerns exist. You have time to plan but should start preparing.',
      recommendations: [
        'Educate leadership on quantum threats',
        'Evaluate current encryption standards',
        'Consider QubitCore Shield for new projects',
        'Monitor quantum computing developments',
        'Include quantum security in long-term planning'
      ],
      platforms: ['shield'],
      urgency: 'Plan for action within 12-18 months'
    };
  } else {
    return {
      score: percentage,
      level: 'low',
      title: 'Low Quantum Risk',
      description: 'Your quantum security risk is currently manageable, but staying informed is important.',
      recommendations: [
        'Stay informed about quantum computing progress',
        'Monitor industry quantum security standards',
        'Consider quantum-safe practices for new systems',
        'Review security posture annually',
        'Explore QubitCore solutions for future-proofing'
      ],
      platforms: [],
      urgency: 'Monitor and plan for 2-3 year timeline'
    };
  }
};

interface QuantumReadinessCheckProps {
  onComplete?: (score: number, recommendations: string[]) => void;
}

export function QuantumReadinessCheck({ onComplete }: QuantumReadinessCheckProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate results
      const totalScore = questions.reduce((sum, question) => {
        const answer = answers[question.id];
        const option = question.options.find(opt => opt.value === answer);
        return sum + (option?.score || 0);
      }, 0);

      const assessmentResult = getAssessmentResult(totalScore, answers);
      setResult(assessmentResult);
      setShowResults(true);
      onComplete?.(assessmentResult.score, assessmentResult.recommendations);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const canProceed = answers[currentQuestion?.id];

  if (showResults && result) {
    return (
      <div className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
                  ${result.level === 'critical' ? 'bg-red-100' : ''}
                  ${result.level === 'high' ? 'bg-orange-100' : ''}
                  ${result.level === 'medium' ? 'bg-yellow-100' : ''}
                  ${result.level === 'low' ? 'bg-green-100' : ''}
                `}>
                  {result.level === 'critical' && <XCircle className="w-10 h-10 text-red-600" />}
                  {result.level === 'high' && <AlertTriangle className="w-10 h-10 text-orange-600" />}
                  {result.level === 'medium' && <Clock className="w-10 h-10 text-yellow-600" />}
                  {result.level === 'low' && <CheckCircle className="w-10 h-10 text-green-600" />}
                </div>

                <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                  {result.title}
                </CardTitle>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <Badge className={`
                    text-sm px-4 py-2
                    ${result.level === 'critical' ? 'bg-red-600' : ''}
                    ${result.level === 'high' ? 'bg-orange-600' : ''}
                    ${result.level === 'medium' ? 'bg-yellow-600' : ''}
                    ${result.level === 'low' ? 'bg-green-600' : ''}
                  `}>
                    Risk Score: {Math.round(result.score)}%
                  </Badge>
                  
                  <Badge variant="outline" className="text-sm px-4 py-2">
                    <Target className="w-4 h-4 mr-2" />
                    {result.level.toUpperCase()} PRIORITY
                  </Badge>
                </div>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {result.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Urgency Alert */}
                <Alert className={`
                  ${result.level === 'critical' ? 'border-red-500 bg-red-50' : ''}
                  ${result.level === 'high' ? 'border-orange-500 bg-orange-50' : ''}
                  ${result.level === 'medium' ? 'border-yellow-500 bg-yellow-50' : ''}
                  ${result.level === 'low' ? 'border-green-500 bg-green-50' : ''}
                `}>
                  <Zap className={`
                    h-5 w-5
                    ${result.level === 'critical' ? 'text-red-600' : ''}
                    ${result.level === 'high' ? 'text-orange-600' : ''}
                    ${result.level === 'medium' ? 'text-yellow-600' : ''}
                    ${result.level === 'low' ? 'text-green-600' : ''}
                  `} />
                  <AlertDescription className="text-lg font-semibold">
                    {result.urgency}
                  </AlertDescription>
                </Alert>

                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Recommended Actions
                  </h3>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-slate-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Platforms */}
                {result.platforms.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Recommended QubitCore Platforms
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.platforms.map((platformId) => {
                        const platformInfo = {
                          shield: { name: 'Shield', desc: 'Quantum-safe APIs for developers', color: 'blue' },
                          ledger: { name: 'Ledger', desc: 'Immutable transaction witnessing', color: 'green' },
                          synapse: { name: 'Synapse', desc: 'Secure federated learning', color: 'purple' },
                          aegis: { name: 'Aegis', desc: 'Healthcare data protection', color: 'red' }
                        }[platformId];

                        return (
                          <Card key={platformId} className="border-slate-200">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className={`
                                  w-10 h-10 rounded-lg flex items-center justify-center
                                  ${platformInfo?.color === 'blue' ? 'bg-blue-100' : ''}
                                  ${platformInfo?.color === 'green' ? 'bg-green-100' : ''}
                                  ${platformInfo?.color === 'purple' ? 'bg-purple-100' : ''}
                                  ${platformInfo?.color === 'red' ? 'bg-red-100' : ''}
                                `}>
                                  <Shield className={`
                                    w-5 h-5
                                    ${platformInfo?.color === 'blue' ? 'text-blue-600' : ''}
                                    ${platformInfo?.color === 'green' ? 'text-green-600' : ''}
                                    ${platformInfo?.color === 'purple' ? 'text-purple-600' : ''}
                                    ${platformInfo?.color === 'red' ? 'text-red-600' : ''}
                                  `} />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900">{platformInfo?.name}</h4>
                                  <p className="text-sm text-slate-600">{platformInfo?.desc}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                    Get Started with QubitCore
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleRestart} className="flex-1">
                    Retake Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                Quantum Readiness Assessment
              </CardTitle>
              <p className="text-lg text-slate-600 mb-6">
                Discover your organization's quantum security risk level and get personalized recommendations.
              </p>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {currentQuestion.question}
                    </h3>

                    <RadioGroup
                      value={answers[currentQuestion.id] || ''}
                      onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-900">{option.label}</span>
                              <Badge 
                                variant={option.risk === 'critical' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {option.risk} risk
                              </Badge>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}