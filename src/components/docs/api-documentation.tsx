"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Code, 
  Shield, 
  Database, 
  Zap, 
  Heart,
  BookOpen,
  Play,
  Copy,
  CheckCircle,
  ExternalLink,
  Key,
  Lock,
  Unlock,
  Server,
  Globe,
  Smartphone,
  Monitor,
  Terminal,
  FileText,
  Settings,
  Users,
  Activity
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  platform: 'shield' | 'ledger' | 'synapse' | 'aegis';
  category: 'encryption' | 'authentication' | 'storage' | 'monitoring' | 'compliance';
  parameters: APIParameter[];
  responses: APIResponse[];
  examples: CodeExample[];
  rateLimit: string;
  authentication: 'api-key' | 'oauth' | 'jwt';
}

interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: any;
  validation?: string;
}

interface APIResponse {
  status: number;
  description: string;
  example: any;
}

interface CodeExample {
  language: string;
  title: string;
  code: string;
  description: string;
}

const apiEndpoints: APIEndpoint[] = [
  {
    id: 'shield_encrypt',
    method: 'POST',
    path: '/v1/shield/encrypt',
    title: 'Encrypt Data',
    description: 'Encrypt sensitive data using quantum-safe algorithms',
    platform: 'shield',
    category: 'encryption',
    authentication: 'api-key',
    rateLimit: '1000 requests/minute',
    parameters: [
      {
        name: 'data',
        type: 'string',
        required: true,
        description: 'The data to encrypt (base64 encoded for binary data)',
        example: 'Hello, quantum-safe world!'
      },
      {
        name: 'algorithm',
        type: 'string',
        required: false,
        description: 'Encryption algorithm to use',
        example: 'CRYSTALS-Kyber',
        validation: 'One of: CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+'
      },
      {
        name: 'keyId',
        type: 'string',
        required: false,
        description: 'Specific key ID to use for encryption',
        example: 'key_1234567890abcdef'
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: 'Additional metadata to associate with encrypted data',
        example: { purpose: 'user_data', retention: '7_years' }
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Successfully encrypted data',
        example: {
          success: true,
          ciphertext: 'eyJhbGciOiJLWUJFUi01MTIiLCJ0eXAiOiJKV1QifQ...',
          keyId: 'key_1234567890abcdef',
          algorithm: 'CRYSTALS-Kyber',
          timestamp: '2024-01-20T15:30:00Z',
          expiresAt: '2031-01-20T15:30:00Z'
        }
      },
      {
        status: 400,
        description: 'Invalid request parameters',
        example: {
          success: false,
          error: 'INVALID_PARAMETER',
          message: 'Data parameter is required',
          code: 'SHIELD_001'
        }
      }
    ],
    examples: [
      {
        language: 'javascript',
        title: 'Node.js',
        description: 'Encrypt user data with Shield',
        code: `const { Shield } = require('@qubitcore/shield');

const shield = new Shield({
  apiKey: process.env.QUBITCORE_API_KEY,
  environment: 'production'
});

async function encryptUserData(userData) {
  try {
    const result = await shield.encrypt({
      data: JSON.stringify(userData),
      algorithm: 'CRYSTALS-Kyber',
      metadata: {
        purpose: 'user_profile',
        retention: '7_years'
      }
    });
    
    console.log('Encrypted successfully:', result.keyId);
    return result.ciphertext;
  } catch (error) {
    console.error('Encryption failed:', error.message);
    throw error;
  }
}`
      },
      {
        language: 'python',
        title: 'Python',
        description: 'Encrypt sensitive data with error handling',
        code: `from qubitcore import Shield
import json

shield = Shield(
    api_key=os.environ['QUBITCORE_API_KEY'],
    environment='production'
)

def encrypt_sensitive_data(data):
    try:
        result = shield.encrypt(
            data=json.dumps(data),
            algorithm='CRYSTALS-Kyber',
            metadata={
                'purpose': 'sensitive_data',
                'retention': '10_years'
            }
        )
        
        print(f"Encrypted with key: {result['keyId']}")
        return result['ciphertext']
        
    except shield.ShieldError as e:
        print(f"Encryption failed: {e.message}")
        raise`
      }
    ]
  },
  {
    id: 'aegis_patient_encrypt',
    method: 'POST',
    path: '/v1/aegis/patient/encrypt',
    title: 'Encrypt Patient Data',
    description: 'Encrypt patient health information with HIPAA compliance',
    platform: 'aegis',
    category: 'encryption',
    authentication: 'api-key',
    rateLimit: '500 requests/minute',
    parameters: [
      {
        name: 'patientId',
        type: 'string',
        required: true,
        description: 'Unique patient identifier',
        example: 'patient_12345'
      },
      {
        name: 'healthData',
        type: 'object',
        required: true,
        description: 'Patient health information to encrypt',
        example: {
          diagnosis: 'Type 2 Diabetes',
          medications: ['Metformin', 'Insulin'],
          vitals: { bp: '120/80', hr: 72 }
        }
      },
      {
        name: 'compliance',
        type: 'array',
        required: false,
        description: 'Compliance frameworks to enforce',
        example: ['HIPAA', 'GDPR']
      },
      {
        name: 'retention',
        type: 'string',
        required: false,
        description: 'Data retention period',
        example: 'lifetime'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Patient data encrypted successfully',
        example: {
          success: true,
          patientId: 'patient_12345',
          encryptedData: 'eyJhbGciOiJLWUJFUi01MTIi...',
          keyId: 'aegis_key_789',
          compliance: ['HIPAA', 'GDPR'],
          auditId: 'audit_abc123',
          expiresAt: null
        }
      }
    ],
    examples: [
      {
        language: 'javascript',
        title: 'Healthcare App Integration',
        description: 'Encrypt patient data for EHR storage',
        code: `const { Aegis } = require('@qubitcore/aegis');

const aegis = new Aegis({
  apiKey: process.env.AEGIS_API_KEY,
  environment: 'healthcare'
});

async function storePatientData(patientId, healthData) {
  const encrypted = await aegis.patient.encrypt({
    patientId,
    healthData,
    compliance: ['HIPAA', 'GDPR'],
    retention: 'lifetime'
  });
  
  // Store in your EHR system
  await ehrSystem.store({
    patientId: encrypted.patientId,
    data: encrypted.encryptedData,
    keyId: encrypted.keyId,
    auditTrail: encrypted.auditId
  });
  
  return encrypted.auditId;
}`
      }
    ]
  },
  {
    id: 'ledger_transaction',
    method: 'POST',
    path: '/v1/ledger/transaction',
    title: 'Create Secure Transaction',
    description: 'Create a quantum-safe blockchain transaction',
    platform: 'ledger',
    category: 'storage',
    authentication: 'api-key',
    rateLimit: '100 requests/minute',
    parameters: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: 'Sender wallet address',
        example: 'qc1a2b3c4d5e6f7g8h9i0j'
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: 'Recipient wallet address',
        example: 'qc9z8y7x6w5v4u3t2s1r0q'
      },
      {
        name: 'amount',
        type: 'string',
        required: true,
        description: 'Transaction amount in smallest unit',
        example: '1000000000'
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: 'Additional transaction data',
        example: 'Payment for services'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Transaction created successfully',
        example: {
          success: true,
          transactionId: 'tx_abc123def456',
          hash: '0x1234567890abcdef...',
          blockHeight: 1234567,
          confirmations: 0,
          fee: '1000',
          timestamp: '2024-01-20T15:30:00Z'
        }
      }
    ],
    examples: [
      {
        language: 'javascript',
        title: 'Quantum-Safe Payment',
        description: 'Process a secure payment transaction',
        code: `const { Ledger } = require('@qubitcore/ledger');

const ledger = new Ledger({
  apiKey: process.env.LEDGER_API_KEY,
  network: 'mainnet'
});

async function processPayment(fromWallet, toWallet, amount) {
  const transaction = await ledger.transaction.create({
    from: fromWallet,
    to: toWallet,
    amount: amount.toString(),
    data: 'Quantum-safe payment'
  });
  
  console.log('Transaction ID:', transaction.transactionId);
  
  // Wait for confirmation
  const confirmed = await ledger.transaction.waitForConfirmation(
    transaction.transactionId,
    { confirmations: 3 }
  );
  
  return confirmed;
}`
      }
    ]
  }
];

