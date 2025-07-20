"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Brain, 
  Users, 
  Network, 
  Shield,
  Database,
  Code,
  Terminal,
  CheckCircle,
  Copy,
  Globe,
  Cpu,
  Share,
  Lock,
  Activity,
  BarChart3
} from 'lucide-react';

interface SynapseEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  category: 'projects' | 'data-sharing' | 'computation' | 'federated-learning' | 'privacy';
  privacyLevel: 'public' | 'private' | 'confidential' | 'top-secret';
  examples: LanguageExample[];
  useCases: string[];
}

interface LanguageExample {
  language: string;
  framework?: string;
  title: string;
  description: string;
  code: string;
  installCommand?: string;
}

const synapseEndpoints: SynapseEndpoint[] = [
  {
    id: 'create_project',
    method: 'POST',
    path: '/v1/synapse/project/create',
    title: 'Create Collaborative Project',
    description: 'Create a secure collaborative AI project with multiple participants',
    category: 'projects',
    privacyLevel: 'confidential',
    useCases: [
      'Multi-party machine learning',
      'Federated learning networks',
      'Collaborative research projects',
      'Cross-organization AI development'
    ],
    examples: [
      {
        language: 'python',
        framework: 'TensorFlow',
        title: 'Federated Learning Project',
        description: 'Create a federated learning project for collaborative model training',
        installCommand: 'pip install qubitcore[synapse] tensorflow-federated',
        code: `import tensorflow as tf
import tensorflow_federated as tff
from qubitcore import Synapse

# Initialize Synapse for collaborative AI
synapse = Synapse(
    api_key='your_synapse_api_key',
    environment='research'
)

class FederatedLearningProject:
    def __init__(self, project_name, participants):
        self.project_name = project_name
        self.participants = participants
        self.synapse = synapse
    
    async def create_project(self):
        """Create a federated learning project with privacy preservation"""
        try:
            # Define the federated learning configuration
            fl_config = {
                'model_architecture': {
                    'type': 'neural_network',
                    'layers': [
                        {'type': 'dense', 'units': 128, 'activation': 'relu'},
                        {'type': 'dropout', 'rate': 0.2},
                        {'type': 'dense', 'units': 64, 'activation': 'relu'},
                        {'type': 'dense', 'units': 10, 'activation': 'softmax'}
                    ]
                },
                'training_config': {
                    'rounds': 100,
                    'local_epochs': 5,
                    'batch_size': 32,
                    'learning_rate': 0.001
                },
                'privacy_config': {
                    'differential_privacy': True,
                    'noise_multiplier': 1.1,
                    'l2_norm_clip': 1.0,
                    'secure_aggregation': True
                }
            }
            
            # Create the collaborative project
            project = await self.synapse.project.create({
                'name': self.project_name,
                'type': 'federated_learning',
                'participants': self.participants,
                'privacy_level': 'confidential',
                'configuration': fl_config,
                'data_requirements': {
                    'min_samples_per_participant': 1000,
                    'data_schema': {
                        'features': 'tensor[28, 28, 1]',  # MNIST-like data
                        'labels': 'categorical[10]'
                    }
                },
                'security_settings': {
                    'quantum_safe_encryption': True,
                    'homomorphic_encryption': True,
                    'secure_multiparty_computation': True
                }
            })
            
            print(f"✅ Federated learning project created successfully")
            print(f"Project ID: {project.project_id}")
            print(f"Participants: {len(project.participants)}")
            print(f"Privacy Level: {project.privacy_level}")
            
            return project
            
        except Exception as e:
            print(f"❌ Project creation failed: {str(e)}")
            raise
    
    async def invite_participants(self, project_id, new_participants):
        """Invite new participants to the federated learning project"""
        try:
            invitations = []
            
            for participant in new_participants:
                invitation = await self.synapse.project.invite({
                    'project_id': project_id,
                    'participant_email': participant['email'],
                    'role': participant['role'],  # 'data_provider', 'model_trainer', 'validator'
                    'permissions': participant['permissions'],
                    'data_contribution_requirements': {
                        'min_samples': participant.get('min_samples', 1000),
                        'data_quality_threshold': 0.95
                    }
                })
                
                invitations.append(invitation)
            
            print(f"✅ Sent {len(invitations)} project invitations")
            return invitations
            
        except Exception as e:
            print(f"❌ Failed to send invitations: {str(e)}")
            raise

# Usage example
async def main():
    # Define project participants
    participants = [
        {
            'organization': 'University Research Lab',
            'email': 'research@university.edu',
            'role': 'model_trainer',
            'data_contribution': 'medical_images',
            'permissions': ['train', 'validate']
        },
        {
            'organization': 'Hospital Network',
            'email': 'ai-team@hospital.org',
            'role': 'data_provider',
            'data_contribution': 'patient_data',
            'permissions': ['contribute_data']
        },
        {
            'organization': 'Tech Company',
            'email': 'ml-team@techcorp.com',
            'role': 'infrastructure_provider',
            'data_contribution': 'compute_resources',
            'permissions': ['manage_infrastructure']
        }
    ]
    
    # Create federated learning project
    fl_project = FederatedLearningProject(
        project_name="Medical Image Classification FL",
        participants=participants
    )
    
    project = await fl_project.create_project()
    
    # Invite additional participants
    new_participants = [
        {
            'email': 'newlab@research.org',
            'role': 'validator',
            'permissions': ['validate_models'],
            'min_samples': 500
        }
    ]
    
    await fl_project.invite_participants(project.project_id, new_participants)

# Run the federated learning setup
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`
      },
      {
        language: 'javascript',
        framework: 'Node.js',
        title: 'Collaborative AI Platform',
        description: 'Build a collaborative AI platform with secure data sharing',
        installCommand: 'npm install @qubitcore/synapse @tensorflow/tfjs-node',
        code: `const { Synapse } = require('@qubitcore/synapse');
const tf = require('@tensorflow/tfjs-node');

// Initialize Synapse for collaborative AI
const synapse = new Synapse({
  apiKey: process.env.SYNAPSE_API_KEY,
  environment: 'production'
});

class CollaborativeAIPlatform {
  constructor() {
    this.synapse = synapse;
    this.activeProjects = new Map();
  }
  
  async createAIProject(projectConfig) {
    try {
      console.log('🚀 Creating collaborative AI project...');
      
      // Validate project configuration
      this.validateProjectConfig(projectConfig);
      
      // Create the project with privacy-preserving settings
      const project = await this.synapse.project.create({
        name: projectConfig.name,
        description: projectConfig.description,
        type: 'collaborative_ai',
        participants: projectConfig.participants,
        privacy_settings: {
          data_isolation: true,
          differential_privacy: true,
          secure_aggregation: true,
          quantum_safe_encryption: true
        },
        collaboration_rules: {
          data_sharing_policy: 'encrypted_only',
          model_sharing_policy: 'gradients_only',
          result_sharing_policy: 'aggregated_only'
        },
        compute_requirements: {
          min_participants: projectConfig.minParticipants || 3,
          max_participants: projectConfig.maxParticipants || 10,
          compute_budget: projectConfig.computeBudget,
          training_rounds: projectConfig.trainingRounds || 50
        }
      });
      
      // Set up secure communication channels
      await this.setupSecureChannels(project.projectId);
      
      // Initialize privacy-preserving protocols
      await this.initializePrivacyProtocols(project.projectId);
      
      console.log('✅ Collaborative AI project created successfully');
      console.log('Project ID:', project.projectId);
      console.log('Secure channels established');
      
      this.activeProjects.set(project.projectId, project);
      return project;
      
    } catch (error) {
      console.error('❌ Failed to create AI project:', error.message);
      throw error;
    }
  }
  
  async shareDataSecurely(projectId, dataConfig) {
    try {
      console.log('🔒 Sharing data with privacy preservation...');
      
      // Validate data before sharing
      await this.validateDataQuality(dataConfig.data);
      
      // Apply differential privacy
      const privatizedData = await this.applyDifferentialPrivacy(
        dataConfig.data, 
        dataConfig.privacyBudget || 1.0
      );
      
      // Encrypt data with quantum-safe encryption
      const encryptedData = await this.synapse.data.encrypt({
        data: privatizedData,
        encryption_type: 'homomorphic',
        participants: dataConfig.authorizedParticipants,
        access_policy: {
          purpose: 'model_training',
          duration: '30_days',
          usage_limit: dataConfig.usageLimit || 100
        }
      });
      
      // Share encrypted data with project participants
      const sharingResult = await this.synapse.data.share({
        project_id: projectId,
        encrypted_data: encryptedData.ciphertext,
        data_schema: dataConfig.schema,
        privacy_guarantees: {
          epsilon: dataConfig.privacyBudget,
          delta: 1e-5,
          mechanism: 'gaussian_noise'
        },
        metadata: {
          data_source: dataConfig.source,
          contribution_timestamp: new Date().toISOString(),
          quality_score: dataConfig.qualityScore
        }
      });
      
      console.log('✅ Data shared securely with privacy preservation');
      console.log('Sharing ID:', sharingResult.sharingId);
      console.log('Privacy budget consumed:', dataConfig.privacyBudget);
      
      return sharingResult;
      
    } catch (error) {
      console.error('❌ Secure data sharing failed:', error.message);
      throw error;
    }
  }
  
  async trainCollaborativeModel(projectId, modelConfig) {
    try {
      console.log('🧠 Starting collaborative model training...');
      
      // Initialize federated learning round
      const trainingRound = await this.synapse.training.start({
        project_id: projectId,
        model_architecture: modelConfig.architecture,
        training_config: {
          algorithm: 'federated_averaging',
          local_epochs: modelConfig.localEpochs || 5,
          batch_size: modelConfig.batchSize || 32,
          learning_rate: modelConfig.learningRate || 0.001
        },
        privacy_config: {
          secure_aggregation: true,
          differential_privacy: true,
          noise_multiplier: 1.1,
          clipping_threshold: 1.0
        }
      });
      
      console.log('Training round started:', trainingRound.roundId);
      
      // Monitor training progress
      const progressMonitor = setInterval(async () => {
        const status = await this.synapse.training.getStatus(trainingRound.roundId);
        console.log(\`Training progress: \${status.progress}% - Round \${status.currentRound}/\${status.totalRounds}\`);
        
        if (status.completed) {
          clearInterval(progressMonitor);
          console.log('✅ Collaborative training completed successfully');
          console.log('Final model accuracy:', status.finalAccuracy);
          console.log('Privacy budget remaining:', status.privacyBudgetRemaining);
        }
      }, 10000); // Check every 10 seconds
      
      return trainingRound;
      
    } catch (error) {
      console.error('❌ Collaborative training failed:', error.message);
      throw error;
    }
  }
  
  async setupSecureChannels(projectId) {
    // Set up quantum-safe communication channels between participants
    return await this.synapse.communication.setupChannels({
      project_id: projectId,
      encryption: 'post_quantum',
      authentication: 'multi_factor'
    });
  }
  
  async initializePrivacyProtocols(projectId) {
    // Initialize privacy-preserving protocols
    return await this.synapse.privacy.initialize({
      project_id: projectId,
      protocols: ['differential_privacy', 'secure_multiparty_computation', 'homomorphic_encryption']
    });
  }
  
  async validateDataQuality(data) {
    // Implement data quality validation
    const qualityMetrics = {
      completeness: this.calculateCompleteness(data),
      consistency: this.calculateConsistency(data),
      accuracy: this.calculateAccuracy(data)
    };
    
    const overallQuality = (qualityMetrics.completeness + qualityMetrics.consistency + qualityMetrics.accuracy) / 3;
    
    if (overallQuality < 0.8) {
      throw new Error(\`Data quality too low: \${overallQuality}. Minimum required: 0.8\`);
    }
    
    return qualityMetrics;
  }
  
  async applyDifferentialPrivacy(data, privacyBudget) {
    // Apply differential privacy noise to protect individual privacy
    const noiseMagnitude = Math.sqrt(2 * Math.log(1.25)) / privacyBudget;
    
    // Add calibrated noise to the data
    const privatizedData = data.map(sample => {
      return sample.map(feature => {
        const noise = this.generateGaussianNoise(0, noiseMagnitude);
        return feature + noise;
      });
    });
    
    return privatizedData;
  }
  
  generateGaussianNoise(mean, stdDev) {
    // Box-Muller transform for Gaussian noise generation
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }
  
  validateProjectConfig(config) {
    const required = ['name', 'participants', 'minParticipants'];
    for (const field of required) {
      if (!config[field]) {
        throw new Error(\`Missing required field: \${field}\`);
      }
    }
  }
}

// Usage example
async function main() {
  const platform = new CollaborativeAIPlatform();
  
  // Create a collaborative AI project
  const projectConfig = {
    name: "Healthcare AI Consortium",
    description: "Collaborative development of medical diagnosis AI",
    participants: [
      { organization: "Hospital A", email: "ai@hospitala.com", role: "data_provider" },
      { organization: "Research Lab B", email: "research@labb.edu", role: "model_developer" },
      { organization: "Tech Company C", email: "ml@techc.com", role: "infrastructure" }
    ],
    minParticipants: 3,
    maxParticipants: 8,
    computeBudget: 10000,
    trainingRounds: 100
  };
  
  const project = await platform.createAIProject(projectConfig);
  
  // Share data securely
  const dataConfig = {
    data: generateSampleData(), // Your actual data
    schema: { features: 'tensor[224, 224, 3]', labels: 'categorical[5]' },
    privacyBudget: 1.0,
    authorizedParticipants: project.participants.map(p => p.organization),
    source: "Hospital A Medical Images",
    qualityScore: 0.95,
    usageLimit: 50
  };
  
  await platform.shareDataSecurely(project.projectId, dataConfig);
  
  // Start collaborative training
  const modelConfig = {
    architecture: {
      type: 'convolutional_neural_network',
      layers: [
        { type: 'conv2d', filters: 32, kernel_size: 3, activation: 'relu' },
        { type: 'max_pooling2d', pool_size: 2 },
        { type: 'conv2d', filters: 64, kernel_size: 3, activation: 'relu' },
        { type: 'max_pooling2d', pool_size: 2 },
        { type: 'flatten' },
        { type: 'dense', units: 128, activation: 'relu' },
        { type: 'dropout', rate: 0.5 },
        { type: 'dense', units: 5, activation: 'softmax' }
      ]
    },
    localEpochs: 5,
    batchSize: 32,
    learningRate: 0.001
  };
  
  await platform.trainCollaborativeModel(project.projectId, modelConfig);
}

function generateSampleData() {
  // Generate sample data for demonstration
  return Array.from({ length: 1000 }, () => 
    Array.from({ length: 100 }, () => Math.random())
  );
}

// Run the collaborative AI platform
main().catch(console.error);`
      }
    ]
  }
];

