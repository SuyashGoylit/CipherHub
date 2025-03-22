import { createSHA1, createSHA256, createSHA512, createSHA3 } from 'hash-wasm';

export type SHAVariant = 'SHA1' | 'SHA2-256' | 'SHA2-512' | 'SHA3-256' | 'SHA3-512' | 'KECCAK-256' | 'KECCAK-512';

// SHA-1 hashing function
export async function computeSHA1(message: string, key?: string): Promise<string> {
  try {
    const hasher = await createSHA1();
    if (key) {
      // If key is provided, use HMAC
      const keyBuffer = new TextEncoder().encode(key);
      const messageBuffer = new TextEncoder().encode(message);
      hasher.init();
      hasher.update(keyBuffer);
      hasher.update(messageBuffer);
    } else {
      // Regular SHA-1
      hasher.init();
      hasher.update(new TextEncoder().encode(message));
    }
    return hasher.digest('hex');
  } catch (error) {
    console.error('SHA-1 hash computation failed:', error);
    throw new Error('Failed to compute SHA-1 hash');
  }
}

// SHA-2 family hashing functions
export async function computeSHA2(message: string, variant: 'SHA2-256' | 'SHA2-512', key?: string): Promise<string> {
  try {
    const hasher = variant === 'SHA2-256' ? await createSHA256() : await createSHA512();
    if (key) {
      // If key is provided, use HMAC
      const keyBuffer = new TextEncoder().encode(key);
      const messageBuffer = new TextEncoder().encode(message);
      hasher.init();
      hasher.update(keyBuffer);
      hasher.update(messageBuffer);
    } else {
      // Regular SHA-2
      hasher.init();
      hasher.update(new TextEncoder().encode(message));
    }
    return hasher.digest('hex');
  } catch (error) {
    console.error(`${variant} hash computation failed:`, error);
    throw new Error(`Failed to compute ${variant} hash`);
  }
}

// SHA-3 family hashing functions
export async function computeSHA3(message: string, variant: 'SHA3-256' | 'SHA3-512' | 'KECCAK-256' | 'KECCAK-512', key?: string): Promise<string> {
  try {
    const hasher = await createSHA3();
    if (key) {
      // If key is provided, use HMAC
      const keyBuffer = new TextEncoder().encode(key);
      const messageBuffer = new TextEncoder().encode(message);
      hasher.init();
      hasher.update(keyBuffer);
      hasher.update(messageBuffer);
    } else {
      // Regular SHA-3
      hasher.init();
      hasher.update(new TextEncoder().encode(message));
    }
    return hasher.digest('hex');
  } catch (error) {
    console.error(`${variant} hash computation failed:`, error);
    throw new Error(`Failed to compute ${variant} hash`);
  }
} 