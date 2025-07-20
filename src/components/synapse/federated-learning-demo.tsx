'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Shield, 
  Play, 
  Pause, 
  RotateCcw, 
  Database, 
  Network, 
  Lock, 
  Eye, 
  EyeOff,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Participant {
  id: string;
  name: string;
  dataSize: number;
  accuracy: number;
  privacy: number;
  status: 'training' | 'uploading' | 'waiting' | 'complete';
  color: string;
}

interface TrainingRound {
  round: number;
  globalAccuracy: number;
  privacyBudget: number;
  participants: Participant[];
  aggregationTime: number;
}

interface SecurityMetric {
  name: string;
  value: string;
  status: 'secure' | 'warning' | 'critical';
  description: string;
}

const initialParticipants: Participant[] = [
  { id: '1', name: 'Hospital A', dataSize: 15000, accuracy: 0.72, privacy: 100, status: 'waiting', color: 'bg-blue-500' },
  { id: '2', name: 'Hospital B', dataSize: 22000, accuracy: 0.68, privacy: 100, status: 'waiting', color: 'bg-green-500' },
  { id: '3', name: 'Hospital C', dataSize: 18000, accuracy: 0.75, privacy: 100, status: 'waiting', color: 'bg-purple-500' },
  { id: '4', name: 'Research Lab', dataSize: 12000, accuracy: 0.70, privacy: 100, status: 'waiting', color: 'bg-orange-500' }
];

