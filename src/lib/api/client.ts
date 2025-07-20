// QubitCore API Client Architecture
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Authentication Types
export interface AuthCredentials {
  apiKey: string;
  secretKey?: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  refreshToken?: string;
}

// Rate Limiting Types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: string;
}

// Base API Client Configuration
export interface APIClientConfig {
  baseURL?: string;
  apiKey: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  enableLogging?: boolean;
}

// Base API Client Class
export class QubitCoreAPIClient {
  private client: AxiosInstance;
  private config: APIClientConfig;
  private rateLimitInfo: RateLimitInfo | null = null;

  constructor(config: APIClientConfig) {
    this.config = {
      baseURL: 'https://api.qubitcore.com/v1',
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      enableLogging: false,
      ...config
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        'User-Agent': 'QubitCore-JS-SDK/1.0.0'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (this.config.enableLogging) {
          console.log(`[QubitCore API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        if (this.config.enableLogging) {
          console.error('[QubitCore API] Request error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Extract rate limit information
        this.extractRateLimitInfo(response);
        
        if (this.config.enableLogging) {
          console.log(`[QubitCore API] Response ${response.status}:`, response.data);
        }
        
        return response;
      },
      async (error) => {
        if (this.config.enableLogging) {
          console.error('[QubitCore API] Response error:', error);
        }

        // Handle rate limiting
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          if (retryAfter && this.config.retries && this.config.retries > 0) {
            await this.delay(parseInt(retryAfter) * 1000);
            return this.retryRequest(error.config);
          }
        }

        // Handle other retryable errors
        if (this.shouldRetry(error) && this.config.retries && this.config.retries > 0) {
          return this.retryRequest(error.config);
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private extractRateLimitInfo(response: AxiosResponse) {
    const headers = response.headers;
    if (headers['x-ratelimit-limit']) {
      this.rateLimitInfo = {
        limit: parseInt(headers['x-ratelimit-limit']),
        remaining: parseInt(headers['x-ratelimit-remaining']),
        resetTime: headers['x-ratelimit-reset']
      };
    }
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx server errors
    return !error.response || (error.response.status >= 500 && error.response.status < 600);
  }

  private async retryRequest(config: AxiosRequestConfig, attempt: number = 1): Promise<any> {
    if (attempt > (this.config.retries || 3)) {
      throw new Error('Max retries exceeded');
    }

    await this.delay((this.config.retryDelay || 1000) * Math.pow(2, attempt - 1));
    
    try {
      return await this.client.request(config);
    } catch (error) {
      return this.retryRequest(config, attempt + 1);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private formatError(error: any): APIError {
    if (error.response?.data) {
      return {
        code: error.response.data.code || 'API_ERROR',
        message: error.response.data.message || 'An API error occurred',
        details: error.response.data.details,
        timestamp: new Date().toISOString()
      };
    }

    return {
      code: 'NETWORK_ERROR',
      message: error.message || 'A network error occurred',
      timestamp: new Date().toISOString()
    };
  }

  // Generic request method
  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.client.request({
        method,
        url: endpoint,
        data,
        ...config
      });

      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw error;
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  // Rate limit information
  getRateLimitInfo(): RateLimitInfo | null {
    return this.rateLimitInfo;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

// Platform-specific API clients
export class ShieldAPI extends QubitCoreAPIClient {
  // Encryption operations
  async encrypt(data: {
    data: string;
    algorithm?: string;
    keyId?: string;
  }): Promise<APIResponse<{
    ciphertext: string;
    keyId: string;
    algorithm: string;
    timestamp: string;
  }>> {
    return this.post('/shield/encrypt', data);
  }

  async decrypt(data: {
    ciphertext: string;
    keyId: string;
  }): Promise<APIResponse<{
    plaintext: string;
    keyId: string;
    timestamp: string;
  }>> {
    return this.post('/shield/decrypt', data);
  }

  // Digital signature operations
  async sign(data: {
    data: string;
    keyId?: string;
    algorithm?: string;
  }): Promise<APIResponse<{
    signature: string;
    keyId: string;
    algorithm: string;
    timestamp: string;
  }>> {
    return this.post('/shield/sign', data);
  }

  async verify(data: {
    data: string;
    signature: string;
    keyId: string;
  }): Promise<APIResponse<{
    valid: boolean;
    keyId: string;
    timestamp: string;
  }>> {
    return this.post('/shield/verify', data);
  }

  // Key management
  async createKey(data: {
    algorithm: string;
    name: string;
    usage: string[];
    metadata?: any;
  }): Promise<APIResponse<{
    keyId: string;
    algorithm: string;
    name: string;
    status: string;
    createdAt: string;
  }>> {
    return this.post('/shield/keys', data);
  }

  async getKey(keyId: string): Promise<APIResponse<{
    keyId: string;
    algorithm: string;
    name: string;
    status: string;
    usage: string[];
    createdAt: string;
    metadata?: any;
  }>> {
    return this.get(`/shield/keys/${keyId}`);
  }

  async listKeys(): Promise<APIResponse<Array<{
    keyId: string;
    algorithm: string;
    name: string;
    status: string;
    createdAt: string;
  }>>> {
    return this.get('/shield/keys');
  }

  async deleteKey(keyId: string): Promise<APIResponse<{
    keyId: string;
    deleted: boolean;
    timestamp: string;
  }>> {
    return this.delete(`/shield/keys/${keyId}`);
  }
}

export class LedgerAPI extends QubitCoreAPIClient {
  // Transaction witnessing
  async witnessTransaction(data: {
    transactionData: any;
    metadata?: any;
  }): Promise<APIResponse<{
    witnessId: string;
    transactionHash: string;
    signature: string;
    timestamp: string;
    blockHeight?: number;
  }>> {
    return this.post('/ledger/witness', data);
  }

  async verifyWitness(witnessId: string): Promise<APIResponse<{
    witnessId: string;
    valid: boolean;
    transactionHash: string;
    timestamp: string;
    blockHeight?: number;
  }>> {
    return this.get(`/ledger/witness/${witnessId}/verify`);
  }

  // Audit trail
  async getAuditTrail(params: {
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<{
    transactions: Array<{
      witnessId: string;
      transactionHash: string;
      timestamp: string;
      metadata?: any;
    }>;
    total: number;
    hasMore: boolean;
  }>> {
    return this.get('/ledger/audit', { params });
  }
}

export class SynapseAPI extends QubitCoreAPIClient {
  // Federated learning projects
  async createProject(data: {
    name: string;
    description: string;
    algorithm: string;
    participants: string[];
    privacyLevel: string;
  }): Promise<APIResponse<{
    projectId: string;
    name: string;
    status: string;
    createdAt: string;
  }>> {
    return this.post('/synapse/projects', data);
  }

  async joinProject(projectId: string, data: {
    organizationId: string;
    datasetInfo: any;
  }): Promise<APIResponse<{
    projectId: string;
    participantId: string;
    status: string;
    joinedAt: string;
  }>> {
    return this.post(`/synapse/projects/${projectId}/join`, data);
  }

  async submitModelUpdate(projectId: string, data: {
    modelWeights: string; // Base64 encoded
    round: number;
    metrics: any;
  }): Promise<APIResponse<{
    updateId: string;
    round: number;
    accepted: boolean;
    timestamp: string;
  }>> {
    return this.post(`/synapse/projects/${projectId}/updates`, data);
  }

  async getGlobalModel(projectId: string): Promise<APIResponse<{
    modelWeights: string;
    round: number;
    accuracy: number;
    timestamp: string;
  }>> {
    return this.get(`/synapse/projects/${projectId}/model`);
  }
}

export class AegisAPI extends QubitCoreAPIClient {
  // Healthcare data encryption
  async encryptHealthRecord(data: {
    patientId: string;
    recordData: any;
    recordType: string;
    retentionPeriod?: string;
  }): Promise<APIResponse<{
    recordId: string;
    ciphertext: string;
    keyId: string;
    expiresAt?: string;
    timestamp: string;
  }>> {
    return this.post('/aegis/records/encrypt', data);
  }

  async decryptHealthRecord(recordId: string): Promise<APIResponse<{
    recordId: string;
    recordData: any;
    recordType: string;
    timestamp: string;
  }>> {
    return this.get(`/aegis/records/${recordId}/decrypt`);
  }

  // Device identity management
  async registerDevice(data: {
    deviceType: string;
    deviceId: string;
    patientId?: string;
    capabilities: string[];
  }): Promise<APIResponse<{
    deviceId: string;
    keyId: string;
    certificate: string;
    expiresAt: string;
    timestamp: string;
  }>> {
    return this.post('/aegis/devices/register', data);
  }

  async authenticateDevice(data: {
    deviceId: string;
    challenge: string;
    signature: string;
  }): Promise<APIResponse<{
    deviceId: string;
    authenticated: boolean;
    sessionToken?: string;
    expiresAt?: string;
    timestamp: string;
  }>> {
    return this.post('/aegis/devices/authenticate', data);
  }

  // Compliance reporting
  async generateComplianceReport(params: {
    reportType: 'HIPAA' | 'GDPR' | 'CUSTOM';
    startDate: string;
    endDate: string;
    includeMetrics?: boolean;
  }): Promise<APIResponse<{
    reportId: string;
    reportType: string;
    generatedAt: string;
    downloadUrl: string;
    expiresAt: string;
  }>> {
    return this.get('/aegis/compliance/report', { params });
  }
}

// Factory function to create API clients
export function createQubitCoreClient(config: APIClientConfig) {
  return {
    shield: new ShieldAPI(config),
    ledger: new LedgerAPI(config),
    synapse: new SynapseAPI(config),
    aegis: new AegisAPI(config)
  };
}

// Default export
export default QubitCoreAPIClient;