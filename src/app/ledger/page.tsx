import { Metadata } from 'next';
import { LedgerStory } from '@/components/ledger/ledger-story';
import { TransactionWitnessing } from '@/components/ledger/transaction-witnessing';
import { ComplianceShowcase } from '@/components/ledger/compliance-showcase';

export const metadata: Metadata = {
  title: 'QubitCore Ledger - The Trust Keeper\'s Tale',
  description: 'Guarantee transaction integrity forever with quantum-resistant immutable ledger technology. Protect financial records from quantum threats.',
  keywords: ['quantum security', 'financial services', 'transaction integrity', 'immutable ledger', 'compliance'],
};

export default function LedgerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Ledger Story Section */}
      <section className="py-20">
        <LedgerStory />
      </section>

      {/* Transaction Witnessing Demo */}
      <section className="py-20 bg-white">
        <TransactionWitnessing />
      </section>

      {/* Compliance and Auditor Tools */}
      <section className="py-20 bg-green-50">
        <ComplianceShowcase />
      </section>
    </div>
  );
}