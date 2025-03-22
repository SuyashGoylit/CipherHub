'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to CipherHub</h1>
        
        {/* Introduction Section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">About CipherHub</h2>
          </div>
          <p className="text-gray-300 mb-4">
            CipherHub is an interactive platform designed to explore the fascinating world of cryptography. 
            From ancient ciphers used by Julius Caesar to modern cryptographic algorithms, this tool allows 
            you to experiment with various encryption methods and understand their historical significance.
          </p>
          <p className="text-gray-300">
            Whether you&apos;re a student learning about cryptography, a developer working with secure 
            communications, or simply curious about how encryption works, CipherHub provides a hands-on 
            way to explore different cryptographic techniques.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Classical Ciphers */}
          <Link href="/classical" className="group">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Classical Ciphers</h3>
              </div>
              <p className="text-gray-300">
                Explore historical encryption methods like Caesar, Vigenère, and Playfair ciphers. 
                Learn how these early cryptographic techniques shaped the development of modern encryption.
              </p>
            </div>
          </Link>

          {/* Modern Cryptography */}
          <Link href="/aes" className="group">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Modern Cryptography</h3>
              </div>
              <p className="text-gray-300">
                Experiment with AES encryption and RSA key exchange. Understand how modern cryptographic 
                algorithms secure our digital communications.
              </p>
            </div>
          </Link>

          {/* Hash Functions */}
          <Link href="/sha" className="group">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Hash Functions</h3>
              </div>
              <p className="text-gray-300">
                Discover SHA family of hash functions. Learn how these one-way functions are used to 
                ensure data integrity and create digital signatures.
              </p>
            </div>
          </Link>

          {/* Educational Resources */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Learn More</h3>
            </div>
            <p className="text-gray-300">
              Each section includes detailed information about the cryptographic methods, their historical 
              significance, and practical applications. Start exploring to understand how cryptography 
              has evolved over time!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}