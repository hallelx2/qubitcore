"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Circle, 
  Play, 
  Code, 
  Key, 
  Shield, 
  Zap,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Star,
  Clock,
  Target,
  Rocket,
  BookOpen,
  Terminal,
  Copy,
  Check
} from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objective: string;
  codeExample: string;
  apiEndpoint: string;
  expectedOutput: any;
  tips: string[];
  nextSteps: string[];
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'hello-world',
    title: 'Hello Quantum Security',
    description: 'Make your first quantum-safe API call in under 30 seconds',
    duration: '2 minutes',
    difficulty: 'beginner',
    objective: 'Successfully encrypt a simple message using Shield API',
    codeExample: `// Your first quantum-safe encryption
const { Shield } = require('@qubitcore/shield');

async function helloQuantumSecurity() {
  const message = "Hello, quantum-safe world!";
  
  const encrypted = await Shield.encrypt({
    data: message,
    algorithm: 'CRYSTALS-Kyber-512'
  });
  
  console.log('Encrypted:', encrypted.ciphertext);
  return encrypted;
}

helloQuantumSecurity();`,
    apiEndpoint: 'POST /v1/shield/encrypt',
    expectedOutput: {
      ciphertext: "kyber_encrypted_hello_world...",
      keyId: "temp-key-123",
      algorithm: "CRYSTALS-Kyber-512"
    },
    tips: [
      'Start with Kyber-512 for learning - it\'s the fastest quantum-safe algorithm',
      'The API automatically generates temporary keys for quick testing',
      'Your encrypted data is quantum-resistant for decades'
    ],
    nextSteps: [
      'Try encrypting different types of data',
      'Experiment with different Kyber variants',
      'Learn about key management'
    ],
    completed: false
  },
  {
    id: 'key-management',
    title: 'Master Key Management',
    description: 'Learn to create, manage, and rotate quantum-safe keys',
    duration: '5 minutes',
    difficulty: 'beginner',
    objective: 'Create a persistent key and use it for encryption/decryption',
    codeExample: `// Create and manage quantum-safe keys
const { Shield } = require('@qubitcore/shield');

async function keyManagementDemo() {
  // 1. Create a new key
  const keyResponse = await Shield.keys.create({
    algorithm: 'CRYSTALS-Kyber-1024',
    name: 'my-app-key',
    usage: ['encrypt', 'decrypt']
  });
  
  console.log('Key created:', keyResponse.keyId);
  
  // 2. Encrypt with your key
  const encrypted = await Shield.encrypt({
    data: "Sensitive user data",
    keyId: keyResponse.keyId
  });
  
  // 3. Decrypt with the same key
  const decrypted = await Shield.decrypt({
    ciphertext: encrypted.ciphertext,
    keyId: keyResponse.keyId
  });
  
  console.log('Decrypted:', decrypted.plaintext);
  
  return { keyId: keyResponse.keyId, decrypted: decrypted.plaintext };
}`,
    apiEndpoint: 'POST /v1/shield/keys',
    expectedOutput: {
      keyId: "key_abc123def456",
      algorithm: "CRYSTALS-Kyber-1024",
      name: "my-app-key",
      status: "active"
    },
    tips: [
      'Use Kyber-1024 for production applications - maximum security',
      'Name your keys descriptively for easy management',
      'Keys can be rotated without breaking existing encrypted data'
    ],
    nextSteps: [
      'Implement key rotation in your app',
      'Set up key usage policies',
      'Learn about key backup strategies'
    ],
    completed: false
  },
  {
    id: 'digital-signatures',
    title: 'Unforgeable Digital Signatures',
    description: 'Create quantum-resistant digital signatures for data integrity',
    duration: '7 minutes',
    difficulty: 'intermediate',
    objective: 'Sign and verify documents with quantum-safe signatures',
    codeExample: `// Quantum-safe digital signatures
const { Shield } = require('@qubitcore/shield');

async function digitalSignatureDemo() {
  // 1. Create a signing key
  const signingKey = await Shield.keys.create({
    algorithm: 'CRYSTALS-Dilithium-3',
    name: 'document-signer',
    usage: ['sign', 'verify']
  });
  
  const document = {
    title: "Important Contract",
    content: "Terms and conditions...",
    timestamp: new Date().toISOString()
  };
  
  // 2. Sign the document
  const signature = await Shield.sign({
    data: JSON.stringify(document),
    keyId: signingKey.keyId,
    format: 'base64'
  });
  
  console.log('Document signed:', signature.signature);
  
  // 3. Verify the signature
  const verification = await Shield.verify({
    data: JSON.stringify(document),
    signature: signature.signature,
    keyId: signingKey.keyId
  });
  
  console.log('Signature valid:', verification.valid);
  
  return {
    document,
    signature: signature.signature,
    verified: verification.valid
  };
}`,
    apiEndpoint: 'POST /v1/shield/sign',
    expectedOutput: {
      signature: "dilithium_signature_data_here...",
      keyId: "key_signing_789",
      algorithm: "CRYSTALS-Dilithium-3",
      valid: true
    },
    tips: [
      'Dilithium-3 offers the best balance of security and performance',
      'Always verify signatures before trusting signed data',
      'Signatures remain valid even after quantum computers arrive'
    ],
    nextSteps: [
      'Implement signature verification in your API',
      'Add timestamping to signatures',
      'Learn about signature policies'
    ],
    completed: false
  },
  {
    id: 'production-ready',
    title: 'Production-Ready Integration',
    description: 'Build a complete quantum-safe application with error handling',
    duration: '15 minutes',
    difficulty: 'advanced',
    objective: 'Create a robust application with proper error handling and monitoring',
    codeExample: `// Production-ready quantum-safe application
const { Shield } = require('@qubitcore/shield');

class QuantumSafeApp {
  constructor(apiKey) {
    this.shield = new Shield({ 
      apiKey,
      timeout: 5000,
      retries: 3 
    });
    this.appKey = null;
  }
  
  async initialize() {
    try {
      // Create application key with proper error handling
      this.appKey = await this.shield.keys.create({
        algorithm: 'CRYSTALS-Kyber-1024',
        name: \`app-key-\${Date.now()}\`,
        usage: ['encrypt', 'decrypt'],
        metadata: {
          environment: process.env.NODE_ENV,
          version: '1.0.0'
        }
      });
      
      console.log('✅ App initialized with quantum-safe key');
      return true;
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
      throw error;
    }
  }
  
  async secureUserData(userData) {
    try {
      // Validate input
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data provided');
      }
      
      // Encrypt with monitoring
      const startTime = Date.now();
      const encrypted = await this.shield.encrypt({
        data: JSON.stringify(userData),
        keyId: this.appKey.keyId,
        metadata: {
          userId: userData.id,
          timestamp: new Date().toISOString()
        }
      });
      
      const duration = Date.now() - startTime;
      console.log(\`🔒 Data encrypted in \${duration}ms\`);
      
      return {
        success: true,
        ciphertext: encrypted.ciphertext,
        keyId: encrypted.keyId,
        encryptionTime: duration
      };
      
    } catch (error) {
      console.error('❌ Encryption failed:', error.message);
      
      // Implement fallback or retry logic
      if (error.code === 'RATE_LIMIT_EXCEEDED') {
        await this.delay(1000);
        return this.secureUserData(userData);
      }
      
      throw error;
    }
  }
  
  async retrieveUserData(ciphertext, keyId) {
    try {
      const decrypted = await this.shield.decrypt({
        ciphertext,
        keyId
      });
      
      return {
        success: true,
        data: JSON.parse(decrypted.plaintext)
      };
      
    } catch (error) {
      console.error('❌ Decryption failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example
async function main() {
  const app = new QuantumSafeApp(process.env.QUBITCORE_API_KEY);
  
  await app.initialize();
  
  const userData = {
    id: 'user_123',
    email: 'user@example.com',
    preferences: { theme: 'dark' }
  };
  
  const encrypted = await app.secureUserData(userData);
  const decrypted = await app.retrieveUserData(
    encrypted.ciphertext, 
    encrypted.keyId
  );
  
  console.log('🎉 Production app working!');
}`,
    apiEndpoint: 'Multiple endpoints',
    expectedOutput: {
      initialized: true,
      encrypted: true,
      decrypted: true,
      performance: "< 100ms average",
      errorHandling: "Robust"
    },
    tips: [
      'Always implement proper error handling and retries',
      'Monitor encryption/decryption performance',
      'Use metadata for tracking and debugging',
      'Implement rate limiting and backoff strategies'
    ],
    nextSteps: [
      'Deploy to production environment',
      'Set up monitoring and alerting',
      'Implement key rotation schedule',
      'Add comprehensive logging'
    ],
    completed: false
  }
];

