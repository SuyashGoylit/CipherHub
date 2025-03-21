'use client';

import { useState } from 'react';
import { decrypt } from '@/helpers/encryption';

export default function Home() {
  const [selectedCipher, setSelectedCipher] = useState('caesar');
  const [key, setKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  const handleDecrypt = () => {
    console.log(`Decrypting with ${selectedCipher} cipher`);
    console.log(`Key: ${key}`);
    console.log(`Ciphertext: ${ciphertext}`);

    try {
      const decrypted = decrypt(selectedCipher, key, ciphertext);
      setPlaintext(decrypted);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Decryption error:', error);
      setPlaintext(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Decryption Tool</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Select Cipher</label>
            <select 
              value={selectedCipher}
              onChange={(e) => setSelectedCipher(e.target.value)}
              className="w-full p-2 border rounded"
              title="Select decryption cipher"
            >
              <option value="caesar">Caesar Cipher</option>
              <option value="vigenere">Vigenère Cipher</option>
              <option value="railfence">Rail Fence Cipher</option>
              <option value="blocktransposition">Block Transposition Cipher</option>
              <option value="doublecolumnar">Double Columnar Transposition Cipher</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Decryption Key</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your key"
            />
          </div>

          <div>
            <label className="block mb-2">Ciphertext</label>
            <textarea
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter text to decrypt"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
            onClick={handleDecrypt}
          >
            Decrypt
          </button>

          <div>
            <label className="block mb-2">Plaintext</label>
            <textarea
              value={plaintext}
              readOnly
              className="w-full p-2 border rounded cursor-not-allowed"
              rows={4}
              placeholder="Decrypted text will appear here"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