export function SynapseDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<SynapseEndpoint>(synapseEndpoints[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getPrivacyColor = (level: string) => {
    switch (level) {
      case 'top-secret': return 'text-red-600 bg-red-50 border-red-200';
      case 'confidential': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'private': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'public': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const currentExample = selectedEndpoint.examples.find(ex => ex.language === selectedLanguage) || selectedEndpoint.examples[0];

  return (
    <div className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
            <Zap className="w-4 h-4 mr-2" />
            SYNAPSE COLLABORATION API
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Privacy-Preserving Collaborative AI
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Build federated learning networks and collaborative AI projects with quantum-safe 
            privacy preservation. Enable secure multi-party computation without compromising data.
          </p>
        </motion.div>    
    {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Federated Learning</h3>
              <p className="text-sm text-slate-600">
                Train AI models collaboratively without sharing raw data
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Privacy Preservation</h3>
              <p className="text-sm text-slate-600">
                Differential privacy and secure multi-party computation
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Network className="w-8 h-8 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Secure Networks</h3>
              <p className="text-sm text-slate-600">
                Quantum-safe communication channels between participants
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Multi-Party Collaboration</h3>
              <p className="text-sm text-slate-600">
                Coordinate projects across organizations and institutions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedEndpoint.title}</CardTitle>
                  <p className="text-slate-600 mt-1">{selectedEndpoint.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{selectedEndpoint.method}</Badge>
                  <Badge className={getPrivacyColor(selectedEndpoint.privacyLevel)}>
                    {selectedEndpoint.privacyLevel}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4">
                <code className="text-lg font-mono text-slate-700 bg-slate-100 px-3 py-2 rounded">
                  {selectedEndpoint.method} {selectedEndpoint.path}
                </code>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="examples">Code Examples</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <Alert className="border-purple-200 bg-purple-50">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <AlertDescription>
                        <strong>Collaborative AI Platform:</strong> Synapse enables secure, privacy-preserving 
                        collaboration between multiple organizations without exposing sensitive data. 
                        All computations use quantum-safe cryptography and differential privacy.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Key Capabilities</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Federated learning orchestration
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Differential privacy mechanisms
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Secure multi-party computation
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Homomorphic encryption
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Quantum-safe communication
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Privacy Guarantees</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>• (ε, δ)-differential privacy</li>
                          <li>• Zero-knowledge proofs</li>
                          <li>• Secure aggregation protocols</li>
                          <li>• Data minimization principles</li>
                          <li>• Cryptographic access controls</li>
                          <li>• Audit trail immutability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Code Examples Tab */}
                <TabsContent value="examples" className="mt-6">
                  <div className="space-y-6">
                    {/* Language Selection */}
                    <div className="flex flex-wrap gap-2">
                      {selectedEndpoint.examples.map((example) => (
                        <Button
                          key={example.language}
                          variant={selectedLanguage === example.language ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedLanguage(example.language)}
                          className="flex items-center gap-2"
                        >
                          {example.language === 'python' && <Brain className="w-4 h-4" />}
                          {example.language === 'javascript' && <Code className="w-4 h-4" />}
                          {example.language}
                          {example.framework && (
                            <Badge variant="secondary" className="text-xs ml-1">
                              {example.framework}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                    
                    {/* Current Example */}
                    {currentExample && (
                      <Card className="bg-slate-50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{currentExample.title}</CardTitle>
                              <p className="text-sm text-slate-600 mt-1">{currentExample.description}</p>
                            </div>
                            <Button
                              onClick={() => copyToClipboard(currentExample.code, currentExample.language)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              {copiedCode === currentExample.language ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                              {copiedCode === currentExample.language ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          
                          {currentExample.installCommand && (
                            <div className="mt-4">
                              <p className="text-sm font-medium text-slate-700 mb-2">Installation:</p>
                              <code className="text-sm bg-slate-900 text-slate-100 px-3 py-2 rounded block">
                                {currentExample.installCommand}
                              </code>
                            </div>
                          )}
                        </CardHeader>
                        
                        <CardContent>
                          <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm text-slate-100">
                              <code>{currentExample.code}</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                {/* Privacy & Security Tab */}
                <TabsContent value="privacy" className="mt-6">
                  <div className="space-y-6">
                    <Alert className="border-green-200 bg-green-50">
                      <Lock className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        <strong>Privacy-First Design:</strong> Synapse implements multiple layers of privacy 
                        protection including differential privacy, secure aggregation, and quantum-safe encryption 
                        to ensure participant data remains confidential throughout the collaboration.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">Differential Privacy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Gaussian noise mechanisms</li>
                            <li>• Privacy budget management</li>
                            <li>• Composition theorems</li>
                            <li>• Adaptive privacy accounting</li>
                            <li>• Utility-privacy trade-offs</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">Secure Computation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Multi-party computation (MPC)</li>
                            <li>• Homomorphic encryption</li>
                            <li>• Secret sharing schemes</li>
                            <li>• Zero-knowledge proofs</li>
                            <li>• Secure aggregation</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">Quantum Safety</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Post-quantum cryptography</li>
                            <li>• CRYSTALS-Kyber encryption</li>
                            <li>• CRYSTALS-Dilithium signatures</li>
                            <li>• Quantum-safe key exchange</li>
                            <li>• Future-proof protocols</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-800">Privacy Budget Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-blue-700">
                            Synapse automatically manages privacy budgets across all participants to ensure 
                            strong privacy guarantees while maximizing utility for collaborative learning.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold text-blue-800 mb-2">Budget Allocation</h5>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Per-participant budgets</li>
                                <li>• Per-query consumption</li>
                                <li>• Adaptive allocation</li>
                                <li>• Budget renewal policies</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-blue-800 mb-2">Privacy Accounting</h5>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Real-time budget tracking</li>
                                <li>• Composition analysis</li>
                                <li>• Privacy loss monitoring</li>
                                <li>• Automated budget alerts</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Use Cases Tab */}
                <TabsContent value="use-cases" className="mt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedEndpoint.useCases.map((useCase, index) => (
                        <Card key={index} className="bg-white">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Activity className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900 mb-2">{useCase}</h4>
                                <p className="text-sm text-slate-600">
                                  {getUseCaseDescription(useCase)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                      <CardHeader>
                        <CardTitle className="text-xl">Industry Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Activity className="w-5 h-5 text-red-600" />
                              Healthcare
                            </h4>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Multi-hospital drug discovery</li>
                              <li>• Federated medical imaging</li>
                              <li>• Cross-institutional research</li>
                              <li>• Rare disease studies</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <BarChart3 className="w-5 h-5 text-green-600" />
                              Finance
                            </h4>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Fraud detection networks</li>
                              <li>• Credit risk modeling</li>
                              <li>• Regulatory compliance</li>
                              <li>• Market analysis</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Globe className="w-5 h-5 text-blue-600" />
                              Technology
                            </h4>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Edge AI optimization</li>
                              <li>• IoT data analytics</li>
                              <li>• Autonomous systems</li>
                              <li>• Smart city initiatives</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
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
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Start Collaborative AI Today
              </h3>
              <p className="text-xl mb-6 text-purple-100">
                Build privacy-preserving AI collaborations with quantum-safe security. 
                Connect with partners while keeping your data completely private.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-purple-600">
                  Get Synapse API Key
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  View Federated Learning Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Helper function for use case descriptions
function getUseCaseDescription(useCase: string): string {
  const descriptions = {
    'Multi-party machine learning': 'Train models across organizations without sharing raw data',
    'Federated learning networks': 'Coordinate distributed learning with privacy preservation',
    'Collaborative research projects': 'Enable secure research collaboration between institutions',
    'Cross-organization AI development': 'Build AI systems with multiple stakeholders'
  };
  return descriptions[useCase as keyof typeof descriptions] || 'Advanced collaborative AI application';
}