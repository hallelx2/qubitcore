import { ShieldStory } from '@/components/shield/shield-story';
import { LiveCodeStory } from '@/components/shield/live-code-story';
import { DeveloperJourney } from '@/components/shield/developer-journey';

export default function ShieldPage() {
  return (
    <main className="min-h-screen">
      {/* Character-driven narrative */}
      <ShieldStory userType="exploring" />
      
      {/* Interactive code playground */}
      <LiveCodeStory platform="shield" />
      
      {/* Progressive tutorial */}
      <DeveloperJourney />
    </main>
  );
}