const platformColors = {
  shield: 'blue',
  ledger: 'green', 
  synapse: 'purple',
  aegis: 'red'
};

const platformIcons = {
  shield: Shield,
  ledger: Database,
  synapse: Zap,
  aegis: Heart
};

export function APIDocumentation() {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'shield' | 'ledger' | 'synapse' | 'aegis'>('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint>(apiEndpoints[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredEndpoints = selectedPlatform === 'all' 
    ? apiEndpoints 
    : apiEndpoints.filter(endpoint => endpoint.platform === selectedPlatform);

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
            <BookOpen className="w-4 h-4 mr-2" />
            API DOCUMENTATION
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            QubitCore API Reference
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Interactive documentation for all QubitCore APIs. Try endpoints live, 
            copy code examples, and integrate quantum-safe security in minutes.
          </p>
        </motion.div>

        {/* Platform Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedPlatform === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedPlatform('all')}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              All Platforms
            </Button>
            {Object.entries(platformIcons).map(([platform, Icon]) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? 'default' : 'outline'}
                onClick={() => setSelectedPlatform(platform as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* API Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Endpoint List */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredEndpoints.map((endpoint) => {
                    const Icon = platformIcons[endpoint.platform];
                    return (
                      <motion.div
                        key={endpoint.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedEndpoint(endpoint)}
                        className={`
                          p-3 rounded-lg border cursor-pointer transition-all
                          ${selectedEndpoint.id === endpoint.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-200 hover:border-slate-300'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1 rounded bg-${platformColors[endpoint.platform]}-100`}>
                            <Icon className={`w-4 h-4 text-${platformColors[endpoint.platform]}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge 
                                variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                                className="text-xs"
                              >
                                {endpoint.method}
                              </Badge>
                              <span className="text-sm font-medium text-slate-900">
                                {endpoint.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-mono">
                              {endpoint.path}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>   
       {/* Endpoint Details */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="text-sm">
                      {selectedEndpoint.method}
                    </Badge>
                    <code className="text-lg font-mono text-slate-700">
                      {selectedEndpoint.path}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedEndpoint.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedEndpoint.rateLimit}
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-600 mt-2">{selectedEndpoint.description}</p>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="parameters" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="parameters">Parameters</TabsTrigger>
                    <TabsTrigger value="responses">Responses</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="try-it">Try It</TabsTrigger>
                  </TabsList>
                  
                  {/* Parameters Tab */}
                  <TabsContent value="parameters" className="mt-6">
                    <div className="space-y-4">
                      <Alert>
                        <Key className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Authentication:</strong> {selectedEndpoint.authentication} required
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-4">
                        {selectedEndpoint.parameters.map((param) => (
                          <Card key={param.name} className="bg-slate-50">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <code className="text-sm font-mono text-blue-600">
                                    {param.name}
                                  </code>
                                  <Badge variant="outline" className="text-xs">
                                    {param.type}
                                  </Badge>
                                  {param.required && (
                                    <Badge variant="destructive" className="text-xs">
                                      required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-sm text-slate-600 mb-3">
                                {param.description}
                              </p>
                              
                              <div className="bg-white p-3 rounded border">
                                <p className="text-xs text-slate-500 mb-1">Example:</p>
                                <code className="text-sm text-slate-800">
                                  {typeof param.example === 'object' 
                                    ? JSON.stringify(param.example, null, 2)
                                    : param.example
                                  }
                                </code>
                              </div>
                              
                              {param.validation && (
                                <p className="text-xs text-slate-500 mt-2">
                                  <strong>Validation:</strong> {param.validation}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Responses Tab */}
                  <TabsContent value="responses" className="mt-6">
                    <div className="space-y-4">
                      {selectedEndpoint.responses.map((response) => (
                        <Card key={response.status} className="bg-slate-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge 
                                variant={response.status === 200 ? 'default' : 'destructive'}
                                className="text-sm"
                              >
                                {response.status}
                              </Badge>
                              <span className="text-sm font-medium text-slate-900">
                                {response.description}
                              </span>
                            </div>
                            
                            <div className="bg-slate-900 p-4 rounded-lg">
                              <pre className="text-sm text-slate-100 overflow-x-auto">
                                <code>
                                  {JSON.stringify(response.example, null, 2)}
                                </code>
                              </pre>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Examples Tab */}
                  <TabsContent value="examples" className="mt-6">
                    <div className="space-y-6">
                      {selectedEndpoint.examples.map((example, index) => (
                        <Card key={index} className="bg-slate-50">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{example.title}</CardTitle>
                                <p className="text-sm text-slate-600 mt-1">
                                  {example.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {example.language}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(example.code, `${selectedEndpoint.id}-${index}`)}
                                  className="flex items-center gap-2"
                                >
                                  {copiedCode === `${selectedEndpoint.id}-${index}` ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                  {copiedCode === `${selectedEndpoint.id}-${index}` ? 'Copied!' : 'Copy'}
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-slate-900 p-4 rounded-lg">
                              <pre className="text-sm text-slate-100 overflow-x-auto">
                                <code>{example.code}</code>
                              </pre>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Try It Tab */}
                  <TabsContent value="try-it" className="mt-6">
                    <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <Terminal className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Interactive API Testing
                          </h3>
                          <p className="text-slate-600 mb-6">
                            Test this endpoint with real parameters and see live responses. 
                            Sign up for a free API key to get started.
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="flex items-center gap-2">
                              <Play className="w-4 h-4" />
                              Try This Endpoint
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Key className="w-4 h-4" />
                              Get API Key
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Key className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">1. Get API Key</h3>
                  <p className="text-sm text-slate-600">
                    Sign up for a free QubitCore account and generate your API key
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">2. Install SDK</h3>
                  <p className="text-sm text-slate-600">
                    Install our SDK for your preferred language and framework
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">3. Start Building</h3>
                  <p className="text-sm text-slate-600">
                    Make your first API call and add quantum-safe security
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-slate-900 rounded-lg">
                <pre className="text-sm text-slate-100 overflow-x-auto">
                  <code>{`# Install QubitCore SDK
npm install @qubitcore/shield @qubitcore/aegis @qubitcore/ledger

# Set your API key
export QUBITCORE_API_KEY="your_api_key_here"

# Make your first quantum-safe encryption
const { Shield } = require('@qubitcore/shield');
const shield = new Shield({ apiKey: process.env.QUBITCORE_API_KEY });

const encrypted = await shield.encrypt({
  data: "Hello, quantum-safe world!",
  algorithm: "CRYSTALS-Kyber"
});

console.log("Encrypted:", encrypted.ciphertext);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Build with Quantum-Safe APIs?
              </h3>
              <p className="text-xl mb-6 text-blue-100">
                Get started with our free tier and protect your applications 
                against quantum threats today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  Get Free API Key
                  <Key className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View All SDKs
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}