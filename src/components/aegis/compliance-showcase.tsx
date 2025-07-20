"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye,
  Lock,
  Users,
  Database,
  Activity,
  BarChart3,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  Zap,
  Globe,
  Building,
  Scale,
  Gavel,
  BookOpen,
  Award,
  Target,
  Fingerprint,
  Key,
  History,
  MapPin,
  UserCheck
} from 'lucide-react';

interface ComplianceFramework {
  id: string;
  name: string;
  fullName: string;
  region: string;
  industry: string[];
  requirements: ComplianceRequirement[];
  status: 'compliant' | 'partial' | 'non-compliant';
  lastAudit: Date;
  nextAudit: Date;
  icon: any;
  color: string;
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: 'met' | 'partial' | 'not-met';
  aegisImplementation: string;
  evidence: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface AuditEvent {
  id: string;
  timestamp: Date;
  eventType: 'access' | 'modification' | 'deletion' | 'export' | 'login' | 'system';
  userId: string;
  userName: string;
  resource: string;
  action: string;
  result: 'success' | 'failure' | 'warning';
  ipAddress: string;
  location: string;
  details: Record<string, any>;
  riskScore: number;
}

interface PrivacyImpactAssessment {
  id: string;
  title: string;
  dataTypes: string[];
  processingPurpose: string;
  riskLevel: 'low' | 'medium' | 'high';
  mitigations: string[];
  status: 'draft' | 'review' | 'approved' | 'implemented';
  lastUpdated: Date;
}

const complianceFrameworks: ComplianceFramework[] = [
  {
    id: 'hipaa',
    name: 'HIPAA',
    fullName: 'Health Insurance Portability and Accountability Act',
    region: 'United States',
    industry: ['Healthcare'],
    status: 'compliant',
    lastAudit: new Date('2024-01-15'),
    nextAudit: new Date('2024-07-15'),
    icon: Shield,
    color: 'blue',
    requirements: [
      {
        id: 'hipaa_encryption',
        title: 'Data Encryption at Rest and in Transit',
        description: 'All PHI must be encrypted using appropriate encryption standards',
        status: 'met',
        aegisImplementation: 'CRYSTALS-Kyber quantum-safe encryption for all patient data',
        evidence: ['Encryption certificates', 'Key management logs', 'Security assessments'],
        riskLevel: 'critical'
      },
      {
        id: 'hipaa_access_control',
        title: 'Access Control and Authentication',
        description: 'Implement proper access controls and user authentication',
        status: 'met',
        aegisImplementation: 'Multi-factor authentication with quantum-safe digital signatures',
        evidence: ['Access control policies', 'Authentication logs', 'User access reviews'],
        riskLevel: 'high'
      },
      {
        id: 'hipaa_audit_logs',
        title: 'Audit Logs and Monitoring',
        description: 'Maintain comprehensive audit logs of all PHI access',
        status: 'met',
        aegisImplementation: 'Immutable audit trail with cryptographic integrity verification',
        evidence: ['Audit log samples', 'Monitoring reports', 'Incident response logs'],
        riskLevel: 'high'
      }
    ]
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    fullName: 'General Data Protection Regulation',
    region: 'European Union',
    industry: ['Healthcare', 'Technology', 'Finance'],
    status: 'compliant',
    lastAudit: new Date('2024-02-01'),
    nextAudit: new Date('2024-08-01'),
    icon: Globe,
    color: 'green',
    requirements: [
      {
        id: 'gdpr_data_protection',
        title: 'Data Protection by Design and Default',
        description: 'Implement appropriate technical and organizational measures',
        status: 'met',
        aegisImplementation: 'Quantum-safe encryption by default for all personal data',
        evidence: ['Privacy impact assessments', 'Technical documentation', 'Security reviews'],
        riskLevel: 'critical'
      },
      {
        id: 'gdpr_consent',
        title: 'Lawful Basis and Consent Management',
        description: 'Ensure lawful basis for processing and manage consent',
        status: 'met',
        aegisImplementation: 'Cryptographic consent records with immutable timestamps',
        evidence: ['Consent management system', 'Legal basis documentation', 'Consent logs'],
        riskLevel: 'medium'
      },
      {
        id: 'gdpr_breach_notification',
        title: 'Data Breach Notification',
        description: '72-hour breach notification to supervisory authority',
        status: 'met',
        aegisImplementation: 'Automated breach detection with quantum-safe incident reporting',
        evidence: ['Breach response procedures', 'Notification templates', 'Incident logs'],
        riskLevel: 'high'
      }
    ]
  },
  {
    id: 'sox',
    name: 'SOX',
    fullName: 'Sarbanes-Oxley Act',
    region: 'United States',
    industry: ['Finance', 'Public Companies'],
    status: 'partial',
    lastAudit: new Date('2023-12-01'),
    nextAudit: new Date('2024-06-01'),
    icon: Building,
    color: 'orange',
    requirements: [
      {
        id: 'sox_financial_controls',
        title: 'Internal Controls over Financial Reporting',
        description: 'Establish and maintain internal controls over financial reporting',
        status: 'met',
        aegisImplementation: 'Immutable financial transaction logs with quantum-safe signatures',
        evidence: ['Control documentation', 'Testing results', 'Management assertions'],
        riskLevel: 'critical'
      },
      {
        id: 'sox_data_integrity',
        title: 'Data Integrity and Retention',
        description: 'Ensure integrity and proper retention of financial data',
        status: 'partial',
        aegisImplementation: 'Quantum-safe data integrity verification in progress',
        evidence: ['Data retention policies', 'Integrity checks', 'Backup procedures'],
        riskLevel: 'high'
      }
    ]
  }
];

const sampleAuditEvents: AuditEvent[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-20T14:30:00Z'),
    eventType: 'access',
    userId: 'dr_smith_001',
    userName: 'Dr. Sarah Smith',
    resource: 'Patient Record #12345',
    action: 'View patient genetic data',
    result: 'success',
    ipAddress: '192.168.1.100',
    location: 'Boston, MA',
    details: { patientId: '12345', dataType: 'genetic', accessReason: 'treatment_planning' },
    riskScore: 2
  },
  {
    id: '2',
    timestamp: new Date('2024-01-20T15:45:00Z'),
    eventType: 'modification',
    userId: 'nurse_jones_002',
    userName: 'Nurse Jennifer Jones',
    resource: 'Patient Record #12345',
    action: 'Update medication list',
    result: 'success',
    ipAddress: '192.168.1.105',
    location: 'Boston, MA',
    details: { patientId: '12345', field: 'medications', oldValue: '[ENCRYPTED]', newValue: '[ENCRYPTED]' },
    riskScore: 1
  },
  {
    id: '3',
    timestamp: new Date('2024-01-20T16:20:00Z'),
    eventType: 'access',
    userId: 'unknown_user',
    userName: 'Unknown User',
    resource: 'Patient Database',
    action: 'Attempted unauthorized access',
    result: 'failure',
    ipAddress: '203.0.113.42',
    location: 'Unknown',
    details: { attemptedResource: 'patient_database', failureReason: 'invalid_credentials' },
    riskScore: 9
  }
];

