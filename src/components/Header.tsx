import Link from "next/link";

export default function Header() {
  return (
    <nav className="border-b">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            CipherHub
          </Link>
          <div className="ml-auto">
            <Link
              href="/codebook"
              className="px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Codebook
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 