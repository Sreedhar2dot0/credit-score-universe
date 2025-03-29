
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ScoreGauge from './ScoreGauge';
import ScoreBreakdown, { ScoreDetail } from './ScoreBreakdown';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  title: string;
  description?: string;
  score: number;
  maxScore: number;
  ratingText: string;
  ratingColor: string;
  scoreDetails: ScoreDetail[];
  className?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  description,
  score,
  maxScore,
  ratingText,
  ratingColor,
  scoreDetails,
  className
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate score percentage for the card border color
  const scorePercentage = (score / maxScore) * 100;
  let borderColorClass = 'border-credit-bad';
  
  if (scorePercentage >= 80) borderColorClass = 'border-credit-excellent';
  else if (scorePercentage >= 60) borderColorClass = 'border-credit-good';
  else if (scorePercentage >= 40) borderColorClass = 'border-credit-average';
  else if (scorePercentage >= 20) borderColorClass = 'border-credit-poor';
  
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", 
      borderColorClass, 
      expanded ? "border-l-4" : "",
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 p-0"
            aria-label={expanded ? "Hide details" : "Show details"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <ScoreGauge 
            score={score} 
            maxScore={maxScore} 
            ratingText={ratingText} 
            ratingColor={ratingColor}
          />
          
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <div className="text-sm text-gray-500">Total Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <div className="text-sm text-gray-500">Rating</div>
                <div className="text-2xl font-bold" style={{ color: ratingColor }}>{ratingText}</div>
              </div>
            </div>
            
            {expanded && (
              <ScoreBreakdown details={scoreDetails} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
