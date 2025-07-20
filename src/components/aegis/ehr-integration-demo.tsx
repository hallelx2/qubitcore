"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Activity, 
  Heart, 
  Shield, 
  Lock, 
  Unlock,
  AlertTriangle,
  CheckCircle,
  Play,
  RotateCcw,
  Code,
  Video,
  Bluetooth,
  Wifi,
  Smartphone,
  Watch,
  Thermometer,
  Users,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface EHRSystem {
  id: string;
  name: string;
  vendor: string;
  type: 'cloud' | 'on-premise' | 'hybrid';
  patients: number;
  integration: 'fhir' | 'hl7' | 'custom';
  securityLevel: 'standard' | 'enhanced' | 'quantum-safe';
  icon: string;
}

interface MedicalDevice {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  connectivity: string[];
  dataTypes: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  quantumVulnerable: boolean;
  icon: any;
  description: string;
}

const ehrSystems: EHRSystem[] = [
  {
    id: 'epic',
    name: 'Epic MyChart',
    vendor: 'Epic Systems',
    type: 'cloud',
    patients: 250000,
    integration: 'fhir',
    securityLevel: 'standard',
    icon: '🏥'
  },
  {
    id: 'cerner',
    name: 'Cerner PowerChart',
    vendor: 'Oracle Cerner',
    type: 'hybrid',
    patients: 180000,
    integration: 'hl7',
    securityLevel: 'enhanced',
    icon: '📊'
  }
];

const medicalDevices: MedicalDevice[] = [
  {
    id: 'insulin_pump',
    name: 'Smart Insulin Pump',
    type: 'Therapeutic Device',
    manufacturer: 'MedTech Solutions',
    connectivity: ['Bluetooth', 'WiFi', 'Cellular'],
    dataTypes: ['Glucose levels', 'Insulin delivery', 'Patient activity', 'Meal data'],
    riskLevel: 'critical',
    quantumVulnerable: true,
    icon: Activity,
    description: 'Continuous glucose monitoring and automated insulin delivery system'
  },
  {
    id: 'heart_monitor',
    name: 'Cardiac Monitor',
    type: 'Monitoring Device',
    manufacturer: 'CardioTech',
    connectivity: ['Bluetooth', 'WiFi'],
    dataTypes: ['ECG data', 'Heart rate', 'Arrhythmia alerts', 'Activity levels'],
    riskLevel: 'high',
    quantumVulnerable: true,
    icon: Heart,
    description: 'Continuous cardiac monitoring with real-time alerts'
  }
];

