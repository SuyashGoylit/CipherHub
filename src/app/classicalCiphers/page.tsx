'use client';

import Link from 'next/link';

export default function ClassicalCiphersPage() {
  return (
    <main className="flex-grow p-8">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Classical Ciphers</h1>
            <p className="text-gray-300 text-lg mb-6">
              Classical ciphers represent the foundation of cryptography, encompassing a variety of techniques developed throughout history 
              for secure communication. These methods, while no longer secure by modern standards, provide essential insights into the 
              evolution of cryptographic principles and remain valuable for educational purposes.
            </p>
            <p className="text-gray-300 text-lg">
              From simple substitution methods to more complex transposition techniques, classical ciphers demonstrate fundamental 
              concepts in cryptography such as confusion and diffusion. Their study helps understand the development of modern 
              encryption methods and the importance of cryptographic security.
            </p>
          </div>
        </div>
      </div>

      {/* Cipher List */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-8">Available Classical Ciphers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/classical/caesar" 
            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Caesar Cipher</h3>
            <p className="text-gray-300">
              A substitution cipher that shifts each letter in the plaintext by a fixed number of positions in the alphabet. 
              Named after Julius Caesar, who used it for secret correspondence.
            </p>
          </Link>

          <Link href="/classical/vigenere" 
            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Vigenère Cipher</h3>
            <p className="text-gray-300">
              A polyalphabetic substitution cipher that uses a keyword to determine the shift of each letter in the plaintext. 
              It was considered unbreakable for centuries.
            </p>
          </Link>

          <Link href="/classical/playfair" 
            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Playfair Cipher</h3>
            <p className="text-gray-300">
              A digraph substitution cipher that encrypts pairs of letters instead of single letters. It employs a 5×5 key square 
              based on a keyword.
            </p>
          </Link>

          <Link href="/classical/railfence" 
            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Rail Fence Cipher</h3>
            <p className="text-gray-300">
              A transposition cipher that writes the plaintext in a zigzag pattern on a number of &ldquo;rails&rdquo; and then reads off 
              each rail to produce the ciphertext.
            </p>
          </Link>

          <Link href="/classical/columnar" 
            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Columnar Transposition Cipher</h3>
            <p className="text-gray-300">
              A transposition cipher that arranges the plaintext in a grid and reads off the columns in a different order 
              determined by a keyword.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
} 