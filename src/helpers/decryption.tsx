// Caesar Cipher: Shifts each letter back by the key amount
export function caesarDecipher(key: number, ciphertext: string): string {
  const shift = ((26 - (key % 26)) + 26) % 26; // Reverse the shift
  return ciphertext
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

// Vigenère Cipher: Uses the keyword to reverse the shift of each letter
export function vigenereDecipher(key: string, ciphertext: string): string {
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalizedKey) return ciphertext;
  
  let keyIndex = 0;
  return ciphertext
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const shift = normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 97;
        const unshifted = ((char.toLowerCase().charCodeAt(0) - 97 - shift + 26) % 26) + 97;
        keyIndex++;
        return isUpperCase 
          ? String.fromCharCode(unshifted).toUpperCase() 
          : String.fromCharCode(unshifted);
      }
      return char;
    })
    .join('');
}

// Rail Fence Cipher: Reconstructs the zigzag pattern and reads off original text
export function railFenceDecipher(key: number, ciphertext: string): string {
  if (key <= 1) return ciphertext;
  
  // Create empty rail fence pattern
  const rails: (string | null)[][] = Array(key).fill(null).map(() => Array(ciphertext.length).fill(null));
  
  // Mark positions in zigzag pattern
  let currentRail = 0;
  let direction = 1;
  for (let i = 0; i < ciphertext.length; i++) {
    rails[currentRail][i] = '*';
    currentRail += direction;
    if (currentRail === 0 || currentRail === key - 1) {
      direction *= -1;
    }
  }
  
  // Fill marked positions with ciphertext
  let index = 0;
  for (let i = 0; i < key; i++) {
    for (let j = 0; j < ciphertext.length; j++) {
      if (rails[i][j] === '*') {
        rails[i][j] = ciphertext[index++];
      }
    }
  }
  
  // Read off in zigzag pattern
  let result = '';
  currentRail = 0;
  direction = 1;
  for (let i = 0; i < ciphertext.length; i++) {
    result += rails[currentRail][i];
    currentRail += direction;
    if (currentRail === 0 || currentRail === key - 1) {
      direction *= -1;
    }
  }
  
  return result;
}

// Block Transposition Cipher: Reconstructs blocks from columns
export function blockTranspositionDecipher(key: number, ciphertext: string): string {
  if (key <= 1) return ciphertext;
  
  const numBlocks = Math.ceil(ciphertext.length / key);
  const blocks: string[][] = Array(numBlocks).fill(null).map(() => Array(key).fill(''));
  
  // Fill blocks column by column
  let index = 0;
  for (let col = 0; col < key; col++) {
    for (let row = 0; row < numBlocks; row++) {
      if (index < ciphertext.length) {
        blocks[row][col] = ciphertext[index++];
      }
    }
  }
  
  // Read off rows
  return blocks.map(block => block.join('')).join('').trim();
}

// Double Columnar Transposition Cipher: Applies columnar transposition twice in reverse
export function doubleColumnarTranspositionDecipher(key: string, ciphertext: string): string {
  const keyLength = key.length;
  const numRows = Math.ceil(ciphertext.length / keyLength);
  
  // Generate key indices
  const keyChars = key.split('').map(char => char.toLowerCase());
  const sortedKeyChars = [...keyChars].sort();
  const keyIndices = keyChars.map(char => sortedKeyChars.indexOf(char));
  
  // First reverse transposition
  const blocks: string[][] = Array(numRows).fill(null).map(() => Array(keyLength).fill(''));
  let index = 0;
  
  // Fill blocks according to key pattern
  for (const col of keyIndices) {
    for (let row = 0; row < numRows; row++) {
      if (index < ciphertext.length) {
        blocks[row][col] = ciphertext[index++];
      }
    }
  }
  
  // Read off rows
  return blocks.map(row => row.join('')).join('').trim();
}

// Main decrypt function that selects the appropriate cipher
export function decrypt(cipher: string, key: string, ciphertext: string): string {
  switch (cipher) {
    case 'caesar':
      return caesarDecipher(parseInt(key) || 0, ciphertext);
    case 'vigenere':
      return vigenereDecipher(key, ciphertext);
    case 'railfence':
      return railFenceDecipher(parseInt(key) || 2, ciphertext);
    case 'blocktransposition':
      return blockTranspositionDecipher(parseInt(key) || 2, ciphertext);
    case 'doublecolumnar':
      return doubleColumnarTranspositionDecipher(key, ciphertext);
    default:
      throw new Error('Unknown cipher type');
  }
}
