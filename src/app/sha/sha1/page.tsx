'use client';

import { useState } from 'react';
import { computeSHA1 } from '@/helpers/sha';

export default function SHA1Page() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!message) {
      setError('Please enter a message to hash.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const hashedMessage = await computeSHA1(message, key || undefined);
      setHash(hashedMessage);
    } catch {
      setError('Hashing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">SHA-1 Hash</h1>
        </div>

        {/* Hash Form */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Message Hashing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message to Hash
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
              />
            </div>

            <div>
              <label htmlFor="key" className="block text-sm font-medium text-gray-300 mb-1">
                Key (Optional)
              </label>
              <input
                type="text"
                id="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a key for keyed hashing (HMAC)..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleHash}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Computing...' : 'Compute Hash'}
              </button>
            </div>

            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}

            {hash && (
              <div>
                <label htmlFor="hash" className="block text-sm font-medium text-gray-300 mb-1">
                  SHA-1 Hash (Hexadecimal)
                </label>
                <textarea
                  id="hash"
                  value={hash}
                  readOnly
                  className="w-full h-24 px-3 py-2 text-sm font-mono bg-gray-700 text-white border border-gray-600 rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">About SHA-1</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Produces a 160-bit (20-byte) hash value</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Originally designed by the NSA</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">First published in 1995</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Widely used in legacy systems and protocols</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Collision attacks demonstrated in 2017</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Not recommended for new applications</span>
            </li>
          </ul>
        </div>

        {/* Security Warning */}
        <div className="mt-8 bg-red-900 border-l-4 border-red-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-100">⚠️ Security Warning</h2>
          <p className="text-red-200">
            SHA-1 is considered cryptographically broken and should not be used for security-critical applications.
            For secure hashing, please use SHA-256, SHA-512, or SHA-3 variants instead.
          </p>
        </div>
      </div>
    </main>
  );
} 