const privacyAssessments: PrivacyImpactAssessment[] = [
  {
    id: 'pia_001',
    title: 'Genetic Data Processing for Research',
    dataTypes: ['Genetic sequences', 'Family history', 'Medical records'],
    processingPurpose: 'Medical research and treatment optimization',
    riskLevel: 'high',
    mitigations: ['Quantum-safe encryption', 'Data minimization', 'Consent management', 'Access controls'],
    status: 'approved',
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'pia_002',
    title: 'Telemedicine Platform Data Sharing',
    dataTypes: ['Video recordings', 'Audio recordings', 'Chat messages', 'Medical notes'],
    processingPurpose: 'Remote healthcare delivery and consultation',
    riskLevel: 'medium',
    mitigations: ['End-to-end encryption', 'Session recording controls', 'Data retention limits'],
    status: 'implemented',
    lastUpdated: new Date('2024-01-10')
  }
];

export function ComplianceShowcase() {
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework>(complianceFrameworks[0]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'audit' | 'privacy' | 'reports'>('dashboard');
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(sampleAuditEvents);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  // Simulate real-time audit events
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const newEvent: AuditEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        eventType: ['access', 'modification', 'login'][Math.floor(Math.random() * 3)] as any,
        userId: `user_${Math.floor(Math.random() * 100)}`,
        userName: `User ${Math.floor(Math.random() * 100)}`,
        resource: `Resource ${Math.floor(Math.random() * 10)}`,
        action: 'System activity',
        result: Math.random() > 0.1 ? 'success' : 'failure',
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        location: 'Boston, MA',
        details: {},
        riskScore: Math.floor(Math.random() * 10)
      };

      setAuditEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'met':
      case 'success':
      case 'approved':
      case 'implemented':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'partial':
      case 'warning':
      case 'review':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'non-compliant':
      case 'not-met':
      case 'failure':
      case 'draft':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    if (filterRisk === 'all') return true;
    const riskLevel = event.riskScore >= 8 ? 'critical' : 
                     event.riskScore >= 6 ? 'high' : 
                     event.riskScore >= 4 ? 'medium' : 'low';
    return riskLevel === filterRisk;
  });

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
            <Scale className="w-4 h-4 mr-2" />
            COMPLIANCE & AUDIT
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Healthcare Compliance Dashboard
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Monitor HIPAA, GDPR, and SOX compliance in real-time with immutable audit trails 
            and automated privacy impact assessments powered by Aegis.
          </p>
        </motion.div>     
   {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Audit Trail
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy Impact
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Compliance Dashboard */}
            <TabsContent value="dashboard" className="space-y-8">
              {/* Compliance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {complianceFrameworks.map((framework) => {
                  const IconComponent = framework.icon;
                  return (
                    <motion.div
                      key={framework.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFramework(framework)}
                      className={`
                        cursor-pointer transition-all
                        ${selectedFramework.id === framework.id ? 'ring-2 ring-blue-500' : ''}
                      `}
                    >
                      <Card className={`${getStatusColor(framework.status)}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-${framework.color}-100`}>
                                <IconComponent className={`w-6 h-6 text-${framework.color}-600`} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900">{framework.name}</h3>
                                <p className="text-sm text-slate-600">{framework.region}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(framework.status)}>
                              {framework.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Requirements Met</span>
                              <span>{framework.requirements.filter(r => r.status === 'met').length}/{framework.requirements.length}</span>
                            </div>
                            <Progress 
                              value={(framework.requirements.filter(r => r.status === 'met').length / framework.requirements.length) * 100} 
                              className="h-2"
                            />
                          </div>
                          
                          <div className="mt-4 text-xs text-slate-500">
                            Last audit: {framework.lastAudit.toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Framework Details */}
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedFramework.fullName}</CardTitle>
                      <p className="text-slate-600 mt-1">
                        {selectedFramework.region} • {selectedFramework.industry.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedFramework.status)}>
                        {selectedFramework.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedFramework.requirements.map((requirement) => (
                      <Card key={requirement.id} className="bg-slate-50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-1">{requirement.title}</h4>
                              <p className="text-sm text-slate-600 mb-2">{requirement.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getRiskColor(requirement.riskLevel)}>
                                {requirement.riskLevel}
                              </Badge>
                              <Badge className={getStatusColor(requirement.status)}>
                                {requirement.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-semibold text-slate-800 mb-2">Aegis Implementation</h5>
                              <p className="text-sm text-slate-600">{requirement.aegisImplementation}</p>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-slate-800 mb-2">Evidence</h5>
                              <ul className="text-sm text-slate-600 space-y-1">
                                {requirement.evidence.map((evidence, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    {evidence}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Trail */}
            <TabsContent value="audit" className="space-y-8">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Real-time Audit Trail</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={isMonitoring ? "destructive" : "default"}
                        onClick={() => setIsMonitoring(!isMonitoring)}
                        className="flex items-center gap-2"
                      >
                        {isMonitoring ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                        {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                      </Button>
                      
                      <select
                        value={filterRisk}
                        onChange={(e) => setFilterRisk(e.target.value as any)}
                        className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      >
                        <option value="all">All Risk Levels</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEvents.map((event) => {
                      const riskLevel = event.riskScore >= 8 ? 'critical' : 
                                       event.riskScore >= 6 ? 'high' : 
                                       event.riskScore >= 4 ? 'medium' : 'low';
                      
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg"
                        >
                          <div className={`
                            w-3 h-3 rounded-full
                            ${event.result === 'success' ? 'bg-green-500' : 
                              event.result === 'failure' ? 'bg-red-500' : 'bg-yellow-500'}
                          `} />
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm font-medium text-slate-900">{event.userName}</p>
                              <p className="text-xs text-slate-500">{event.userId}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-slate-700">{event.action}</p>
                              <p className="text-xs text-slate-500">{event.resource}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-slate-700">{event.location}</p>
                              <p className="text-xs text-slate-500">{event.ipAddress}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-slate-500">{event.timestamp.toLocaleTimeString()}</p>
                                <p className="text-xs text-slate-400">{event.timestamp.toLocaleDateString()}</p>
                              </div>
                              <Badge className={getRiskColor(riskLevel)}>
                                Risk: {event.riskScore}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>     
       {/* Privacy Impact Assessment */}
            <TabsContent value="privacy" className="space-y-8">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Privacy Impact Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {privacyAssessments.map((assessment) => (
                      <Card key={assessment.id} className="bg-slate-50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-900 mb-2">{assessment.title}</h3>
                              <p className="text-sm text-slate-600 mb-3">{assessment.processingPurpose}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {assessment.dataTypes.map((dataType, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {dataType}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={getRiskColor(assessment.riskLevel)}>
                                {assessment.riskLevel} risk
                              </Badge>
                              <Badge className={getStatusColor(assessment.status)}>
                                {assessment.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-2">Risk Mitigations</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {assessment.mitigations.map((mitigation, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  {mitigation}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 text-xs text-slate-500">
                            Last updated: {assessment.lastUpdated.toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Reports */}
            <TabsContent value="reports" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regulatory Reporting */}
                <Card className="bg-white shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Regulatory Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">HIPAA Compliance Report</p>
                            <p className="text-sm text-green-600">Q1 2024 • Ready for submission</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-800">GDPR Compliance Report</p>
                            <p className="text-sm text-blue-600">Q1 2024 • Ready for submission</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-orange-800">SOX Compliance Report</p>
                            <p className="text-sm text-orange-600">Q1 2024 • In progress</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Pending
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certification Status */}
                <Card className="bg-white shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Certification Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">ISO 27001</p>
                            <p className="text-sm text-green-600">Valid until Dec 2024</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">SOC 2 Type II</p>
                            <p className="text-sm text-green-600">Valid until Aug 2024</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-800">FIPS 140-2 Level 3</p>
                            <p className="text-sm text-blue-600">Quantum-safe certification</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Certified</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audit Schedule */}
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Upcoming Audits & Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-yellow-800">HIPAA Review</span>
                        </div>
                        <p className="text-sm text-yellow-700">July 15, 2024</p>
                        <p className="text-xs text-yellow-600">External audit scheduled</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">GDPR Assessment</span>
                        </div>
                        <p className="text-sm text-blue-700">August 1, 2024</p>
                        <p className="text-xs text-blue-600">Internal review due</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">SOC 2 Renewal</span>
                        </div>
                        <p className="text-sm text-green-700">August 15, 2024</p>
                        <p className="text-xs text-green-600">Certification renewal</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-slate-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Achieve Quantum-Safe Compliance
              </h3>
              <p className="text-xl mb-6 text-slate-100">
                Meet HIPAA, GDPR, and SOX requirements with Aegis quantum-safe security 
                and automated compliance monitoring.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-slate-600">
                  Start Compliance Assessment
                  <Scale className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-600">
                  Download Compliance Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}