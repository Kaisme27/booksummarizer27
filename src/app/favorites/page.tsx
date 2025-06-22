'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import booksData from '../../data/books.json';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
  summary?: string;
}

export default function FavoritesPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const allBooks = booksData as Book[];
    const favBooks = allBooks.filter(b => favIds.includes(b.id));
    setFavoriteBooks(favBooks);
  }, []);

  return (
    <div className="bg-[#f2f6fd] flex flex-col items-center justify-start pt-24 min-h-screen">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4 text-center">My Favorite Summaries</h1>
      <p className="text-2xl text-gray-500 mb-16 text-center">Your saved book summaries</p>
      {favoriteBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-700 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.873 6.9-1.002L12 2.5l3.093 6.747 6.9 1.002-5 4.873 1.179 6.873z" />
          </svg>
          <div className="text-2xl font-bold text-gray-800 mb-2">No favorites yet</div>
          <div className="text-lg text-gray-500 mb-6">Save summaries to find them here later</div>
          <Link href="/">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition">Browse Summaries</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl mt-8">
          {favoriteBooks.map(book => (
            <div key={book.id} className="bg-white border border-gray-200 rounded-xl shadow flex flex-col">
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-t-xl">
                <Image src={book.image} alt={book.title} width={200} height={256} className="max-h-full max-w-full object-contain p-2" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full mr-2">Favorite</span>
                  <span>{book.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {/* 可选：显示标签 */}
                </div>
                <div className="mt-auto">
                  <Link href={`/book/${book.id}`}>
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
                      <span>View Summary</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 