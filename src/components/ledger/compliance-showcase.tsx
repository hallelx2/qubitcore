'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield,
  CheckCircle,
  FileText,
  Calculator,
  Code,
  Download,
  Eye,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Building2,
  Gavel,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Lock,
  Key,
  Database,
  Globe,
  Zap,
  Copy
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from 'recharts';

// Compliance Requirements Data
const complianceRequirements = [
  {
    regulation: 'SOX (Sarbanes-Oxley)',
    category: 'Financial Reporting',
    requirements: [
      { id: 'SOX-302', description: 'CEO/CFO certification of financial reports', status: 'compliant', coverage: 100 },
      { id: 'SOX-404', description: 'Internal control assessment', status: 'compliant', coverage: 100 },
      { id: 'SOX-409', description: 'Real-time disclosure requirements', status: 'compliant', coverage: 100 }
    ],
    color: '#3b82f6'
  },
  {
    regulation: 'PCI DSS',
    category: 'Payment Security',
    requirements: [
      { id: 'PCI-3.4', description: 'Cryptographic key management', status: 'enhanced', coverage: 100 },
      { id: 'PCI-4.1', description: 'Encryption of cardholder data', status: 'enhanced', coverage: 100 },
      { id: 'PCI-10.1', description: 'Audit trail requirements', status: 'compliant', coverage: 100 }
    ],
    color: '#22c55e'
  },
  {
    regulation: 'Basel III',
    category: 'Banking Regulation',
    requirements: [
      { id: 'BASEL-239', description: 'Risk data aggregation', status: 'compliant', coverage: 100 },
      { id: 'BASEL-LCR', description: 'Liquidity coverage ratio', status: 'compliant', coverage: 100 },
      { id: 'BASEL-NSFR', description: 'Net stable funding ratio', status: 'compliant', coverage: 100 }
    ],
    color: '#8b5cf6'
  },
  {
    regulation: 'GDPR',
    category: 'Data Protection',
    requirements: [
      { id: 'GDPR-32', description: 'Security of processing', status: 'enhanced', coverage: 100 },
      { id: 'GDPR-25', description: 'Data protection by design', status: 'enhanced', coverage: 100 },
      { id: 'GDPR-33', description: 'Breach notification', status: 'compliant', coverage: 100 }
    ],
    color: '#f59e0b'
  }
];

// Audit Data
const auditReports = [
  {
    id: 'AUD-2024-001',
    title: 'Q4 2024 Transaction Integrity Audit',
    date: '2024-12-15',
    auditor: 'PwC Financial Services',
    status: 'completed',
    findings: 0,
    transactionsAudited: 2847392,
    complianceScore: 100
  },
  {
    id: 'AUD-2024-002', 
    title: 'Quantum Readiness Assessment',
    date: '2024-11-20',
    auditor: 'Deloitte Cyber Risk',
    status: 'completed',
    findings: 0,
    transactionsAudited: 1923847,
    complianceScore: 100
  },
  {
    id: 'AUD-2024-003',
    title: 'SOX 404 Internal Controls Review',
    date: '2024-10-30',
    auditor: 'KPMG Risk Advisory',
    status: 'in-progress',
    findings: 0,
    transactionsAudited: 1456789,
    complianceScore: 98
  }
];

// ROI Calculator Data
const roiFactors = {
  breachCost: 4.45, // Million USD average
  complianceFines: 2.8, // Million USD average
  auditCosts: 0.5, // Million USD per year
  downtime: 1.2, // Million USD per day
  reputationLoss: 3.2 // Million USD estimated
};

