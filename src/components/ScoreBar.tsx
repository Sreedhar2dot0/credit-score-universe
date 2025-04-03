
import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreBarProps {
  score: number;
  maxScore: number;
  ratingText: string;
  ratingColor: string;
  size?: 'sm' | 'md' | 'lg';
}

const ScoreBar: React.FC<ScoreBarProps> = ({ 
  score, 
  maxScore, 
  ratingText, 
  ratingColor,
  size = 'md' 
}) => {
  const percentage = (score / maxScore) * 100;
  
  // Set sizes based on the size prop
  const dimensions = {
    sm: { height: 'h-2', textSize: 'text-xl', ratingSize: 'text-xs' },
    md: { height: 'h-3', textSize: 'text-3xl', ratingSize: 'text-sm' },
    lg: { height: 'h-4', textSize: 'text-4xl', ratingSize: 'text-base' },
  }[size];

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-1">
        <span className={cn("font-bold", dimensions.textSize)}>{score}</span>
        <span className={cn("font-semibold", dimensions.ratingSize)} style={{ color: ratingColor }}>{ratingText}</span>
      </div>
      
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", dimensions.height)}>
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: ratingColor,
          }}
        ></div>
      </div>
      
      <div className="mt-2 text-sm text-gray-500 text-right">
        Out of {maxScore}
      </div>
    </div>
  );
};

export default ScoreBar;
