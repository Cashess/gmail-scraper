import React from 'react';
import { Lead } from '../types';
import { LinkIcon } from './icons';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 truncate" title={lead.title}>
          {lead.title}
        </h3>
        <a
          href={lead.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <LinkIcon className="h-4 w-4" />
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default LeadCard;
