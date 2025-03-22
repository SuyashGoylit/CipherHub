'use client';

import { useState } from 'react';
import { railFenceEncrypt, railFenceDecrypt } from '@/helpers/classical';

export default function RailFencePage() {
  const [text, setText] = useState('');
  const [rails, setRails] = useState('3');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOperation = () => {
    if (!text) {
      setError('Please enter text to process.');
      return;
    }

    const railCount = parseInt(rails);
    if (isNaN(railCount) || railCount < 2) {
      setError('Please enter a valid number of rails (minimum 2).');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const processed = mode === 'encrypt' 
        ? railFenceEncrypt(text, railCount)
        : railFenceDecrypt(text, railCount);
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
          <h1 className="text-3xl font-bold text-white">Rail Fence Cipher</h1>
        </div>

        {/* Operation Form */}
        <div className="rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Message Processing</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                Operation Mode
              </label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as 'encrypt' | 'decrypt')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="encrypt">Encrypt</option>
                <option value="decrypt">Decrypt</option>
              </select>
            </div>

            <div>
              <label htmlFor="rails" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Rails
              </label>
              <input
                type="number"
                id="rails"
                value={rails}
                onChange={(e) => setRails(e.target.value)}
                min="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of rails..."
              />
              <p className="text-sm text-gray-500 mt-1">Minimum value is 2</p>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                Input Text
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter text to ${mode}...`}
              />
            </div>

            <button
              onClick={handleOperation}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 hover:cursor-pointer transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </button>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            {result && (
              <div>
                <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
                  {mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} Text
                </label>
                <textarea
                  id="result"
                  value={result}
                  readOnly
                  className="w-full h-32 px-3 py-2 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-lg mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">About Rail Fence Cipher</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">A simple transposition cipher that arranges text in a zigzag pattern</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Text is written in a zigzag pattern on a number of rails</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">The ciphertext is read off rail by rail</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Number of rails determines the complexity of the pattern</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Used historically for its simplicity and ease of implementation</span>
            </li>
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Security Notice</h2>
          <p className="text-yellow-700">
            The Rail Fence cipher is one of the simplest transposition ciphers and offers very weak security. 
            It can be broken easily by trying different numbers of rails, as there are typically very few 
            possibilities. For secure communications, use modern encryption standards like AES.
          </p>
        </div>
      </div>
    </main>
  );
} 