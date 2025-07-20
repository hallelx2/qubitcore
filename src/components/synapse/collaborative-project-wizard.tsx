'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Mail, 
  Shield, 
  Brain, 
  Code, 
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Database,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Participant {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: 'data-provider' | 'model-contributor' | 'observer';
  status: 'invited' | 'accepted' | 'declined' | 'pending';
  dataSize?: string;
  joinedAt?: Date;
}

interface ProjectConfig {
  name: string;
  description: string;
  framework: 'tensorflow' | 'pytorch' | 'both';
  privacyLevel: 'standard' | 'enhanced' | 'maximum';
  participants: Participant[];
  dataRequirements: string;
  expectedDuration: string;
}

const wizardSteps = [
  { id: 'basics', title: 'Project Basics', icon: <Settings className="h-4 w-4" /> },
  { id: 'participants', title: 'Invite Participants', icon: <Users className="h-4 w-4" /> },
  { id: 'framework', title: 'ML Framework', icon: <Code className="h-4 w-4" /> },
  { id: 'privacy', title: 'Privacy Settings', icon: <Shield className="h-4 w-4" /> },
  { id: 'review', title: 'Review & Launch', icon: <CheckCircle className="h-4 w-4" /> }
];

const frameworkExamples = {
  tensorflow: {
    name: 'TensorFlow Federated',
    code: `import tensorflow_federated as tff
import tensorflow as tf

# Define federated computation
@tff.federated_computation
def federated_train(server_state, federated_dataset):
    # Secure aggregation with quantum-safe encryption
    return tff.federated_secure_sum(
        federated_dataset.map(local_train),
        bitwidth=16
    )

# QubitCore integration
def create_secure_client():
    return tff.learning.build_federated_averaging_process(
        model_fn=create_keras_model,
        client_optimizer_fn=lambda: tf.keras.optimizers.SGD(0.02),
        server_optimizer_fn=lambda: tf.keras.optimizers.SGD(1.0),
        # Quantum-safe differential privacy
        dp_query=tff.utils.build_dp_query(
            noise_multiplier=1.1,
            clients_per_round=10,
            clip_norm=0.1
        )
    )`
  },
  pytorch: {
    name: 'PyTorch with PySyft',
    code: `import syft as sy
import torch
import torch.nn as nn
from qubitcore import SynapseClient

# Initialize QubitCore Synapse client
synapse = SynapseClient(api_key="your-api-key")

# Create federated learning setup
hook = sy.TorchHook(torch)
participants = [
    sy.VirtualWorker(hook, id="hospital_1"),
    sy.VirtualWorker(hook, id="hospital_2"),
    sy.VirtualWorker(hook, id="hospital_3")
]

# Secure model training
class FederatedModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        return torch.relu(self.fc2(torch.relu(self.fc1(x))))

# Train with quantum-safe aggregation
def federated_train_step(model, participants):
    global_model = model.copy()
    
    for participant in participants:
        # Secure computation on participant data
        local_model = global_model.send(participant)
        local_model.train()
        
        # QubitCore handles secure aggregation
        encrypted_updates = synapse.secure_aggregate(
            local_model.get_weights(),
            participant_id=participant.id
        )
    
    return synapse.quantum_safe_average(encrypted_updates)`
  }
};

