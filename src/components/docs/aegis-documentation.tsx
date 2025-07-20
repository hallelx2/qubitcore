"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  Shield, 
  FileText, 
  Users, 
  Activity,
  Stethoscope,
  Database,
  Lock,
  Scale,
  CheckCircle,
  Copy,
  Code,
  Terminal
} from 'lucide-react';

interface AegisEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  category: 'patient-data' | 'compliance' | 'audit' | 'devices' | 'telemedicine';
  hipaaRequired: boolean;
  complianceFrameworks: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  examples: LanguageExample[];
}

interface LanguageExample {
  language: string;
  framework?: string;
  title: string;
  description: string;
  code: string;
  installCommand?: string;
}

const aegisEndpoints: AegisEndpoint[] = [
  {
    id: 'patient_encrypt',
    method: 'POST',
    path: '/v1/aegis/patient/encrypt',
    title: 'Encrypt Patient Data',
    description: 'Encrypt patient health information with HIPAA/GDPR compliance',
    category: 'patient-data',
    hipaaRequired: true,
    complianceFrameworks: ['HIPAA', 'GDPR', 'HITECH'],
    riskLevel: 'critical',
    examples: [
      {
        language: 'javascript',
        framework: 'Node.js',
        title: 'EHR Integration',
        description: 'Encrypt patient data before storing in EHR system',
        installCommand: 'npm install @qubitcore/aegis',
        code: `const { Aegis } = require('@qubitcore/aegis');

// Initialize Aegis for healthcare environment
const aegis = new Aegis({
  apiKey: process.env.AEGIS_API_KEY,
  environment: 'healthcare',
  compliance: ['HIPAA', 'GDPR']
});

class PatientDataManager {
  async encryptPatientRecord(patientData) {
    try {
      // Validate HIPAA compliance before encryption
      await this.validateHIPAACompliance(patientData);
      
      const result = await aegis.patient.encrypt({
        patientId: patientData.id,
        healthData: {
          demographics: {
            name: patientData.name,
            dob: patientData.dateOfBirth,
            ssn: this.maskSSN(patientData.ssn) // HIPAA compliant masking
          },
          medical: {
            diagnoses: patientData.diagnoses,
            medications: patientData.medications,
            allergies: patientData.allergies
          }
        },
        compliance: ['HIPAA', 'GDPR'],
        retention: 'lifetime',
        accessControls: {
          authorizedRoles: ['doctor', 'nurse', 'patient'],
          emergencyAccess: true,
          auditLevel: 'detailed'
        }
      });
      
      console.log('✅ Patient data encrypted with HIPAA compliance');
      console.log('Audit ID:', result.auditId);
      
      return result;
      
    } catch (error) {
      console.error('❌ Patient encryption failed:', error.message);
      throw error;
    }
  }
  
  maskSSN(ssn) {
    // HIPAA-compliant SSN masking
    return ssn.replace(/\\d(?=\\d{4})/g, '*');
  }
  
  async validateHIPAACompliance(patientData) {
    const violations = [];
    
    if (!patientData.consentDate) {
      violations.push('Missing patient consent documentation');
    }
    
    if (violations.length > 0) {
      throw new Error(\`HIPAA violations: \${violations.join(', ')}\`);
    }
  }
}

// Usage example
const patientManager = new PatientDataManager();
const patientRecord = {
  id: 'P123456',
  name: 'Jane Smith',
  dateOfBirth: '1985-03-15',
  ssn: '123-45-6789',
  diagnoses: ['Hypertension', 'Type 2 Diabetes'],
  medications: ['Lisinopril 10mg', 'Metformin 500mg'],
  allergies: ['Penicillin'],
  consentDate: '2024-01-15'
};

patientManager.encryptPatientRecord(patientRecord);`
      },
      {
        language: 'python',
        framework: 'Django',
        title: 'Django Healthcare App',
        description: 'HIPAA-compliant patient data encryption in Django',
        installCommand: 'pip install qubitcore[healthcare]',
        code: `from qubitcore import Aegis
from django.conf import settings
import logging

# Configure HIPAA audit logging
hipaa_logger = logging.getLogger('hipaa_audit')

# Initialize Aegis with healthcare settings
aegis = Aegis(
    api_key=settings.AEGIS_API_KEY,
    environment='healthcare',
    compliance=['HIPAA', 'GDPR', 'HITECH']
)

class HIPAAPatientManager:
    def __init__(self):
        self.aegis = aegis
        self.logger = hipaa_logger
    
    async def encrypt_patient_data(self, patient_id, health_data, user):
        try:
            # Verify user has proper authorization
            if not self.verify_healthcare_authorization(user):
                raise PermissionError("User not authorized for patient data access")
            
            # Validate patient data for HIPAA compliance
            compliance_issues = self.validate_hipaa_data(health_data)
            if compliance_issues:
                raise ValueError(f"HIPAA compliance issues: {compliance_issues}")
            
            # Encrypt with Aegis
            result = await self.aegis.patient.encrypt(
                patient_id=patient_id,
                health_data=health_data,
                compliance=['HIPAA', 'GDPR', 'HITECH'],
                retention='lifetime',
                access_controls={
                    'authorized_roles': ['physician', 'nurse', 'patient'],
                    'emergency_access': True,
                    'audit_level': 'detailed'
                }
            )
            
            # Create HIPAA audit log entry
            await self.create_hipaa_audit_log(
                action='ENCRYPT_PATIENT_DATA',
                patient_id=patient_id,
                user=user,
                audit_id=result.audit_id,
                success=True
            )
            
            return result
            
        except Exception as e:
            await self.create_hipaa_audit_log(
                action='ENCRYPT_PATIENT_DATA',
                patient_id=patient_id,
                user=user,
                success=False,
                error=str(e)
            )
            raise
    
    def validate_hipaa_data(self, health_data):
        issues = []
        
        # Check for proper de-identification
        if 'ssn' in health_data.get('demographics', {}):
            ssn = health_data['demographics']['ssn']
            if not self.is_ssn_properly_masked(ssn):
                issues.append("SSN must be de-identified per HIPAA Safe Harbor")
        
        return issues
    
    def verify_healthcare_authorization(self, user):
        return (
            user.is_authenticated and 
            hasattr(user, 'healthcare_role') and
            user.healthcare_role in ['physician', 'nurse', 'healthcare_admin']
        )`
      }
    ]
  }
];

