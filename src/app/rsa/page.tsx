'use client';

import Link from 'next/link';

export default function RSAPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gray-800 rounded-lg p-8 mb-12 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Rivest-Shamir-Adleman (RSA)</h1>
        <p className="text-gray-300 text-lg mb-8">
          The world&apos;s most widely used public-key cryptosystem, enabling secure communication and digital signatures without sharing secret keys.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/rsa/encrypt"
            className="bg-blue-500 text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors text-center font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Encrypt Message
          </Link>
          <Link 
            href="/rsa/decrypt"
            className="bg-blue-500 text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors text-center font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Decrypt Message
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Key Features */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Key Features</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Key Pairs</h3>
                <p className="text-gray-300">Public key for encryption, private key for decryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Key Size</h3>
                <p className="text-gray-300">2048 bits (recommended minimum)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Performance</h3>
                <p className="text-gray-300">Slower than symmetric encryption, best for small data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Common Use Cases</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-white">Digital Signatures</h3>
              <p className="text-gray-300">Sign messages with private key to prove authenticity and integrity.</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-white">Key Exchange</h3>
              <p className="text-gray-300">Securely exchange symmetric keys for faster bulk encryption.</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-white">Secure Communication</h3>
              <p className="text-gray-300">Enable secure message exchange without pre-shared secrets.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Security Best Practices</h2>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">Use a minimum key size of 2048 bits</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">Keep private keys absolutely secure and never share them</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">Use OAEP padding for enhanced security</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">Combine with symmetric encryption for large data</span>
          </li>
        </ul>
      </div>
    </main>
  );
} 