'use client';

import { useState } from 'react';
import Link from 'next/link';
import { computeSHA2 } from '@/helpers/sha';

export default function SHA2Page() {
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<'SHA2-256' | 'SHA2-512'>('SHA2-256');
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
      const hashedMessage = await computeSHA2(message, variant);
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
          <h1 className="text-3xl font-bold text-gray-800">SHA-2 Hash</h1>
        </div>

        {/* Hash Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Message Hashing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="variant" className="block text-sm font-medium text-gray-700 mb-1">
                SHA-2 Variant
              </label>
              <select
                id="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value as 'SHA2-256' | 'SHA2-512')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SHA2-256">SHA-256 (256 bits)</option>
                <option value="SHA2-512">SHA-512 (512 bits)</option>
              </select>
            </div>

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
              {loading ? 'Computing Hash...' : `Compute ${variant} Hash`}
            </button>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            {hash && (
              <div>
                <label htmlFor="hash" className="block text-sm font-medium text-gray-700 mb-1">
                  {variant} Hash (Hexadecimal)
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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">SHA-256</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Produces a 256-bit (32-byte) hash value</li>
              <li>• Most widely used SHA-2 variant</li>
              <li>• Suitable for digital signatures</li>
              <li>• Used in Bitcoin mining</li>
              <li>• Recommended for most applications</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">SHA-512</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Produces a 512-bit (64-byte) hash value</li>
              <li>• Higher security margin than SHA-256</li>
              <li>• Better performance on 64-bit systems</li>
              <li>• Used in high-security applications</li>
              <li>• Recommended for future-proofing</li>
            </ul>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Security Status</h2>
          <p className="text-green-700">
            SHA-2 is currently considered cryptographically secure and is widely used in modern applications.
            Both SHA-256 and SHA-512 are approved by NIST and recommended for use in security-critical systems.
          </p>
        </div>
      </div>
    </main>
  );
} 