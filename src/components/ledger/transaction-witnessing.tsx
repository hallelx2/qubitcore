'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Eye,
  Shield,
  CheckCircle,
  Clock,
  Hash,
  Key,
  FileText,
  Activity,
  TrendingUp,
  AlertCircle,
  Copy,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface TransactionData {
  id: string;
  amount: number;
  from: string;
  to: string;
  timestamp: Date;
  status: 'pending' | 'witnessed' | 'verified';
  proofChain: ProofLink[];
}

interface ProofLink {
  id: string;
  hash: string;
  signature: string;
  timestamp: Date;
  witnessNodes: number;
  quantumResistant: boolean;
}

const mockTransactions: TransactionData[] = [
  {
    id: 'tx_001',
    amount: 2100000,
    from: 'Global Trust Bank',
    to: 'International Finance Corp',
    timestamp: new Date(),
    status: 'pending',
    proofChain: []
  },
  {
    id: 'tx_002', 
    amount: 850000,
    from: 'SecureBank Ltd',
    to: 'Investment Partners',
    timestamp: new Date(Date.now() - 300000),
    status: 'witnessed',
    proofChain: [
      {
        id: 'proof_001',
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
        signature: 'QR_SIG_001_DILITHIUM_3',
        timestamp: new Date(Date.now() - 250000),
        witnessNodes: 7,
        quantumResistant: true
      }
    ]
  }
];

const complianceMetrics = [
  { time: '00:00', transactions: 1240, verified: 1240, compliance: 100 },
  { time: '04:00', transactions: 1580, verified: 1580, compliance: 100 },
  { time: '08:00', transactions: 2100, verified: 2100, compliance: 100 },
  { time: '12:00', transactions: 2850, verified: 2850, compliance: 100 },
  { time: '16:00', transactions: 3200, verified: 3200, compliance: 100 },
  { time: '20:00', transactions: 2900, verified: 2900, compliance: 100 },
];

export function TransactionWitnessing() {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData>(mockTransactions[0]);
  const [isWitnessing, setIsWitnessing] = useState(false);
  const [witnessProgress, setWitnessProgress] = useState(0);
  const [proofSteps, setProofSteps] = useState<string[]>([]);
  const [realTimeData, setRealTimeData] = useState(complianceMetrics);

  // Simulate real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const newTime = new Date(Date.now()).toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        newData.push({
          time: newTime,
          transactions: lastEntry.transactions + Math.floor(Math.random() * 50) + 10,
          verified: lastEntry.verified + Math.floor(Math.random() * 50) + 10,
          compliance: 100
        });
        
        return newData.slice(-6); // Keep last 6 entries
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startWitnessing = async () => {
    setIsWitnessing(true);
    setWitnessProgress(0);
    setProofSteps([]);

    const steps = [
      'Initiating quantum-resistant signature generation...',
      'Creating cryptographic proof chain...',
      'Distributing to witness nodes across network...',
      'Collecting consensus signatures...',
      'Generating immutable proof certificate...',
      'Transaction permanently witnessed and verified!'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProofSteps(prev => [...prev, steps[i]]);
      setWitnessProgress((i + 1) * (100 / steps.length));
    }

    // Update transaction status
    setSelectedTransaction(prev => ({
      ...prev,
      status: 'witnessed',
      proofChain: [{
        id: `proof_${Date.now()}`,
        hash: `0x${Math.random().toString(16).substr(2, 32)}`,
        signature: `QR_SIG_${Date.now()}_DILITHIUM_3`,
        timestamp: new Date(),
        witnessNodes: 7,
        quantumResistant: true
      }]
    }));

    setIsWitnessing(false);
  };

  const resetDemo = () => {
    setSelectedTransaction({
      ...mockTransactions[0],
      id: `tx_${Date.now()}`,
      timestamp: new Date()
    });
    setWitnessProgress(0);
    setProofSteps([]);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-4 text-green-600 border-green-200">
            <Eye className="w-4 h-4 mr-2" />
            Live Demonstration
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Immutable Transaction Witnessing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how QubitCore Ledger creates unbreakable proof chains that remain secure even against quantum computers.
            Every transaction is witnessed by multiple nodes using quantum-resistant cryptography.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Transaction Demo */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Transaction Witnessing Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Transaction ID</Label>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                    {selectedTransaction.id}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <div className="text-lg font-semibold text-green-600">
                    ${selectedTransaction.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">From</Label>
                <div className="text-sm bg-gray-100 p-2 rounded">{selectedTransaction.from}</div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">To</Label>
                <div className="text-sm bg-gray-100 p-2 rounded">{selectedTransaction.to}</div>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Status:</Label>
                <Badge variant={
                  selectedTransaction.status === 'witnessed' ? 'default' :
                  selectedTransaction.status === 'pending' ? 'secondary' : 'outline'
                }>
                  {selectedTransaction.status === 'witnessed' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {selectedTransaction.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                  {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Witnessing Progress */}
            {isWitnessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Witnessing Progress</span>
                    <span className="text-sm text-gray-500">{Math.round(witnessProgress)}%</span>
                  </div>
                  <Progress value={witnessProgress} className="h-2" />
                </div>
                
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {proofSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={startWitnessing}
                disabled={isWitnessing || selectedTransaction.status === 'witnessed'}
                className="bg-green-600 hover:bg-green-700"
              >
                {isWitnessing ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Witnessing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Witnessing
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetDemo}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Proof Chain Visualization */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Quantum-Resistant Proof Chain
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTransaction.proofChain.length > 0 ? (
              <div className="space-y-4">
                {selectedTransaction.proofChain.map((proof, index) => (
                  <motion.div
                    key={proof.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 bg-green-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Quantum-Resistant
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {proof.witnessNodes} witness nodes
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs font-medium">Proof Hash</Label>
                        <div className="font-mono text-xs bg-white p-2 rounded border flex items-center justify-between">
                          <span className="truncate">{proof.hash}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs font-medium">Quantum Signature</Label>
                        <div className="font-mono text-xs bg-white p-2 rounded border">
                          {proof.signature}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Witnessed: {proof.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No proof chain generated yet.</p>
                <p className="text-sm">Start witnessing to create immutable proof.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Monitoring Dashboard */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-time Transaction Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compliance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compliance">Compliance Rate</TabsTrigger>
              <TabsTrigger value="volume">Transaction Volume</TabsTrigger>
              <TabsTrigger value="verification">Verification Speed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compliance" className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={realTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[95, 100]} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="compliance" 
                      stroke="#22c55e" 
                      fill="#22c55e" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-500">Compliance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-500">Failed Verifications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">7</div>
                  <div className="text-sm text-gray-500">Witness Nodes</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="volume" className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="transactions" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="verification" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Average Verification Times</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Signature Generation</span>
                      <Badge variant="outline">0.3s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Witness Consensus</span>
                      <Badge variant="outline">1.2s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Proof Chain Creation</span>
                      <Badge variant="outline">0.8s</Badge>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-sm">Total Time</span>
                      <Badge className="bg-green-600">2.3s</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Security Guarantees</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Quantum-resistant signatures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Immutable proof chains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Multi-node consensus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Regulatory compliance</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}