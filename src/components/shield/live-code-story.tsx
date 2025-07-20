"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Copy, 
  Check, 
  Code, 
  Zap, 
  Shield, 
  AlertTriangle,
  Clock,
  Terminal,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: 'javascript' | 'python' | 'java' | 'go';
  beforeCode: string;
  afterCode: string;
  apiCall: string;
  expectedResponse: any;
  vulnerability: string;
  protection: string;
}

const codeExamples: CodeExample[] = [
  {
    id: 'encryption',
    title: 'Data Encryption',
    description: 'Protect sensitive user data with quantum-resistant encryption',
    language: 'javascript',
    beforeCode: `// ❌ Vulnerable RSA encryption
const crypto = require('crypto');

function encryptUserData(userData) {
  const publicKey = fs.readFileSync('public_key.pem');
  
  // RSA-2048 - will be broken by quantum computers
  const encrypted = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  }, Buffer.from(JSON.stringify(userData)));
  
  return encrypted.toString('base64');
}

// This encryption will be broken in ~2030`,
    afterCode: `// ✅ Quantum-safe with QubitCore Shield
const { Shield } = require('@qubitcore/shield');

async function encryptUserData(userData) {
  try {
    const response = await Shield.encrypt({
      data: JSON.stringify(userData),
      algorithm: 'CRYSTALS-Kyber-1024',
      keyId: 'user-data-key'
    });
    
    return {
      ciphertext: response.ciphertext,
      keyId: response.keyId,
      algorithm: response.algorithm
    };
  } catch (error) {
    throw new Error('Encryption failed: ' + error.message);
  }
}

// Protected against quantum computers for decades`,
    apiCall: 'POST /v1/shield/encrypt',
    expectedResponse: {
      ciphertext: "kyber_encrypted_data_here...",
      keyId: "user-data-key",
      algorithm: "CRYSTALS-Kyber-1024",
      timestamp: "2024-01-15T10:30:00Z"
    },
    vulnerability: 'RSA-2048 can be broken by quantum computers using Shor\'s algorithm',
    protection: 'CRYSTALS-Kyber is quantum-resistant and NIST-approved'
  },
  {
    id: 'signatures',
    title: 'Digital Signatures',
    description: 'Create unforgeable digital signatures for document integrity',
    language: 'python',
    beforeCode: `# ❌ Vulnerable ECDSA signatures
import hashlib
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec

def sign_document(document, private_key):
    # ECDSA P-256 - vulnerable to quantum attacks
    signature = private_key.sign(
        document.encode(),
        ec.ECDSA(hashes.SHA256())
    )
    
    return signature

# Quantum computers will forge these signatures`,
    afterCode: `# ✅ Quantum-safe signatures with Shield
import requests
import json

def sign_document(document, api_key):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'data': document,
        'algorithm': 'CRYSTALS-Dilithium-3',
        'keyId': 'document-signing-key'
    }
    
    response = requests.post(
        'https://api.qubitcore.com/v1/shield/sign',
        headers=headers,
        json=payload
    )
    
    return response.json()

# Quantum-resistant signatures that remain valid forever`,
    apiCall: 'POST /v1/shield/sign',
    expectedResponse: {
      signature: "dilithium_signature_data_here...",
      keyId: "document-signing-key",
      algorithm: "CRYSTALS-Dilithium-3",
      hash: "sha3-256",
      timestamp: "2024-01-15T10:30:00Z"
    },
    vulnerability: 'ECDSA signatures can be forged using quantum algorithms',
    protection: 'CRYSTALS-Dilithium provides quantum-resistant digital signatures'
  },
  {
    id: 'key-exchange',
    title: 'Key Exchange',
    description: 'Establish secure communication channels',
    language: 'java',
    beforeCode: `// ❌ Vulnerable Diffie-Hellman key exchange
import javax.crypto.KeyAgreement;
import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class VulnerableKeyExchange {
    public byte[] generateSharedSecret(PublicKey otherPartyKey) {
        try {
            // ECDH P-256 - broken by quantum computers
            KeyAgreement keyAgreement = KeyAgreement.getInstance("ECDH");
            keyAgreement.init(privateKey);
            keyAgreement.doPhase(otherPartyKey, true);
            
            return keyAgreement.generateSecret();
        } catch (Exception e) {
            throw new RuntimeException("Key exchange failed", e);
        }
    }
}

// Quantum computers will break this in ~2030`,
    afterCode: `// ✅ Quantum-safe key exchange with Shield
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class QuantumSafeKeyExchange {
    private final String apiKey;
    private final HttpClient client;
    
    public KeyExchangeResponse generateSharedSecret(String sessionId) {
        try {
            String payload = """
                {
                    "algorithm": "CRYSTALS-Kyber-1024",
                    "sessionId": "%s",
                    "keyId": "session-key"
                }
                """.formatted(sessionId);
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.qubitcore.com/v1/shield/key-exchange"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
            
            HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
            
            return parseResponse(response.body());
        } catch (Exception e) {
            throw new RuntimeException("Quantum-safe key exchange failed", e);
        }
    }
}

// Protected against quantum attacks indefinitely`,
    apiCall: 'POST /v1/shield/key-exchange',
    expectedResponse: {
      sharedSecret: "kyber_shared_secret_here...",
      sessionId: "sess_abc123",
      algorithm: "CRYSTALS-Kyber-1024",
      expiresAt: "2024-01-15T11:30:00Z"
    },
    vulnerability: 'ECDH key exchange is vulnerable to quantum attacks',
    protection: 'CRYSTALS-Kyber provides quantum-resistant key encapsulation'
  },
  {
    id: 'authentication',
    title: 'API Authentication',
    description: 'Secure API endpoints with quantum-resistant tokens',
    language: 'go',
    beforeCode: `// ❌ Vulnerable JWT with RSA signatures
package main

import (
    "github.com/golang-jwt/jwt/v4"
    "crypto/rsa"
    "time"
)

func generateToken(userID string, privateKey *rsa.PrivateKey) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "exp":     time.Now().Add(time.Hour * 24).Unix(),
        "iat":     time.Now().Unix(),
    }
    
    // RSA-256 signatures - quantum vulnerable
    token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
    
    return token.SignedString(privateKey)
}

// These tokens will be forgeable post-quantum`,
    afterCode: `// ✅ Quantum-safe authentication with Shield
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "fmt"
)

type AuthRequest struct {
    UserID    string \`json:"userId"\`
    ExpiresIn int    \`json:"expiresIn"\`
    Algorithm string \`json:"algorithm"\`
}

type AuthResponse struct {
    Token     string \`json:"token"\`
    ExpiresAt string \`json:"expiresAt"\`
    Algorithm string \`json:"algorithm"\`
}

func generateQuantumSafeToken(userID string, apiKey string) (*AuthResponse, error) {
    reqBody := AuthRequest{
        UserID:    userID,
        ExpiresIn: 86400, // 24 hours
        Algorithm: "CRYSTALS-Dilithium-3",
    }
    
    jsonBody, _ := json.Marshal(reqBody)
    
    req, _ := http.NewRequest("POST", 
        "https://api.qubitcore.com/v1/shield/auth/token", 
        bytes.NewBuffer(jsonBody))
    
    req.Header.Set("Authorization", "Bearer "+apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var authResp AuthResponse
    json.NewDecoder(resp.Body).Decode(&authResp)
    
    return &authResp, nil
}

// Quantum-resistant authentication tokens`,
    apiCall: 'POST /v1/shield/auth/token',
    expectedResponse: {
      token: "qsafe_token_dilithium_signed_here...",
      expiresAt: "2024-01-16T10:30:00Z",
      algorithm: "CRYSTALS-Dilithium-3",
      keyId: "auth-signing-key"
    },
    vulnerability: 'RSA-signed JWTs can be forged by quantum computers',
    protection: 'Dilithium-signed tokens remain unforgeable in quantum era'
  }
];

