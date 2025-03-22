'use client';

import Link from 'next/link';

export default function ClassicalCiphersPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Classical Ciphers</h1>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/classical/caesar" className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Caesar Cipher</h3>
            <p className="text-gray-300 text-sm">Simple substitution cipher that shifts letters by a fixed amount</p>
          </Link>

          <Link href="/classical/vigenere" className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Vigenère Cipher</h3>
            <p className="text-gray-300 text-sm">Polyalphabetic substitution using a keyword to determine shifts</p>
          </Link>

          <Link href="/classical/playfair" className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Playfair Cipher</h3>
            <p className="text-gray-300 text-sm">Digraph substitution cipher using a key square</p>
          </Link>

          <Link href="/classical/railfence" className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Rail Fence Cipher</h3>
            <p className="text-gray-300 text-sm">Transposition cipher that arranges text in a zigzag pattern</p>
          </Link>

          <Link href="/classical/columnar" className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Columnar Cipher</h3>
            <p className="text-gray-300 text-sm">Transposition cipher that rearranges text in columns</p>
          </Link>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-800 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Historical Significance</h3>
                <p className="text-gray-600 text-sm">Foundation of modern cryptography, used throughout history for secure communication.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Substitution & Transposition</h3>
                <p className="text-gray-600 text-sm">Two main techniques: replacing letters with others or changing their positions.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Simple Implementation</h3>
                <p className="text-gray-600 text-sm">Can be performed manually or with basic tools, making them practical for learning.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Educational Value</h3>
                <p className="text-gray-600 text-sm">Perfect for understanding basic cryptographic concepts and their evolution.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Security Notice</h2>
          <p className="text-yellow-700">
            Classical ciphers, while historically significant, are not secure for modern use. They are vulnerable 
            to various cryptanalysis techniques and should only be used for educational purposes. For secure 
            communication, use modern encryption standards like AES or RSA.
          </p>
        </div>
      </div>
    </main>
  );
} 