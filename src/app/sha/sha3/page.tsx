'use client';

import { useState } from 'react';
import Link from 'next/link';
import { computeSHA3 } from '@/helpers/sha';

type SHA3Variant = 'SHA3-256' | 'SHA3-512' | 'KECCAK-256' | 'KECCAK-512';

export default function SHA3Page() {
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<SHA3Variant>('SHA3-256');
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
      const hashedMessage = await computeSHA3(message, variant);
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
          <h1 className="text-3xl font-bold text-gray-800">SHA-3 Hash</h1>
        </div>

        {/* Hash Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Message Hashing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="variant" className="block text-sm font-medium text-gray-700 mb-1">
                SHA-3 Variant
              </label>
              <select
                id="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value as SHA3Variant)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SHA3-256">SHA3-256 (256 bits)</option>
                <option value="SHA3-512">SHA3-512 (512 bits)</option>
                <option value="KECCAK-256">KECCAK-256 (256 bits)</option>
                <option value="KECCAK-512">KECCAK-512 (512 bits)</option>
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
            <h2 className="text-xl font-semibold mb-4">SHA-3 Standard</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Latest member of the SHA family</li>
              <li>• Based on the Keccak algorithm</li>
              <li>• Standardized by NIST in 2015</li>
              <li>• Different internal structure from SHA-2</li>
              <li>• Provides additional security margin</li>
              <li>• Resistant to quantum computer attacks</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Keccak Variants</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Original algorithm behind SHA-3</li>
              <li>• Used in Ethereum blockchain</li>
              <li>• Slightly different padding than SHA-3</li>
              <li>• Same security properties as SHA-3</li>
              <li>• Popular in cryptocurrency applications</li>
            </ul>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Security Status</h2>
          <p className="text-green-700">
            SHA-3 is the newest and most secure member of the SHA family. Its unique internal structure provides
            protection against attacks that might affect SHA-2, making it an excellent choice for future-proof
            applications requiring the highest security standards.
          </p>
        </div>
      </div>
    </main>
  );
} 