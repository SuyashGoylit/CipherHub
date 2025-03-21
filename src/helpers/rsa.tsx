import * as rsajs from 'js-crypto-rsa';

export type KeyPair = {
  publicKey: JsonWebKey;
  privateKey: JsonWebKey;
};

// Generate a new RSA key pair
export async function generateKeyPair(): Promise<KeyPair> {
  try {
    const keyPair = await rsajs.generateKey(2048);
    return keyPair;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to generate RSA key pair: ${errorMessage}`);
  }
}

// Encrypt a message using RSA-OAEP
export async function encrypt(publicKey: JsonWebKey, message: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(message);
    
    const encrypted = await rsajs.encrypt(
      messageBuffer,
      publicKey,
      'SHA-256' // Using SHA-256 for OAEP
    );

    // Convert to base64 for easy transmission
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Encryption failed: ${errorMessage}`);
  }
}

// Decrypt a message using RSA-OAEP
export async function decrypt(privateKey: JsonWebKey, encryptedMessage: string): Promise<string> {
  try {
    // Convert from base64 back to ArrayBuffer
    const encryptedBuffer = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
    
    const decrypted = await rsajs.decrypt(
      encryptedBuffer,
      privateKey,
      'SHA-256' // Using SHA-256 for OAEP
    );

    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Decryption failed: ${errorMessage}`);
  }
}

// Export public key to PEM format
export async function exportPublicKey(publicKey: JsonWebKey): Promise<string> {
  try {
    const exported = await rsajs.exportKey(publicKey, 'pem');
    return exported;
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(`Failed to export public key: ${errorMessage}`);
  }
}

// Export private key to PEM format
export async function exportPrivateKey(privateKey: JsonWebKey): Promise<string> {
  try {
    const exported = await rsajs.exportKey(privateKey, 'pem');
    return exported;
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(`Failed to export private key: ${errorMessage}`);
  }
}

// Import public key from PEM format
export async function importPublicKey(pemKey: string): Promise<JsonWebKey> {
  try {
    const imported = await rsajs.importKey(pemKey, 'pem');
    return imported;
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(`Failed to import public key: ${errorMessage}`);
  }
}

// Import private key from PEM format
export async function importPrivateKey(pemKey: string): Promise<JsonWebKey> {
  try {
    const imported = await rsajs.importKey(pemKey, 'pem');
    return imported;
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(`Failed to import private key: ${errorMessage}`);
  }
} 