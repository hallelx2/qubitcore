"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Building,
  Database,
  Globe,
  Brain,
  Target,
  TrendingUp,
  BarChart3,
  FileText,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  Share
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  category: 'infrastructure' | 'data' | 'compliance' | 'timeline' | 'industry';
  question: string;
  description: string;
  options: AssessmentOption[];
  weight: number;
}

interface AssessmentOption {
  id: string;
  text: string;
  value: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
}

interface AssessmentResult {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timeToQuantumThreat: number;
  estimatedMigrationTime: string;
  budgetEstimate: string;
  recommendationCount: number;
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'current_encryption',
    category: 'infrastructure',
    question: 'What encryption algorithms does your organization currently use?',
    description: 'This helps us understand your current cryptographic posture and quantum vulnerability.',
    weight: 10,
    options: [
      {
        id: 'rsa_2048',
        text: 'RSA-2048 or lower',
        value: 10,
        riskLevel: 'critical',
        explanation: 'Highly vulnerable to quantum attacks. Immediate action required.'
      },
      {
        id: 'rsa_4096',
        text: 'RSA-4096',
        value: 25,
        riskLevel: 'high',
        explanation: 'Still vulnerable to quantum attacks, but with slightly more time.'
      },
      {
        id: 'post_quantum',
        text: 'Already using post-quantum cryptography',
        value: 90,
        riskLevel: 'low',
        explanation: 'Excellent! You\'re ahead of the curve.'
      },
      {
        id: 'unknown',
        text: 'Not sure / Need to investigate',
        value: 5,
        riskLevel: 'critical',
        explanation: 'Lack of visibility is a critical security risk.'
      }
    ]
  },
  {
    id: 'data_sensitivity',
    category: 'data',
    question: 'What types of sensitive data does your organization handle?',
    description: 'Different data types have different quantum threat timelines and regulatory requirements.',
    weight: 8,
    options: [
      {
        id: 'financial',
        text: 'Financial data (banking, payments, trading)',
        value: 20,
        riskLevel: 'high',
        explanation: 'Financial data is a high-value target for quantum attacks.'
      },
      {
        id: 'healthcare',
        text: 'Healthcare/medical records (PHI)',
        value: 15,
        riskLevel: 'high',
        explanation: 'PHI requires lifetime protection and HIPAA compliance.'
      },
      {
        id: 'government',
        text: 'Government/classified information',
        value: 10,
        riskLevel: 'critical',
        explanation: 'National security implications require immediate action.'
      },
      {
        id: 'public',
        text: 'Mostly public or low-sensitivity data',
        value: 70,
        riskLevel: 'low',
        explanation: 'Lower risk, but still need to consider infrastructure protection.'
      }
    ]
  },
  {
    id: 'data_retention',
    category: 'data',
    question: 'How long does your organization need to keep data secure?',
    description: 'Data that needs long-term protection is at higher risk from future quantum computers.',
    weight: 9,
    options: [
      {
        id: 'short_term',
        text: 'Less than 1 year',
        value: 80,
        riskLevel: 'low',
        explanation: 'Short-term data has lower quantum risk exposure.'
      },
      {
        id: 'medium_term',
        text: '1-5 years',
        value: 60,
        riskLevel: 'medium',
        explanation: 'Medium-term data may be at risk when quantum computers arrive.'
      },
      {
        id: 'long_term',
        text: '5-10 years',
        value: 30,
        riskLevel: 'high',
        explanation: 'Long-term data is at significant risk from quantum computers.'
      },
      {
        id: 'lifetime',
        text: 'Lifetime/permanent (e.g., medical records)',
        value: 10,
        riskLevel: 'critical',
        explanation: 'Lifetime data must be protected with quantum-safe encryption now.'
      }
    ]
  },
  {
    id: 'industry_sector',
    category: 'industry',
    question: 'Which industry sector best describes your organization?',
    description: 'Different industries face varying levels of quantum threat urgency.',
    weight: 6,
    options: [
      {
        id: 'financial_services',
        text: 'Financial Services (Banking, Insurance, FinTech)',
        value: 20,
        riskLevel: 'high',
        explanation: 'High-value targets with strict regulatory requirements.'
      },
      {
        id: 'healthcare',
        text: 'Healthcare (Hospitals, Pharma, Medical Devices)',
        value: 25,
        riskLevel: 'high',
        explanation: 'Long data retention requirements and patient safety concerns.'
      },
      {
        id: 'government',
        text: 'Government/Defense',
        value: 10,
        riskLevel: 'critical',
        explanation: 'National security implications require immediate quantum-safe migration.'
      },
      {
        id: 'technology',
        text: 'Technology (Software, Cloud, Telecommunications)',
        value: 35,
        riskLevel: 'medium',
        explanation: 'Infrastructure providers need to protect customer data.'
      },
      {
        id: 'other',
        text: 'Other',
        value: 40,
        riskLevel: 'medium',
        explanation: 'General quantum readiness assessment applies.'
      }
    ]
  },
  {
    id: 'infrastructure_scale',
    category: 'infrastructure',
    question: 'What is the scale of your IT infrastructure?',
    description: 'Larger infrastructures require more complex migration planning.',
    weight: 5,
    options: [
      {
        id: 'small',
        text: 'Small (1-50 systems/applications)',
        value: 70,
        riskLevel: 'low',
        explanation: 'Smaller scale allows for faster migration to quantum-safe systems.'
      },
      {
        id: 'medium',
        text: 'Medium (50-500 systems/applications)',
        value: 50,
        riskLevel: 'medium',
        explanation: 'Medium scale requires structured migration planning.'
      },
      {
        id: 'large',
        text: 'Large (500-5000 systems/applications)',
        value: 30,
        riskLevel: 'high',
        explanation: 'Large scale requires extensive planning and phased migration.'
      },
      {
        id: 'enterprise',
        text: 'Enterprise (5000+ systems/applications)',
        value: 20,
        riskLevel: 'high',
        explanation: 'Enterprise scale requires multi-year migration programs.'
      }
    ]
  }
];

