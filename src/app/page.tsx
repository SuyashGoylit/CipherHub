"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="p-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">CipherHub</h1>
          <p className="text-lg mb-8">
            Welcome to CipherHub - your tool for encrypting and decrypting text using various ciphers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/encrypt"
              className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Encrypt</h2>
              <p className="text-gray-600">
                Transform your text into encrypted messages using different cipher methods.
              </p>
            </Link>

            <Link
              href="/decrypt" 
              className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Decrypt</h2>
              <p className="text-gray-600">
                Decode encrypted messages back into readable text.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
