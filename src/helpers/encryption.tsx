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

// Rail Fence Cipher: Writes text in a zigzag pattern and reads off rows
export function railFenceCipher(key: number, plaintext: string): string {
  if (key <= 1) return plaintext;
  
  // Create the rail fence pattern
  const rails: string[][] = Array(key).fill(null).map(() => []);
  let currentRail = 0;
  let direction = 1;
  
  // Fill the rails
  for (const char of plaintext) {
    rails[currentRail].push(char);
    currentRail += direction;
    
    // Change direction at the top or bottom rail
    if (currentRail === 0 || currentRail === key - 1) {
      direction *= -1;
    }
  }
  
  // Read off the rails
  return rails.flat().join('');
}

// Block Transposition Cipher: Arranges text in blocks and reads off columns
export function blockTranspositionCipher(key: number, plaintext: string): string {
  if (key <= 1) return plaintext;
  
  // Pad the text if necessary
  const padding = key - (plaintext.length % key);
  const paddedText = plaintext + ' '.repeat(padding);
  
  // Create blocks
  const blocks: string[][] = [];
  for (let i = 0; i < paddedText.length; i += key) {
    blocks.push(paddedText.slice(i, i + key).split(''));
  }
  
  // Read off columns
  let result = '';
  for (let col = 0; col < key; col++) {
    for (const block of blocks) {
      if (block[col]) {
        result += block[col];
      }
    }
  }
  
  return result;
}

// Double Columnar Transposition Cipher: Applies columnar transposition twice
export function doubleColumnarTranspositionCipher(key: string, plaintext: string): string {
  // First transposition
  const firstKey = key.split('').map(char => char.toLowerCase());
  const firstKeyOrder = [...firstKey].sort();
  const firstKeyIndices = firstKey.map(char => firstKeyOrder.indexOf(char));
  
  // Pad the text if necessary
  const padding = firstKey.length - (plaintext.length % firstKey.length);
  const paddedText = plaintext + ' '.repeat(padding);
  
  // Create blocks for first transposition
  const blocks: string[][] = [];
  for (let i = 0; i < paddedText.length; i += firstKey.length) {
    blocks.push(paddedText.slice(i, i + firstKey.length).split(''));
  }
  
  // First transposition
  let firstResult = '';
  for (const index of firstKeyIndices) {
    for (const block of blocks) {
      if (block[index]) {
        firstResult += block[index];
      }
    }
  }
  
  // Second transposition
  const secondKey = key.split('').reverse().map(char => char.toLowerCase());
  const secondKeyOrder = [...secondKey].sort();
  const secondKeyIndices = secondKey.map(char => secondKeyOrder.indexOf(char));
  
  // Create blocks for second transposition
  const secondBlocks: string[][] = [];
  for (let i = 0; i < firstResult.length; i += secondKey.length) {
    secondBlocks.push(firstResult.slice(i, i + secondKey.length).split(''));
  }
  
  // Second transposition
  let result = '';
  for (const index of secondKeyIndices) {
    for (const block of secondBlocks) {
      if (block[index]) {
        result += block[index];
      }
    }
  }
  
  return result;
}

// Main encryption function that routes to specific cipher implementation
export function encrypt(cipher: string, key: string, plaintext: string): string {
  switch(cipher.toLowerCase()) {
    case 'caesar':
      return caesarCipher(parseInt(key) || 0, plaintext);
    case 'vigenere':
      return vigenereCipher(key, plaintext);
    case 'railfence':
      return railFenceCipher(parseInt(key) || 2, plaintext);
    case 'blocktransposition':
      return blockTranspositionCipher(parseInt(key) || 2, plaintext);
    case 'doublecolumnar':
      return doubleColumnarTranspositionCipher(key, plaintext);
    default:
      throw new Error('Unsupported cipher type');
  }
}