export function QuantumReadinessAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentQ = assessmentQuestions[currentQuestion];

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = async () => {
    setIsCalculating(true);
    
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const assessmentResult = calculateQuantumReadiness(answers);
    setResult(assessmentResult);
    setIsComplete(true);
    setIsCalculating(false);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setResult(null);
    setIsCalculating(false);
  };

  const calculateQuantumReadiness = (answers: Record<string, string>): AssessmentResult => {
    let totalScore = 0;
    let maxScore = 0;

    // Calculate weighted scores
    assessmentQuestions.forEach(question => {
      const answerId = answers[question.id];
      if (answerId) {
        const selectedOption = question.options.find(opt => opt.id === answerId);
        if (selectedOption) {
          totalScore += selectedOption.value * question.weight;
        }
      }
      maxScore += 100 * question.weight;
    });

    const overallScore = (totalScore / maxScore) * 100;
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (overallScore >= 70) riskLevel = 'low';
    else if (overallScore >= 50) riskLevel = 'medium';
    else if (overallScore >= 30) riskLevel = 'high';
    else riskLevel = 'critical';

    // Calculate other metrics
    const timeToQuantumThreat = calculateQuantumThreatTimeline(answers);
    const estimatedMigrationTime = estimateMigrationTime(answers);
    const budgetEstimate = estimateBudget(answers);

    return {
      overallScore,
      riskLevel,
      timeToQuantumThreat,
      estimatedMigrationTime,
      budgetEstimate,
      recommendationCount: riskLevel === 'critical' ? 8 : riskLevel === 'high' ? 6 : 4
    };
  };

  const calculateQuantumThreatTimeline = (answers: Record<string, string>): number => {
    let yearsToThreat = 5; // Base: 2029
    
    const industryAnswer = answers.industry_sector;
    const dataAnswer = answers.data_sensitivity;
    
    if (industryAnswer === 'government' || dataAnswer === 'government') {
      yearsToThreat = 3;
    } else if (industryAnswer === 'financial_services' || dataAnswer === 'financial') {
      yearsToThreat = 4;
    }
    
    return yearsToThreat;
  };

  const estimateMigrationTime = (answers: Record<string, string>): string => {
    const scaleAnswer = answers.infrastructure_scale;
    
    if (scaleAnswer === 'small') return '6-12 months';
    else if (scaleAnswer === 'enterprise') return '3-5 years';
    else return '1-2 years';
  };

  const estimateBudget = (answers: Record<string, string>): string => {
    const scaleAnswer = answers.infrastructure_scale;
    
    switch (scaleAnswer) {
      case 'small': return '$50K - $200K';
      case 'medium': return '$200K - $1M';
      case 'large': return '$1M - $5M';
      case 'enterprise': return '$5M - $20M+';
      default: return '$100K - $500K';
    }
  };  if
 (isCalculating) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Calculating Your Quantum Readiness
              </h2>
              <p className="text-slate-600 mb-6">
                Analyzing your responses and generating personalized recommendations...
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <p>✓ Assessing cryptographic vulnerabilities</p>
                <p>✓ Evaluating data protection requirements</p>
                <p>✓ Calculating quantum threat timeline</p>
                <p>✓ Generating migration roadmap</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isComplete && result) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              QUANTUM READINESS ASSESSMENT
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Your Quantum Readiness Score
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-6xl font-bold text-blue-600">
                {Math.round(result.overallScore)}
              </div>
              <div className="text-left">
                <div className="text-2xl font-semibold text-slate-900">/ 100</div>
                <Badge className={`
                  ${result.riskLevel === 'critical' ? 'bg-red-600' : ''}
                  ${result.riskLevel === 'high' ? 'bg-orange-600' : ''}
                  ${result.riskLevel === 'medium' ? 'bg-yellow-600' : ''}
                  ${result.riskLevel === 'low' ? 'bg-green-600' : ''}
                `}>
                  {result.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Based on your responses, here's your personalized quantum readiness assessment 
              and actionable recommendations to protect your organization.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-4 text-orange-600" />
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {result.timeToQuantumThreat} years
                </div>
                <p className="text-sm text-slate-600">Until quantum threat</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {result.estimatedMigrationTime}
                </div>
                <p className="text-sm text-slate-600">Migration timeline</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-4 text-green-600" />
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {result.budgetEstimate}
                </div>
                <p className="text-sm text-slate-600">Estimated budget</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 mx-auto mb-4 text-purple-600" />
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  {result.recommendationCount}
                </div>
                <p className="text-sm text-slate-600">Recommendations</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Full Report
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Share Results
            </Button>
            <Button size="lg" variant="outline" onClick={resetAssessment} className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Retake Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            QUANTUM READINESS ASSESSMENT
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            How Quantum-Ready Is Your Organization?
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Take our comprehensive assessment to understand your quantum vulnerability 
            and get a personalized roadmap to quantum-safe security.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  {currentQ.category === 'infrastructure' && <Building className="w-6 h-6 text-blue-600" />}
                  {currentQ.category === 'data' && <Database className="w-6 h-6 text-blue-600" />}
                  {currentQ.category === 'compliance' && <Shield className="w-6 h-6 text-blue-600" />}
                  {currentQ.category === 'timeline' && <Clock className="w-6 h-6 text-blue-600" />}
                  {currentQ.category === 'industry' && <Globe className="w-6 h-6 text-blue-600" />}
                </div>
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {currentQ.category.toUpperCase()}
                  </Badge>
                  <CardTitle className="text-2xl">{currentQ.question}</CardTitle>
                </div>
              </div>
              <p className="text-slate-600">{currentQ.description}</p>
            </CardHeader>
            
            <CardContent>
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-4"
              >
                {currentQ.options.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900">{option.text}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ml-2 ${
                            option.riskLevel === 'critical' ? 'border-red-500 text-red-600' :
                            option.riskLevel === 'high' ? 'border-orange-500 text-orange-600' :
                            option.riskLevel === 'medium' ? 'border-yellow-500 text-yellow-600' :
                            'border-green-500 text-green-600'
                          }`}
                        >
                          {option.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{option.explanation}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mt-8"
        >
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="text-sm text-slate-500">
            {assessmentQuestions.length - currentQuestion - 1} questions remaining
          </div>
          
          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className="flex items-center gap-2"
          >
            {currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}