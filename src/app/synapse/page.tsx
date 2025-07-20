import { SynapseStory } from '@/components/synapse/synapse-story';
import { CollaborativeProjectWizard } from '@/components/synapse/collaborative-project-wizard';
import { FederatedLearningDemo } from '@/components/synapse/federated-learning-demo';

export default function SynapsePage() {
  return (
    <main className="min-h-screen">
      {/* AI collaboration narrative */}
      <SynapseStory useCase="healthcare" />
      
      {/* Project setup wizard */}
      <CollaborativeProjectWizard />
      
      {/* Federated learning demonstration */}
      <FederatedLearningDemo />
    </main>
  );
}