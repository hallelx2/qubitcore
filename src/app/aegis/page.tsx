import { AegisStory } from '@/components/aegis/aegis-story';
import { EHRIntegrationDemo } from '@/components/aegis/ehr-integration-demo';
import { ComplianceShowcase } from '@/components/aegis/compliance-showcase';

export default function AegisPage() {
  return (
    <main className="min-h-screen">
      {/* Patient data protection narrative */}
      <AegisStory patientType="genetic" />
      
      {/* EHR integration and device security demonstrations */}
      <EHRIntegrationDemo />
      
      {/* Compliance and audit trail showcase */}
      <ComplianceShowcase />
    </main>
  );
}