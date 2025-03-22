'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Classical Ciphers',
      path: '/classical',
      children: [
        { name: 'Caesar Cipher', path: '/classical/caesar' },
        { name: 'Vigenère Cipher', path: '/classical/vigenere' },
        { name: 'Playfair Cipher', path: '/classical/playfair' },
        { name: 'Rail Fence Cipher', path: '/classical/railfence' },
        { name: 'Columnar Cipher', path: '/classical/columnar' },
      ]
    },
    {
      name: 'AES',
      path: '/aes',
      children: [
        { name: 'Encrypt', path: '/aes/encrypt' },
        { name: 'Decrypt', path: '/aes/decrypt' },
      ]
    },
    {
      name: 'RSA',
      path: '/rsa',
      children: [
        { name: 'Encrypt', path: '/rsa/encrypt' },
        { name: 'Decrypt', path: '/rsa/decrypt' },
      ]
    },
    {
      name: 'SHA',
      path: '/sha',
      children: [
        { name: 'SHA-1', path: '/sha/sha1' },
        { name: 'SHA-2', path: '/sha/sha2' },
        { name: 'SHA-3', path: '/sha/sha3' },
      ]
    },
  ];

  return (
    <div className="w-64 min-h-screen border-r border-gray-800 bg-gray-900 p-4">
      <div className="space-y-2">
        {navItems.map((item) => (
          <div key={item.path}>
            {item.children ? (
              <div>
                <div className="flex items-center">
                  <Link
                    href={item.path}
                    className={`flex-grow px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.path
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => toggleSection(item.name)}
                    className="px-2 py-2 text-gray-400 hover:text-white transition-colors"
                    aria-label={`Toggle ${item.name} menu`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedSections.includes(item.name) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {expandedSections.includes(item.name) && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          pathname === child.path
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 