// Integration Examples
const integrationExamples = [
  {
    name: 'SWIFT Network Integration',
    description: 'Secure international wire transfers with quantum-resistant signatures',
    language: 'Python',
    code: `import qubitcore_ledger as qc

# Initialize Ledger client with SWIFT credentials
ledger = qc.LedgerClient(
    api_key="your_api_key",
    swift_bic="BANKUS33XXX"
)

# Create quantum-resistant wire transfer
transfer = ledger.create_wire_transfer(
    amount=2100000.00,
    currency="USD",
    beneficiary_bic="DEUTDEFFXXX",
    reference="INV-2024-001",
    quantum_signature=True
)

# Witness the transaction
proof = ledger.witness_transaction(transfer.id)
print(f"Transaction witnessed: {proof.hash}")`,
    category: 'International Banking'
  },
  {
    name: 'Core Banking System',
    description: 'Integrate with existing core banking platforms',
    language: 'Java',
    code: `// QubitCore Ledger Java SDK
import com.qubitcore.ledger.LedgerClient;
import com.qubitcore.ledger.Transaction;

public class CoreBankingIntegration {
    private LedgerClient ledger;
    
    public void processTransaction(BankTransaction tx) {
        // Create quantum-resistant transaction record
        Transaction qcTx = ledger.createTransaction()
            .amount(tx.getAmount())
            .account(tx.getAccountNumber())
            .quantumSafe(true)
            .build();
            
        // Witness and verify
        ProofChain proof = ledger.witness(qcTx);
        
        // Update core banking system
        updateCoreSystem(tx.getId(), proof.getHash());
    }
}`,
    category: 'Core Banking'
  },
  {
    name: 'Payment Gateway',
    description: 'Secure payment processing with immutable records',
    language: 'JavaScript',
    code: `const { LedgerClient } = require('@qubitcore/ledger');

const ledger = new LedgerClient({
  apiKey: process.env.QUBITCORE_API_KEY,
  environment: 'production'
});

// Process payment with quantum protection
async function processPayment(paymentData) {
  const transaction = await ledger.createPayment({
    amount: paymentData.amount,
    currency: paymentData.currency,
    merchantId: paymentData.merchantId,
    customerId: paymentData.customerId,
    quantumResistant: true
  });
  
  // Create immutable proof
  const proof = await ledger.witness(transaction.id);
  
  return {
    transactionId: transaction.id,
    proofHash: proof.hash,
    status: 'witnessed'
  };
}`,
    category: 'Payment Processing'
  }
];

