'use client';

import { useState } from 'react';
import Link from 'next/link';
import { decryptAES, type AESMode, type KeySize } from '@/helpers/aes';

export default function AESDecryptPage() {
  const [ciphertext, setCiphertext] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [mode, setMode] = useState<AESMode>('AES-CBC');
  const [keySize, setKeySize] = useState<KeySize>(256);
  const [error, setError] = useState('');

  const handleDecrypt = async () => {
    setError('');
    const result = await decryptAES(ciphertext, key, mode, keySize);
    if ('error' in result) {
      setError('Decryption failed: ' + result.error);
    } else {
      setPlaintext(result.plaintext);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/aes"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          ← Back to AES
        </Link>
        <h1 className="text-3xl font-bold">AES Decryption</h1>
      </div>
      
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label htmlFor="mode" className="block text-sm font-medium mb-2">
            Encryption Mode
          </label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as AESMode)}
            className="w-full p-2 border rounded"
          >
            <option value="AES-CBC">CBC</option>
            <option value="AES-CTR">CTR</option>
            <option value="AES-GCM">GCM</option>
          </select>
        </div>

        {/* Key Size Selection */}
        <div>
          <label htmlFor="keySize" className="block text-sm font-medium mb-2">
            Key Size (bits)
          </label>
          <select
            id="keySize"
            value={keySize}
            onChange={(e) => setKeySize(Number(e.target.value) as KeySize)}
            className="w-full p-2 border rounded"
          >
            <option value={128}>128</option>
            <option value={256}>256</option>
          </select>
        </div>

        {/* Secret Key Input */}
        <div>
          <label htmlFor="key" className="block text-sm font-medium mb-2">
            Secret Key
          </label>
          <input
            id="key"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your secret key"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Ciphertext Input */}
        <div>
          <label htmlFor="ciphertext" className="block text-sm font-medium mb-2">
            Ciphertext (Base64)
          </label>
          <textarea
            id="ciphertext"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            placeholder="Enter base64-encoded ciphertext"
            className="w-full h-32 p-2 border rounded"
          />
        </div>

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Decrypt
        </button>

        {/* Error Display */}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Plaintext Output */}
        <div>
          <label htmlFor="plaintext" className="block text-sm font-medium mb-2">
            Decrypted Text
          </label>
          <textarea
            id="plaintext"
            value={plaintext}
            readOnly
            placeholder="Decrypted text will appear here"
            className="w-full h-32 p-2 border rounded"
          />
        </div>
      </div>
    </main>
  );
} 