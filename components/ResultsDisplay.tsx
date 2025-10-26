import React from 'react';
import { Lead } from '../types';
import LeadCard from './LeadCard';
import AnalysisSection from './AnalysisSection';
import { DownloadIcon } from './icons';

interface ResultsDisplayProps {
  leads: Lead[];
  isLoadingLeads: boolean;
  onAnalyze: (query: string) => void;
  isLoadingAnalysis: boolean;
  analysisResult: string | null;
  searchAttempted: boolean;
  onExport: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  leads,
  isLoadingLeads,
  onAnalyze,
  isLoadingAnalysis,
  analysisResult,
  searchAttempted,
  onExport,
}) => {
  if (isLoadingLeads) {
    return (
        <div className="text-center p-10">
            <div role="status">
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5424 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Fetching leads from Google Maps...</p>
        </div>
    );
  }

  if (searchAttempted && leads.length === 0) {
    return (
      <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">No Results Found</h3>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Try adjusting your search query for better results.
        </p>
      </div>
    );
  }

  if (leads.length === 0) {
    return null; // Don't show anything if no search has been made
  }

  return (
    <div className="w-full mt-8">
        <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Extracted Leads ({leads.length})
            </h2>
            <button
                onClick={onExport}
                className="flex items-center justify-center px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                disabled={leads.length === 0}
            >
                <DownloadIcon className="h-5 w-5 mr-2" />
                Export to CSV
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map((lead, index) => (
                <LeadCard key={`${lead.uri}-${index}`} lead={lead} />
            ))}
        </div>
        
        {leads.length > 0 && (
            <AnalysisSection
                onAnalyze={onAnalyze}
                isLoading={isLoadingAnalysis}
                analysisResult={analysisResult}
            />
        )}
    </div>
  );
};

export default ResultsDisplay;