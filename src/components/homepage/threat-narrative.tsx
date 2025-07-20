"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, Clock, Zap } from 'lucide-react';

interface ThreatNarrativeProps {
  showAnimation?: boolean;
  userIndustry?: 'healthcare' | 'finance' | 'ai' | 'general';
}

const typewriterText = "Your data is already stolen. They're just waiting for the key.";

const industryThreats = {
  healthcare: {
    title: "Patient Data Under Siege",
    description: "Genetic records, mental health histories, and chronic conditions - all encrypted today, all vulnerable tomorrow.",
    icon: "❤️",
    impact: "Lifetime privacy at risk"
  },
  finance: {
    title: "Financial Records in Jeopardy", 
    description: "Transaction histories, credit profiles, and investment strategies - your financial DNA exposed.",
    icon: "💰",
    impact: "Economic identity theft"
  },
  ai: {
    title: "AI Models Compromised",
    description: "Training data, model weights, and proprietary algorithms - your competitive advantage stolen.",
    icon: "🧠", 
    impact: "Intellectual property theft"
  },
  general: {
    title: "Digital Life Exposed",
    description: "Personal communications, business secrets, and private documents - everything you thought was secure.",
    icon: "🔒",
    impact: "Complete privacy loss"
  }
};

export function ThreatNarrative({ showAnimation = true, userIndustry = 'general' }: ThreatNarrativeProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentYear, setCurrentYear] = useState(2024);
  const [quantumProgress, setQuantumProgress] = useState(15);
  const [showThreatDetails, setShowThreatDetails] = useState(false);

  const threat = industryThreats[userIndustry];

  // Typewriter effect
  useEffect(() => {
    if (!showAnimation) {
      setDisplayedText(typewriterText);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index < typewriterText.length) {
        setDisplayedText(typewriterText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowThreatDetails(true), 1000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [showAnimation]);

  // Quantum progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYear(prev => {
        const newYear = prev + 1;
        if (newYear <= 2030) {
          setQuantumProgress(prev => Math.min(prev + 12, 100));
          return newYear;
        }
        return 2024; // Reset
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ 
              x: Math.random() * 1200,
              y: Math.random() * 800,
              opacity: 0
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge variant="destructive" className="mb-4 text-sm px-4 py-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              QUANTUM THREAT ACTIVE
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {displayedText}
              {showAnimation && displayedText.length < typewriterText.length && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
              The quantum revolution isn't coming—it's here. And your encryption is already obsolete.
            </p>
          </motion.div>

          {/* Quantum Progress Timeline */}
          <AnimatePresence>
            {showThreatDetails && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-left">
                        <h3 className="text-2xl font-semibold text-red-400">Quantum Capability Progress</h3>
                        <p className="text-slate-300">Current year: {currentYear}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-red-400">{quantumProgress}%</div>
                        <p className="text-sm text-slate-400">to breaking RSA-2048</p>
                      </div>
                    </div>
                    
                    <Progress value={quantumProgress} className="h-3 mb-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-slate-700/50 rounded">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                        <div className="font-semibold">2024: Data Harvesting</div>
                        <div className="text-slate-400">Adversaries collecting encrypted data</div>
                      </div>
                      <div className="text-center p-3 bg-slate-700/50 rounded">
                        <Zap className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                        <div className="font-semibold">2027-2030: Quantum Advantage</div>
                        <div className="text-slate-400">Practical quantum computers emerge</div>
                      </div>
                      <div className="text-center p-3 bg-slate-700/50 rounded">
                        <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-400" />
                        <div className="font-semibold">2030+: Cryptographic Collapse</div>
                        <div className="text-slate-400">Current encryption becomes useless</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Industry-Specific Threat */}
          <AnimatePresence>
            {showThreatDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <Alert className="bg-red-900/20 border-red-500/50 text-left max-w-4xl mx-auto">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <AlertDescription className="text-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{threat.icon}</span>
                      <span className="font-semibold text-red-300">{threat.title}</span>
                    </div>
                    <p className="text-slate-200 mb-2">{threat.description}</p>
                    <p className="text-red-400 font-semibold">Impact: {threat.impact}</p>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call to Action */}
          <AnimatePresence>
            {showThreatDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Shield className="w-5 h-5 mr-2" />
                  Protect Your Data Now
                </Button>
                <Button variant="outline" size="lg" className="border-slate-400 text-slate-200 hover:bg-slate-800 px-8 py-3">
                  Learn About the Threat
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Harvest Now, Decrypt Later Visualization */}
        <AnimatePresence>
          {showThreatDetails && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The "Harvest Now, Decrypt Later" Attack
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Sophisticated adversaries are already collecting your encrypted data, 
                  waiting patiently for quantum computers to break it open.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Step 1: Harvest */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <Card className="bg-yellow-900/20 border-yellow-500/30 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📡</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-yellow-300">1. Harvest (Today)</h3>
                      <p className="text-slate-300">
                        Adversaries intercept and store your encrypted communications, 
                        files, and sensitive data.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Step 2: Wait */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <Card className="bg-orange-900/20 border-orange-500/30 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⏳</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-orange-300">2. Wait (2024-2030)</h3>
                      <p className="text-slate-300">
                        They patiently wait for quantum computers to become 
                        powerful enough to break current encryption.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Step 3: Decrypt */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <Card className="bg-red-900/20 border-red-500/30 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💥</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-red-300">3. Decrypt (2030+)</h3>
                      <p className="text-slate-300">
                        Quantum computers break the encryption, exposing 
                        years of your most sensitive information.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}