import Link from 'next/link';

export const metadata = {
  title: "Book Categories",
  description: "Browse our collection of summaries by category",
};

const categoriesData = [
  {
    name: 'Biographies & Memoirs',
    description: 'Life stories of notable people',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Business & Money',
    description: 'Career, entrepreneurship, and finance',
    color: 'bg-green-100 text-green-800',
  },
  {
    name: 'Health, Fitness & Dieting',
    description: 'Wellness, nutrition, and personal health',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    name: 'History',
    description: 'Events, civilizations, and eras from the past',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Politics & Social Sciences',
    description: 'Government, sociology, and cultural studies',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Science & Math',
    description: 'Scientific research, discoveries, and concepts',
    color: 'bg-teal-100 text-teal-800',
  },
  {
    name: 'Self-Help & Personal Development',
    description: 'Improvement of skills and mindset',
    color: 'bg-lime-100 text-lime-800',
  },
  {
    name: 'Sports & Outdoors',
    description: 'Athletics, recreation, and outdoor activities',
    color: 'bg-orange-100 text-orange-800',
  },
  {
    name: 'Technology & Engineering',
    description: 'Computing, programming, and technical fields',
    color: 'bg-gray-200 text-gray-800',
  },
  {
    name: 'Psychology & Mental Health',
    description: 'Human mind, behavior, and emotional wellbeing',
    color: 'bg-rose-100 text-rose-800',
  },
  {
    name: 'Philosophy',
    description: 'Philosophical ideas and critical thinking',
    color: 'bg-amber-100 text-amber-800',
  },
  {
    name: 'Education & Teaching',
    description: 'Learning methods, pedagogy, and curriculum',
    color: 'bg-indigo-100 text-indigo-800',
  },
];

interface CategoryCardProps {
  name: string;
  description: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, description, color }) => (
  <div className={`${color} bg-opacity-70 p-6 rounded-lg shadow-md flex flex-col justify-between h-48 w-72`}>
    <div>
      <h3 className="font-bold text-xl mb-1">{name}</h3>
      <p className="text-base text-gray-600">{description}</p>
    </div>
    <Link href={`/category/${encodeURIComponent(name)}`} className="text-blue-600 hover:underline flex items-center space-x-1 font-medium mt-4">
      <span>Browse Category</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  </div>
);

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Book Categories</h1>
        <p className="text-lg text-gray-600">Browse our collection of summaries by category</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoriesData.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
} 