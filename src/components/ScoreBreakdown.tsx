
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export interface ScoreDetail {
  id: string;
  name: string;
  maxPoints: number;
  earnedPoints: number;
  description?: string;
}

interface ScoreBreakdownProps {
  details: ScoreDetail[];
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ details }) => {
  return (
    <div className="space-y-4 mt-4 animate-in fade-in">
      <h3 className="text-lg font-medium">Score Breakdown</h3>
      
      <div className="space-y-3">
        {details.map((detail) => {
          const percentage = Math.round((detail.earnedPoints / detail.maxPoints) * 100);
          
          // Determine color based on percentage
          let progressColor = '';
          if (percentage >= 80) progressColor = 'bg-credit-excellent';
          else if (percentage >= 60) progressColor = 'bg-credit-good';
          else if (percentage >= 40) progressColor = 'bg-credit-average';
          else if (percentage >= 20) progressColor = 'bg-credit-poor';
          else progressColor = 'bg-credit-bad';
          
          return (
            <div key={detail.id} className="rounded-md border p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="font-medium">{detail.name}</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{detail.earnedPoints}</span>
                  <span className="text-gray-500 text-sm">/ {detail.maxPoints}</span>
                </div>
              </div>
              
              <div className="mt-2 relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", progressColor)} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              {detail.description && (
                <p className="mt-2 text-sm text-gray-500">{detail.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
