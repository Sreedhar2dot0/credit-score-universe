
import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  ratingText: string;
  ratingColor: string;
  size?: 'sm' | 'md' | 'lg';
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ 
  score, 
  maxScore, 
  ratingText, 
  ratingColor,
  size = 'md' 
}) => {
  const percentage = (score / maxScore) * 100;
  
  // Calculate the rotation for the gauge needle
  const rotation = (percentage * 1.8) - 90; // Convert percentage to degrees (180 degrees total range)
  
  // Set sizes based on the size prop
  const dimensions = {
    sm: { width: 120, textSize: 'text-xl', ratingSize: 'text-xs', circleSize: 'w-24 h-24' },
    md: { width: 180, textSize: 'text-4xl', ratingSize: 'text-sm', circleSize: 'w-36 h-36' },
    lg: { width: 240, textSize: 'text-5xl', ratingSize: 'text-base', circleSize: 'w-48 h-48' },
  }[size];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("relative flex items-center justify-center", dimensions.circleSize)}>
        {/* Gauge Background */}
        <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute bottom-0 h-1/2 w-full bg-gray-300 rounded-b-full"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          ></div>
        </div>
        
        {/* Gauge Colored Section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full overflow-hidden transition-all duration-1000 ease-out"
          style={{ 
            backgroundColor: ratingColor,
            clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)` 
          }}
        ></div>
        
        {/* Gauge Needle */}
        <div 
          className="absolute bottom-0 left-1/2 h-[48%] w-1 bg-gray-700 rounded-t-full origin-bottom transition-transform duration-1000 ease-out"
          style={{ 
            transform: `translateX(-50%) rotate(${rotation}deg)`,
          }}
        >
          <div className="absolute -top-1 left-1/2 w-3 h-3 bg-gray-700 rounded-full transform -translate-x-1/2"></div>
        </div>
        
        {/* Center Screw */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-600 rounded-full transform -translate-x-1/2 translate-y-[2px] z-10"></div>
        
        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className={cn("font-bold", dimensions.textSize)}>{score}</span>
          <span className={cn("font-semibold", dimensions.ratingSize)} style={{ color: ratingColor }}>{ratingText}</span>
        </div>
      </div>
      
      {/* Max Score Label */}
      <div className="mt-2 text-sm text-gray-500">
        Out of {maxScore}
      </div>
    </div>
  );
};

export default ScoreGauge;