export function EHRIntegrationDemo() {
  const [selectedEHR, setSelectedEHR] = useState<EHRSystem>(ehrSystems[0]);
  const [selectedDevice, setSelectedDevice] = useState<MedicalDevice>(medicalDevices[0]);
  const [activeDemo, setActiveDemo] = useState<'ehr' | 'devices' | 'telemedicine'>('ehr');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [showQuantumThreat, setShowQuantumThreat] = useState(false);

  const ehrIntegrationSteps = [
    'Establishing secure connection to EHR system',
    'Authenticating healthcare provider credentials',
    'Encrypting patient data with quantum-safe algorithms',
    'Transmitting encrypted data via FHIR API',
    'Storing data with immutable audit trail',
    'Confirming successful integration'
  ];

  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setSimulationStep(prev => {
        if (prev >= ehrIntegrationSteps.length - 1) {
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isSimulating, ehrIntegrationSteps.length]);

  const handleStartSimulation = () => {
    setSimulationStep(0);
    setIsSimulating(true);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
  };

  const getDeviceRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
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
            <Database className="w-4 h-4 mr-2" />
            EHR & DEVICE INTEGRATION
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Secure Healthcare Integration
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            See how Aegis integrates with EHR systems, secures medical devices, 
            and protects telemedicine communications with quantum-safe encryption.
          </p>
        </motion.div>     
   {/* Demo Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Tabs value={activeDemo} onValueChange={(value) => setActiveDemo(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="ehr" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                EHR Integration
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Medical Devices
              </TabsTrigger>
              <TabsTrigger value="telemedicine" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Telemedicine
              </TabsTrigger>
            </TabsList>

            {/* EHR Integration Demo */}
            <TabsContent value="ehr" className="space-y-8">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">EHR System Integration</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleStartSimulation}
                        disabled={isSimulating}
                        className="flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Integration
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleResetSimulation}
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* EHR System Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Select EHR System</h3>
                      <div className="space-y-3">
                        {ehrSystems.map((ehr) => (
                          <motion.div
                            key={ehr.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedEHR(ehr)}
                            className={`
                              p-4 rounded-lg border-2 cursor-pointer transition-all
                              ${selectedEHR.id === ehr.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-slate-200 hover:border-slate-300'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{ehr.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900">{ehr.name}</h4>
                                <p className="text-sm text-slate-600">{ehr.vendor}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {ehr.type}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {ehr.integration.toUpperCase()}
                                  </Badge>
                                  <Badge 
                                    variant={ehr.securityLevel === 'quantum-safe' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {ehr.securityLevel}
                                  </Badge>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                  {ehr.patients.toLocaleString()} patients
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Integration Simulation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Integration Process</h3>
                      
                      <Card className="bg-slate-50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {ehrIntegrationSteps.map((step, index) => (
                              <div
                                key={index}
                                className={`
                                  flex items-center gap-3 p-2 rounded-lg transition-all
                                  ${index <= simulationStep ? 'bg-green-100' : 'bg-white'}
                                  ${index === simulationStep && isSimulating ? 'animate-pulse' : ''}
                                `}
                              >
                                {index < simulationStep ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : index === simulationStep && isSimulating ? (
                                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                                )}
                                <span className={`
                                  text-sm
                                  ${index <= simulationStep ? 'text-green-800 font-medium' : 'text-slate-600'}
                                `}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          {simulationStep === ehrIntegrationSteps.length - 1 && !isSimulating && (
                            <Alert className="mt-4 border-green-200 bg-green-50">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <AlertDescription>
                                <strong>Integration Complete!</strong> Patient data is now protected with quantum-safe encryption 
                                and securely integrated with {selectedEHR.name}.
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>

                      {/* Code Example */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Code className="w-5 h-5" />
                            Integration Code
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                            <code>{`// Aegis EHR Integration
import { Aegis } from '@qubitcore/aegis';

const aegis = new Aegis({
  apiKey: process.env.AEGIS_API_KEY,
  environment: 'healthcare'
});

// Secure patient data before EHR storage
async function securePatientData(patientData) {
  const encrypted = await aegis.encrypt({
    data: patientData,
    algorithm: 'CRYSTALS-Kyber',
    compliance: ['HIPAA', 'GDPR'],
    retention: 'lifetime'
  });
  
  return await ehrSystem.store({
    patientId: encrypted.patientId,
    encryptedData: encrypted.ciphertext,
    keyId: encrypted.keyId,
    auditTrail: encrypted.auditHash
  });
}`}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> 
           {/* Medical Devices Demo */}
            <TabsContent value="devices" className="space-y-8">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Medical Device Security</CardTitle>
                    <Button
                      variant={showQuantumThreat ? "destructive" : "outline"}
                      onClick={() => setShowQuantumThreat(!showQuantumThreat)}
                      className="flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      {showQuantumThreat ? 'Hide' : 'Show'} Quantum Threats
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Device Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">IoMT Device Portfolio</h3>
                      <div className="space-y-3">
                        {medicalDevices.map((device) => {
                          const IconComponent = device.icon;
                          return (
                            <motion.div
                              key={device.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedDevice(device)}
                              className={`
                                p-4 rounded-lg border-2 cursor-pointer transition-all
                                ${selectedDevice.id === device.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-slate-200 hover:border-slate-300'
                                }
                              `}
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <IconComponent className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-900">{device.name}</h4>
                                  <p className="text-sm text-slate-600">{device.manufacturer}</p>
                                  <p className="text-xs text-slate-500 mt-1">{device.description}</p>
                                  
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge 
                                      className={`text-xs ${getDeviceRiskColor(device.riskLevel)}`}
                                    >
                                      {device.riskLevel} risk
                                    </Badge>
                                    {device.quantumVulnerable && (
                                      <Badge variant="destructive" className="text-xs">
                                        Quantum Vulnerable
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {device.connectivity.map((conn, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {conn}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Device Security Analysis */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Security Analysis: {selectedDevice.name}</h3>
                      
                      <Card className="bg-slate-50">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">Data Types Collected</h4>
                              <ul className="space-y-1">
                                {selectedDevice.dataTypes.map((dataType, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                    <Database className="w-4 h-4" />
                                    {dataType}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800 mb-2">Connectivity</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedDevice.connectivity.map((conn, idx) => (
                                  <div key={idx} className="flex items-center gap-1 text-sm text-slate-600">
                                    {conn === 'Bluetooth' && <Bluetooth className="w-4 h-4" />}
                                    {conn === 'WiFi' && <Wifi className="w-4 h-4" />}
                                    {conn === 'Cellular' && <Smartphone className="w-4 h-4" />}
                                    {conn}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Alert className={`${getDeviceRiskColor(selectedDevice.riskLevel)}`}>
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Risk Level: {selectedDevice.riskLevel.toUpperCase()}</strong><br/>
                                {selectedDevice.riskLevel === 'critical' && 'Life-critical device requiring maximum security'}
                                {selectedDevice.riskLevel === 'high' && 'High-value target for attackers, needs strong protection'}
                              </AlertDescription>
                            </Alert>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quantum Threat Analysis */}
                      <AnimatePresence>
                        {showQuantumThreat && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="bg-red-50 border-red-200">
                              <CardHeader>
                                <CardTitle className="text-lg text-red-800">Quantum Threat Assessment</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <Alert className="border-red-300 bg-red-100">
                                    <Unlock className="h-4 w-4 text-red-600" />
                                    <AlertDescription>
                                      <strong>Current Vulnerability:</strong> Device uses RSA-2048 encryption, 
                                      vulnerable to quantum computers by 2029
                                    </AlertDescription>
                                  </Alert>
                                  
                                  <Alert className="border-green-300 bg-green-100">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    <AlertDescription>
                                      <strong>Aegis Protection:</strong> Quantum-safe encryption protects 
                                      device data indefinitely, even against future quantum computers
                                    </AlertDescription>
                                  </Alert>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Aegis Device Protection */}
                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Aegis Device Protection
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Device identity verification with quantum-safe certificates
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              End-to-end encryption with CRYSTALS-Kyber
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Real-time threat detection and response
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Immutable audit logs for compliance
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>       
     {/* Telemedicine Demo */}
            <TabsContent value="telemedicine" className="space-y-8">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Telemedicine Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Scenario Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Remote Patient Consultation</h3>
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-2">Participants</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">Patient</Badge>
                                <Badge variant="outline">Primary Care Physician</Badge>
                                <Badge variant="outline">Specialist</Badge>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-2">Data Exchanged</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Video/Audio</Badge>
                                <Badge variant="secondary">Medical History</Badge>
                                <Badge variant="secondary">Lab Results</Badge>
                                <Badge variant="secondary">Prescriptions</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Security Implementation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Security Implementation</h3>
                      
                      <Tabs defaultValue="challenges" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="challenges">Challenges</TabsTrigger>
                          <TabsTrigger value="protection">Aegis Protection</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="challenges" className="mt-4">
                          <Card className="bg-orange-50 border-orange-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-orange-800 mb-3">Security Challenges</h4>
                              <ul className="space-y-2">
                                <li className="text-sm text-orange-700 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  End-to-end encryption
                                </li>
                                <li className="text-sm text-orange-700 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  Identity verification
                                </li>
                                <li className="text-sm text-orange-700 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  Data in transit security
                                </li>
                                <li className="text-sm text-orange-700 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  Recording security
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="protection" className="mt-4">
                          <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-green-800 mb-3">Aegis Protection</h4>
                              <ul className="space-y-2">
                                <li className="text-sm text-green-700 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Quantum-safe video encryption
                                </li>
                                <li className="text-sm text-green-700 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Device identity verification
                                </li>
                                <li className="text-sm text-green-700 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Secure data exchange
                                </li>
                                <li className="text-sm text-green-700 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Immutable session logs
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>

                      {/* Data Flow Diagram */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Secure Data Flow</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <Users className="w-5 h-5 text-blue-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-blue-800">Participants</p>
                                <p className="text-xs text-blue-600">
                                  Patient ↔ Physician ↔ Specialist
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <Shield className="w-5 h-5 text-green-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-green-800">Encryption</p>
                                <p className="text-xs text-green-600">
                                  Quantum-safe end-to-end encryption with CRYSTALS-Kyber
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <FileText className="w-5 h-5 text-purple-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-purple-800">Audit Trail</p>
                                <p className="text-xs text-purple-600">
                                  Immutable session logs for compliance and forensics
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Secure Your Healthcare Infrastructure
              </h3>
              <p className="text-xl mb-6 text-blue-100">
                Protect EHR systems, medical devices, and telemedicine communications 
                with quantum-safe security from Aegis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  Start Integration
                  <Database className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}