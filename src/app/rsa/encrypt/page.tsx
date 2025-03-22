'use client';

import { useState } from 'react';
import { generateKeyPair, encrypt, KeyPair } from '@/helpers/rsa';

export default function RSAEncryptPage() {
  const [message, setMessage] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [keySize, setKeySize] = useState(2048);
  const [ciphertext, setCiphertext] = useState('');
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateKeys = async () => {
    try {
      setLoading(true);
      setError('');
      const newKeyPair = await generateKeyPair();
      setKeyPair(newKeyPair);
      setCiphertext('');
    } catch {
      setError('Failed to generate key pair. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEncrypt = async () => {
    if (!keyPair) {
      setError('Please generate a key pair first.');
      return;
    }
    if (!message) {
      setError('Please enter a message to encrypt.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const encrypted = await encrypt(keyPair.publicKey, message);
      setCiphertext(encrypted);
    } catch {
      setError('Encryption failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">RSA Encryption</h1>
        </div>

        {/* Key Generation */}
        <div className="rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Key Generation</h2>
          <button
            onClick={handleGenerateKeys}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate New Key Pair'}
          </button>
          {keyPair && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Public Key</h3>
                <textarea
                  id="publicKey"
                  title="Public Key"
                  readOnly
                  value={JSON.stringify(keyPair.publicKey, null, 2)}
                  className="w-full h-48 px-3 py-2 text-sm font-mono border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Private Key</h3>
                <textarea
                  id="privateKey"
                  title="Private Key"
                  readOnly
                  value={JSON.stringify(keyPair.privateKey, null, 2)}
                  className="w-full h-48 px-3 py-2 text-sm font-mono border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Encryption Form */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Encryption Settings</h2>
          
          <div className="space-y-4">
            {/* Key Size Selection */}
            <div>
              <label htmlFor="keySize" className="block text-sm font-medium text-gray-300 mb-1">
                Key Size (bits)
              </label>
              <select
                id="keySize"
                value={keySize}
                onChange={(e) => setKeySize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1024}>1024</option>
                <option value={2048}>2048</option>
                <option value={4096}>4096</option>
              </select>
            </div>

            {/* Public Key Input */}
            <div>
              <label htmlFor="publicKey" className="block text-sm font-medium text-gray-300 mb-1">
                Public Key (PEM format)
              </label>
              <textarea
                id="publicKey"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter recipient's public key"
                className="w-full h-32 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message to Encrypt
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter text to encrypt"
                className="w-full h-32 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEncrypt}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Encrypting...' : 'Encrypt'}
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
                  Encrypted Message (Base64)
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
            <h2 className="text-2xl font-bold text-white">About RSA Encryption</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Asymmetric encryption using public-private key pairs</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Supports multiple key sizes for different security levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Only the holder of the private key can decrypt the message</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Widely used for secure communication and digital signatures</span>
            </li>
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-green-900 border-l-4 border-green-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-100">Security Status</h2>
          <p className="text-green-200">
            RSA encryption is considered secure when using appropriate key sizes (2048 bits or larger).
            The public key can be freely shared, while the private key must be kept secret.
          </p>
        </div>
      </div>
    </main>
  );
} 