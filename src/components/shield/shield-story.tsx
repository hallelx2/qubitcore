"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  User, 
  Code, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  Lock,
  Unlock
} from 'lucide-react';

interface DeveloperPersona {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  background: string;
  challenges: string[];
  goals: string[];
}

interface StoryChapter {
  id: string;
  title: string;
  description: string;
  timeline: string;
  threat: string;
  solution: string;
  outcome: string;
  codeExample?: {
    before: string;
    after: string;
    language: string;
  };
}

const developerPersonas: DeveloperPersona[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Senior Full-Stack Developer',
    company: 'HealthTech Startup',
    avatar: '👩‍💻',
    background: 'Building a patient portal that handles sensitive medical records',
    challenges: [
      'Ensuring HIPAA compliance with encryption',
      'Managing API security for mobile apps',
      'Protecting patient data for decades'
    ],
    goals: [
      'Implement quantum-safe encryption',
      'Simplify security implementation',
      'Future-proof the application'
    ]
  },
  {
    id: 'marcus',
    name: 'Marcus Rodriguez',
    role: 'DevOps Engineer',
    company: 'FinTech Scale-up',
    avatar: '👨‍💻',
    background: 'Securing microservices handling financial transactions',
    challenges: [
      'Securing inter-service communication',
      'Managing encryption keys at scale',
      'Meeting compliance requirements'
    ],
    goals: [
      'Automate security implementation',
      'Reduce security complexity',
      'Ensure regulatory compliance'
    ]
  },
  {
    id: 'alex',
    name: 'Alex Kim',
    role: 'Lead Software Engineer',
    company: 'Enterprise SaaS',
    avatar: '🧑‍💻',
    background: 'Modernizing legacy systems with quantum-safe security',
    challenges: [
      'Migrating from legacy encryption',
      'Maintaining backward compatibility',
      'Training team on new standards'
    ],
    goals: [
      'Gradual migration to quantum-safe',
      'Minimal disruption to existing systems',
      'Clear implementation roadmap'
    ]
  }
];

const storyChapters: StoryChapter[] = [
  {
    id: 'present',
    title: 'The Present: Building with Confidence',
    description: 'Sarah is developing a patient portal, confident in her RSA-2048 encryption.',
    timeline: '2024',
    threat: 'Unknown quantum vulnerability',
    solution: 'Standard encryption practices',
    outcome: 'Application launches successfully',
    codeExample: {
      before: `// Traditional RSA encryption
const crypto = require('crypto');

function encryptData(data, publicKey) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data));
}

// This will be broken by quantum computers`,
      after: `// Quantum-safe with QubitCore Shield
const { Shield } = require('@qubitcore/shield');

async function encryptData(data) {
  const response = await Shield.encrypt({
    data: data,
    algorithm: 'CRYSTALS-Kyber'
  });
  return response.ciphertext;
}

// Quantum-resistant for decades`,
      language: 'javascript'
    }
  },
  {
    id: 'threat_emerges',
    title: 'The Threat Emerges: 2027',
    description: 'Quantum computers achieve breakthrough. Sarah realizes her encryption is vulnerable.',
    timeline: '2027',
    threat: 'Quantum computers can break RSA-2048',
    solution: 'Urgent migration needed',
    outcome: 'Panic and rushed implementation',
    codeExample: {
      before: `// Vulnerable patient data
{
  "patientId": "12345",
  "diagnosis": "encrypted_with_rsa_2048",
  "treatment": "quantum_vulnerable_data",
  "status": "COMPROMISED"
}`,
      after: `// Protected with Shield
{
  "patientId": "12345", 
  "diagnosis": "shield_encrypted_pqc",
  "treatment": "quantum_safe_data",
  "status": "PROTECTED"
}`,
      language: 'json'
    }
  },
  {
    id: 'data_exposed',
    title: 'The Nightmare: 2029',
    description: 'Adversaries decrypt harvested data. Patient records from 2024 are exposed.',
    timeline: '2029',
    threat: 'Historical data breach',
    solution: 'Too late for old data',
    outcome: 'Massive privacy violation and lawsuits',
    codeExample: {
      before: `// What attackers see in 2029
DECRYPTED PATIENT RECORDS (2024-2029):
- 50,000 patient genetic profiles
- Mental health diagnoses  
- Chronic condition histories
- Insurance claim details
STATUS: FULLY EXPOSED`,
      after: `// With Shield protection from 2024
ATTEMPTED DECRYPTION (2029):
- Quantum-resistant encryption detected
- CRYSTALS-Kyber algorithm
- Decryption failed
STATUS: STILL PROTECTED`,
      language: 'text'
    }
  },
  {
    id: 'shield_timeline',
    title: 'The Shield Timeline: What If?',
    description: 'How Sarah\'s story changes with QubitCore Shield from day one.',
    timeline: '2024-2030',
    threat: 'Proactive quantum protection',
    solution: 'Shield implementation',
    outcome: 'Data remains secure through quantum era',
    codeExample: {
      before: `// Sarah's original approach
1. Use RSA-2048 (2024)
2. Quantum threat emerges (2027)
3. Panic migration (2027-2028)
4. Historical data exposed (2029)
5. Legal consequences (2030)`,
      after: `// Sarah with Shield from day one
1. Implement Shield APIs (2024)
2. Quantum threat emerges (2027)
3. Already protected ✓
4. Historical data safe ✓
5. Business thrives (2030)`,
      language: 'text'
    }
  }
];

