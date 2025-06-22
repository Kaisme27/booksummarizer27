'use client';

import Link from 'next/link';
import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import booksData from '../data/books.json';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
  summary?: string;
  category?: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchInputRef.current?.value;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  React.useEffect(() => {
    setBooks(booksData as Book[]);
  }, []);

  React.useEffect(() => {
    if (searchParams.get('noMatch') === '1') {
      setNoMatch(true);
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 p-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Get <span className="text-blue-600">Smarter</span> Reads
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Free Book Summaries Powered by AI
          </p>
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-lg p-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter a book title..."
              className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 px-4 py-2"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full flex items-center transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>
        </div>

        {/* Browse by Category Button */}
        <div className="mt-6">
          <Link href="/categories" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Browse by Category
          </Link>
        </div>

        {noMatch && (
          <div className="mt-6 text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2">
            No book found with that title.
          </div>
        )}

        {/* New Available Book List */}
        <div className="max-w-6xl mx-auto py-12 px-4 text-left w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative inline-block border-b-2 border-blue-500 pb-1">
            New Available
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {books.map((book: Book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <div className="bg-white/70 border border-gray-200 rounded-xl shadow flex flex-col backdrop-blur-sm h-full transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-t-xl">
                    <img src={book.image} alt={book.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-800 mb-1 leading-tight line-clamp-3">{book.title}</h3>
                    <p className="text-gray-600 text-xs mb-1">by {book.author}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{book.date}</span>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="flex flex-wrap gap-1">
                        {book.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
