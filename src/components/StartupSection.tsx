
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Rocket, Users, DollarSign, TrendingUp, MessageSquare, Heart, Eye } from "lucide-react";

interface Startup {
  id: number;
  name: string;
  industry: string;
  stage: string;
  location: string;
  description: string;
  teamSize: number;
  funding: string;
  valuation: string;
  match: number;
  logo: string;
  positions: string[];
  investmentOpportunity?: boolean;
}

const StartupSection = ({ isInvestor = false }: { isInvestor?: boolean }) => {
  const [currentStartup, setCurrentStartup] = useState(0);

  const startups: Startup[] = [
    {
      id: 1,
      name: "EcoTech Solutions",
      industry: "CleanTech",
      stage: "Series A",
      location: "San Francisco, CA",
      description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing costs. Looking for passionate engineers and sales professionals.",
      teamSize: 25,
      funding: "$2.5M",
      valuation: "$15M",
      match: 94,
      logo: "ET",
      positions: ["Frontend Developer", "Sales Manager", "Marketing Intern"],
      investmentOpportunity: true
    },
    {
      id: 2,
      name: "HealthAI",
      industry: "HealthTech",
      stage: "Seed",
      location: "Boston, MA",
      description: "AI-powered diagnostic tools for early disease detection. Join our mission to make healthcare more accessible and accurate.",
      teamSize: 12,
      funding: "$1.2M",
      valuation: "$8M",
      match: 89,
      logo: "HA",
      positions: ["Data Scientist", "Backend Developer", "Product Designer"],
      investmentOpportunity: true
    },
    {
      id: 3,
      name: "FoodFlow",
      industry: "FoodTech",
      stage: "Pre-Seed",
      location: "Austin, TX",
      description: "Connecting local farmers directly to consumers through our innovative supply chain platform. Reducing food waste and supporting local communities.",
      teamSize: 8,
      funding: "$500K",
      valuation: "$3M",
      match: 87,
      logo: "FF",
      positions: ["Full-Stack Developer", "Operations Manager", "Content Creator"],
      investmentOpportunity: true
    }
  ];

  const currentStartupData = startups[currentStartup];

  const handleNext = () => {
    setCurrentStartup((prev) => (prev + 1) % startups.length);
  };

  const handlePrevious = () => {
    setCurrentStartup((prev) => (prev - 1 + startups.length) % startups.length);
  };

  const handleApply = (position: string) => {
    console.log(`Applied for ${position} at ${currentStartupData.name}`);
    alert(`Application submitted for ${position} at ${currentStartupData.name}!`);
  };

  const handleInvest = () => {
    console.log(`Investment interest in ${currentStartupData.name}`);
    alert(`Investment interest submitted for ${currentStartupData.name}!`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-lg"></div>
        
        <CardContent className="p-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-white/30 bg-white/10 backdrop-blur-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-light">
                  {currentStartupData.logo}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <Rocket className="h-4 w-4 text-blue-500" />
                <Badge variant="outline" className="border-blue-300 text-blue-600 bg-blue-50/50 font-light text-xs">
                  {currentStartupData.stage}
                </Badge>
              </div>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50/50 font-light">
              {currentStartupData.industry}
            </Badge>
          </div>

          {/* Startup Info */}
          <div className="mb-6">
            <h3 className="text-xl font-light text-black mb-3 tracking-wide font-mono">
              {currentStartupData.name}
            </h3>
            <div className="flex items-center text-sm text-black/60 space-x-4 mb-2">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {currentStartupData.teamSize} employees
              </div>
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {currentStartupData.funding} raised
              </div>
            </div>
            <p className="text-sm text-black/60 font-light">
              📍 {currentStartupData.location}
            </p>
          </div>

          {/* Match Score or Valuation */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6 border border-white/20">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-light text-black/80">
                  {isInvestor ? "Valuation" : "Match Score"}
                </span>
              </div>
              <span className="text-2xl font-light text-black font-mono">
                {isInvestor ? currentStartupData.valuation : `${currentStartupData.match}%`}
              </span>
            </div>
            {!isInvestor && <Progress value={currentStartupData.match} className="h-2 bg-white/20" />}
            <div className="mt-2 text-xs text-black/60 font-light">
              {isInvestor ? "Current estimated value" : "Based on your preferences"}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-black/70 font-light leading-relaxed mb-6 tracking-wide">
            {currentStartupData.description}
          </p>

          {/* Positions or Investment Info */}
          <div className="mb-8">
            <p className="text-sm font-light text-black/80 mb-3 tracking-wide">
              {isInvestor ? "Key Metrics" : "Open Positions"}
            </p>
            {isInvestor ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-xs text-black/60">Team Size</p>
                  <p className="font-mono text-black">{currentStartupData.teamSize}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-xs text-black/60">Stage</p>
                  <p className="font-mono text-black">{currentStartupData.stage}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {currentStartupData.positions.map((position, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span className="text-sm text-black/80 font-light">{position}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApply(position)}
                      className="text-xs border-black/20 text-black/80 hover:bg-black hover:text-white"
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-4">
            {isInvestor ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Details
                </Button>
                <Button
                  size="sm"
                  onClick={handleInvest}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Invest
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Join Startup
                </Button>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="text-black/60 hover:text-black hover:bg-white/10"
            >
              ← Previous
            </Button>
            <p className="text-xs text-black/50 font-light tracking-wider">
              {currentStartup + 1} of {startups.length}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="text-black/60 hover:text-black hover:bg-white/10"
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupSection;
