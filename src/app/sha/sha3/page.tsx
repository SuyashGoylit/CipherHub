'use client';

import { useState } from 'react';
import { computeSHA3 } from '@/helpers/sha';

type SHA3Variant = 'SHA3-256' | 'SHA3-512' | 'KECCAK-256' | 'KECCAK-512';

export default function SHA3Page() {
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<SHA3Variant>('SHA3-256');
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
      const hashedMessage = await computeSHA3(message, variant, key || undefined);
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
          <h1 className="text-3xl font-bold text-white">SHA-3 Hash</h1>
        </div>

        {/* Hash Form */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Message Hashing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="variant" className="block text-sm font-medium text-gray-300 mb-1">
                SHA-3 Variant
              </label>
              <select
                id="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value as SHA3Variant)}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SHA3-224">SHA3-224 (224 bits)</option>
                <option value="SHA3-256">SHA3-256 (256 bits)</option>
                <option value="SHA3-384">SHA3-384 (384 bits)</option>
                <option value="SHA3-512">SHA3-512 (512 bits)</option>
              </select>
            </div>

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
                placeholder="Enter a key for keyed hashing (KMAC)..."
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
                  SHA-3 Hash (Hexadecimal)
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
            <div className="bg-gray-700 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">About SHA-3</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Latest member of the SHA family, standardized in 2015</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Based on the Keccak algorithm, different from SHA-1/2</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Resistant to quantum computer attacks</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Available in 224, 256, 384, and 512-bit variants</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Recommended for future-proof applications</span>
            </li>
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-green-900 border-l-4 border-green-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-100">Security Status</h2>
          <p className="text-green-200">
            SHA-3 is the newest and most secure member of the SHA family. Its unique internal structure provides
            protection against attacks that might affect SHA-2, making it an excellent choice for future-proof
            applications requiring the highest security standards.
          </p>
        </div>
      </div>
    </main>
  );
} 