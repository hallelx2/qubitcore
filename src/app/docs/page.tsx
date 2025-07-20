import { APIDocumentation } from '@/components/docs/api-documentation';
import { InteractivePlayground } from '@/components/docs/interactive-playground';
import { CodeExamples } from '@/components/docs/code-examples';
import { AegisDocumentation } from '@/components/docs/aegis-documentation';
import { SynapseDocumentation } from '@/components/docs/synapse-documentation';

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Interactive API Documentation */}
      <APIDocumentation />

      {/* Live API Playground */}
      <InteractivePlayground />

      {/* Platform-Specific Documentation */}
      <AegisDocumentation />
      <SynapseDocumentation />

      {/* Code Examples and SDKs */}
      <CodeExamples />
    </main>
  );
}