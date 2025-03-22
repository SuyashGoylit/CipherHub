'use client';

import { useState } from 'react';
import { playfairEncrypt, playfairDecrypt } from '@/helpers/classical';

export default function PlayfairPage() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOperation = () => {
    if (!text) {
      setError('Please enter text to process.');
      return;
    }

    if (!key) {
      setError('Please enter a key for the Playfair cipher.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const processed = mode === 'encrypt' 
        ? playfairEncrypt(text, key)
        : playfairDecrypt(text, key);
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
          <h1 className="text-3xl font-bold text-white">Playfair Cipher</h1>
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
              <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                Key (Letters Only)
              </label>
              <input
                type="text"
                id="key"
                value={key}
                onChange={(e) => setKey(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your key..."
              />
              <p className="text-sm text-gray-500 mt-1">Note: I and J are treated as the same letter</p>
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
            <h2 className="text-2xl font-bold text-gray-800">About Playfair Cipher</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Invented by Charles Wheatstone in 1854, named after Lord Playfair</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Uses a 5x5 grid of letters based on a keyword</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Encrypts pairs of letters (digraphs) instead of single letters</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Combines letters I and J to fit the alphabet into a 5x5 grid</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-800 mr-2">✓</span>
              <span className="text-gray-700">Used extensively in military and diplomatic communications</span>
            </li>
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Security Notice</h2>
          <p className="text-yellow-700">
            The Playfair cipher was considered more secure than simple substitution ciphers when it was first 
            introduced. However, it can be broken using frequency analysis of digraphs (letter pairs). Modern 
            cryptanalysis techniques can easily defeat this cipher. For secure communications, use modern 
            encryption standards like AES.
          </p>
        </div>
      </div>
    </main>
  );
} 