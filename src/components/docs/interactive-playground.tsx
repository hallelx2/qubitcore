"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Code, 
  Terminal, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Shield,
  Database,
  Heart,
  Settings,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Upload,
  Save,
  Trash2,
  Clock,
  Activity
} from 'lucide-react';

interface PlaygroundRequest {
  id: string;
  method: string;
  endpoint: string;
  headers: Record<string, string>;
  body: any;
  timestamp: Date;
}

interface PlaygroundResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  duration: number;
  timestamp: Date;
}

interface SavedRequest {
  id: string;
  name: string;
  platform: string;
  endpoint: string;
  method: string;
  body: any;
  createdAt: Date;
}

const sampleRequests: SavedRequest[] = [
  {
    id: '1',
    name: 'Encrypt User Data',
    platform: 'shield',
    endpoint: '/v1/shield/encrypt',
    method: 'POST',
    body: {
      data: 'Hello, quantum-safe world!',
      algorithm: 'CRYSTALS-Kyber',
      metadata: { purpose: 'demo' }
    },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Patient Data Encryption',
    platform: 'aegis',
    endpoint: '/v1/aegis/patient/encrypt',
    method: 'POST',
    body: {
      patientId: 'patient_demo_123',
      healthData: {
        diagnosis: 'Hypertension',
        medications: ['Lisinopril', 'Amlodipine'],
        vitals: { bp: '140/90', hr: 78 }
      },
      compliance: ['HIPAA', 'GDPR']
    },
    createdAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Blockchain Transaction',
    platform: 'ledger',
    endpoint: '/v1/ledger/transaction',
    method: 'POST',
    body: {
      from: 'qc1demo123456789',
      to: 'qc9demo987654321',
      amount: '1000000',
      data: 'Demo payment'
    },
    createdAt: new Date('2024-01-17')
  }
];

