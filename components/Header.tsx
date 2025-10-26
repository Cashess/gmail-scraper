import React from 'react';
import { MapPinIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-4 md:p-6">
      <div className="flex items-center justify-center gap-3 mb-2">
        <MapPinIcon className="h-8 w-8 text-indigo-500" />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
          Google Maps Lead Extractor
        </h1>
      </div>
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Find and analyze local business leads with the power of AI. Enter a query to get started.
      </p>
    </header>
  );
};

export default Header;
