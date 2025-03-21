import aes from 'js-crypto-aes';

export type AESMode = 'AES-CBC' | 'AES-CTR' | 'AES-GCM';
export type KeySize = 128 | 256;

export async function encryptAES(
  plaintext: string,
  key: string,
  mode: AESMode,
  keySize: KeySize
): Promise<{ ciphertext: string; error?: never } | { ciphertext?: never; error: string }> {
  try {
    // Convert key to Uint8Array
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(key);
    
    // Pad or truncate key to match selected key size
    const paddedKey = new Uint8Array(keySize / 8);
    paddedKey.set(keyBytes.slice(0, keySize / 8));

    // Generate random IV
    const iv = crypto.getRandomValues(
      new Uint8Array(mode === 'AES-GCM' ? 12 : 16)
    );

    // Encrypt the plaintext
    const encrypted = await aes.encrypt(
      encoder.encode(plaintext),
      paddedKey,
      {
        name: mode,
        iv,
        tagLength: mode === 'AES-GCM' ? 128 : undefined
      }
    );

    // Combine IV and ciphertext
    const combined = new Uint8Array(iv.length + encrypted.length);
    combined.set(iv);
    combined.set(encrypted, iv.length);

    // Convert to base64 for display
    const base64Result = btoa(String.fromCharCode(...combined));
    return { ciphertext: base64Result };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function decryptAES(
  ciphertext: string,
  key: string,
  mode: AESMode,
  keySize: KeySize
): Promise<{ plaintext: string; error?: never } | { plaintext?: never; error: string }> {
  try {
    // Convert key to Uint8Array
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(key);
    
    // Pad or truncate key to match selected key size
    const paddedKey = new Uint8Array(keySize / 8);
    paddedKey.set(keyBytes.slice(0, keySize / 8));

    // Convert base64 to Uint8Array
    const combined = new Uint8Array(
      atob(ciphertext)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    // Extract IV and encrypted data
    const ivLength = mode === 'AES-GCM' ? 12 : 16;
    const iv = combined.slice(0, ivLength);
    const encryptedData = combined.slice(ivLength);

    // Decrypt the ciphertext
    const decrypted = await aes.decrypt(
      encryptedData,
      paddedKey,
      {
        name: mode,
        iv,
        tagLength: mode === 'AES-GCM' ? 128 : undefined
      }
    );

    // Convert decrypted data to string
    const decoder = new TextDecoder();
    return { plaintext: decoder.decode(decrypted) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
} 