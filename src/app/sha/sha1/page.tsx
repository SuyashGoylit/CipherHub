'use client';

import { useState } from 'react';
import Link from 'next/link';
import { computeSHA1 } from '@/helpers/sha';

export default function SHA1Page() {
  const [message, setMessage] = useState('');
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
      const hashedMessage = await computeSHA1(message);
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
          <Link
            href="/sha"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to SHA
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">SHA-1 Hash</h1>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">⚠️ Security Warning</h2>
          <p className="text-red-700">
            SHA-1 is considered cryptographically broken and should not be used for security-critical applications.
            For secure hashing, please use SHA-256, SHA-512, or SHA-3 variants instead.
          </p>
        </div>

        {/* Hash Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Message Hashing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message to Hash
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
              />
            </div>

            <button
              onClick={handleHash}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Computing Hash...' : 'Compute SHA-1 Hash'}
            </button>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            {hash && (
              <div>
                <label htmlFor="hash" className="block text-sm font-medium text-gray-700 mb-1">
                  SHA-1 Hash (Hexadecimal)
                </label>
                <textarea
                  id="hash"
                  value={hash}
                  readOnly
                  className="w-full h-24 px-3 py-2 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">About SHA-1</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Produces a 160-bit (20-byte) hash value</li>
            <li>• Originally designed by the NSA</li>
            <li>• First published in 1995</li>
            <li>• Widely used in legacy systems and protocols</li>
            <li>• Collision attacks demonstrated in 2017</li>
            <li>• Not recommended for new applications</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 