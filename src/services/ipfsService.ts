
import { Web3Storage } from 'web3.storage';

// This is a placeholder API key - in a production app, this would be securely managed
// For now we'll use a placeholder
const API_KEY = 'placeholder-key';

class IPFSService {
  private client: Web3Storage | null = null;

  constructor() {
    // In a real application, we would securely handle the API key
    if (API_KEY !== 'placeholder-key') {
      this.client = new Web3Storage({ token: API_KEY });
    }
  }

  // Check if service is properly initialized
  isInitialized(): boolean {
    return this.client !== null;
  }

  // Initialize with user provided key
  initialize(apiKey: string) {
    this.client = new Web3Storage({ token: apiKey });
    return this.isInitialized();
  }

  // Encrypt file before storing - in a real app we would implement AES encryption
  // This is a placeholder for the encryption functionality
  async encryptFile(file: File, publicKey: string): Promise<File> {
    // In a real implementation, we would use the Web Crypto API to encrypt the file
    console.log("File would be encrypted with public key:", publicKey);
    // For now, we'll just return the original file
    return file;
  }

  // Store file to IPFS
  async storeFile(file: File): Promise<string | null> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }
    
    try {
      const cid = await this.client.put([file], {
        name: file.name,
        maxRetries: 3,
      });
      
      return cid;
    } catch (error) {
      console.error('Error storing file:', error);
      return null;
    }
  }

  // Retrieve file from IPFS
  async retrieveFile(cid: string): Promise<File | null> {
    if (!this.client) {
      throw new Error('IPFS client not initialized');
    }

    try {
      const res = await this.client.get(cid);
      if (!res || !res.ok) {
        throw new Error(`Failed to retrieve file: ${res?.status}`);
      }

      // Get files from the response
      const files = await res.files();
      return files[0] || null;
    } catch (error) {
      console.error('Error retrieving file:', error);
      return null;
    }
  }

  // Generate a shareable link
  getShareableLink(cid: string): string {
    return `https://${cid}.ipfs.dweb.link`;
  }
}

export const ipfsService = new IPFSService();
export default ipfsService;