export function AegisDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<AegisEndpoint>(aegisEndpoints[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
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

  const currentExample = selectedEndpoint.examples.find(ex => ex.language === selectedLanguage) || selectedEndpoint.examples[0];

  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50">
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
            <Heart className="w-4 h-4 mr-2" />
            AEGIS HEALTHCARE API
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            HIPAA-Compliant Healthcare APIs
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Secure patient data with quantum-safe encryption while maintaining full HIPAA, GDPR, 
            and HITECH compliance. Built specifically for healthcare applications.
          </p>
        </motion.div>  
      {/* Compliance Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold text-slate-900 mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-slate-600">
                Built-in HIPAA Security Rule compliance with quantum-safe encryption
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Audit Trails</h3>
              <p className="text-sm text-slate-600">
                Immutable audit logs for every patient data access and modification
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Access Controls</h3>
              <p className="text-sm text-slate-600">
                Role-based access with emergency override and minimum necessary principles
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <Scale className="w-8 h-8 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold text-slate-900 mb-2">Multi-Framework</h3>
              <p className="text-sm text-slate-600">
                Supports HIPAA, GDPR, HITECH, and other healthcare regulations
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedEndpoint.title}</CardTitle>
                  <p className="text-slate-600 mt-1">{selectedEndpoint.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{selectedEndpoint.method}</Badge>
                  <Badge className={getRiskColor(selectedEndpoint.riskLevel)}>
                    {selectedEndpoint.riskLevel} risk
                  </Badge>
                  {selectedEndpoint.hipaaRequired && (
                    <Badge variant="destructive">HIPAA Required</Badge>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <code className="text-lg font-mono text-slate-700 bg-slate-100 px-3 py-2 rounded">
                  {selectedEndpoint.method} {selectedEndpoint.path}
                </code>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedEndpoint.complianceFrameworks.map((framework) => (
                  <Badge key={framework} variant="outline" className="text-xs">
                    {framework}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="examples">Code Examples</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <Alert className="border-red-200 bg-red-50">
                      <Heart className="h-4 w-4 text-red-600" />
                      <AlertDescription>
                        <strong>Healthcare Data Protection:</strong> This endpoint handles Protected Health Information (PHI) 
                        and requires strict HIPAA compliance. All data is encrypted with quantum-safe algorithms 
                        and comprehensive audit logging is automatically enabled.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Key Features</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Quantum-safe encryption (CRYSTALS-Kyber)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            HIPAA Security Rule compliance
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Automatic audit trail generation
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Role-based access controls
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Emergency access protocols
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Use Cases</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>• EHR system integration</li>
                          <li>• Patient portal data storage</li>
                          <li>• Telemedicine platforms</li>
                          <li>• Medical device data collection</li>
                          <li>• Healthcare analytics (de-identified)</li>
                          <li>• Clinical trial data management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Code Examples Tab */}
                <TabsContent value="examples" className="mt-6">
                  <div className="space-y-6">
                    {/* Language Selection */}
                    <div className="flex flex-wrap gap-2">
                      {selectedEndpoint.examples.map((example) => (
                        <Button
                          key={example.language}
                          variant={selectedLanguage === example.language ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedLanguage(example.language)}
                          className="flex items-center gap-2"
                        >
                          {example.language === 'javascript' && <Code className="w-4 h-4" />}
                          {example.language === 'python' && <Terminal className="w-4 h-4" />}
                          {example.language}
                          {example.framework && (
                            <Badge variant="secondary" className="text-xs ml-1">
                              {example.framework}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                    
                    {/* Current Example */}
                    {currentExample && (
                      <Card className="bg-slate-50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{currentExample.title}</CardTitle>
                              <p className="text-sm text-slate-600 mt-1">{currentExample.description}</p>
                            </div>
                            <Button
                              onClick={() => copyToClipboard(currentExample.code, currentExample.language)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              {copiedCode === currentExample.language ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                              {copiedCode === currentExample.language ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          
                          {currentExample.installCommand && (
                            <div className="mt-4">
                              <p className="text-sm font-medium text-slate-700 mb-2">Installation:</p>
                              <code className="text-sm bg-slate-900 text-slate-100 px-3 py-2 rounded block">
                                {currentExample.installCommand}
                              </code>
                            </div>
                          )}
                        </CardHeader>
                        
                        <CardContent>
                          <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm text-slate-100">
                              <code>{currentExample.code}</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                {/* Compliance Tab */}
                <TabsContent value="compliance" className="mt-6">
                  <div className="space-y-6">
                    <Alert className="border-blue-200 bg-blue-50">
                      <Scale className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        <strong>Regulatory Compliance:</strong> Aegis automatically ensures compliance with multiple 
                        healthcare regulations and provides detailed audit trails for regulatory inspections.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">HIPAA Compliance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Security Rule § 164.312(a)(2)(iv) - Encryption
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Privacy Rule § 164.502(b) - Minimum Necessary
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Security Rule § 164.312(b) - Audit Controls
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Security Rule § 164.312(a)(1) - Access Control
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">GDPR Compliance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Article 32 - Security of Processing
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Article 25 - Data Protection by Design
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Article 30 - Records of Processing
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Article 33 - Breach Notification
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="mt-6">
                  <div className="space-y-6">
                    <Alert className="border-green-200 bg-green-50">
                      <Lock className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        <strong>Quantum-Safe Security:</strong> All patient data is protected using post-quantum 
                        cryptographic algorithms that remain secure even against future quantum computers.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">Encryption</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• CRYSTALS-Kyber (Key Encapsulation)</li>
                            <li>• CRYSTALS-Dilithium (Digital Signatures)</li>
                            <li>• AES-256-GCM (Symmetric Encryption)</li>
                            <li>• HMAC-SHA3 (Message Authentication)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">Access Control</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Role-based permissions</li>
                            <li>• Multi-factor authentication</li>
                            <li>• Emergency access protocols</li>
                            <li>• Session management</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-lg">Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Real-time audit logging</li>
                            <li>• Anomaly detection</li>
                            <li>• Compliance monitoring</li>
                            <li>• Breach detection</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Secure Healthcare Data Today
              </h3>
              <p className="text-xl mb-6 text-red-100">
                Start protecting patient data with quantum-safe, HIPAA-compliant encryption. 
                Get your healthcare API key and begin integration in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-red-600">
                  Get Healthcare API Key
                  <Heart className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  View HIPAA Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}