export function FederatedLearningDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [globalAccuracy, setGlobalAccuracy] = useState(0.65);
  const [privacyBudget, setPrivacyBudget] = useState(100);
  const [trainingHistory, setTrainingHistory] = useState<TrainingRound[]>([]);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('visualization');

  const securityMetrics: SecurityMetric[] = [
    {
      name: 'Quantum Resistance',
      value: '256-bit Post-Quantum',
      status: 'secure',
      description: 'All communications protected against quantum computer attacks'
    },
    {
      name: 'Differential Privacy',
      value: `ε = 0.1 (${privacyBudget}% budget remaining)`,
      status: privacyBudget > 50 ? 'secure' : privacyBudget > 20 ? 'warning' : 'critical',
      description: 'Mathematical guarantee that individual data cannot be identified'
    },
    {
      name: 'Secure Aggregation',
      value: 'Multi-Party Computation',
      status: 'secure',
      description: 'Model updates are encrypted and aggregated without revealing individual contributions'
    },
    {
      name: 'Data Locality',
      value: '100% Local',
      status: 'secure',
      description: 'Raw data never leaves participant premises'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setParticipants(prev => {
          const updated = prev.map(p => {
            if (p.status === 'waiting') {
              return { ...p, status: 'training' as const };
            } else if (p.status === 'training') {
              return { 
                ...p, 
                status: 'uploading' as const,
                accuracy: Math.min(0.95, p.accuracy + Math.random() * 0.05)
              };
            } else if (p.status === 'uploading') {
              return { ...p, status: 'complete' as const };
            }
            return p;
          });

          // Check if all participants are complete
          if (updated.every(p => p.status === 'complete')) {
            const newGlobalAccuracy = Math.min(0.95, globalAccuracy + Math.random() * 0.03);
            const newPrivacyBudget = Math.max(0, privacyBudget - 5);
            
            setGlobalAccuracy(newGlobalAccuracy);
            setPrivacyBudget(newPrivacyBudget);
            setCurrentRound(prev => prev + 1);
            
            // Add to history
            setTrainingHistory(prev => [...prev, {
              round: currentRound + 1,
              globalAccuracy: newGlobalAccuracy,
              privacyBudget: newPrivacyBudget,
              participants: updated.map(p => ({ ...p })),
              aggregationTime: Math.random() * 2 + 1
            }]);

            // Reset for next round
            return updated.map(p => ({ 
              ...p, 
              status: 'waiting' as const,
              privacy: Math.max(0, p.privacy - 5)
            }));
          }

          return updated;
        });
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentRound, globalAccuracy, privacyBudget]);

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setParticipants(initialParticipants);
    setGlobalAccuracy(0.65);
    setPrivacyBudget(100);
    setTrainingHistory([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'training': return <Brain className="h-4 w-4 animate-pulse" />;
      case 'uploading': return <Network className="h-4 w-4 animate-bounce" />;
      case 'complete': return <CheckCircle className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getSecurityIcon = (status: string) => {
    switch (status) {
      case 'secure': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700">
            <Brain className="h-4 w-4 mr-2" />
            Federated Learning Demo
          </Badge>
          <h2 className="text-3xl font-bold mb-4">See Distributed AI Training in Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how AI models learn from distributed data while maintaining quantum-safe privacy guarantees.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visualization">Live Training</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Guarantees</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="visualization">
              <div className="space-y-6">
                {/* Control Panel */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Server className="h-5 w-5 mr-2" />
                        Federated Training Control
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={isRunning ? "secondary" : "default"}
                          onClick={() => setIsRunning(!isRunning)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isRunning ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Training
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={resetDemo}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{currentRound}</p>
                        <p className="text-sm text-muted-foreground">Training Rounds</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{(globalAccuracy * 100).toFixed(1)}%</p>
                        <p className="text-sm text-muted-foreground">Global Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{privacyBudget}%</p>
                        <p className="text-sm text-muted-foreground">Privacy Budget</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Participants Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {participants.map((participant) => (
                    <Card key={participant.id} className="relative overflow-hidden">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className={`w-16 h-16 ${participant.color} rounded-full mx-auto mb-3 flex items-center justify-center text-white relative`}>
                            <Database className="h-8 w-8" />
                            {participant.status === 'training' && (
                              <motion.div
                                className="absolute inset-0 border-4 border-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              />
                            )}
                          </div>
                          <h4 className="font-semibold mb-2">{participant.name}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Status:</span>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(participant.status)}
                                <span className="capitalize">{participant.status}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Data:</span>
                              <span>{participant.dataSize.toLocaleString()} samples</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Local Accuracy:</span>
                              <span>{(participant.accuracy * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Privacy:</span>
                              <div className="flex items-center space-x-1">
                                <Lock className="h-3 w-3 text-green-500" />
                                <span>{participant.privacy}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {participant.status === 'uploading' && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5 }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Global Model */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                        <Brain className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Global AI Model</h3>
                      <p className="text-muted-foreground mb-4">
                        Learns from all participants without seeing their data
                      </p>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{(globalAccuracy * 100).toFixed(1)}%</p>
                          <p className="text-sm text-muted-foreground">Accuracy</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">{participants.reduce((sum, p) => sum + p.dataSize, 0).toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Samples</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Quantum-Safe Privacy Guarantees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {securityMetrics.map((metric, index) => (
                        <Card key={index} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold">{metric.name}</h4>
                              {getSecurityIcon(metric.status)}
                            </div>
                            <p className="text-lg font-mono text-blue-600 mb-2">{metric.value}</p>
                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Eye className="h-5 w-5 mr-2" />
                        Privacy Visualization
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                      >
                        {showPrivacyDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {showPrivacyDetails ? 'Hide' : 'Show'} Details
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-semibold mb-4">What Each Participant Sees</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-green-50">
                            <CardContent className="p-4 text-center">
                              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                              <h5 className="font-medium">Their Own Data</h5>
                              <p className="text-sm text-muted-foreground">Full access to local dataset</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-50">
                            <CardContent className="p-4 text-center">
                              <Brain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                              <h5 className="font-medium">Global Model</h5>
                              <p className="text-sm text-muted-foreground">Aggregated AI model updates</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-red-50">
                            <CardContent className="p-4 text-center">
                              <EyeOff className="h-8 w-8 text-red-500 mx-auto mb-2" />
                              <h5 className="font-medium">Others' Data</h5>
                              <p className="text-sm text-muted-foreground">Completely hidden</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <AnimatePresence>
                        {showPrivacyDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <h5 className="font-semibold mb-3">Technical Privacy Mechanisms</h5>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                                <div>
                                  <h6 className="font-medium">Differential Privacy</h6>
                                  <p className="text-sm text-muted-foreground">
                                    Mathematical noise added to model updates ensures individual data points cannot be reverse-engineered.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Lock className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <h6 className="font-medium">Homomorphic Encryption</h6>
                                  <p className="text-sm text-muted-foreground">
                                    Computations performed on encrypted data without decryption, using post-quantum cryptography.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Network className="h-5 w-5 text-green-500 mt-0.5" />
                                <div>
                                  <h6 className="font-medium">Secure Multi-Party Computation</h6>
                                  <p className="text-sm text-muted-foreground">
                                    Model aggregation happens without any single party seeing all the updates.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Training Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Accuracy Over Time</h4>
                        <div className="space-y-2">
                          {trainingHistory.slice(-5).map((round, index) => (
                            <div key={round.round} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">Round {round.round}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={round.globalAccuracy * 100} className="w-20" />
                                <span className="text-sm font-medium">{(round.globalAccuracy * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Privacy Budget Usage</h4>
                        <div className="space-y-2">
                          {trainingHistory.slice(-5).map((round, index) => (
                            <div key={round.round} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">Round {round.round}</span>
                              <div className="flex items-center space-x-2">
                                <Progress 
                                  value={round.privacyBudget} 
                                  className="w-20"
                                />
                                <span className="text-sm font-medium">{round.privacyBudget}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Comparison: Federated vs Traditional ML</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-green-600">✓ Federated Learning (QubitCore Synapse)</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Data never leaves participant premises</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Quantum-safe encryption throughout</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Mathematical privacy guarantees</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Regulatory compliance built-in</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Scales to unlimited participants</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-600">✗ Traditional Centralized ML</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>Requires data sharing and centralization</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>Vulnerable to quantum attacks</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>Privacy risks and compliance issues</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>Single point of failure</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>Limited by data sharing agreements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Users className="h-5 w-5 mr-2" />
              Start Your Federated Learning Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}