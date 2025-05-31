
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Bookmark, X, Check, MapPin, DollarSign, TrendingUp, Building2, Rocket, Heart } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  companyType: "startup" | "company";
  location: string;
  type: "Full-time" | "Part-time" | "Freelance" | "Internship";
  remote: boolean;
  salary: string;
  match: number;
  description: string;
  skills: string[];
  companyLogo: string;
  isStartup?: boolean;
  isFreelance?: boolean;
  saved?: boolean;
}

const EnhancedSwipeableJobCard = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior UX Designer",
      company: "TechCorp Inc.",
      companyType: "company",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      salary: "$80k - $100k",
      match: 95,
      description: "Shape the future of digital products with our innovative design team. Lead user research, create design systems, and mentor junior designers.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      companyLogo: "TC"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      companyType: "startup",
      location: "New York, NY",
      type: "Full-time",
      remote: false,
      salary: "$70k - $90k",
      match: 88,
      description: "Build exceptional web experiences using React and modern technologies. Join our fast-growing team and shape the product from ground up.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      companyLogo: "SX",
      isStartup: true
    },
    {
      id: 3,
      title: "Content Creator",
      company: "CreativeHub",
      companyType: "company",
      location: "Remote",
      type: "Freelance",
      remote: true,
      salary: "$40-60/hour",
      match: 92,
      description: "Create engaging content for social media platforms and help brands tell their stories through compelling visuals and copy.",
      skills: ["Social Media", "Video Editing", "Copywriting", "Photoshop"],
      companyLogo: "CH",
      isFreelance: true
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateLabs",
      companyType: "startup",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      salary: "$90k - $120k",
      match: 87,
      description: "Drive product strategy and execution for cutting-edge fintech solutions. Work with cross-functional teams to deliver world-class products.",
      skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
      companyLogo: "IL",
      isStartup: true
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "DataFlow Corp",
      companyType: "company",
      location: "Seattle, WA",
      type: "Full-time",
      remote: false,
      salary: "$110k - $140k",
      match: 91,
      description: "Analyze complex datasets to drive business insights and build predictive models that impact millions of users.",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      companyLogo: "DF"
    }
  ];

  const currentJob = jobs[currentCard];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard]);

  const handleTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    handleTransition(() => {
      setCurrentCard((prev) => (prev + 1) % jobs.length);
    });
  };

  const handlePrevious = () => {
    handleTransition(() => {
      setCurrentCard((prev) => (prev - 1 + jobs.length) % jobs.length);
    });
  };

  const handleReject = () => {
    console.log("Rejected job:", currentJob.title);
    handleNext();
  };

  const handleLike = () => {
    console.log("Liked job:", currentJob.title);
    handleNext();
  };

  const handleSave = () => {
    const jobId = currentJob.id;
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
    console.log("Saved job:", currentJob.title);
  };

  const handleMessage = () => {
    console.log("Opening chat with:", currentJob.company);
    // Mock message functionality
    alert(`Starting conversation with ${currentJob.company} about ${currentJob.title}`);
  };

  const handleViewDetails = () => {
    console.log("Viewing details for:", currentJob.title);
    alert(`Viewing detailed information for ${currentJob.title} at ${currentJob.company}`);
  };

  const isSaved = savedJobs.includes(currentJob.id);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className={`border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-300 ${isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-lg"></div>
        
        <CardContent className="p-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-white/30 bg-white/10 backdrop-blur-sm">
                <AvatarFallback className="bg-black/80 text-white font-light backdrop-blur-sm">
                  {currentJob.companyLogo}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                {currentJob.isStartup && (
                  <div className="flex items-center space-x-1">
                    <Rocket className="h-4 w-4 text-blue-500" />
                    <Badge variant="outline" className="border-blue-300 text-blue-600 bg-blue-50/50 font-light text-xs">
                      Startup
                    </Badge>
                  </div>
                )}
                {currentJob.isFreelance && (
                  <Badge variant="outline" className="border-purple-300 text-purple-600 bg-purple-50/50 font-light text-xs">
                    Freelance
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {currentJob.remote && (
                <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50/50 font-light">
                  Remote
                </Badge>
              )}
              <Badge variant="outline" className="border-gray-300 text-gray-600 bg-gray-50/50 font-light">
                {currentJob.type}
              </Badge>
            </div>
          </div>
          
          {/* Job Info */}
          <div className="mb-6">
            <h3 className="text-xl font-light text-black mb-3 tracking-wide font-mono">
              {currentJob.title}
            </h3>
            <div className="flex items-center text-black/80 font-light mb-2">
              <Building2 className="h-4 w-4 mr-2" />
              {currentJob.company}
            </div>
            <div className="flex items-center text-sm text-black/60 space-x-4">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {currentJob.location}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {currentJob.salary}
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6 border border-white/20">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-light text-black/80">Match Score</span>
              </div>
              <span className="text-2xl font-light text-black font-mono">{currentJob.match}%</span>
            </div>
            <Progress value={currentJob.match} className="h-2 bg-white/20" />
            <div className="mt-2 text-xs text-black/60 font-light">
              Based on your skills and preferences
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-black/70 font-light leading-relaxed mb-6 tracking-wide">
            {currentJob.description}
          </p>

          {/* Skills */}
          <div className="mb-8">
            <p className="text-sm font-light text-black/80 mb-3 tracking-wide">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {currentJob.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-black/20 text-black/80 font-light text-xs bg-white/10 backdrop-blur-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="flex items-center border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 bg-white/10 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className={`flex items-center transition-all duration-300 bg-white/10 backdrop-blur-sm ${
                isSaved 
                  ? "border-yellow-500 text-yellow-700 bg-yellow-50" 
                  : "border-yellow-300 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
              }`}
            >
              {isSaved ? <Heart className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMessage}
              className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 bg-white/10 backdrop-blur-sm"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleLike}
              className="flex-1 bg-black/80 text-white hover:bg-black transition-all duration-300 backdrop-blur-sm"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply
            </Button>
          </div>

          {/* View Details Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="w-full border-black/30 text-black/80 hover:bg-black hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-sm font-light"
          >
            View Details
          </Button>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="text-black/60 hover:text-black hover:bg-white/10"
            >
              ← Previous
            </Button>
            <p className="text-xs text-black/50 font-light tracking-wider">
              {currentCard + 1} of {jobs.length}
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

export default EnhancedSwipeableJobCard;
