"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Copy, 
  CheckCircle, 
  Download,
  ExternalLink,
  BookOpen,
  Zap,
  Shield,
  Database,
  Heart,
  Globe,
  Smartphone,
  Monitor,
  Server,
  Github,
  Package,
  Terminal,
  FileText,
  Play,
  Star
} from 'lucide-react';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  platform: string;
  language: string;
  framework?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  code: string;
  explanation: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface SDK {
  id: string;
  name: string;
  language: string;
  platform: string[];
  version: string;
  downloads: string;
  stars: number;
  description: string;
  installCommand: string;
  quickStart: string;
  icon: any;
  color: string;
}

const codeExamples: CodeExample[] = [
  {
    id: 'shield_basic_encryption',
    title: 'Basic Data Encryption',
    description: 'Encrypt sensitive user data with quantum-safe algorithms',
    platform: 'shield',
    language: 'javascript',
    framework: 'Node.js',
    difficulty: 'beginner',
    tags: ['encryption', 'quantum-safe', 'user-data'],
    explanation: 'This example shows how to encrypt user data using CRYSTALS-Kyber, a quantum-safe encryption algorithm. The encrypted data can be safely stored in your database.',
    code: `const { Shield } = require('@qubitcore/shield');

// Initialize Shield with your API key
const shield = new Shield({
  apiKey: process.env.QUBITCORE_API_KEY,
  environment: 'production'
});

async function encryptUserData(userData) {
  try {
    // Encrypt the data with quantum-safe algorithm
    const result = await shield.encrypt({
      data: JSON.stringify(userData),
      algorithm: 'CRYSTALS-Kyber',
      metadata: {
        purpose: 'user_profile',
        retention: '7_years'
      }
    });
    
    console.log('✅ Data encrypted successfully');
    console.log('Key ID:', result.keyId);
    console.log('Algorithm:', result.algorithm);
    
    // Store the encrypted data in your database
    await database.users.update(userData.id, {
      encryptedData: result.ciphertext,
      keyId: result.keyId
    });
    
    return result;
  } catch (error) {
    console.error('❌ Encryption failed:', error.message);
    throw error;
  }
}

// Example usage
const userData = {
  id: 'user_123',
  email: 'user@example.com',
  personalInfo: {
    name: 'John Doe',
    ssn: '123-45-6789',
    address: '123 Main St, City, State'
  }
};

encryptUserData(userData);`,
    githubUrl: 'https://github.com/qubitcore/examples/shield-basic-encryption',
    demoUrl: 'https://demo.qubitcore.com/shield/encryption'
  },
  {
    id: 'aegis_patient_data',
    title: 'HIPAA-Compliant Patient Data',
    description: 'Encrypt patient health information with full HIPAA compliance',
    platform: 'aegis',
    language: 'python',
    framework: 'Django',
    difficulty: 'intermediate',
    tags: ['healthcare', 'HIPAA', 'patient-data', 'compliance'],
    explanation: 'This example demonstrates how to encrypt patient health information in compliance with HIPAA regulations. Aegis automatically handles compliance requirements and audit logging.',
    code: `from qubitcore import Aegis
from django.conf import settings
import json

# Initialize Aegis for healthcare
aegis = Aegis(
    api_key=settings.AEGIS_API_KEY,
    environment='healthcare',
    compliance=['HIPAA', 'GDPR']
)

class PatientDataManager:
    def __init__(self):
        self.aegis = aegis
    
    async def encrypt_patient_data(self, patient_id, health_data):
        """
        Encrypt patient health information with HIPAA compliance
        """
        try:
            # Validate patient data before encryption
            self._validate_patient_data(health_data)
            
            # Encrypt with Aegis
            result = await self.aegis.patient.encrypt(
                patient_id=patient_id,
                health_data=health_data,
                compliance=['HIPAA', 'GDPR'],
                retention='lifetime',  # Patient data kept for lifetime
                access_controls={
                    'authorized_roles': ['doctor', 'nurse', 'patient'],
                    'emergency_access': True
                }
            )
            
            # Log the encryption event for audit trail
            await self._log_encryption_event(patient_id, result.audit_id)
            
            print(f"✅ Patient data encrypted successfully")
            print(f"Patient ID: {patient_id}")
            print(f"Key ID: {result.key_id}")
            print(f"Audit ID: {result.audit_id}")
            
            return {
                'encrypted_data': result.encrypted_data,
                'key_id': result.key_id,
                'audit_id': result.audit_id,
                'compliance_verified': result.compliance_status
            }
            
        except Exception as e:
            print(f"❌ Patient data encryption failed: {str(e)}")
            raise
    
    def _validate_patient_data(self, health_data):
        """Validate patient data structure"""
        required_fields = ['patient_id', 'medical_record_number']
        for field in required_fields:
            if field not in health_data:
                raise ValueError(f"Missing required field: {field}")
    
    async def _log_encryption_event(self, patient_id, audit_id):
        """Log encryption event for compliance audit"""
        # Your audit logging implementation
        pass

# Example usage
patient_manager = PatientDataManager()

patient_health_data = {
    'patient_id': 'P123456',
    'medical_record_number': 'MRN789012',
    'demographics': {
        'name': 'Jane Smith',
        'dob': '1985-03-15',
        'gender': 'F'
    },
    'medical_history': {
        'diagnoses': ['Hypertension', 'Type 2 Diabetes'],
        'medications': [
            {'name': 'Lisinopril', 'dosage': '10mg', 'frequency': 'daily'},
            {'name': 'Metformin', 'dosage': '500mg', 'frequency': 'twice daily'}
        ],
        'allergies': ['Penicillin', 'Shellfish']
    },
    'vitals': {
        'blood_pressure': '140/90',
        'heart_rate': 78,
        'temperature': 98.6,
        'weight': 165
    }
}

# Encrypt the patient data
encrypted_result = await patient_manager.encrypt_patient_data(
    'P123456', 
    patient_health_data
)`,
    githubUrl: 'https://github.com/qubitcore/examples/aegis-patient-data',
    demoUrl: 'https://demo.qubitcore.com/aegis/patient-encryption'
  },
  {
    id: 'ledger_quantum_transaction',
    title: 'Quantum-Safe Blockchain Transaction',
    description: 'Create secure blockchain transactions resistant to quantum attacks',
    platform: 'ledger',
    language: 'go',
    difficulty: 'advanced',
    tags: ['blockchain', 'quantum-safe', 'transactions', 'cryptography'],
    explanation: 'This example shows how to create quantum-resistant blockchain transactions using post-quantum cryptographic signatures. The transaction will remain secure even against future quantum computers.',
    code: `package main

import (
    "context"
    "fmt"
    "log"
    "math/big"
    
    "github.com/qubitcore/go-sdk/ledger"
)

type QuantumSafeWallet struct {
    client *ledger.Client
    address string
    privateKey string
}

func NewQuantumSafeWallet(apiKey, privateKey string) *QuantumSafeWallet {
    client := ledger.NewClient(apiKey)
    
    // Generate quantum-safe address from private key
    address, err := client.GenerateAddress(privateKey, ledger.AlgorithmDilithium)
    if err != nil {
        log.Fatal("Failed to generate address:", err)
    }
    
    return &QuantumSafeWallet{
        client: client,
        address: address,
        privateKey: privateKey,
    }
}

func (w *QuantumSafeWallet) SendQuantumSafeTransaction(
    ctx context.Context,
    toAddress string,
    amount *big.Int,
    data []byte,
) (*ledger.Transaction, error) {
    
    // Create transaction with quantum-safe parameters
    txParams := &ledger.TransactionParams{
        From:      w.address,
        To:        toAddress,
        Amount:    amount,
        Data:      data,
        Algorithm: ledger.AlgorithmDilithium, // Post-quantum signature
        GasLimit:  21000,
    }
    
    // Get current nonce
    nonce, err := w.client.GetNonce(ctx, w.address)
    if err != nil {
        return nil, fmt.Errorf("failed to get nonce: %w", err)
    }
    txParams.Nonce = nonce
    
    // Estimate gas price
    gasPrice, err := w.client.EstimateGasPrice(ctx)
    if err != nil {
        return nil, fmt.Errorf("failed to estimate gas price: %w", err)
    }
    txParams.GasPrice = gasPrice
    
    // Sign transaction with quantum-safe signature
    signedTx, err := w.client.SignTransaction(ctx, txParams, w.privateKey)
    if err != nil {
        return nil, fmt.Errorf("failed to sign transaction: %w", err)
    }
    
    // Broadcast transaction to quantum-safe network
    tx, err := w.client.BroadcastTransaction(ctx, signedTx)
    if err != nil {
        return nil, fmt.Errorf("failed to broadcast transaction: %w", err)
    }
    
    fmt.Printf("✅ Quantum-safe transaction sent successfully\\n")
    fmt.Printf("Transaction Hash: %s\\n", tx.Hash)
    fmt.Printf("From: %s\\n", tx.From)
    fmt.Printf("To: %s\\n", tx.To)
    fmt.Printf("Amount: %s\\n", tx.Amount.String())
    fmt.Printf("Signature Algorithm: %s\\n", tx.SignatureAlgorithm)
    
    return tx, nil
}

func (w *QuantumSafeWallet) WaitForConfirmation(
    ctx context.Context,
    txHash string,
    confirmations int,
) (*ledger.Receipt, error) {
    
    fmt.Printf("⏳ Waiting for %d confirmations...\\n", confirmations)
    
    receipt, err := w.client.WaitForConfirmation(
        ctx,
        txHash,
        confirmations,
        ledger.WithTimeout(300), // 5 minutes timeout
    )
    if err != nil {
        return nil, fmt.Errorf("failed to wait for confirmation: %w", err)
    }
    
    fmt.Printf("✅ Transaction confirmed!\\n")
    fmt.Printf("Block Number: %d\\n", receipt.BlockNumber)
    fmt.Printf("Gas Used: %d\\n", receipt.GasUsed)
    fmt.Printf("Status: %s\\n", receipt.Status)
    
    return receipt, nil
}

func main() {
    // Initialize quantum-safe wallet
    wallet := NewQuantumSafeWallet(
        "your_api_key_here",
        "your_private_key_here",
    )
    
    ctx := context.Background()
    
    // Send quantum-safe payment
    toAddress := "qc1recipient123456789abcdef"
    amount := big.NewInt(1000000) // 1 QC token
    data := []byte("Quantum-safe payment")
    
    tx, err := wallet.SendQuantumSafeTransaction(
        ctx,
        toAddress,
        amount,
        data,
    )
    if err != nil {
        log.Fatal("Transaction failed:", err)
    }
    
    // Wait for confirmation
    receipt, err := wallet.WaitForConfirmation(ctx, tx.Hash, 3)
    if err != nil {
        log.Fatal("Confirmation failed:", err)
    }
    
    fmt.Printf("🎉 Payment completed successfully!\\n")
    fmt.Printf("Final Status: %s\\n", receipt.Status)
}`,
    githubUrl: 'https://github.com/qubitcore/examples/ledger-quantum-transaction',
    demoUrl: 'https://demo.qubitcore.com/ledger/quantum-transaction'
  }
];

