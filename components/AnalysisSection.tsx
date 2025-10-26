import React, { useState } from 'react';
import { BrainCircuitIcon } from './icons';

interface AnalysisSectionProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
  analysisResult: string | null;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ onAnalyze, isLoading, analysisResult }) => {
  const [analysisQuery, setAnalysisQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (analysisQuery.trim() && !isLoading) {
      onAnalyze(analysisQuery.trim());
    }
  };

  return (
    <div className="w-full mt-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl shadow-inner">
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuitIcon className="h-7 w-7 text-indigo-500" />
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Thinking Mode: Deep Analysis
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Ask a complex question about the extracted leads for an in-depth analysis.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={analysisQuery}
          onChange={(e) => setAnalysisQuery(e.target.value)}
          placeholder="e.g., 'Summarize their online presence'"
          className="flex-grow px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:ring-0 outline-none transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </form>

      {analysisResult && !isLoading && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-lg shadow">
          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Analysis Result:</h4>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
            {analysisResult}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisSection;
