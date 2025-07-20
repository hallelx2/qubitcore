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
  Heart, 
  User, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Lock,
  Unlock,
  Database,
  FileText,
  Brain,
  Stethoscope
} from 'lucide-react';

interface PatientPersona {
  id: string;
  name: string;
  age: number;
  condition: string;
  dataTypes: string[];
  lifespan: number;
  avatar: string;
  background: string;
  risks: string[];
  protectionNeeds: string[];
}

interface HealthcareStoryChapter {
  id: string;
  title: string;
  description: string;
  timeline: string;
  year: number;
  threat: string;
  impact: string;
  aegisProtection: string;
  dataAtRisk: string[];
  consequences: string[];
}

const patientPersonas: PatientPersona[] = [
  {
    id: 'emma',
    name: 'Emma Thompson',
    age: 28,
    condition: 'Genetic Predisposition Testing',
    dataTypes: ['Genetic sequences', 'Family history', 'Predictive analytics', 'Insurance records'],
    lifespan: 80, // years her data needs protection
    avatar: '🧬',
    background: 'Emma underwent comprehensive genetic testing to understand her predisposition to hereditary diseases. Her genetic data will be valuable for decades.',
    risks: [
      'Genetic discrimination by insurers',
      'Family privacy implications',
      'Future medical breakthroughs revealing new insights',
      'Quantum computers breaking current encryption'
    ],
    protectionNeeds: [
      'Lifetime data protection',
      'Family genetic privacy',
      'Insurance discrimination prevention',
      'Future-proof encryption'
    ]
  },
  {
    id: 'robert',
    name: 'Robert Chen',
    age: 45,
    condition: 'Chronic Disease Management',
    dataTypes: ['Treatment history', 'Medication records', 'IoT device data', 'Lifestyle tracking'],
    lifespan: 50,
    avatar: '💊',
    background: 'Robert manages diabetes with connected devices and continuous monitoring. His health data creates a detailed lifetime profile.',
    risks: [
      'Employment discrimination',
      'Insurance premium increases',
      'Identity theft through health data',
      'Unauthorized access to IoT devices'
    ],
    protectionNeeds: [
      'Real-time device security',
      'Continuous monitoring protection',
      'Employment privacy',
      'Long-term data integrity'
    ]
  },
  {
    id: 'maria',
    name: 'Maria Rodriguez',
    age: 34,
    condition: 'Mental Health Treatment',
    dataTypes: ['Therapy sessions', 'Medication history', 'Crisis interventions', 'Family counseling'],
    lifespan: 60,
    avatar: '🧠',
    background: 'Maria receives ongoing mental health treatment. Her therapy records and treatment history require the highest level of privacy protection.',
    risks: [
      'Social stigma and discrimination',
      'Career impact from disclosure',
      'Family relationship consequences',
      'Insurance coverage denial'
    ],
    protectionNeeds: [
      'Maximum privacy protection',
      'Stigma prevention',
      'Career protection',
      'Family confidentiality'
    ]
  }
];

const healthcareStoryChapters: HealthcareStoryChapter[] = [
  {
    id: 'data_creation',
    title: 'The Data Creation: Today',
    description: 'Emma undergoes comprehensive genetic testing, creating a detailed genetic profile that will be valuable for her entire lifetime.',
    timeline: '2024',
    year: 2024,
    threat: 'Data harvesting begins',
    impact: 'Genetic data encrypted with current standards',
    aegisProtection: 'Quantum-safe encryption from day one',
    dataAtRisk: ['Genetic sequences', 'Disease predispositions', 'Family genetic history'],
    consequences: ['Data appears secure', 'Standard HIPAA compliance', 'Patient confidence high']
  },
  {
    id: 'quantum_emergence',
    title: 'The Quantum Threat Emerges: 2027',
    description: 'Quantum computers achieve cryptographic breakthrough. Healthcare organizations realize their patient data is vulnerable.',
    timeline: '2027',
    year: 2027,
    threat: 'Quantum computers break RSA encryption',
    impact: 'All historical patient data at risk',
    aegisProtection: 'Aegis-protected data remains secure',
    dataAtRisk: ['All genetic data 2020-2027', 'Mental health records', 'Chronic disease histories'],
    consequences: ['Industry-wide panic', 'Urgent migration needed', 'Patient trust eroding']
  },
  {
    id: 'data_breach',
    title: 'The Great Health Data Breach: 2029',
    description: 'Adversaries decrypt harvested health data. Emma\'s genetic information from 2024 is exposed, affecting her entire family.',
    timeline: '2029',
    year: 2029,
    threat: 'Historical health data decrypted',
    impact: 'Lifetime genetic privacy violated',
    aegisProtection: 'Aegis data still encrypted and secure',
    dataAtRisk: ['Emma\'s genetic profile', 'Family genetic history', 'Disease predictions'],
    consequences: ['Genetic discrimination', 'Insurance denial', 'Family privacy violated', 'Lawsuits filed']
  },
  {
    id: 'lifetime_impact',
    title: 'The Lifetime Impact: 2030-2050',
    description: 'Emma faces decades of consequences from her 2024 genetic data breach. Her children and grandchildren are also affected.',
    timeline: '2030-2050',
    year: 2040,
    threat: 'Generational privacy violation',
    impact: 'Multi-generational genetic discrimination',
    aegisProtection: 'Protected families thrive with genetic privacy',
    dataAtRisk: ['Multi-generational genetic data', 'Family health predictions', 'Inherited disease risks'],
    consequences: ['Genetic underclass formation', 'Insurance apartheid', 'Employment discrimination', 'Social stratification']
  },
  {
    id: 'aegis_timeline',
    title: 'The Aegis Protection Timeline',
    description: 'How Emma\'s story changes with Aegis protection from 2024, ensuring her genetic privacy for life.',
    timeline: '2024-2080',
    year: 2050,
    threat: 'Proactive quantum protection',
    impact: 'Lifetime genetic privacy preserved',
    aegisProtection: 'Complete lifecycle protection',
    dataAtRisk: [],
    consequences: ['Genetic privacy maintained', 'Family protected', 'Insurance fairness', 'Medical progress enabled']
  }
];

