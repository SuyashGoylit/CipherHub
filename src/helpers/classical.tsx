// Caesar Cipher
export function caesarEncrypt(text: string, key: number): string {
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode((code - base + key) % 26 + base);
      }
      return char;
    })
    .join('');
}

export function caesarDecrypt(text: string, key: number): string {
  return caesarEncrypt(text, (26 - key) % 26);
}

// Vigenère Cipher
export function vigenereEncrypt(text: string, key: string): string {
  // Normalize key to only contain letters, preserving case
  const normalizedKey = key.replace(/[^a-zA-Z]/g, '');
  if (!normalizedKey) return text;

  let keyIndex = 0;
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const keyChar = normalizedKey[keyIndex % normalizedKey.length];
        const keyBase = keyChar === keyChar.toUpperCase() ? 65 : 97;
        const shift = (keyChar.charCodeAt(0) - keyBase);
        const code = char.charCodeAt(0);
        keyIndex++;
        return String.fromCharCode(((code - base + shift + 26) % 26) + base);
      }
      return char;
    })
    .join('');
}

export function vigenereDecrypt(text: string, key: string): string {
  // Normalize key to only contain letters, preserving case
  const normalizedKey = key.replace(/[^a-zA-Z]/g, '');
  if (!normalizedKey) return text;

  let keyIndex = 0;
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const keyChar = normalizedKey[keyIndex % normalizedKey.length];
        const keyBase = keyChar === keyChar.toUpperCase() ? 65 : 97;
        const shift = (keyChar.charCodeAt(0) - keyBase);
        const code = char.charCodeAt(0);
        keyIndex++;
        return String.fromCharCode(((code - base - shift + 26) % 26) + base);
      }
      return char;
    })
    .join('');
}

// Playfair Cipher
function generatePlayfairMatrix(key: string): string[][] {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: I and J are combined
  const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const usedChars = new Set();
  const matrix: string[][] = Array(5).fill(null).map(() => Array(5).fill(''));
  
  let keyIndex = 0;
  let alphabetIndex = 0;
  
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let char;
      while (true) {
        if (keyIndex < normalizedKey.length) {
          char = normalizedKey[keyIndex++];
        } else {
          char = alphabet[alphabetIndex++];
        }
        if (!usedChars.has(char)) {
          usedChars.add(char);
          matrix[i][j] = char;
          break;
        }
      }
    }
  }
  
  return matrix;
}

function findPositionInMatrix(matrix: string[][], char: string): [number, number] {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

export function playfairEncrypt(text: string, key: string): string {
  const matrix = generatePlayfairMatrix(key);
  const normalizedText = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const pairs: string[] = [];
  
  for (let i = 0; i < normalizedText.length; i += 2) {
    let pair = normalizedText[i];
    if (i + 1 < normalizedText.length) {
      if (normalizedText[i] === normalizedText[i + 1]) {
        pair += 'X';
        i--;
      } else {
        pair += normalizedText[i + 1];
      }
    } else {
      pair += 'X';
    }
    pairs.push(pair);
  }
  
  return pairs
    .map(pair => {
      const [row1, col1] = findPositionInMatrix(matrix, pair[0]);
      const [row2, col2] = findPositionInMatrix(matrix, pair[1]);
      
      if (row1 === row2) {
        return matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
        return matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
      } else {
        return matrix[row1][col2] + matrix[row2][col1];
      }
    })
    .join('');
}

export function playfairDecrypt(text: string, key: string): string {
  const matrix = generatePlayfairMatrix(key);
  const normalizedText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const pairs: string[] = [];
  
  for (let i = 0; i < normalizedText.length; i += 2) {
    pairs.push(normalizedText.slice(i, i + 2));
  }
  
  return pairs
    .map(pair => {
      const [row1, col1] = findPositionInMatrix(matrix, pair[0]);
      const [row2, col2] = findPositionInMatrix(matrix, pair[1]);
      
      if (row1 === row2) {
        return matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        return matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
      } else {
        return matrix[row1][col2] + matrix[row2][col1];
      }
    })
    .join('');
}

// Rail Fence Cipher
export function railFenceEncrypt(text: string, rails: number): string {
  if (rails < 2) return text;
  
  const fence = Array(rails).fill('').map(() => Array(text.length).fill(''));
  let rail = 0;
  let direction = 1;
  
  for (let i = 0; i < text.length; i++) {
    fence[rail][i] = text[i];
    rail += direction;
    
    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }
  
  return fence.map(row => row.join('')).join('').replace(/\s+/g, '');
}

export function railFenceDecrypt(text: string, rails: number): string {
  if (rails < 2) return text;
  
  const fence = Array(rails).fill('').map(() => Array(text.length).fill(''));
  let rail = 0;
  let direction = 1;
  
  // Mark the positions
  for (let i = 0; i < text.length; i++) {
    fence[rail][i] = '*';
    rail += direction;
    
    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }
  
  // Fill in the letters
  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < text.length; j++) {
      if (fence[i][j] === '*' && index < text.length) {
        fence[i][j] = text[index++];
      }
    }
  }
  
  // Read off the message
  let result = '';
  rail = 0;
  direction = 1;
  
  for (let i = 0; i < text.length; i++) {
    result += fence[rail][i];
    rail += direction;
    
    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }
  
  return result;
}

// Columnar Transposition Cipher
function getColumnOrder(key: string): number[] {
  return key
    .split('')
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(item => item.index);
}

export function columnarEncrypt(text: string, key: string): string {
  const columnOrder = getColumnOrder(key);
  const numColumns = key.length;
  const numRows = Math.ceil(text.length / numColumns);
  const grid: string[][] = Array(numRows).fill('').map(() => Array(numColumns).fill(''));
  
  // Fill the grid
  let pos = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      if (pos < text.length) {
        grid[row][col] = text[pos];
      } else {
        grid[row][col] = 'X';
      }
      pos++;
    }
  }
  
  // Read off the columns in key order
  let result = '';
  for (let i = 0; i < numColumns; i++) {
    const col = columnOrder[i];
    for (let row = 0; row < numRows; row++) {
      result += grid[row][col];
    }
  }
  
  return result;
}

export function columnarDecrypt(text: string, key: string): string {
  const columnOrder = getColumnOrder(key);
  const numColumns = key.length;
  const numRows = Math.ceil(text.length / numColumns);
  const grid: string[][] = Array(numRows).fill('').map(() => Array(numColumns).fill(''));
  
  // Fill the grid by columns
  let pos = 0;
  for (let i = 0; i < numColumns; i++) {
    const col = columnOrder[i];
    for (let row = 0; row < numRows; row++) {
      if (pos < text.length) {
        grid[row][col] = text[pos];
      }
      pos++;
    }
  }
  
  // Read off by rows
  let result = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      if (grid[row][col] !== 'X') {
        result += grid[row][col];
      }
    }
  }
  
  return result;
} 