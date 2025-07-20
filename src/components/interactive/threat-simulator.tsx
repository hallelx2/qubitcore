"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Shield, 
  Clock,
  Database,
  Unlock,
  Lock,
  TrendingUp,
  Calendar,
  DollarSign,
  Heart,
  Brain,
  Building
} from 'lucide-react';

interface ThreatScenario {
  id: string;
  name: string;
  description: string;
  industry: 'healthcare' | 'finance' | 'ai' | 'general';
  dataType: string;
  currentEncryption: string;
  vulnerabilityLevel: 'low' | 'medium' | 'high' | 'critical';
  timeToBreak: string;
  impactDescription: string;
  realWorldExample: string;
  icon: React.ReactNode;
  color: string;
}

interface SimulationState {
  currentYear: number;
  quantumProgress: number;
  dataHarvested: number;
  encryptionsBroken: number;
  organizationsAffected: number;
  isPlaying: boolean;
  selectedScenario: ThreatScenario;
}

const threatScenarios: ThreatScenario[] = [
  {
    id: 'healthcare-records',
    name: 'Patient Health Records',
    description: 'Genetic data, mental health records, and chronic conditions encrypted today',
    industry: 'healthcare',
    dataType: 'Personal Health Information (PHI)',
    currentEncryption: 'AES-256 with RSA-2048 key exchange',
    vulnerabilityLevel: 'critical',
    timeToBreak: '2029-2032',
    impactDescription: 'Lifetime medical privacy compromised, genetic discrimination, insurance fraud',
    realWorldExample: 'Anthem breach (2015) exposed 78M records - imagine if that data was harvested and decrypted in 2030',
    icon: <Heart className="w-6 h-6" />,
    color: 'red'
  },
  {
    id: 'financial-transactions',
    name: 'Financial Transaction History',
    description: 'Banking records, investment portfolios, and payment histories',
    industry: 'finance',
    dataType: 'Financial Records & Transaction Data',
    currentEncryption: 'RSA-2048 signatures, ECDSA certificates',
    vulnerabilityLevel: 'critical',
    timeToBreak: '2028-2030',
    impactDescription: 'Complete financial history exposed, identity theft, market manipulation',
    realWorldExample: 'Equifax breach (2017) affected 147M people - quantum decryption would expose decades of financial behavior',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'green'
  },
  {
    id: 'ai-models',
    name: 'AI Training Data & Models',
    description: 'Proprietary AI models, training datasets, and algorithmic secrets',
    industry: 'ai',
    dataType: 'Intellectual Property & AI Models',
    currentEncryption: 'Standard TLS with RSA/ECDSA',
    vulnerabilityLevel: 'high',
    timeToBreak: '2027-2029',
    impactDescription: 'AI model theft, competitive advantage lost, training data exposed',
    realWorldExample: 'OpenAI\'s GPT models represent billions in R&D - quantum attacks could steal years of AI research',
    icon: <Brain className="w-6 h-6" />,
    color: 'purple'
  },
  {
    id: 'government-communications',
    name: 'Government Communications',
    description: 'Classified documents, diplomatic cables, and state secrets',
    industry: 'general',
    dataType: 'Classified Government Information',
    currentEncryption: 'Suite B cryptography (RSA, ECDSA, AES)',
    vulnerabilityLevel: 'critical',
    timeToBreak: '2026-2028',
    impactDescription: 'National security compromised, diplomatic relations damaged, state secrets exposed',
    realWorldExample: 'WikiLeaks cables (2010) - imagine if adversaries could decrypt 20 years of diplomatic communications',
    icon: <Building className="w-6 h-6" />,
    color: 'blue'
  }
];

interface ThreatSimulatorProps {
  threatType?: 'harvest-now' | 'quantum-break' | 'data-exposure';
  userIndustry?: 'healthcare' | 'finance' | 'ai' | 'general';
}

