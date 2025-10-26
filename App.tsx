import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import { fetchLeads, analyzeLeads } from './services/geminiService';
import { Lead } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Could not get user location:", error.message);
        // User location is optional, so we don't need to show an error
      }
    );
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setIsLoadingLeads(true);
    setError(null);
    setLeads([]);
    setAnalysisResult(null);
    setSearchAttempted(true);
    
    try {
      const results = await fetchLeads(searchQuery, userLocation);
      setLeads(results);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoadingLeads(false);
    }
  }, [userLocation]);

  const handleAnalysis = useCallback(async (analysisQuery: string) => {
    if (leads.length === 0) {
      setError("Cannot analyze without leads. Please perform a search first.");
      return;
    }

    setIsLoadingAnalysis(true);
    setError(null);
    try {
      const result = await analyzeLeads(analysisQuery, leads);
      setAnalysisResult(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoadingAnalysis(false);
    }
  }, [leads]);

  const handleExport = useCallback(() => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const escapeCsvCell = (cellData: string): string => {
      if (/[",\n]/.test(cellData)) {
        return `"${cellData.replace(/"/g, '""')}"`;
      }
      return cellData;
    };

    const headers = ['Title', 'URI'];
    const rows = leads.map(lead => [
      escapeCsvCell(lead.title),
      escapeCsvCell(lead.uri)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'gmaps_leads.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [leads]);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <SearchForm onSearch={handleSearch} isLoading={isLoadingLeads} userLocation={userLocation} />
        {error && (
          <div className="mt-4 max-w-2xl mx-auto p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300 rounded-lg" role="alert">
            <p><span className="font-bold">Error:</span> {error}</p>
          </div>
        )}
        <div className="max-w-5xl mx-auto">
            <ResultsDisplay
                leads={leads}
                isLoadingLeads={isLoadingLeads}
                onAnalyze={handleAnalysis}
                isLoadingAnalysis={isLoadingAnalysis}
                analysisResult={analysisResult}
                searchAttempted={searchAttempted}
                onExport={handleExport}
            />
        </div>
      </main>
    </div>
  );
};

export default App;