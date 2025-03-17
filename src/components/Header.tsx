import Link from "next/link";

export default function Header() {
  return (
    <nav className="border-b">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            CipherHub
          </Link>
          <div className="space-x-6">
            <Link href="/encrypt" className="text-gray-600 hover:text-gray-900">
              Encrypt
            </Link>
            <Link href="/decrypt" className="text-gray-600 hover:text-gray-900">
              Decrypt
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 