interface LiveCodeStoryProps {
  platform: 'shield' | 'ledger' | 'synapse' | 'aegis';
  scenario?: string;
  initialCode?: string;
}

export function LiveCodeStory({ platform, scenario, initialCode }: LiveCodeStoryProps) {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(codeExamples[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate API call
    setTimeout(() => {
      setApiResponse(selectedExample.expectedResponse);
      setIsRunning(false);
    }, 2000);
  };

  const handleCopyCode = async (code: string, type: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredExamples = codeExamples.filter(example => 
    selectedLanguage === 'all' || example.language === selectedLanguage
  );

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
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
            <Code className="w-4 h-4 mr-2" />
            INTERACTIVE PLAYGROUND
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            See the Difference in Code
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Compare vulnerable traditional encryption with quantum-safe Shield APIs. 
            Run real code examples and see the protection in action.
          </p>
        </motion.div>

        {/* Language and Example Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Choose Your Language & Scenario</CardTitle>
                  <p className="text-slate-600">Select a programming language and security scenario to explore</p>
                </div>
                
                <div className="flex gap-2">
                  {['javascript', 'python', 'java', 'go'].map((lang) => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                      className="capitalize"
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredExamples.map((example) => (
                  <motion.div
                    key={example.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedExample(example)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${selectedExample.id === example.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">{example.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{example.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {example.language}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Code Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vulnerable Code */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-red-800">Vulnerable Code</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCode(selectedExample.beforeCode, 'before')}
                    className="text-red-600 border-red-300"
                  >
                    {copiedCode === 'before' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Alert className="border-red-300 bg-red-100">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Vulnerability:</strong> {selectedExample.vulnerability}
                  </AlertDescription>
                </Alert>
              </CardHeader>
              
              <CardContent>
                <pre className="text-sm text-slate-800 overflow-x-auto bg-white p-4 rounded border">
                  <code>{selectedExample.beforeCode}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Protected Code */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-green-800">Quantum-Safe Code</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCode(selectedExample.afterCode, 'after')}
                    className="text-green-600 border-green-300"
                  >
                    {copiedCode === 'after' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Alert className="border-green-300 bg-green-100">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Protection:</strong> {selectedExample.protection}
                  </AlertDescription>
                </Alert>
              </CardHeader>
              
              <CardContent>
                <pre className="text-sm text-slate-800 overflow-x-auto bg-white p-4 rounded border">
                  <code>{selectedExample.afterCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* API Playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-2xl">Live API Demo</CardTitle>
                </div>
                
                <Button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Shield API
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-slate-600">
                Test the QubitCore Shield API with real quantum-safe operations
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* API Request */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    API Request
                  </h3>
                  
                  <Card className="bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-blue-600">POST</Badge>
                        <code className="text-sm">{selectedExample.apiCall}</code>
                      </div>
                      
                      <pre className="text-sm text-slate-700 overflow-x-auto">
{`{
  "data": "sensitive_user_data",
  "algorithm": "CRYSTALS-Kyber-1024",
  "keyId": "user-data-key"
}`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>

                {/* API Response */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-green-600 rotate-180" />
                    API Response
                  </h3>
                  
                  <Card className="bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-green-600">200 OK</Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>~50ms</span>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {apiResponse ? (
                          <motion.pre
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-slate-700 overflow-x-auto"
                          >
                            {JSON.stringify(apiResponse, null, 2)}
                          </motion.pre>
                        ) : (
                          <div className="text-slate-400 text-sm italic">
                            Click "Run Shield API" to see the response
                          </div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Quantum-Proof Your Code?
              </h3>
              <p className="text-xl mb-6 text-blue-100">
                Get started with Shield APIs in minutes. Free tier includes 10,000 API calls per month.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
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