// src/app/book/[id]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import booksData from '../../../data/books.json';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
  summary?: string;
}

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const book = (booksData as Book[]).find(b => b.id === id);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [showSummary, setShowSummary] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log('booksData', booksData);
  console.log('params', params);
  console.log('id', id);
  console.log('book', book);

  React.useEffect(() => {
    if (!book) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.includes(book.id));
  }, [book?.id]);

  const handleGetSummary = () => {
    setLoading(true);
    setProgress(0);
    const start = Date.now();
    const duration = 1500;
    function animate() {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, (elapsed / duration) * 100);
      setProgress(percent);
      if (percent < 100) {
        progressRef.current = setTimeout(animate, 16);
      }
    }
    animate();
    setTimeout(() => {
      setLoading(false);
      setProgress(100);
      if (!book) {
        router.push('/?noMatch=1');
      }
    }, duration);
  };

  const handleAddFavorite = () => {
    if (!book) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favs.includes(book.id)) {
      favs.push(book.id);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  if (!book) {
    // 这里可以返回 null 或 loading 动画
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-6 p-4 rounded-lg border-2 border-blue-400 bg-blue-50">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1 leading-tight">{book.title}</h1>
        <div className="text-lg font-semibold text-blue-700 mb-2">Author: {book.author}</div>
        <button
          onClick={handleAddFavorite}
          disabled={isFavorite}
          className={`px-6 py-2 rounded-lg font-semibold transition border-2 ${isFavorite ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' : 'bg-teal-600 border-teal-700 text-white hover:bg-teal-700'}`}
        >
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>
      {showSummary && (
        <div className="bg-gray-100 p-6 rounded-lg shadow relative">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close summary"
            onClick={() => setShowSummary(false)}
          >
            ×
          </button>
          {loading ? (
            <div className="bg-blue-100 rounded-lg p-6 w-full shadow">
              <div className="text-xl font-bold text-blue-800 mb-2">Loading</div>
              <div className="text-blue-700 mb-4">Please wait while we generate the summary...</div>
              <div className="w-full h-2 bg-blue-200 rounded overflow-hidden">
                <div className="h-2 bg-teal-500 rounded transition-all duration-1500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <>
              <strong className="block mb-2 text-gray-700">AI Summary:</strong>
              {book.summary
                ? book.summary.split(/\n+/).map((para, idx) => (
                    <p key={idx} className="text-gray-800 mb-2">{para}</p>
                  ))
                : <p className="text-gray-800">No summary available.</p>}
              <button
                onClick={handleGetSummary}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition"
              >
                Get Summary
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}