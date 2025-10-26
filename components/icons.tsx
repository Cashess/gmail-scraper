import React from 'react';

export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
  </svg>
);

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5a3 3 0 1 0-5.993.142" />
      <path d="M18 13a3 3 0 1 0-5.993.142" />
      <path d="M5 13a3 3 0 1 0-5.993.142" />
      <path d="M12 21a3 3 0 1 0-5.993.142" />
      <path d="M18 5a3 3 0 1 0-5.993.142" />
      <path d="M5 5a3 3 0 1 0-5.993.142" />
      <path d="M12 13a3 3 0 1 0-5.993.142" />
      <path d="M18 21a3 3 0 1 0-5.993.142" />
      <path d="M12 8V5" />
      <path d="M12 13v-2" />
      <path d="M12 21v-5" />
      <path d="m15.5 6.5-1-1" />
      <path d="m8.5 6.5-1-1" />
      <path d="m15.5 14.5-1-1" />
      <path d="m8.5 14.5-1-1" />
      <path d="m15.5 22.5-1-1" />
      <path d="m8.5 22.5-1-1" />
      <path d="m6.007 5.142-1 .002" />
      <path d="m6.007 13.142-1 .002" />
      <path d="m6.007 21.142-1 .002" />
      <path d="M9 8h2" />
      <path d="M9 16h2" />
      <path d="M15 8h2" />
      <path d="M15 16h2" />
    </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);