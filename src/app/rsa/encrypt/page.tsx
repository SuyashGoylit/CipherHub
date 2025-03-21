'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateKeyPair, encrypt, KeyPair } from '@/helpers/rsa';

export default function RSAEncryptPage() {
  const [plaintext, setPlaintext] = useState('');
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
    if (!plaintext) {
      setError('Please enter a message to encrypt.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const encrypted = await encrypt(keyPair.publicKey, plaintext);
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
          <Link
            href="/rsa"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to RSA
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">RSA Encryption</h1>
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
        <div className="rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Message Encryption</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700 mb-1">
                Message to Encrypt
              </label>
              <textarea
                id="plaintext"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
              />
            </div>

            <button
              onClick={handleEncrypt}
              disabled={loading || !keyPair}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Encrypting...' : 'Encrypt Message'}
            </button>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            {ciphertext && (
              <div>
                <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700 mb-1">
                  Encrypted Message (Base64)
                </label>
                <textarea
                  id="ciphertext"
                  value={ciphertext}
                  readOnly
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 