'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedCipher, setSelectedCipher] = useState('caesar');
  const [key, setKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [cyphertext, setCyphertext] = useState('');
  const [result, setResult] = useState('');

  const handleDecrypt = () => {
    // TODO: Implement actual decryption logic
    console.log(`Decrypting with ${selectedCipher} cipher`);
    console.log(`Key: ${key}`);
    console.log(`Ciphertext: ${cyphertext}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="p-8 flex-grow">
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
                <option value="substitution">Simple Substitution</option>
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
              <label className="block mb-2">Cyphertext</label>
              <textarea
                value={cyphertext}
                onChange={(e) => setCyphertext(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Enter text to decrypt"
              />
            </div>

            <button
              onClick={handleDecrypt}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Decrypt
            </button>

            <div>
              <label className="block mb-2">Plaintext</label>
              <textarea
                value={plaintext}
                readOnly
                className="w-full p-2 border rounded bg-gray-50 cursor-not-allowed"
                rows={4}
                placeholder="Decrypted text will appear here"
              />
            </div>

            {result && (
              <div className="mt-4">
                <label className="block mb-2">Result:</label>
                <div className="p-2 bg-gray-100 rounded">{result}</div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
