'use client';

import { useState } from 'react';
import { caesarEncrypt, caesarDecrypt } from '@/helpers/classical';

export default function CaesarPage() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOperation = () => {
    if (!text) {
      setError('Please enter text to process.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const processed = mode === 'encrypt' 
        ? caesarEncrypt(text, shift)
        : caesarDecrypt(text, shift);
      setResult(processed);
    } catch {
      setError('Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Caesar Cipher</h1>
        </div>

        {/* Operation Form */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Message Processing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-300 mb-1">
                Operation Mode
              </label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as 'encrypt' | 'decrypt')}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="encrypt">Encrypt</option>
                <option value="decrypt">Decrypt</option>
              </select>
            </div>

            <div>
              <label htmlFor="shift" className="block text-sm font-medium text-gray-300 mb-1">
                Shift Amount
              </label>
              <input
                type="number"
                id="shift"
                value={shift}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setShift(Math.max(0, Math.min(25, value)));
                }}
                min="0"
                max="25"
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter shift amount (0-25)..."
              />
              <p className="text-sm text-gray-500 mt-1">Value between 0 and 25</p>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-1">
                {mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Enter text to ${mode}...`}
                className="w-full h-32 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleOperation}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
              </button>
            </div>

            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}

            {result && (
              <div>
                <label htmlFor="result" className="block text-sm font-medium text-gray-300 mb-1">
                  {mode === 'encrypt' ? 'Encrypted Text' : 'Decrypted Text'}
                </label>
                <textarea
                  id="result"
                  value={result}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">About Caesar Cipher</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Named after Julius Caesar, who used it for secret correspondence</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Each letter is shifted a fixed number of positions in the alphabet</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">The shift amount (0-25) serves as the encryption key</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">Preserves case and non-alphabetic characters</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">✓</span>
              <span className="text-gray-300">One of the earliest and simplest encryption techniques</span>
            </li>
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-900 border-l-4 border-yellow-600 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-100">Security Notice</h2>
          <p className="text-yellow-200">
            The Caesar cipher is extremely weak by modern standards. It can be broken easily using 
            frequency analysis or by trying all 26 possible shifts. This cipher should only be used 
            for educational purposes and not for securing sensitive information. For modern security 
            needs, use standard encryption algorithms like AES.
          </p>
        </div>
      </div>
    </main>
  );
} 