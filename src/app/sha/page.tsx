'use client';

import Link from 'next/link';

export default function SHAPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-12 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Secure Hash Algorithms (SHA)</h1>
        <p className="text-lg opacity-90 mb-8">
          A family of cryptographic hash functions designed to provide secure, unique, and fixed-size representations of data.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/sha/sha1"
            className="bg-blue-500 text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors text-center font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            SHA-1 Hash
          </Link>
          <Link 
            href="/sha/sha2"
            className="bg-blue-500 text-white py-4 px-8 rounded-lg hover:bg-green-600 transition-colors text-center font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            SHA-2 Hash
          </Link>
          <Link 
            href="/sha/sha3"
            className="bg-blue-500 text-white py-4 px-8 rounded-lg hover:bg-purple-600 transition-colors text-center font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            SHA-3 Hash
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Key Features */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Key Features</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-800">Deterministic: Same input always produces the same hash</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-800">Quick computation of hash value for any given message</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-800">Infeasible to generate a message from its hash value</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-800">Infeasible to modify a message without changing the hash</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-800">Infeasible to find two different messages with the same hash</span>
            </li>
          </ul>
        </div>

        {/* Common Use Cases */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Common Use Cases</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800">Digital Signatures</h3>
              <p className="text-gray-700">Sign messages with private key to prove authenticity and integrity.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800">Password Storage</h3>
              <p className="text-gray-700">Securely store password hashes instead of plaintext passwords.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800">Data Integrity</h3>
              <p className="text-gray-700">Verify file or message integrity through hash comparison.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 