export function CollaborativeProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    name: '',
    description: '',
    framework: 'tensorflow',
    privacyLevel: 'enhanced',
    participants: [],
    dataRequirements: '',
    expectedDuration: ''
  });
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    organization: '',
    role: 'data-provider' as const
  });
  const [isCreating, setIsCreating] = useState(false);

  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  const addParticipant = () => {
    if (newParticipant.name && newParticipant.email) {
      const participant: Participant = {
        id: Date.now().toString(),
        ...newParticipant,
        status: 'invited'
      };
      setProjectConfig(prev => ({
        ...prev,
        participants: [...prev.participants, participant]
      }));
      setNewParticipant({ name: '', email: '', organization: '', role: 'data-provider' });
    }
  };

  const removeParticipant = (id: string) => {
    setProjectConfig(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id)
    }));
  };

  const nextStep = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const createProject = async () => {
    setIsCreating(true);
    // Simulate project creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreating(false);
    // In real implementation, this would call the QubitCore API
  };

  const renderStepContent = () => {
    switch (wizardSteps[currentStep].id) {
      case 'basics':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="e.g., Multi-Hospital Rare Disease Detection"
                value={projectConfig.name}
                onChange={(e) => setProjectConfig(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your federated learning project goals and expected outcomes..."
                value={projectConfig.description}
                onChange={(e) => setProjectConfig(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="data-requirements">Data Requirements</Label>
              <Textarea
                id="data-requirements"
                placeholder="Specify the type of data each participant should contribute..."
                value={projectConfig.dataRequirements}
                onChange={(e) => setProjectConfig(prev => ({ ...prev, dataRequirements: e.target.value }))}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="duration">Expected Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 3 months"
                value={projectConfig.expectedDuration}
                onChange={(e) => setProjectConfig(prev => ({ ...prev, expectedDuration: e.target.value }))}
              />
            </div>
          </div>
        );

      case 'participants':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="participant-name">Name</Label>
                <Input
                  id="participant-name"
                  placeholder="Dr. Sarah Chen"
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="participant-email">Email</Label>
                <Input
                  id="participant-email"
                  type="email"
                  placeholder="sarah.chen@hospital.com"
                  value={newParticipant.email}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="participant-org">Organization</Label>
                <Input
                  id="participant-org"
                  placeholder="St. Mary's Hospital"
                  value={newParticipant.organization}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, organization: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="participant-role">Role</Label>
                <select
                  id="participant-role"
                  className="w-full p-2 border rounded-md"
                  value={newParticipant.role}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, role: e.target.value as any }))}
                >
                  <option value="data-provider">Data Provider</option>
                  <option value="model-contributor">Model Contributor</option>
                  <option value="observer">Observer</option>
                </select>
              </div>
            </div>
            <Button onClick={addParticipant} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Participant
            </Button>

            {projectConfig.participants.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold">Invited Participants</h4>
                {projectConfig.participants.map((participant) => (
                  <Card key={participant.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-muted-foreground">{participant.email}</p>
                            <p className="text-sm text-muted-foreground">{participant.organization}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={participant.status === 'accepted' ? 'default' : 'secondary'}>
                            {participant.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParticipant(participant.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'framework':
        return (
          <div className="space-y-6">
            <div>
              <Label>Choose ML Framework</Label>
              <Tabs value={projectConfig.framework} onValueChange={(value) => 
                setProjectConfig(prev => ({ ...prev, framework: value as any }))
              }>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tensorflow">TensorFlow</TabsTrigger>
                  <TabsTrigger value="pytorch">PyTorch</TabsTrigger>
                  <TabsTrigger value="both">Both</TabsTrigger>
                </TabsList>
                <TabsContent value="tensorflow" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        {frameworkExamples.tensorflow.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                        <code>{frameworkExamples.tensorflow.code}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="pytorch" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        {frameworkExamples.pytorch.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                        <code>{frameworkExamples.pytorch.code}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="both" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                        <h3 className="text-lg font-semibold mb-2">Framework Agnostic</h3>
                        <p className="text-muted-foreground">
                          QubitCore Synapse supports both TensorFlow and PyTorch, allowing participants to use their preferred framework while maintaining secure interoperability.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <Label>Privacy Level</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  {
                    level: 'standard',
                    title: 'Standard Privacy',
                    description: 'Basic differential privacy with quantum-safe encryption',
                    features: ['Differential Privacy', 'Quantum-Safe Encryption', 'Secure Aggregation']
                  },
                  {
                    level: 'enhanced',
                    title: 'Enhanced Privacy',
                    description: 'Advanced privacy with homomorphic encryption',
                    features: ['All Standard Features', 'Homomorphic Encryption', 'Zero-Knowledge Proofs']
                  },
                  {
                    level: 'maximum',
                    title: 'Maximum Privacy',
                    description: 'Military-grade privacy with multi-party computation',
                    features: ['All Enhanced Features', 'Multi-Party Computation', 'Trusted Execution Environment']
                  }
                ].map((option) => (
                  <Card 
                    key={option.level}
                    className={`cursor-pointer transition-colors ${
                      projectConfig.privacyLevel === option.level ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setProjectConfig(prev => ({ ...prev, privacyLevel: option.level as any }))}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Shield className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <h4 className="font-semibold">{option.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                        <ul className="text-xs space-y-1">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-medium">Name:</dt>
                      <dd className="text-muted-foreground">{projectConfig.name}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Framework:</dt>
                      <dd className="text-muted-foreground">{projectConfig.framework}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Privacy Level:</dt>
                      <dd className="text-muted-foreground">{projectConfig.privacyLevel}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Duration:</dt>
                      <dd className="text-muted-foreground">{projectConfig.expectedDuration}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Participants ({projectConfig.participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {projectConfig.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <span className="text-sm">{participant.name}</span>
                        <Badge variant="outline">{participant.role}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Ready to Launch</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      Your federated learning project will be created with quantum-safe encryption. 
                      Participants will receive secure invitations and can join using their preferred ML framework.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            <Users className="h-4 w-4 mr-2" />
            Project Setup Wizard
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Create Your Collaborative AI Project</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Set up secure federated learning projects in minutes. Invite participants, configure privacy settings, and start training AI models without sharing data.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Step {currentStep + 1} of {wizardSteps.length}: {wizardSteps[currentStep].title}
              </h3>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            
            {/* Step indicators */}
            <div className="flex items-center justify-between">
              {wizardSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {index < currentStep ? <CheckCircle className="h-4 w-4" /> : step.icon}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep === wizardSteps.length - 1 ? (
              <Button
                onClick={createProject}
                disabled={isCreating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isCreating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create Project
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}