export function InteractivePlayground() {
  const [selectedPlatform, setSelectedPlatform] = useState('shield');
  const [selectedEndpoint, setSelectedEndpoint] = useState('/v1/shield/encrypt');
  const [method, setMethod] = useState('POST');
  const [apiKey, setApiKey] = useState('demo_key_1234567890abcdef');
  const [requestBody, setRequestBody] = useState('{\n  "data": "Hello, quantum-safe world!",\n  "algorithm": "CRYSTALS-Kyber"\n}');
  const [response, setResponse] = useState<PlaygroundResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>(sampleRequests);
  const [requestHistory, setRequestHistory] = useState<PlaygroundRequest[]>([]);
  const [activeTab, setActiveTab] = useState('request');

  const platformEndpoints = {
    shield: [
      { path: '/v1/shield/encrypt', method: 'POST', name: 'Encrypt Data' },
      { path: '/v1/shield/decrypt', method: 'POST', name: 'Decrypt Data' },
      { path: '/v1/shield/keys', method: 'GET', name: 'List Keys' },
      { path: '/v1/shield/keys', method: 'POST', name: 'Generate Key' }
    ],
    aegis: [
      { path: '/v1/aegis/patient/encrypt', method: 'POST', name: 'Encrypt Patient Data' },
      { path: '/v1/aegis/patient/decrypt', method: 'POST', name: 'Decrypt Patient Data' },
      { path: '/v1/aegis/compliance/check', method: 'POST', name: 'Compliance Check' },
      { path: '/v1/aegis/audit/log', method: 'GET', name: 'Audit Logs' }
    ],
    ledger: [
      { path: '/v1/ledger/transaction', method: 'POST', name: 'Create Transaction' },
      { path: '/v1/ledger/balance', method: 'GET', name: 'Get Balance' },
      { path: '/v1/ledger/history', method: 'GET', name: 'Transaction History' },
      { path: '/v1/ledger/wallet', method: 'POST', name: 'Create Wallet' }
    ],
    synapse: [
      { path: '/v1/synapse/project/create', method: 'POST', name: 'Create Project' },
      { path: '/v1/synapse/data/share', method: 'POST', name: 'Share Data' },
      { path: '/v1/synapse/compute/start', method: 'POST', name: 'Start Computation' },
      { path: '/v1/synapse/results', method: 'GET', name: 'Get Results' }
    ]
  };

  const simulateAPICall = async () => {
    setIsLoading(true);
    setActiveTab('response');
    
    // Add to request history
    const request: PlaygroundRequest = {
      id: Date.now().toString(),
      method,
      endpoint: selectedEndpoint,
      headers: { 'Authorization': `Bearer ${apiKey}` },
      body: JSON.parse(requestBody),
      timestamp: new Date()
    };
    setRequestHistory(prev => [request, ...prev.slice(0, 9)]);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate mock response based on endpoint
    let mockResponse: PlaygroundResponse;
    
    if (selectedEndpoint.includes('encrypt')) {
      mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: true,
          ciphertext: 'eyJhbGciOiJLWUJFUi01MTIiLCJ0eXAiOiJKV1QifQ.eyJkYXRhIjoiSGVsbG8sIHF1YW50dW0tc2FmZSB3b3JsZCEiLCJpYXQiOjE3MDU3NjQwMDB9.quantum_safe_signature_here...',
          keyId: `key_${Date.now()}`,
          algorithm: 'CRYSTALS-Kyber',
          timestamp: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        duration: Math.floor(800 + Math.random() * 1200),
        timestamp: new Date()
      };
    } else if (selectedEndpoint.includes('transaction')) {
      mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: true,
          transactionId: `tx_${Date.now()}`,
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          blockHeight: Math.floor(1000000 + Math.random() * 100000),
          confirmations: 0,
          fee: '1000',
          timestamp: new Date().toISOString()
        },
        duration: Math.floor(1200 + Math.random() * 1800),
        timestamp: new Date()
      };
    } else {
      mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: true,
          message: 'Operation completed successfully',
          data: { id: Date.now(), status: 'processed' },
          timestamp: new Date().toISOString()
        },
        duration: Math.floor(500 + Math.random() * 1000),
        timestamp: new Date()
      };
    }

    setResponse(mockResponse);
    setIsLoading(false);
  };

  const loadSavedRequest = (savedRequest: SavedRequest) => {
    setSelectedPlatform(savedRequest.platform);
    setSelectedEndpoint(savedRequest.endpoint);
    setMethod(savedRequest.method);
    setRequestBody(JSON.stringify(savedRequest.body, null, 2));
    setActiveTab('request');
  };

  const saveCurrentRequest = () => {
    const newRequest: SavedRequest = {
      id: Date.now().toString(),
      name: `${method} ${selectedEndpoint}`,
      platform: selectedPlatform,
      endpoint: selectedEndpoint,
      method,
      body: JSON.parse(requestBody),
      createdAt: new Date()
    };
    setSavedRequests(prev => [newRequest, ...prev]);
  };

  const copyResponse = async () => {
    if (response) {
      await navigator.clipboard.writeText(JSON.stringify(response.body, null, 2));
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-purple-50 via-white to-green-50">
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
            <Terminal className="w-4 h-4 mr-2" />
            INTERACTIVE PLAYGROUND
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Try QubitCore APIs Live
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Test our quantum-safe APIs directly in your browser. No setup required - 
            just select an endpoint, customize parameters, and see real responses.
          </p>
        </motion.div>

        {/* Playground Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Sidebar - Saved Requests */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Saved Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedRequests.map((savedRequest) => (
                    <motion.div
                      key={savedRequest.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => loadSavedRequest(savedRequest)}
                      className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {savedRequest.method}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {savedRequest.platform}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mb-1">
                        {savedRequest.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {savedRequest.endpoint}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <Button
                  onClick={saveCurrentRequest}
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Current
                </Button>
              </CardContent>
            </Card>

            {/* Request History */}
            <Card className="bg-white shadow-xl mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {requestHistory.slice(0, 5).map((request) => (
                    <div key={request.id} className="p-2 bg-slate-50 rounded text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {request.method}
                        </Badge>
                        <span className="text-slate-600">
                          {request.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="font-mono text-slate-700">
                        {request.endpoint}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>      
    {/* Main Playground */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">API Playground</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={simulateAPICall}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {isLoading ? 'Sending...' : 'Send Request'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="code">Generated Code</TabsTrigger>
                  </TabsList>
                  
                  {/* Request Tab */}
                  <TabsContent value="request" className="mt-6">
                    <div className="space-y-6">
                      {/* Platform & Endpoint Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="platform">Platform</Label>
                          <select
                            id="platform"
                            value={selectedPlatform}
                            onChange={(e) => {
                              setSelectedPlatform(e.target.value);
                              const endpoints = platformEndpoints[e.target.value as keyof typeof platformEndpoints];
                              if (endpoints.length > 0) {
                                setSelectedEndpoint(endpoints[0].path);
                                setMethod(endpoints[0].method);
                              }
                            }}
                            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg"
                          >
                            <option value="shield">Shield - Encryption</option>
                            <option value="aegis">Aegis - Healthcare</option>
                            <option value="ledger">Ledger - Blockchain</option>
                            <option value="synapse">Synapse - Collaboration</option>
                          </select>
                        </div>
                        
                        <div>
                          <Label htmlFor="endpoint">Endpoint</Label>
                          <select
                            id="endpoint"
                            value={selectedEndpoint}
                            onChange={(e) => {
                              setSelectedEndpoint(e.target.value);
                              const endpoint = platformEndpoints[selectedPlatform as keyof typeof platformEndpoints]
                                .find(ep => ep.path === e.target.value);
                              if (endpoint) {
                                setMethod(endpoint.method);
                              }
                            }}
                            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg"
                          >
                            {platformEndpoints[selectedPlatform as keyof typeof platformEndpoints].map((endpoint) => (
                              <option key={endpoint.path} value={endpoint.path}>
                                {endpoint.method} {endpoint.path} - {endpoint.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Request URL */}
                      <div>
                        <Label>Request URL</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" className="text-sm">
                            {method}
                          </Badge>
                          <code className="flex-1 px-3 py-2 bg-slate-100 rounded-lg text-sm font-mono">
                            https://api.qubitcore.com{selectedEndpoint}
                          </code>
                        </div>
                      </div>

                      {/* API Key */}
                      <div>
                        <Label htmlFor="apiKey">API Key</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            id="apiKey"
                            type={showApiKey ? "text" : "password"}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your API key"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Using demo key. Get your free API key to test with real data.
                        </p>
                      </div>

                      {/* Request Body */}
                      {method !== 'GET' && (
                        <div>
                          <Label htmlFor="requestBody">Request Body (JSON)</Label>
                          <Textarea
                            id="requestBody"
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            placeholder="Enter JSON request body"
                            className="mt-1 font-mono text-sm"
                            rows={10}
                          />
                        </div>
                      )}

                      {/* Headers Preview */}
                      <div>
                        <Label>Request Headers</Label>
                        <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                          <pre className="text-sm text-slate-700">
                            <code>{`Authorization: Bearer ${apiKey.substring(0, 20)}...
Content-Type: application/json
User-Agent: QubitCore-Playground/1.0`}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Response Tab */}
                  <TabsContent value="response" className="mt-6">
                    {isLoading ? (
                      <div className="text-center py-12">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                        <p className="text-slate-600">Sending request to QubitCore API...</p>
                      </div>
                    ) : response ? (
                      <div className="space-y-4">
                        {/* Response Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={response.status === 200 ? 'default' : 'destructive'}
                              className="text-sm"
                            >
                              {response.status} {response.statusText}
                            </Badge>
                            <span className="text-sm text-slate-600">
                              {response.duration}ms
                            </span>
                            <span className="text-sm text-slate-500">
                              {response.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <Button
                            onClick={copyResponse}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copy Response
                          </Button>
                        </div>

                        {/* Response Headers */}
                        <div>
                          <Label>Response Headers</Label>
                          <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                            <pre className="text-sm text-slate-700">
                              <code>
                                {Object.entries(response.headers)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join('\n')}
                              </code>
                            </pre>
                          </div>
                        </div>

                        {/* Response Body */}
                        <div>
                          <Label>Response Body</Label>
                          <div className="mt-1 p-4 bg-slate-900 rounded-lg">
                            <pre className="text-sm text-slate-100 overflow-x-auto">
                              <code>
                                {JSON.stringify(response.body, null, 2)}
                              </code>
                            </pre>
                          </div>
                        </div>

                        {/* Success Indicators */}
                        {response.status === 200 && (
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription>
                              <strong>Success!</strong> Your request was processed successfully. 
                              {response.body.keyId && ` Key ID: ${response.body.keyId}`}
                              {response.body.transactionId && ` Transaction ID: ${response.body.transactionId}`}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Terminal className="w-8 h-8 mx-auto mb-4 text-slate-400" />
                        <p className="text-slate-600">
                          Click "Send Request" to see the API response here
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Generated Code Tab */}
                  <TabsContent value="code" className="mt-6">
                    <div className="space-y-6">
                      <Tabs defaultValue="javascript" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                          <TabsTrigger value="go">Go</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="javascript" className="mt-4">
                          <div className="relative">
                            <div className="absolute top-3 right-3">
                              <Button
                                onClick={() => navigator.clipboard.writeText(`const { ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} } = require('@qubitcore/${selectedPlatform}');

const ${selectedPlatform} = new ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}({
  apiKey: '${apiKey}',
  environment: 'production'
});

async function makeRequest() {
  try {
    const response = await ${selectedPlatform}.request('${method}', '${selectedEndpoint}', ${requestBody});
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

makeRequest();`)}
                                variant="outline"
                                size="sm"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="p-4 bg-slate-900 rounded-lg">
                              <pre className="text-sm text-slate-100 overflow-x-auto">
                                <code>{`const { ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} } = require('@qubitcore/${selectedPlatform}');

const ${selectedPlatform} = new ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}({
  apiKey: '${apiKey}',
  environment: 'production'
});

async function makeRequest() {
  try {
    const response = await ${selectedPlatform}.request('${method}', '${selectedEndpoint}', ${requestBody});
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

makeRequest();`}</code>
                              </pre>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="python" className="mt-4">
                          <div className="relative">
                            <div className="absolute top-3 right-3">
                              <Button
                                onClick={() => navigator.clipboard.writeText(`from qubitcore import ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
import json

${selectedPlatform} = ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}(
    api_key='${apiKey}',
    environment='production'
)

def make_request():
    try:
        response = ${selectedPlatform}.request('${method}', '${selectedEndpoint}', ${requestBody})
        print('Response:', response)
        return response
    except Exception as e:
        print('Error:', str(e))
        raise

make_request()`)}
                                variant="outline"
                                size="sm"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="p-4 bg-slate-900 rounded-lg">
                              <pre className="text-sm text-slate-100 overflow-x-auto">
                                <code>{`from qubitcore import ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
import json

${selectedPlatform} = ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}(
    api_key='${apiKey}',
    environment='production'
)

def make_request():
    try:
        response = ${selectedPlatform}.request('${method}', '${selectedEndpoint}', ${requestBody})
        print('Response:', response)
        return response
    except Exception as e:
        print('Error:', str(e))
        raise

make_request()`}</code>
                              </pre>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="curl" className="mt-4">
                          <div className="relative">
                            <div className="absolute top-3 right-3">
                              <Button
                                onClick={() => navigator.clipboard.writeText(`curl -X ${method} \\
  https://api.qubitcore.com${selectedEndpoint} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\${method !== 'GET' ? `\n  -d '${requestBody}'` : ''}`)}
                                variant="outline"
                                size="sm"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="p-4 bg-slate-900 rounded-lg">
                              <pre className="text-sm text-slate-100 overflow-x-auto">
                                <code>{`curl -X ${method} \\
  https://api.qubitcore.com${selectedEndpoint} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\${method !== 'GET' ? `\n  -d '${requestBody}'` : ''}`}</code>
                              </pre>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="go" className="mt-4">
                          <div className="relative">
                            <div className="absolute top-3 right-3">
                              <Button
                                onClick={() => navigator.clipboard.writeText(`package main

import (
    "fmt"
    "github.com/qubitcore/go-sdk/${selectedPlatform}"
)

func main() {
    client := ${selectedPlatform}.NewClient("${apiKey}")
    
    response, err := client.Request("${method}", "${selectedEndpoint}", ${requestBody})
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Response: %+v\\n", response)
}`)}
                                variant="outline"
                                size="sm"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="p-4 bg-slate-900 rounded-lg">
                              <pre className="text-sm text-slate-100 overflow-x-auto">
                                <code>{`package main

import (
    "fmt"
    "github.com/qubitcore/go-sdk/${selectedPlatform}"
)

func main() {
    client := ${selectedPlatform}.NewClient("${apiKey}")
    
    response, err := client.Request("${method}", "${selectedEndpoint}", ${requestBody})
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Response: %+v\\n", response)
}`}</code>
                              </pre>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Integrate QubitCore?
              </h3>
              <p className="text-xl mb-6 text-green-100">
                Get your free API key and start building quantum-safe applications today. 
                No credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-green-600">
                  Get Free API Key
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  View Full Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}