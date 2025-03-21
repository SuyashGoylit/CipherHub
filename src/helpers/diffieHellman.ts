// Pre-defined prime number and generator (these would typically be agreed upon by both parties)
const P = 23; // A prime number
const G = 5;  // A primitive root modulo P

export function generatePrivateKey(): number {
  // Generate a random private key between 1 and P-1
  return Math.floor(Math.random() * (P - 2)) + 1;
}

export function generatePublicKey(privateKey: number): number {
  // Calculate public key: g^a mod p
  return modPow(G, privateKey, P);
}

export function generateSharedSecret(privateKey: number, otherPublicKey: number): number {
  // Calculate shared secret: (g^b)^a mod p = (g^a)^b mod p
  return modPow(otherPublicKey, privateKey, P);
}

// Helper function for modular exponentiation
function modPow(base: number, exponent: number, modulus: number): number {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent = Math.floor(exponent / 2);
  }
  return result;
} 