'use client';

import { useState } from 'react';
import { encryptAES, type AESMode, type KeySize } from '@/helpers/aes';

export default function AESEncryptPage() {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');
  const [mode, setMode] = useState<AESMode>('AES-CBC');
  const [keySize, setKeySize] = useState<KeySize>(256);
  const [error, setError] = useState('');

  const handleEncrypt = async () => {
    setError('');
    const result = await encryptAES(plaintext, key, mode, keySize);
    if ('error' in result) {
      setError('Encryption failed: ' + result.error);
    } else {
      setCiphertext(result.ciphertext);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">AES Encryption</h1>
        </div>
        
        {/* Encryption Form */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Encryption Settings</h2>
          
          <div className="space-y-4">
            {/* Mode Selection */}
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-300 mb-1">
                Encryption Mode
              </label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as AESMode)}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AES-CBC">CBC</option>
                <option value="AES-CTR">CTR</option>
                <option value="AES-GCM">GCM</option>
              </select>
            </div>

            {/* Key Size Selection */}
            <div>
              <label htmlFor="keySize" className="block text-sm font-medium text-gray-300 mb-1">
                Key Size (bits)
              </label>
              <select
                id="keySize"
                value={keySize}
                onChange={(e) => setKeySize(Number(e.target.value) as KeySize)}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={128}>128</option>
                <option value={256}>256</option>
              </select>
            </div>

            {/* Secret Key Input */}
            <div>
              <label htmlFor="key" className="block text-sm font-medium text-gray-300 mb-1">
                Secret Key
              </label>
              <input
                id="key"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your secret key"
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Plaintext Input */}
            <div>
              <label htmlFor="plaintext" className="block text-sm font-medium text-gray-300 mb-1">
                Plaintext
              </label>
              <textarea
                id="plaintext"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter text to encrypt"
                className="w-full h-32 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEncrypt}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Encrypt
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Ciphertext Output */}
            {ciphertext && (
              <div>
                <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-300 mb-1">
                  Ciphertext (Base64)
                </label>
                <textarea
                  id="ciphertext"
                  value={ciphertext}
                  readOnly
                  className="w-full h-32 px-3 py-2 text-sm font-mono bg-gray-700 text-white border border-gray-600 rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">About AES Encryption</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Supports multiple modes of operation (CBC, CTR, GCM)</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Choose between 128-bit and 256-bit key sizes</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Industry-standard encryption algorithm</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Secure against known attacks when properly implemented</span>
            </li>
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-green-900 border-l-4 border-green-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-100">Security Status</h2>
          <p className="text-green-200">
            AES is currently considered cryptographically secure and is widely used for sensitive data protection.
            When using proper key sizes and secure modes of operation, it provides strong confidentiality guarantees.
          </p>
        </div>
      </div>
    </main>
  );
} 