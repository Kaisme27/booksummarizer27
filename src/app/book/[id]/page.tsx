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

  React.useEffect(() => {
    if (!book) return;
    // Check for favorites in localStorage only on client side
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.includes(book.id));
  }, [book?.id]);

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
    // This can be a loading spinner or a not-found component
    return <div>Book not found.</div>;
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
              {(() => {
                const summaryText = book.summary || '';
                const takeawaysMatch = summaryText.match(/Key Takeaways:([\s\S]*?)Book Summary:/);
                const bookSummaryMatch = summaryText.match(/Book Summary:([\s\S]*)/);

                const takeawaysContent = takeawaysMatch ? takeawaysMatch[1].trim() : '';
                const bookSummaryContent = bookSummaryMatch ? bookSummaryMatch[1].trim() : '';

                const takeawaysList = takeawaysContent.split(/\n+/).filter(line => line.match(/^\d+\./));

                return (
                  <div>
                    <strong className="block mb-2 text-gray-700 font-bold">Key Takeaways:</strong>
                    <ul className="list-none pl-0 mb-6">
                      {takeawaysList.map((item, index) => (
                        <li key={index} className="text-gray-800 mb-2 flex items-start">
                          <span className="mr-2 font-semibold">{item.match(/^\d+\./)?.[0]}</span>
                          <span>{item.replace(/^\d+\.\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                    <strong className="block mb-2 text-gray-700 font-bold">Book Summary:</strong>
                    <p className="text-gray-800">{bookSummaryContent}</p>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}