const achievements: Achievement[] = [
  {
    id: 'first-encryption',
    title: 'Quantum Pioneer',
    description: 'Made your first quantum-safe encryption',
    icon: <Shield className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'key-master',
    title: 'Key Master',
    description: 'Created and managed quantum-safe keys',
    icon: <Key className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'signature-expert',
    title: 'Signature Expert',
    description: 'Mastered quantum-resistant digital signatures',
    icon: <Trophy className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'production-hero',
    title: 'Production Hero',
    description: 'Built a production-ready quantum-safe application',
    icon: <Rocket className="w-6 h-6" />,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  }
];

interface DeveloperJourneyProps {
  currentStep?: number;
  totalSteps?: number;
  onStepComplete?: (step: number) => void;
}

export function DeveloperJourney({ 
  currentStep = 0, 
  totalSteps = tutorialSteps.length,
  onStepComplete 
}: DeveloperJourneyProps) {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [steps, setSteps] = useState(tutorialSteps);
  const [userAchievements, setUserAchievements] = useState(achievements);
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentTutorialStep = steps[activeStep];
  const progress = ((activeStep + 1) / totalSteps) * 100;
  const completedSteps = steps.filter(step => step.completed).length;

  useEffect(() => {
    setUserCode(currentTutorialStep?.codeExample || '');
  }, [activeStep, currentTutorialStep]);

  const handleStepComplete = () => {
    const updatedSteps = [...steps];
    updatedSteps[activeStep].completed = true;
    setSteps(updatedSteps);

    // Unlock achievement
    const updatedAchievements = [...userAchievements];
    if (updatedAchievements[activeStep]) {
      updatedAchievements[activeStep].unlocked = true;
      updatedAchievements[activeStep].progress = 1;
    }
    setUserAchievements(updatedAchievements);

    onStepComplete?.(activeStep);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate API call
    setTimeout(() => {
      setOutput(currentTutorialStep.expectedOutput);
      setIsRunning(false);
      
      if (!currentTutorialStep.completed) {
        handleStepComplete();
      }
    }, 2000);
  };

  const handleNextStep = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(userCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            DEVELOPER JOURNEY
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            From Hello World to Production Ready
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Master quantum-safe development with hands-on tutorials. 
            Build real applications while earning achievements.
          </p>

          {/* Progress Overview */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedSteps}</div>
              <div className="text-sm text-slate-500">Completed</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{totalSteps}</div>
              <div className="text-sm text-slate-500">Total Steps</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Math.round(progress)}%</div>
              <div className="text-sm text-slate-500">Progress</div>
            </div>
          </div>

          <Progress value={progress} className="h-3 max-w-md mx-auto" />
        </motion.div>

        {/* Step Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Tutorial Steps</h2>
                <Badge className="bg-blue-600">
                  Step {activeStep + 1} of {totalSteps}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(index)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${activeStep === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : step.completed 
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : activeStep === index ? (
                        <Circle className="w-5 h-5 text-blue-600 fill-current" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-sm font-semibold">Step {index + 1}</span>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-600 mb-2">{step.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          step.difficulty === 'beginner' ? 'border-green-300 text-green-700' :
                          step.difficulty === 'intermediate' ? 'border-yellow-300 text-yellow-700' :
                          'border-red-300 text-red-700'
                        }`}
                      >
                        {step.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Tutorial Content */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{currentTutorialStep.title}</CardTitle>
                    <p className="text-slate-600">{currentTutorialStep.description}</p>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Target className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <strong>Objective:</strong> {currentTutorialStep.objective}
                  </AlertDescription>
                </Alert>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">💡 Pro Tips</h3>
                  <ul className="space-y-2">
                    {currentTutorialStep.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">🚀 Next Steps</h3>
                  <ul className="space-y-2">
                    {currentTutorialStep.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-slate-600" />
                    <CardTitle>Interactive Code Editor</CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCode}
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isRunning ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Run Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="font-mono text-sm min-h-[300px] bg-slate-50"
                  placeholder="Your code will appear here..."
                />

                {/* Output */}
                {output && (
                  <div>
                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Output:
                    </Label>
                    <Card className="bg-slate-900 text-green-400">
                      <CardContent className="p-4">
                        <pre className="text-sm overflow-x-auto">
                          {JSON.stringify(output, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={activeStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </Button>

          <div className="flex items-center gap-4">
            {currentTutorialStep.completed && (
              <Badge className="bg-green-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </Badge>
            )}
          </div>

          <Button
            onClick={handleNextStep}
            disabled={activeStep === totalSteps - 1}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      p-4 rounded-lg border-2 transition-all
                      ${achievement.unlocked 
                        ? 'border-yellow-400 bg-yellow-400/20' 
                        : 'border-white/30 bg-white/10'
                      }
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto
                      ${achievement.unlocked ? 'bg-yellow-400 text-purple-900' : 'bg-white/20 text-white/60'}
                    `}>
                      {achievement.icon}
                    </div>
                    
                    <h3 className="font-semibold text-center mb-1">{achievement.title}</h3>
                    <p className="text-sm text-center text-white/80">{achievement.description}</p>
                    
                    {achievement.unlocked && (
                      <div className="text-center mt-2">
                        <Badge className="bg-yellow-400 text-purple-900">
                          Unlocked!
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}