interface ShieldStoryProps {
  userType?: 'new' | 'exploring' | 'integrating';
}

export function ShieldStory({ userType = 'new' }: ShieldStoryProps) {
  const [selectedPersona, setSelectedPersona] = useState<DeveloperPersona>(developerPersonas[0]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);

  // Auto-advance timeline when playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimelineProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Update chapter based on timeline progress
  useEffect(() => {
    const chapterIndex = Math.floor((timelineProgress / 100) * storyChapters.length);
    setCurrentChapter(Math.min(chapterIndex, storyChapters.length - 1));
  }, [timelineProgress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimelineProgress(0);
    setCurrentChapter(0);
  };

  const currentStory = storyChapters[currentChapter];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
            <Shield className="w-4 h-4 mr-2" />
            DEVELOPER STORY
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Meet Sarah: A Developer Like You
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Follow Sarah's journey from confident developer to quantum security advocate. 
            See how her choices in 2024 determine her fate in 2029.
          </p>
        </motion.div>

        {/* Developer Persona Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-6">Choose Your Developer Persona</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {developerPersonas.map((persona) => (
                  <motion.div
                    key={persona.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPersona(persona)}
                    className={`
                      p-6 rounded-lg border-2 cursor-pointer transition-all
                      ${selectedPersona.id === persona.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{persona.avatar}</div>
                      <h3 className="font-semibold text-slate-900">{persona.name}</h3>
                      <p className="text-sm text-slate-600">{persona.role}</p>
                      <p className="text-xs text-slate-500">{persona.company}</p>
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-4">{persona.background}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-600 mb-1">Challenges:</h4>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {persona.challenges.slice(0, 2).map((challenge, idx) => (
                            <li key={idx}>• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {selectedPersona.name}'s Quantum Journey
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlayPause}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>2024</span>
                  <span>Current: {currentStory.timeline}</span>
                  <span>2030</span>
                </div>
                <Progress value={timelineProgress} className="h-3" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Story Content */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentChapter}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center
                            ${currentChapter === 0 ? 'bg-green-100' : ''}
                            ${currentChapter === 1 ? 'bg-yellow-100' : ''}
                            ${currentChapter === 2 ? 'bg-red-100' : ''}
                            ${currentChapter === 3 ? 'bg-blue-100' : ''}
                          `}>
                            {currentChapter === 0 && <CheckCircle className="w-6 h-6 text-green-600" />}
                            {currentChapter === 1 && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
                            {currentChapter === 2 && <Unlock className="w-6 h-6 text-red-600" />}
                            {currentChapter === 3 && <Shield className="w-6 h-6 text-blue-600" />}
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                              {currentStory.title}
                            </h3>
                            <p className="text-sm text-slate-500">{currentStory.timeline}</p>
                          </div>
                        </div>

                        <p className="text-slate-700 leading-relaxed">
                          {currentStory.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Alert className="border-orange-200 bg-orange-50">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <AlertDescription>
                              <strong>Threat:</strong> {currentStory.threat}
                            </AlertDescription>
                          </Alert>

                          <Alert className="border-blue-200 bg-blue-50">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <AlertDescription>
                              <strong>Solution:</strong> {currentStory.solution}
                            </AlertDescription>
                          </Alert>
                        </div>

                        <Alert className={`
                          ${currentChapter <= 2 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}
                        `}>
                          <CheckCircle className={`
                            h-4 w-4 
                            ${currentChapter <= 2 ? 'text-red-600' : 'text-green-600'}
                          `} />
                          <AlertDescription>
                            <strong>Outcome:</strong> {currentStory.outcome}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Code Example */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Code Impact
                  </h4>

                  {currentStory.codeExample && (
                    <Tabs defaultValue="before" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="before" className="flex items-center gap-2">
                          <Unlock className="w-4 h-4" />
                          Vulnerable
                        </TabsTrigger>
                        <TabsTrigger value="after" className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Protected
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="before" className="mt-4">
                        <Card className="bg-red-50 border-red-200">
                          <CardContent className="p-4">
                            <pre className="text-sm text-slate-800 overflow-x-auto">
                              <code>{currentStory.codeExample.before}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="after" className="mt-4">
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4">
                            <pre className="text-sm text-slate-800 overflow-x-auto">
                              <code>{currentStory.codeExample.after}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Don't Let This Be Your Story
              </h3>
              <p className="text-xl mb-6 text-blue-100">
                Start protecting your applications with quantum-safe security today. 
                Your future self will thank you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  Try Shield API Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}