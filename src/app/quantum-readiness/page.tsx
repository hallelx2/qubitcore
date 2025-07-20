import { QuantumReadinessAssessment } from '@/components/quantum/quantum-readiness-assessment';
import { ThreatTimeline } from '@/components/quantum/threat-timeline';
import { ReadinessReport } from '@/components/quantum/readiness-report';
import { MigrationPlanner } from '@/components/quantum/migration-planner';

export default function QuantumReadinessPage() {
  return (
    <main className="min-h-screen">
      {/* Interactive Quantum Readiness Assessment */}
      <QuantumReadinessAssessment />
      
      {/* Quantum Threat Timeline */}
      <ThreatTimeline />
      
      {/* Personalized Readiness Report */}
      <ReadinessReport />
      
      {/* Migration Planning Tool */}
      <MigrationPlanner />
    </main>
  );
}