const sdks: SDK[] = [
  {
    id: 'javascript',
    name: '@qubitcore/shield',
    language: 'JavaScript',
    platform: ['shield', 'aegis', 'ledger', 'synapse'],
    version: '2.1.0',
    downloads: '50K+',
    stars: 1247,
    description: 'Official JavaScript SDK for all QubitCore platforms with TypeScript support',
    installCommand: 'npm install @qubitcore/shield @qubitcore/aegis @qubitcore/ledger @qubitcore/synapse',
    quickStart: `const { Shield } = require('@qubitcore/shield');
const shield = new Shield({ apiKey: 'your_key' });
const encrypted = await shield.encrypt({ data: 'secret' });`,
    icon: Code,
    color: 'yellow'
  },
  {
    id: 'python',
    name: 'qubitcore-python',
    language: 'Python',
    platform: ['shield', 'aegis', 'ledger', 'synapse'],
    version: '1.8.2',
    downloads: '35K+',
    stars: 892,
    description: 'Python SDK with async/await support and Django integration',
    installCommand: 'pip install qubitcore',
    quickStart: `from qubitcore import Shield
shield = Shield(api_key='your_key')
encrypted = await shield.encrypt(data='secret')`,
    icon: Terminal,
    color: 'blue'
  },
  {
    id: 'go',
    name: 'qubitcore-go',
    language: 'Go',
    platform: ['shield', 'ledger'],
    version: '1.5.1',
    downloads: '15K+',
    stars: 456,
    description: 'High-performance Go SDK optimized for blockchain and encryption',
    installCommand: 'go get github.com/qubitcore/go-sdk',
    quickStart: `import "github.com/qubitcore/go-sdk/shield"
client := shield.NewClient("your_key")
result, err := client.Encrypt(ctx, data)`,
    icon: Server,
    color: 'cyan'
  },
  {
    id: 'rust',
    name: 'qubitcore-rust',
    language: 'Rust',
    platform: ['shield', 'ledger'],
    version: '0.9.3',
    downloads: '8K+',
    stars: 234,
    description: 'Memory-safe Rust SDK for high-security applications',
    installCommand: 'cargo add qubitcore',
    quickStart: `use qubitcore::Shield;
let shield = Shield::new("your_key");
let encrypted = shield.encrypt(data).await?;`,
    icon: Shield,
    color: 'orange'
  },
  {
    id: 'csharp',
    name: 'QubitCore.NET',
    language: 'C#',
    platform: ['shield', 'aegis', 'ledger'],
    version: '2.0.1',
    downloads: '12K+',
    stars: 318,
    description: '.NET SDK with full async support and enterprise features',
    installCommand: 'dotnet add package QubitCore.Shield',
    quickStart: `using QubitCore.Shield;
var shield = new ShieldClient("your_key");
var encrypted = await shield.EncryptAsync(data);`,
    icon: Code,
    color: 'purple'
  },
  {
    id: 'java',
    name: 'qubitcore-java',
    language: 'Java',
    platform: ['shield', 'aegis', 'ledger'],
    version: '1.7.4',
    downloads: '18K+',
    stars: 567,
    description: 'Enterprise Java SDK with Spring Boot integration',
    installCommand: 'implementation "com.qubitcore:shield-java:1.7.4"',
    quickStart: `import com.qubitcore.Shield;
Shield shield = new Shield("your_key");
CompletableFuture<String> encrypted = shield.encryptAsync(data);`,
    icon: Database,
    color: 'red'
  },
  {
    id: 'php',
    name: 'qubitcore-php',
    language: 'PHP',
    platform: ['shield', 'aegis'],
    version: '1.4.2',
    downloads: '9K+',
    stars: 156,
    description: 'PHP SDK with Laravel and Symfony integration',
    installCommand: 'composer require qubitcore/shield',
    quickStart: `use QubitCore\\Shield;
$shield = new Shield('your_key');
$encrypted = $shield->encrypt($data);`,
    icon: Globe,
    color: 'indigo'
  },
  {
    id: 'ruby',
    name: 'qubitcore-ruby',
    language: 'Ruby',
    platform: ['shield', 'aegis'],
    version: '1.3.1',
    downloads: '6K+',
    stars: 123,
    description: 'Ruby SDK with Rails integration and ActiveRecord support',
    installCommand: 'gem install qubitcore',
    quickStart: `require 'qubitcore'
shield = QubitCore::Shield.new('your_key')
encrypted = shield.encrypt(data)`,
    icon: Terminal,
    color: 'red'
  }
];

