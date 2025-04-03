
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreCard from '@/components/ScoreCard';
import { Separator } from '@/components/ui/separator';
import { ScoreDetail } from '@/components/ScoreBreakdown';
import { toast } from 'sonner';  // Changed from importing from sonner.tsx to directly from sonner
import ScoreBar from '@/components/ScoreBar';

const Index = () => {
  // Mock data for credit score
  const mockTotalScore = 715;
  const mockMaxScore = 850;
  
  // Get rating based on score
  const getRating = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) return { text: 'Excellent', color: '#48bb78' };
    if (percentage >= 60) return { text: 'Good', color: '#4299e1' };
    if (percentage >= 40) return { text: 'Average', color: '#ecc94b' };
    if (percentage >= 20) return { text: 'Poor', color: '#ed8936' };
    return { text: 'Bad', color: '#e53e3e' };
  };
  
  const totalRating = getRating(mockTotalScore, mockMaxScore);
  
  // Mock data for scorecards
  const mockScorecards = [
    {
      id: 'personal',
      title: 'Personal Credit History',
      description: 'Analysis of your personal credit profile',
      score: 230,
      maxScore: 300,
      details: [
        {
          id: 'payment-history',
          name: 'Payment History',
          earnedPoints: 95,
          maxPoints: 100,
          description: 'Based on your past payment records across all accounts'
        },
        {
          id: 'credit-utilization',
          name: 'Credit Utilization',
          earnedPoints: 65,
          maxPoints: 100,
          description: 'The amount of available credit you are currently using'
        },
        {
          id: 'account-age',
          name: 'Account Age',
          earnedPoints: 70,
          maxPoints: 100,
          description: 'Length of your credit history and account ages'
        }
      ] as ScoreDetail[]
    },
    {
      id: 'business',
      title: 'Business Profile',
      description: 'Evaluation of your business financials',
      score: 140,
      maxScore: 200,
      details: [
        {
          id: 'business-revenue',
          name: 'Annual Revenue',
          earnedPoints: 60,
          maxPoints: 70,
          description: 'Based on your company\'s annual revenue'
        },
        {
          id: 'cash-flow',
          name: 'Cash Flow',
          earnedPoints: 40,
          maxPoints: 70,
          description: 'Stability and predictability of cash flow'
        },
        {
          id: 'business-age',
          name: 'Business Age',
          earnedPoints: 40,
          maxPoints: 60,
          description: 'Length of time your business has been operating'
        }
      ] as ScoreDetail[]
    },
    {
      id: 'collateral',
      title: 'Collateral Assessment',
      description: 'Evaluation of available collateral',
      score: 170,
      maxScore: 200,
      details: [
        {
          id: 'collateral-value',
          name: 'Collateral Value',
          earnedPoints: 90,
          maxPoints: 100,
          description: 'The assessed value of your collateral relative to loan amount'
        },
        {
          id: 'collateral-type',
          name: 'Collateral Type',
          earnedPoints: 80,
          maxPoints: 100,
          description: 'Quality and liquidity of the collateral type'
        }
      ] as ScoreDetail[]
    },
    {
      id: 'additional',
      title: 'Industry & Market',
      description: 'Industry risk and market conditions',
      score: 175,
      maxScore: 250,
      details: [
        {
          id: 'industry-risk',
          name: 'Industry Risk',
          earnedPoints: 75,
          maxPoints: 100,
          description: 'Risk assessment of your business industry'
        },
        {
          id: 'market-conditions',
          name: 'Market Conditions',
          earnedPoints: 60,
          maxPoints: 100,
          description: 'Current economic and market environment'
        },
        {
          id: 'competitive-position',
          name: 'Competitive Position',
          earnedPoints: 40,
          maxPoints: 50,
          description: 'Your business position relative to competitors'
        }
      ] as ScoreDetail[]
    }
  ];
  
  // Show toast when page loads
  React.useEffect(() => {
    toast("Credit score calculated successfully", {
      description: "Based on data from May 2023",
    });
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-credit-darkBlue">Credit Score Assessment</h1>
        <p className="text-gray-500 mt-1">Loan application reference: LN-289763</p>
      </header>
      
      <Tabs defaultValue="summary">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Score Summary</TabsTrigger>
          <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6 animate-in fade-in">
          {/* Overall Score Card */}
          <Card className="border-l-4 border-credit-blue shadow-md">
            <CardHeader>
              <CardTitle>Overall Credit Score</CardTitle>
              <CardDescription>Combined score across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-2/5">
                  <ScoreBar
                    score={mockTotalScore}
                    maxScore={mockMaxScore}
                    ratingText={totalRating.text}
                    ratingColor={totalRating.color}
                    size="lg"
                  />
                </div>
                
                <div className="w-full md:w-3/5 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h3 className="font-medium text-credit-darkBlue mb-2">Score Summary</h3>
                    <p className="text-sm text-gray-700">
                      This credit score is calculated based on multiple factors including personal credit history, 
                      business financials, available collateral, and industry risks. Your score of <span className="font-semibold">{mockTotalScore}</span> is 
                      rated as <span className="font-semibold" style={{ color: totalRating.color }}>{totalRating.text}</span>.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border text-center">
                      <h4 className="text-sm text-gray-500">Approval Chance</h4>
                      <p className="text-xl font-bold text-credit-blue">78%</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border text-center">
                      <h4 className="text-sm text-gray-500">Recommended Rate</h4>
                      <p className="text-xl font-bold text-credit-blue">5.85%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Category Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Score Categories</CardTitle>
              <CardDescription>Individual scoring category results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {mockScorecards.map((scorecard) => {
                  const rating = getRating(scorecard.score, scorecard.maxScore);
                  return (
                    <div key={scorecard.id} className="flex items-center p-4 rounded-lg border hover:shadow-sm transition-shadow">
                      <div className="w-12 h-3 rounded-full bg-gray-200 mr-4 overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(scorecard.score / scorecard.maxScore) * 100}%`,
                            backgroundColor: rating.color
                          }}
                        ></div>
                      </div>
                      <div>
                        <h3 className="font-medium">{scorecard.title}</h3>
                        <p className="text-sm text-gray-500">
                          {scorecard.score} / {scorecard.maxScore} • {rating.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6 animate-in fade-in">
          {mockScorecards.map((scorecard) => {
            const rating = getRating(scorecard.score, scorecard.maxScore);
            return (
              <ScoreCard
                key={scorecard.id}
                title={scorecard.title}
                description={scorecard.description}
                score={scorecard.score}
                maxScore={scorecard.maxScore}
                ratingText={rating.text}
                ratingColor={rating.color}
                scoreDetails={scorecard.details}
              />
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
