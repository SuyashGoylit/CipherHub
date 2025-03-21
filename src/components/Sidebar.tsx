'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Encrypt', path: '/encrypt' },
    { name: 'Decrypt', path: '/decrypt' },
    { name: 'AES', path: '/aes' },
    { name: 'RSA', path: '/rsa' },
    { name: 'SHA', path: '/sha' },
  ];

  return (
    <div className="w-64 min-h-screen border-r p-4">
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              pathname === item.path
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
} 