interface AegisStoryProps {
  patientType?: 'chronic' | 'genetic' | 'mental-health';
}

export function AegisStory({ patientType = 'genetic' }: AegisStoryProps) {
  const [selectedPatient, setSelectedPatient] = useState<PatientPersona>(
    patientPersonas.find(p => p.id === 'emma') || patientPersonas[0]
  );
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [breachSimulation, setBreachSimulation] = useState(false);

  // Auto-advance timeline when playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimelineProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 1.5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Update chapter based on timeline progress
  useEffect(() => {
    const chapterIndex = Math.floor((timelineProgress / 100) * healthcareStoryChapters.length);
    setCurrentChapter(Math.min(chapterIndex, healthcareStoryChapters.length - 1));
  }, [timelineProgress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimelineProgress(0);
    setCurrentChapter(0);
    setBreachSimulation(false);
  };

  const handleBreachSimulation = () => {
    setBreachSimulation(!breachSimulation);
  };

  const currentStory = healthcareStoryChapters[currentChapter];
  const yearsOfProtectionNeeded = selectedPatient.lifespan;
  const currentYear = 2024;
  const protectionEndYear = currentYear + yearsOfProtectionNeeded;

  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50">
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
            <Heart className="w-4 h-4 mr-2" />
            HEALTHCARE STORY
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Emma's Genetic Data Will Outlive Her
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Follow Emma's journey through genetic testing and see how her choices in 2024 
            determine her family's privacy for the next 80 years.
          </p>
        </motion.div>

        {/* Patient Persona Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-6">Choose Patient Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {patientPersonas.map((patient) => (
                  <motion.div
                    key={patient.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPatient(patient)}
                    className={`
                      p-6 rounded-lg border-2 cursor-pointer transition-all
                      ${selectedPatient.id === patient.id 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{patient.avatar}</div>
                      <h3 className="font-semibold text-slate-900">{patient.name}</h3>
                      <p className="text-sm text-slate-600">Age {patient.age}</p>
                      <p className="text-xs text-slate-500">{patient.condition}</p>
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-4">{patient.background}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-600 mb-1">
                          Protection Needed: {patient.lifespan} years
                        </h4>
                        <div className="text-xs text-slate-600">
                          Data types: {patient.dataTypes.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lifetime Protection Timeline */}
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
                  {selectedPatient.name}'s Lifetime Data Protection Journey
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

                  <Button
                    variant={breachSimulation ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleBreachSimulation}
                    className="flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {breachSimulation ? 'Hide' : 'Show'} Breach Impact
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{currentYear}</span>
                  <span>Current: {currentStory.timeline}</span>
                  <span>{protectionEndYear}</span>
                </div>
                <Progress value={timelineProgress} className="h-3" />
                <div className="text-center text-sm text-slate-600">
                  Data needs protection for {yearsOfProtectionNeeded} years 
                  ({currentYear}-{protectionEndYear})
                </div>
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
                            ${currentChapter === 0 ? 'bg-blue-100' : ''}
                            ${currentChapter === 1 ? 'bg-yellow-100' : ''}
                            ${currentChapter === 2 ? 'bg-red-100' : ''}
                            ${currentChapter === 3 ? 'bg-red-200' : ''}
                            ${currentChapter === 4 ? 'bg-green-100' : ''}
                          `}>
                            {currentChapter === 0 && <Database className="w-6 h-6 text-blue-600" />}
                            {currentChapter === 1 && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
                            {currentChapter === 2 && <Unlock className="w-6 h-6 text-red-600" />}
                            {currentChapter === 3 && <Brain className="w-6 h-6 text-red-700" />}
                            {currentChapter === 4 && <Shield className="w-6 h-6 text-green-600" />}
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

                        <div className="grid grid-cols-1 gap-4">
                          <Alert className="border-orange-200 bg-orange-50">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <AlertDescription>
                              <strong>Threat:</strong> {currentStory.threat}
                            </AlertDescription>
                          </Alert>

                          <Alert className={`
                            ${currentChapter <= 3 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}
                          `}>
                            <Heart className={`
                              h-4 w-4 
                              ${currentChapter <= 3 ? 'text-red-600' : 'text-green-600'}
                            `} />
                            <AlertDescription>
                              <strong>Impact:</strong> {currentStory.impact}
                            </AlertDescription>
                          </Alert>

                          <Alert className="border-blue-200 bg-blue-50">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <AlertDescription>
                              <strong>Aegis Protection:</strong> {currentStory.aegisProtection}
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Data at Risk Visualization */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Data Impact Analysis
                  </h4>

                  <Tabs defaultValue="risk" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="risk" className="flex items-center gap-2">
                        <Unlock className="w-4 h-4" />
                        At Risk
                      </TabsTrigger>
                      <TabsTrigger value="protected" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Protected
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="risk" className="mt-4">
                      <Card className={`
                        ${currentStory.dataAtRisk.length > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}
                      `}>
                        <CardContent className="p-4">
                          {currentStory.dataAtRisk.length > 0 ? (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-red-800">Vulnerable Data:</h5>
                              <ul className="space-y-1">
                                {currentStory.dataAtRisk.map((data, idx) => (
                                  <li key={idx} className="text-sm text-red-700 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    {data}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="text-center text-green-700">
                              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                              <p className="font-semibold">All Data Protected</p>
                              <p className="text-sm">Aegis quantum-safe encryption active</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="protected" className="mt-4">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h5 className="font-semibold text-green-800">Aegis Protected Data:</h5>
                            <ul className="space-y-1">
                              {selectedPatient.dataTypes.map((data, idx) => (
                                <li key={idx} className="text-sm text-green-700 flex items-center gap-2">
                                  <Shield className="w-4 h-4" />
                                  {data}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 p-3 bg-green-100 rounded-lg">
                              <p className="text-sm text-green-800">
                                <strong>Protection Duration:</strong> {yearsOfProtectionNeeded} years<br/>
                                <strong>Quantum-Safe Until:</strong> {protectionEndYear}<br/>
                                <strong>Algorithm:</strong> CRYSTALS-Kyber + Dilithium
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* Consequences */}
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Consequences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentStory.consequences.map((consequence, idx) => (
                          <li key={idx} className={`
                            text-sm flex items-center gap-2
                            ${currentChapter <= 3 ? 'text-red-700' : 'text-green-700'}
                          `}>
                            {currentChapter <= 3 ? (
                              <AlertTriangle className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            {consequence}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Healthcare Breach Impact Simulation */}
        <AnimatePresence>
          {breachSimulation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Healthcare Breach Impact Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">Without Aegis Protection:</h4>
                      <div className="space-y-3">
                        <Alert className="border-red-300 bg-red-100">
                          <Unlock className="h-4 w-4 text-red-600" />
                          <AlertDescription>
                            <strong>2029:</strong> Emma's genetic data from 2024 is decrypted and sold on dark web
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-red-300 bg-red-100">
                          <User className="h-4 w-4 text-red-600" />
                          <AlertDescription>
                            <strong>2030:</strong> Insurance companies deny coverage based on genetic predispositions
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-red-300 bg-red-100">
                          <Brain className="h-4 w-4 text-red-600" />
                          <AlertDescription>
                            <strong>2035:</strong> Emma's children face genetic discrimination in employment
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-red-300 bg-red-100">
                          <Activity className="h-4 w-4 text-red-600" />
                          <AlertDescription>
                            <strong>2040:</strong> Family medical history used against grandchildren
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">With Aegis Protection:</h4>
                      <div className="space-y-3">
                        <Alert className="border-green-300 bg-green-100">
                          <Shield className="h-4 w-4 text-green-600" />
                          <AlertDescription>
                            <strong>2029:</strong> Quantum computers fail to decrypt Aegis-protected genetic data
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-green-300 bg-green-100">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription>
                            <strong>2030:</strong> Emma receives fair insurance coverage with genetic privacy intact
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-green-300 bg-green-100">
                          <Heart className="h-4 w-4 text-green-600" />
                          <AlertDescription>
                            <strong>2035:</strong> Emma's children benefit from genetic insights without discrimination
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-green-300 bg-green-100">
                          <Stethoscope className="h-4 w-4 text-green-600" />
                          <AlertDescription>
                            <strong>2040:</strong> Family genetic data enables personalized medicine breakthroughs
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Protect Patient Data for a Lifetime
              </h3>
              <p className="text-xl mb-6 text-red-100">
                Don't let quantum computers compromise patient privacy. 
                Start protecting healthcare data with Aegis today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-red-600">
                  Try Aegis API Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  View HIPAA Compliance
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}