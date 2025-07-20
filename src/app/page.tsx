import { ThreatNarrative } from "@/components/homepage/threat-narrative";
import { FourPlatformsJourney } from "@/components/homepage/four-platforms-journey";
import { QuantumReadinessCheck } from "@/components/homepage/quantum-readiness-check";
import { SuccessChronicle } from "@/components/homepage/success-chronicle";
import { MetricsCounter } from "@/components/homepage/metrics-counter";
import { ThreatSimulator } from "@/components/interactive/threat-simulator";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* The Opening Story - Quantum Threat Narrative */}
      <ThreatNarrative />
      
      {/* Four Platforms Journey - Upstash-inspired grid */}
      <FourPlatformsJourney />
      
      {/* Interactive Threat Simulation */}
      <ThreatSimulator threatType="harvest-now" userIndustry="general" />
      
      {/* Success Stories and Social Proof */}
      <SuccessChronicle />
      
      {/* Real-time Metrics and Trust Indicators */}
      <MetricsCounter showTrends={true} showCertifications={true} />
      
      {/* Interactive Quantum Readiness Assessment */}
      <QuantumReadinessCheck />
    </div>
  );
}
