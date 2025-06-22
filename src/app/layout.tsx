'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { Geist, Geist_Mono } from "next/font/google"; // Removed Geist imports
import "./globals.css";
import { useState } from 'react';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>booksummarizer.online</title>
        <meta name="description" content="Free Book Summaries Powered by AI" />
      </head>
      <body className="font-sans antialiased">
        <header className="bg-gradient-to-r from-blue-100 to-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* 左侧 Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Summarist.ai Logo" width={32} height={32} className="h-8 w-8" />
              <span className="hidden sm:inline text-2xl font-bold text-gray-800">booksummarizer.online</span>
            </Link>
            {/* 中间导航 */}
            <nav className="hidden md:flex flex-1 justify-center">
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 font-medium">Categories</Link>
                <Link href="/favorites" className="text-gray-600 hover:text-blue-600 font-medium">Favorites</Link>
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Search</Link>
              </div>
            </nav>
            {/* 右侧按钮 */}
            <div className="flex items-center space-x-4">
              <button className="px-4 py-1 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium transition">Log in</button>
              <button className="hidden sm:inline-flex px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition">Language</button>
              
              {/* 移动端汉堡菜单按钮 */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 移动端导航菜单 */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-4 py-2 space-y-1">
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/categories" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/favorites" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Search
                </Link>
              </div>
            </div>
          )}
        </header>
        {children}
        <footer className="bg-[#232b36] text-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-base">© 2025 booksummarizer.online. All rights reserved.</div>
              <div className="text-sm text-gray-400">AI-Powered Book Summaries</div>
            </div>
            <div className="flex space-x-6 text-base">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