export function ComplianceShowcase() {
  const [selectedTab, setSelectedTab] = useState('compliance');
  const [selectedRegulation, setSelectedRegulation] = useState(complianceRequirements[0]);
  const [roiInputs, setRoiInputs] = useState({
    transactionVolume: 1000000,
    averageTransactionValue: 50000,
    currentSecurityCost: 500000,
    riskTolerance: 'medium'
  });
  const [roiResults, setRoiResults] = useState<any>(null);
  const [selectedIntegration, setSelectedIntegration] = useState(integrationExamples[0]);

  // Calculate ROI
  useEffect(() => {
    const calculateROI = () => {
      const annualTransactionValue = roiInputs.transactionVolume * roiInputs.averageTransactionValue;
      const riskMultiplier = roiInputs.riskTolerance === 'high' ? 2 : roiInputs.riskTolerance === 'low' ? 0.5 : 1;
      
      const potentialLosses = (
        roiFactors.breachCost + 
        roiFactors.complianceFines + 
        roiFactors.auditCosts + 
        roiFactors.downtime + 
        roiFactors.reputationLoss
      ) * riskMultiplier;
      
      const qubitcoreCost = Math.max(50000, annualTransactionValue * 0.0001); // 0.01% of transaction value, min $50k
      const savings = potentialLosses - qubitcoreCost;
      const roi = (savings / qubitcoreCost) * 100;
      
      setRoiResults({
        potentialLosses: potentialLosses * 1000000,
        qubitcoreCost,
        savings: savings * 1000000,
        roi: Math.round(roi),
        paybackPeriod: Math.max(1, Math.round(12 / (savings / qubitcoreCost)))
      });
    };
    
    calculateROI();
  }, [roiInputs]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-4 text-green-600 border-green-200">
            <Gavel className="w-4 h-4 mr-2" />
            Compliance & Auditing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Auditor Tools & Compliance Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet every regulatory requirement with quantum-resistant compliance tools. 
            Built for auditors, designed for regulators, trusted by financial institutions.
          </p>
        </motion.div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Compliance Matrix
          </TabsTrigger>
          <TabsTrigger value="auditor" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Auditor Dashboard
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            API Integration
          </TabsTrigger>
        </TabsList>

        {/* Compliance Matrix Tab */}
        <TabsContent value="compliance" className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Regulation Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Regulatory Frameworks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {complianceRequirements.map((regulation) => (
                  <motion.div
                    key={regulation.regulation}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRegulation.regulation === regulation.regulation
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRegulation(regulation)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{regulation.regulation}</div>
                        <div className="text-sm text-gray-500">{regulation.category}</div>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: regulation.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Compliance Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedRegulation.regulation} Compliance</span>
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    100% Compliant
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedRegulation.requirements.map((req, index) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{req.id}</Badge>
                          <Badge variant={req.status === 'enhanced' ? 'default' : 'secondary'}>
                            {req.status === 'enhanced' ? 'Enhanced' : 'Compliant'}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">{req.coverage}% Coverage</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{req.description}</p>
                      <Progress value={req.coverage} className="h-2" />
                      
                      {req.status === 'enhanced' && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                          <Zap className="w-3 h-3 inline mr-1" />
                          Quantum-enhanced protection exceeds standard requirements
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-500">Overall Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-500">Regulations Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-500">Outstanding Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-500">Monitoring</div>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceRequirements}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="regulation" />
                    <YAxis domain={[95, 100]} />
                    <Tooltip />
                    <Bar dataKey="requirements.length" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auditor Dashboard Tab */}
        <TabsContent value="auditor" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Audit Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Audit Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                        {report.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                      <span className="text-sm text-gray-500">{report.date}</span>
                    </div>
                    
                    <h4 className="font-semibold mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">Auditor: {report.auditor}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">{report.complianceScore}%</div>
                        <div className="text-xs text-gray-500">Compliance</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{report.findings}</div>
                        <div className="text-xs text-gray-500">Findings</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {(report.transactionsAudited / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-500">Transactions</div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Verification Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Transaction Verification Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Transaction ID or Hash</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter transaction ID or proof hash..."
                      className="font-mono text-sm"
                    />
                    <Button>
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Verification Result</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction Status:</span>
                      <Badge className="bg-green-600">Verified</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantum Signature:</span>
                      <Badge variant="outline">Valid</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Witness Nodes:</span>
                      <span>7/7 Confirmed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Proof Chain:</span>
                      <Badge variant="outline">Immutable</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Auditor Tools</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter Results
                    </Button>
                    <Button variant="outline" size="sm">
                      <Activity className="w-4 h-4 mr-2" />
                      Real-time Monitor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Compliance Trends</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: 'Jan', compliance: 98 },
                        { month: 'Feb', compliance: 99 },
                        { month: 'Mar', compliance: 100 },
                        { month: 'Apr', compliance: 100 },
                        { month: 'May', compliance: 100 },
                        { month: 'Jun', compliance: 100 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[95, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="compliance" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Audit Findings Distribution</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Tooltip />
                        <RechartsPieChart data={[
                          { name: 'No Findings', value: 95, fill: '#22c55e' },
                          { name: 'Minor Issues', value: 3, fill: '#f59e0b' },
                          { name: 'Major Issues', value: 2, fill: '#ef4444' }
                        ]}>
                          {[
                            { name: 'No Findings', value: 95, fill: '#22c55e' },
                            { name: 'Minor Issues', value: 3, fill: '#f59e0b' },
                            { name: 'Major Issues', value: 2, fill: '#ef4444' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Calculator Tab */}
        <TabsContent value="roi" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* ROI Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  ROI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Annual Transaction Volume</Label>
                    <Input
                      type="number"
                      value={roiInputs.transactionVolume}
                      onChange={(e) => setRoiInputs(prev => ({
                        ...prev,
                        transactionVolume: parseInt(e.target.value) || 0
                      }))}
                      placeholder="1,000,000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of transactions per year</p>
                  </div>
                  
                  <div>
                    <Label>Average Transaction Value ($)</Label>
                    <Input
                      type="number"
                      value={roiInputs.averageTransactionValue}
                      onChange={(e) => setRoiInputs(prev => ({
                        ...prev,
                        averageTransactionValue: parseInt(e.target.value) || 0
                      }))}
                      placeholder="50,000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Average USD value per transaction</p>
                  </div>
                  
                  <div>
                    <Label>Current Security Spending ($)</Label>
                    <Input
                      type="number"
                      value={roiInputs.currentSecurityCost}
                      onChange={(e) => setRoiInputs(prev => ({
                        ...prev,
                        currentSecurityCost: parseInt(e.target.value) || 0
                      }))}
                      placeholder="500,000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Annual security and compliance costs</p>
                  </div>
                  
                  <div>
                    <Label>Risk Tolerance</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={roiInputs.riskTolerance}
                      onChange={(e) => setRoiInputs(prev => ({
                        ...prev,
                        riskTolerance: e.target.value as 'low' | 'medium' | 'high'
                      }))}
                    >
                      <option value="low">Low Risk (Conservative)</option>
                      <option value="medium">Medium Risk (Balanced)</option>
                      <option value="high">High Risk (Aggressive)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Your organization's risk profile</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Risk Factors Considered</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Data Breach Cost:</span>
                      <span>${roiFactors.breachCost}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Fines:</span>
                      <span>${roiFactors.complianceFines}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Audit Costs:</span>
                      <span>${roiFactors.auditCosts}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downtime Cost (per day):</span>
                      <span>${roiFactors.downtime}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reputation Loss:</span>
                      <span>${roiFactors.reputationLoss}M</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Investment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {roiResults && (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {roiResults.roi}%
                        </div>
                        <div className="text-sm text-gray-600">ROI</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {roiResults.paybackPeriod}
                        </div>
                        <div className="text-sm text-gray-600">Months to Payback</div>
                      </div>
                    </div>
                    
                    {/* Financial Breakdown */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                        <span className="font-medium">Potential Risk Exposure</span>
                        <span className="font-bold text-red-600">
                          ${(roiResults.potentialLosses / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <span className="font-medium">QubitCore Investment</span>
                        <span className="font-bold text-blue-600">
                          ${(roiResults.qubitcoreCost / 1000).toFixed(0)}K
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="font-medium">Net Annual Savings</span>
                        <span className="font-bold text-green-600">
                          ${(roiResults.savings / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                    
                    {/* Value Proposition */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Value Proposition</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>100% quantum-resistant protection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Automated compliance reporting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Reduced audit costs and time</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Future-proof security investment</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Request Custom Pricing
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ROI Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>5-Year Financial Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { year: 'Year 1', withoutQC: -4.5, withQC: -0.5, savings: 4.0 },
                    { year: 'Year 2', withoutQC: -9.0, withQC: -1.0, savings: 8.0 },
                    { year: 'Year 3', withoutQC: -13.5, withQC: -1.5, savings: 12.0 },
                    { year: 'Year 4', withoutQC: -18.0, withQC: -2.0, savings: 16.0 },
                    { year: 'Year 5', withoutQC: -22.5, withQC: -2.5, savings: 20.0 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      `$${Math.abs(value as number)}M`,
                      name === 'withoutQC' ? 'Without QubitCore' : 
                      name === 'withQC' ? 'With QubitCore' : 'Cumulative Savings'
                    ]} />
                    <Bar dataKey="withoutQC" fill="#ef4444" name="Risk Exposure" />
                    <Bar dataKey="withQC" fill="#3b82f6" name="Protected Cost" />
                    <Bar dataKey="savings" fill="#22c55e" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Examples Tab */}
        <TabsContent value="integration" className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Integration Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Integration Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {integrationExamples.map((example, index) => (
                  <motion.div
                    key={example.name}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedIntegration.name === example.name
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedIntegration(example)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{example.language}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {example.category}
                      </Badge>
                    </div>
                    <div className="font-semibold text-sm">{example.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {example.description}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedIntegration.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge>{selectedIntegration.language}</Badge>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{selectedIntegration.description}</p>
                  
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{selectedIntegration.code}</code>
                    </pre>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download SDK
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      Try Online
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Features */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Core Banking Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Temenos T24/Transact</div>
                      <div className="text-sm text-gray-500">Native API integration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">FIS Profile/Systematics</div>
                      <div className="text-sm text-gray-500">Real-time transaction witnessing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Oracle FLEXCUBE</div>
                      <div className="text-sm text-gray-500">Quantum-safe cryptography</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Mambu Cloud Banking</div>
                      <div className="text-sm text-gray-500">Microservices architecture</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Payment Networks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">SWIFT Network</div>
                      <div className="text-sm text-gray-500">ISO 20022 message format</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Fedwire/ACH</div>
                      <div className="text-sm text-gray-500">Federal Reserve integration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Visa/Mastercard</div>
                      <div className="text-sm text-gray-500">Card payment processing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">SEPA/TARGET2</div>
                      <div className="text-sm text-gray-500">European payment systems</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Support */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Dedicated Support Team</h4>
                  <p className="text-sm text-gray-600">
                    Expert engineers to guide your integration from planning to production deployment.
                  </p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Rapid Implementation</h4>
                  <p className="text-sm text-gray-600">
                    Most integrations completed in 2-4 weeks with our proven implementation methodology.
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Security First</h4>
                  <p className="text-sm text-gray-600">
                    Zero-trust architecture with quantum-resistant security from day one.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Schedule Integration Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}