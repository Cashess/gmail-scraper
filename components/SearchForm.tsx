import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  userLocation: { latitude: number; longitude: number } | null;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, userLocation }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'digital marketing agencies in Lagos'"
          className="flex-grow px-4 py-3 text-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:ring-0 outline-none transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            'Find Leads'
          )}
        </button>
      </form>
       {userLocation && (
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
            Using your location for more relevant results.
          </p>
        )}
    </div>
  );
};

export default SearchForm;