export function ThreatSimulator({ 
  threatType = 'harvest-now', 
  userIndustry = 'general' 
}: ThreatSimulatorProps) {
  const [simulation, setSimulation] = useState<SimulationState>({
    currentYear: 2024,
    quantumProgress: 5,
    dataHarvested: 0,
    encryptionsBroken: 0,
    organizationsAffected: 0,
    isPlaying: false,
    selectedScenario: threatScenarios.find(s => s.industry === userIndustry) || threatScenarios[0]
  });

  // Auto-advance simulation when playing
  useEffect(() => {
    if (!simulation.isPlaying) return;

    const timer = setInterval(() => {
      setSimulation(prev => {
        const newYear = prev.currentYear + 0.1;
        const yearProgress = (newYear - 2024) / 6; // 6 years from 2024 to 2030
        const newQuantumProgress = Math.min(yearProgress * 100, 100);
        
        // Calculate threat metrics based on year
        const dataHarvestRate = Math.floor(newYear - 2024) * 15; // 15% per year
        const breakingPoint = newYear >= 2028 ? Math.floor((newYear - 2028) * 25) : 0;
        const orgImpact = Math.floor(yearProgress * 1000);

        if (newYear >= 2030) {
          return {
            ...prev,
            currentYear: 2030,
            quantumProgress: 100,
            dataHarvested: 90,
            encryptionsBroken: 100,
            organizationsAffected: 1000,
            isPlaying: false
          };
        }

        return {
          ...prev,
          currentYear: newYear,
          quantumProgress: newQuantumProgress,
          dataHarvested: Math.min(dataHarvestRate, 90),
          encryptionsBroken: breakingPoint,
          organizationsAffected: orgImpact
        };
      });
    }, 200);

    return () => clearInterval(timer);
  }, [simulation.isPlaying]);

  const handlePlayPause = () => {
    setSimulation(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleReset = () => {
    setSimulation(prev => ({
      ...prev,
      currentYear: 2024,
      quantumProgress: 5,
      dataHarvested: 0,
      encryptionsBroken: 0,
      organizationsAffected: 0,
      isPlaying: false
    }));
  };

  const handleScenarioChange = (scenario: ThreatScenario) => {
    setSimulation(prev => ({ ...prev, selectedScenario: scenario }));
  };

  const getCurrentThreatLevel = () => {
    if (simulation.currentYear < 2026) return 'low';
    if (simulation.currentYear < 2028) return 'medium';
    if (simulation.currentYear < 2029) return 'high';
    return 'critical';
  };

  return (
    <div className="py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="destructive" className="mb-4 text-sm px-4 py-2">
            <AlertTriangle className="w-4 h-4 mr-2" />
            THREAT SIMULATION
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Quantum Threat Timeline
          </h2>
          
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Watch how the quantum threat unfolds over the next decade. 
            See your data's vulnerability window and understand why action is needed today.
          </p>
        </motion.div>

        {/* Simulation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">Quantum Threat Simulator</CardTitle>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePlayPause}
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    {simulation.isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {simulation.isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>2024 (Today)</span>
                  <span>Current: {Math.floor(simulation.currentYear)}</span>
                  <span>2030 (Quantum Era)</span>
                </div>
                <Progress value={simulation.quantumProgress} className="h-3" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-400">{simulation.dataHarvested}%</div>
                    <div className="text-xs text-slate-400">Data Harvested</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{simulation.encryptionsBroken}%</div>
                    <div className="text-xs text-slate-400">Encryptions Broken</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{simulation.organizationsAffected}</div>
                    <div className="text-xs text-slate-400">Organizations Affected</div>
                  </div>
                  <div>
                    <div className={`
                      text-2xl font-bold
                      ${getCurrentThreatLevel() === 'low' ? 'text-green-400' : ''}
                      ${getCurrentThreatLevel() === 'medium' ? 'text-yellow-400' : ''}
                      ${getCurrentThreatLevel() === 'high' ? 'text-orange-400' : ''}
                      ${getCurrentThreatLevel() === 'critical' ? 'text-red-400' : ''}
                    `}>
                      {getCurrentThreatLevel().toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">Threat Level</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white">Choose Your Threat Scenario</CardTitle>
              <p className="text-slate-300">Select an industry to see specific quantum threats</p>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {threatScenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleScenarioChange(scenario)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${simulation.selectedScenario.id === scenario.id 
                        ? 'border-blue-500 bg-blue-500/20' 
                        : 'border-slate-600 hover:border-slate-500'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`
                        p-2 rounded-lg
                        ${scenario.color === 'red' ? 'bg-red-500/20 text-red-400' : ''}
                        ${scenario.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                        ${scenario.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                        ${scenario.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                      `}>
                        {scenario.icon}
                      </div>
                      <Badge className={`
                        ${scenario.vulnerabilityLevel === 'critical' ? 'bg-red-600' : ''}
                        ${scenario.vulnerabilityLevel === 'high' ? 'bg-orange-600' : ''}
                        ${scenario.vulnerabilityLevel === 'medium' ? 'bg-yellow-600' : ''}
                        ${scenario.vulnerabilityLevel === 'low' ? 'bg-green-600' : ''}
                      `}>
                        {scenario.vulnerabilityLevel}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2">{scenario.name}</h3>
                    <p className="text-sm text-slate-300 mb-3">{scenario.description}</p>
                    
                    <div className="text-xs text-slate-400">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        Vulnerable: {scenario.timeToBreak}
                      </div>
                      <div className="flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        {scenario.dataType}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current State Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current State */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Current State ({Math.floor(simulation.currentYear)})
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Alert className="border-orange-500 bg-orange-500/20">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <AlertDescription className="text-orange-100">
                    <strong>Active Threat:</strong> Data harvesting and quantum capability building
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Your Data Status:</span>
                    <div className="flex items-center gap-2">
                      {simulation.encryptionsBroken > 0 ? (
                        <Unlock className="w-4 h-4 text-red-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-green-400" />
                      )}
                      <span className={`font-semibold ${
                        simulation.encryptionsBroken > 0 ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {simulation.encryptionsBroken > 0 ? 'COMPROMISED' : 'PROTECTED'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Encryption Standard:</span>
                    <span className="text-white text-sm">{simulation.selectedScenario.currentEncryption}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Impact */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Scenario Impact
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">{simulation.selectedScenario.name}</h4>
                  <p className="text-slate-300 text-sm mb-3">{simulation.selectedScenario.impactDescription}</p>
                </div>
                
                <Alert className="border-red-500 bg-red-500/20">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-100 text-sm">
                    <strong>Real-World Context:</strong> {simulation.selectedScenario.realWorldExample}
                  </AlertDescription>
                </Alert>
                
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Vulnerability Window:</span>
                    <span className="text-red-400 font-semibold">{simulation.selectedScenario.timeToBreak}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Don't Wait for the Quantum Apocalypse
              </h3>
              <p className="text-xl text-blue-100 mb-6">
                Start protecting your data today with QubitCore's quantum-safe security solutions.
                Your future self will thank you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Get Quantum-Safe Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Learn More About PQC
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}