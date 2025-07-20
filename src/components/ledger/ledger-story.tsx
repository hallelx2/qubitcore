'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown,
  Building2,
  CreditCard,
  Banknote,
  Clock,
  Lock,
  Unlock,
  Zap
} from 'lucide-react';
import { Industry } from '@/types/quantum';

interface LedgerStoryProps {
  industry?: Industry;
}

const industryScenarios = {
  banking: {
    title: "The $2B Wire Transfer That Never Happened",
    character: "Sarah Chen, Chief Risk Officer at Global Trust Bank",
    crisis: "A quantum computer broke the cryptographic signatures on a $2 billion international wire transfer, leaving no way to prove the transaction's authenticity.",
    impact: "$2.1B in disputed transactions, 72 hours of system downtime, regulatory investigation",
    color: "blue"
  },
  fintech: {
    title: "The Payment Platform That Lost Trust",
    character: "Marcus Rodriguez, CTO at PayFlow",
    crisis: "Quantum attacks compromised transaction histories, making it impossible to verify millions of micropayments and user balances.",
    impact: "4.2M users affected, $180M in disputed balances, platform shutdown for 5 days",
    color: "purple"
  },
  insurance: {
    title: "The Claims That Couldn't Be Verified",
    character: "Dr. Emily Watson, Head of Digital Claims at SecureLife Insurance",
    crisis: "Quantum computers broke the digital signatures on policy documents and claims, creating chaos in the claims verification process.",
    impact: "$500M in unverifiable claims, 30,000 policies in dispute, regulatory penalties",
    color: "orange"
  }
};

export function LedgerStory({ industry = 'banking' }: LedgerStoryProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quantumProgress, setQuantumProgress] = useState(0);
  
  const scenario = industryScenarios[industry as keyof typeof industryScenarios] || industryScenarios.banking;

  const storySteps = [
    {
      title: "The Perfect Day",
      content: `${scenario.character} starts her morning reviewing yesterday's transactions. Everything looks normal - millions of dollars flowing securely through quantum-resistant channels.`,
      visual: "normal-operations",
      threat: 0
    },
    {
      title: "The Quantum Breakthrough",
      content: "Breaking news: A major tech company announces their quantum computer has achieved cryptographic supremacy. Traditional encryption is now vulnerable.",
      visual: "quantum-breakthrough", 
      threat: 25
    },
    {
      title: "The Attack Begins",
      content: "Within hours, bad actors begin harvesting encrypted financial data. They can't decrypt it yet, but they're collecting everything for future attacks.",
      visual: "data-harvest",
      threat: 60
    },
    {
      title: "The Crisis Unfolds",
      content: scenario.crisis,
      visual: "crisis",
      threat: 100
    },
    {
      title: "The Ledger Solution",
      content: "With QubitCore Ledger, every transaction is witnessed by quantum-resistant cryptography. The immutable proof chain remains unbreakable, even against quantum attacks.",
      visual: "solution",
      threat: 0
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (quantumProgress < storySteps[currentStep].threat) {
        setQuantumProgress(prev => Math.min(prev + 2, storySteps[currentStep].threat));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentStep, quantumProgress, storySteps]);

  const nextStep = () => {
    if (currentStep < storySteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-4 text-green-600 border-green-200">
            <Building2 className="w-4 h-4 mr-2" />
            Financial Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            The Trust Keeper's Tale
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            When quantum computers break traditional cryptography, how do you prove a $2 billion transaction really happened? 
            Meet the immutable ledger that quantum computers can't touch.
          </p>
        </motion.div>
      </div>

      {/* Industry Selection */}
      <div className="mb-12">
        <Tabs defaultValue={industry} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <Banknote className="w-4 h-4" />
              Banking
            </TabsTrigger>
            <TabsTrigger value="fintech" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Fintech
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Insurance
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Story Timeline */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Story Content */}
        <div className="space-y-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                <Badge variant={quantumProgress > 50 ? "destructive" : "secondary"}>
                  Step {currentStep + 1} of {storySteps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: isAnimating ? 20 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-green-700">
                    {storySteps[currentStep].title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {storySteps[currentStep].content}
                  </p>
                  
                  {/* Threat Level Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quantum Threat Level</span>
                      <span className="text-sm text-gray-500">{quantumProgress}%</span>
                    </div>
                    <Progress 
                      value={quantumProgress} 
                      className={`h-2 ${quantumProgress > 75 ? 'bg-red-100' : quantumProgress > 50 ? 'bg-yellow-100' : 'bg-green-100'}`}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={nextStep}
                      disabled={currentStep === storySteps.length - 1}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {currentStep === storySteps.length - 1 ? 'Complete' : 'Next'}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    Crisis Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-800 font-medium">{scenario.impact}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Visual Representation */}
        <div className="space-y-6">
          <BlockchainVisualization 
            step={currentStep} 
            threatLevel={quantumProgress}
            scenario={scenario}
          />
          
          {/* Quantum Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Quantum Threat Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">2024: Traditional encryption secure</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">2025-2030: Quantum computers emerging</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">2030+: Cryptographic apocalypse</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Today: QubitCore Ledger protection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      {currentStep === storySteps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="border-green-200 bg-green-50 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Your Transactions Are Safe</h3>
              <p className="text-gray-700 mb-6">
                With QubitCore Ledger, every transaction is protected by quantum-resistant cryptography. 
                Even when quantum computers break traditional encryption, your financial records remain secure and verifiable.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Try Ledger Demo
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// Blockchain Visualization Component
function BlockchainVisualization({ 
  step, 
  threatLevel, 
  scenario 
}: { 
  step: number; 
  threatLevel: number;
  scenario: any;
}) {
  const blocks = [
    { id: 1, hash: "0x1a2b3c", status: "secure", amount: "$1.2M" },
    { id: 2, hash: "0x4d5e6f", status: "secure", amount: "$850K" },
    { id: 3, hash: "0x7g8h9i", status: "secure", amount: "$2.1B" },
    { id: 4, hash: "0xj1k2l3", status: "secure", amount: "$650K" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Transaction Integrity Chain
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${
                step >= 3 && threatLevel > 75 && index === 2
                  ? 'border-red-300 bg-red-50'
                  : step >= 4
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step >= 3 && threatLevel > 75 && index === 2 ? (
                    <Unlock className="w-5 h-5 text-red-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-green-500" />
                  )}
                  <div>
                    <div className="font-mono text-sm">{block.hash}</div>
                    <div className="text-xs text-gray-500">Block #{block.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{block.amount}</div>
                  <div className={`text-xs ${
                    step >= 3 && threatLevel > 75 && index === 2
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}>
                    {step >= 3 && threatLevel > 75 && index === 2 ? 'Compromised' : 'Verified'}
                  </div>
                </div>
              </div>
              
              {step >= 4 && index === 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-green-200"
                >
                  <div className="flex items-center gap-2 text-green-700">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">Quantum-Resistant Protection Active</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}