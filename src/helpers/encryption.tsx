// Caesar Cipher: Shifts each letter by the key amount
export function caesarCipher(key: number, plaintext: string): string {
  const shift = ((key % 26) + 26) % 26; // Normalize key to 0-25 range
  return plaintext
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
}

// Vigenère Cipher: Uses a keyword to shift each letter
export function vigenereCipher(key: string, plaintext: string): string {
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalizedKey) return plaintext;
  
  let keyIndex = 0;
  return plaintext
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const shift = normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 97;
        const shifted = ((char.toLowerCase().charCodeAt(0) - 97 + shift) % 26) + 97;
        keyIndex++;
        return isUpperCase 
          ? String.fromCharCode(shifted).toUpperCase() 
          : String.fromCharCode(shifted);
      }
      return char;
    })
    .join('');
}

// Simple Substitution Cipher: Replaces each letter with corresponding letter from key
export function substitutionCipher(key: string, plaintext: string): string {
  // Validate key - must be 26 unique letters
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (normalizedKey.length !== 26 || new Set(normalizedKey).size !== 26) {
    throw new Error('Substitution key must contain all 26 letters exactly once');
  }

  const substitutionMap = new Map();
  for (let i = 0; i < 26; i++) {
    substitutionMap.set(String.fromCharCode(97 + i), normalizedKey[i]);
    substitutionMap.set(String.fromCharCode(65 + i), normalizedKey[i].toUpperCase());
  }

  return plaintext
    .split('')
    .map(char => substitutionMap.get(char) || char)
    .join('');
}

// Main encryption function that routes to specific cipher implementation
export function encrypt(cipher: string, key: string, plaintext: string): string {
  switch(cipher.toLowerCase()) {
    case 'caesar':
      return caesarCipher(parseInt(key) || 0, plaintext);
    case 'vigenere':
      return vigenereCipher(key, plaintext);
    case 'substitution':
      return substitutionCipher(key, plaintext);
    default:
      throw new Error('Unsupported cipher type');
  }
}
