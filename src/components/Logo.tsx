import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The E shape */}
      <path 
        d="M60 40 H140 V70 H80 V90 H140 V100 C120 90 90 90 60 100 V40 Z" 
        fill="#0d8282" 
      />
      <path 
        d="M60 110 C90 100 120 100 140 110 V140 H60 V110 Z" 
        fill="#0d8282" 
      />
      {/* The RISE text */}
      <text 
        x="100" 
        y="180" 
        fontFamily="sans-serif" 
        fontSize="30" 
        fontWeight="bold" 
        fill="#0d8282" 
        textAnchor="middle"
        letterSpacing="2"
      >
        RISE.
      </text>
    </svg>
  );
}