export function CodeExamples() {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(codeExamples[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'shield' | 'aegis' | 'ledger' | 'synapse'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredExamples = selectedPlatform === 'all' 
    ? codeExamples 
    : codeExamples.filter(example => example.platform === selectedPlatform);

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-white to-purple-50">
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
            <Code className="w-4 h-4 mr-2" />
            CODE EXAMPLES & SDKS
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Start Building in Minutes
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Copy-paste code examples, download SDKs, and integrate quantum-safe security 
            into your applications with our comprehensive developer resources.
          </p>
        </motion.div>   
     {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="examples" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Code Examples
              </TabsTrigger>
              <TabsTrigger value="sdks" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                SDKs & Libraries
              </TabsTrigger>
            </TabsList>

            {/* Code Examples Tab */}
            <TabsContent value="examples" className="space-y-8">
              {/* Platform Filter */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant={selectedPlatform === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('all')}
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  All Platforms
                </Button>
                <Button
                  variant={selectedPlatform === 'shield' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('shield')}
                  className="flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Shield
                </Button>
                <Button
                  variant={selectedPlatform === 'aegis' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('aegis')}
                  className="flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Aegis
                </Button>
                <Button
                  variant={selectedPlatform === 'ledger' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('ledger')}
                  className="flex items-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  Ledger
                </Button>
              </div>

              {/* Examples Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Example List */}
                <div className="lg:col-span-1">
                  <Card className="bg-white shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredExamples.map((example) => (
                          <motion.div
                            key={example.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedExample(example)}
                            className={`
                              p-4 rounded-lg border cursor-pointer transition-all
                              ${selectedExample.id === example.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-slate-200 hover:border-slate-300'
                              }
                            `}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 text-sm">
                                  {example.title}
                                </h3>
                                <Badge className={getDifficultyColor(example.difficulty)}>
                                  {example.difficulty}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-slate-600">
                                {example.description}
                              </p>
                              
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {example.language}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {example.platform}
                                </Badge>
                                {example.framework && (
                                  <Badge variant="outline" className="text-xs">
                                    {example.framework}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {example.tags.slice(0, 3).map((tag) => (
                                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Example Details */}
                <div className="lg:col-span-2">
                  <Card className="bg-white shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">{selectedExample.title}</CardTitle>
                          <p className="text-slate-600 mt-1">{selectedExample.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedExample.githubUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(selectedExample.githubUrl, '_blank')}
                              className="flex items-center gap-2"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </Button>
                          )}
                          {selectedExample.demoUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(selectedExample.demoUrl, '_blank')}
                              className="flex items-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Demo
                            </Button>
                          )}
                          <Button
                            onClick={() => copyToClipboard(selectedExample.code, selectedExample.id)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            {copiedCode === selectedExample.id ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            {copiedCode === selectedExample.id ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Badge variant="outline">{selectedExample.language}</Badge>
                        <Badge variant="secondary">{selectedExample.platform}</Badge>
                        {selectedExample.framework && (
                          <Badge variant="outline">{selectedExample.framework}</Badge>
                        )}
                        <Badge className={getDifficultyColor(selectedExample.difficulty)}>
                          {selectedExample.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        {/* Explanation */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">What this example does:</h4>
                          <p className="text-slate-600">{selectedExample.explanation}</p>
                        </div>

                        {/* Code */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Code:</h4>
                          <div className="relative">
                            <div className="absolute top-3 right-3 z-10">
                              <Button
                                onClick={() => copyToClipboard(selectedExample.code, `code-${selectedExample.id}`)}
                                variant="outline"
                                size="sm"
                                className="bg-white/90 backdrop-blur-sm"
                              >
                                {copiedCode === `code-${selectedExample.id}` ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                              <pre className="text-sm text-slate-100">
                                <code>{selectedExample.code}</code>
                              </pre>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Tags:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedExample.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* SDKs Tab */}
            <TabsContent value="sdks" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sdks.map((sdk) => {
                  const IconComponent = sdk.icon;
                  return (
                    <Card key={sdk.id} className="bg-white shadow-xl">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${sdk.color}-100`}>
                              <IconComponent className={`w-6 h-6 text-${sdk.color}-600`} />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{sdk.name}</CardTitle>
                              <p className="text-sm text-slate-600">{sdk.language} SDK</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              v{sdk.version}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Star className="w-3 h-3" />
                              {sdk.stars}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-slate-600">{sdk.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>{sdk.downloads} downloads</span>
                            <span>•</span>
                            <span>{sdk.platform.length} platforms</span>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Installation:</h4>
                            <div className="bg-slate-900 p-3 rounded-lg">
                              <code className="text-sm text-slate-100">
                                {sdk.installCommand}
                              </code>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Quick Start:</h4>
                            <div className="bg-slate-900 p-3 rounded-lg">
                              <pre className="text-sm text-slate-100">
                                <code>{sdk.quickStart}</code>
                              </pre>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://github.com/qubitcore/${sdk.id}-sdk`, '_blank')}
                              className="flex items-center gap-2"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://docs.qubitcore.com/${sdk.id}`, '_blank')}
                              className="flex items-center gap-2"
                            >
                              <BookOpen className="w-4 h-4" />
                              Docs
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* SDK Comparison */}
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">SDK Feature Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Language</th>
                          <th className="text-left py-3 px-4">Shield</th>
                          <th className="text-left py-3 px-4">Aegis</th>
                          <th className="text-left py-3 px-4">Ledger</th>
                          <th className="text-left py-3 px-4">Synapse</th>
                          <th className="text-left py-3 px-4">Async/Await</th>
                          <th className="text-left py-3 px-4">TypeScript</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">JavaScript</td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Python</td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4">Type Hints</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-medium">Go</td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4">-</td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4">-</td>
                          <td className="py-3 px-4">Context</td>
                          <td className="py-3 px-4">Native</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Rust</td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4">-</td>
                          <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-600" /></td>
                          <td className="py-3 px-4">-</td>
                          <td className="py-3 px-4">Tokio</td>
                          <td className="py-3 px-4">Native</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-green-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Start Building with QubitCore
              </h3>
              <p className="text-xl mb-6 text-purple-100">
                Choose your preferred language, copy the examples, and add quantum-safe security 
                to your applications in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-purple-600">
                  Get Free API Key
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Browse All Examples
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