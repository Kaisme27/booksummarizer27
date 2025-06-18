'use client';
// src/app/page.tsx
// import path from 'path';
// import fs from 'fs';
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
}

// Move the books data to a JSON file (e.g., data/books.json)
// and read it at build time or on each request in a server component

// Mock 数据，后续可替换为真实 books.json 数据
// const mockBooks = [
//   { id: 1, title: 'Atomic Habits' },
//   { id: 2, title: 'Sapiens' },
//   { id: 3, title: 'The Lean Startup' },
// ];

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const keyword = query.trim().toLowerCase();
    if (!keyword) return;
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
      const found = books.find(book => book.title.toLowerCase().includes(keyword));
      if (found) {
        setNoMatch(false);
        router.push(`/book/${found.id}`);
      } else {
        setNoMatch(true);
      }
    }, duration);
  };

  React.useEffect(() => {
    setBooks(booksData as Book[]);
    if (searchParams.get('noMatch') === '1') {
      setNoMatch(true);
    }
  }, [searchParams]);

  // Read the JSON file directly in the server component
  // const booksFilePath = path.join(process.cwd(), 'data', 'books.json');
  // const booksData = fs.readFileSync(booksFilePath, 'utf8');
  // const books: Book[] = JSON.parse(booksData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight text-center">
          Get Smarter Reads, Faster.
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Free Book Summaries Powered by AI
        </p>

        <div className="flex justify-center mb-12">
          <form onSubmit={handleSearch} className="relative w-full max-w-3xl">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter a book title..."
              className="w-full p-4 pr-40 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 3.293a1 1 0 00-1.414 0l-5 5a1 1 0 000 1.414l5 5a1 1 0 001.414-1.414L6.414 11H16a1 1 0 100-2H6.414l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(90 10 10)" />
              </svg>
              <span>Summarize</span>
            </button>
          </form>
        </div>
        {loading && (
          <div className="w-full flex justify-center mt-8">
            <div className="bg-blue-100 rounded-lg p-6 w-full max-w-2xl shadow">
              <div className="text-xl font-bold text-blue-800 mb-2">Loading</div>
              <div className="text-blue-700 mb-4">Please wait while we generate the summary...</div>
              <div className="w-full h-2 bg-blue-200 rounded overflow-hidden">
                <div className="h-2 bg-teal-500 rounded transition-all duration-1500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {noMatch && !loading && (
          <div className="w-full flex justify-center mt-4">
            <div className="text-red-600 text-lg font-semibold">No matching book found!</div>
          </div>
        )}

        {/* Browse by Category Section */}
        <div className="mt-20 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative inline-block border-b-2 border-blue-500 pb-1">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
            {/* Example Categories - You can replace with dynamic data */}
            <CategoryTag icon="📚" name="Biographies & Memoirs" color="bg-purple-100 text-purple-800" />
            <CategoryTag icon="💰" name="Business & Money" color="bg-green-100 text-green-800" />
            <CategoryTag icon="💪" name="Health, Fitness & Dieting" color="bg-pink-100 text-pink-800" />
            <CategoryTag icon="⏳" name="History" color="bg-yellow-100 text-yellow-800" />
            <CategoryTag icon="🌍" name="Politics & Social Sciences" color="bg-blue-100 text-blue-800" />
            <CategoryTag icon="🔬" name="Science & Math" color="bg-teal-100 text-teal-800" />
            <CategoryTag icon="🌱" name="Self-Help & Personal Development" color="bg-lime-100 text-lime-800" />
            <CategoryTag icon="🏞️" name="Sports & Outdoors" color="bg-orange-100 text-orange-800" />
          </div>
        </div>
        
        <Link href="/categories" className="text-blue-600 hover:underline font-medium text-lg flex items-center justify-center space-x-1 mt-8 mb-12 mx-auto">
          <span>View all categories</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* New Available Book List */}
        <div className="max-w-6xl mx-auto py-12 px-4 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative inline-block border-b-2 border-blue-500 pb-1">
            New Available
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {books.map((book: Book) => (
              <div key={book.id} className="bg-white/70 border border-gray-200 rounded-xl shadow flex flex-col backdrop-blur-sm">
                <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-gray-800 mb-1 leading-tight line-clamp-3">{book.title}</h3>
                  <p className="text-gray-600 text-xs mb-1">by {book.author}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full mr-2">New</span>
                    <span>{book.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {/* Remove emoji tags */}
                  </div>
                  <div className="mt-auto">
                    <Link href={`/book/${book.id}`}>
                      <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
                        <span>Get Summary</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryTagProps {
  icon: string;
  name: string;
  color: string;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ icon, name, color }) => {
  const router = useRouter();
  return (
    <button
      className={`${color} bg-opacity-70 w-48 h-32 px-4 py-2 rounded-lg flex flex-col items-center justify-center space-y-1 text-center text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300`}
      onClick={() => router.push(`/category/${encodeURIComponent(name)}`)}
    >
      <span className="text-4xl">{icon}</span>
      <span className="leading-tight mt-1">{name}</span>
    </button>
  );
};