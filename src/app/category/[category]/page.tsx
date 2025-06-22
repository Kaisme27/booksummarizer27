'use client';
import { useParams } from 'next/navigation';
import booksData from '../../../data/books.json';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
  category: string;
  summary?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  const books = (booksData as Book[]).filter(book => book.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{category}</h1>
        <p className="text-lg text-gray-600">Browse all books in this category</p>
      </div>
      {books.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">No books found in this category.</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map(book => (
            <div key={book.id} className="bg-white border border-gray-200 rounded-xl shadow flex flex-col">
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-t-xl">
                <img src={book.image} alt={book.title} className="max-h-full max-w-full object-contain p-2" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full mr-2">{book.category}</span>
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