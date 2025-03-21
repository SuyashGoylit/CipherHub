import { createSHA1, createSHA256, createSHA512, createSHA3 } from 'hash-wasm';

export type SHAVariant = 'SHA1' | 'SHA2-256' | 'SHA2-512' | 'SHA3-256' | 'SHA3-512' | 'KECCAK-256' | 'KECCAK-512';

// SHA-1 hashing function
export async function computeSHA1(message: string): Promise<string> {
  try {
    const hasher = await createSHA1();
    hasher.update(message);
    return hasher.digest('hex');
  } catch {
    throw new Error('SHA-1 hashing failed');
  }
}

// SHA-2 family hashing functions
export async function computeSHA2(message: string, variant: 'SHA2-256' | 'SHA2-512'): Promise<string> {
  try {
    const hasher = await (variant === 'SHA2-256' ? createSHA256() : createSHA512());
    hasher.update(message);
    return hasher.digest('hex');
  } catch {
    throw new Error(`${variant} hashing failed`);
  }
}

// SHA-3 family hashing functions
export async function computeSHA3(
  message: string,
  variant: 'SHA3-256' | 'SHA3-512' | 'KECCAK-256' | 'KECCAK-512'
): Promise<string> {
  try {
    const hasher = await createSHA3(variant.includes('256') ? 256 : 512);
    hasher.update(message);
    return hasher.digest('hex');
  } catch {
    throw new Error(`${variant} hashing failed`);
  }
} 