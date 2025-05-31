
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Bookmark, Check, MapPin, DollarSign } from "lucide-react";

const JobCard = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const jobs = [
    {
      id: 1,
      title: "Senior UX Designer",
      company: "TechCorp Inc.",
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
      location: "New York, NY",
      type: "Full-time",
      remote: false,
      salary: "$70k - $90k",
      match: 88,
      description: "Build exceptional web experiences using React and modern technologies. Collaborate with designers and backend engineers.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      companyLogo: "SX"
    }
  ];

  const currentJob = jobs[currentCard];

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % jobs.length);
  };

  const handleSave = () => {
    console.log("Saved job:", currentJob.title);
    handleNext();
  };

  const handleApply = () => {
    console.log("Applied to:", currentJob.title);
    handleNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Avatar className="h-12 w-12 ring-2 ring-white/20">
              <AvatarFallback className="bg-black text-white font-light">
                {currentJob.companyLogo}
              </AvatarFallback>
            </Avatar>
            <div className="flex space-x-2">
              <Badge 
                variant="outline" 
                className="border-black/20 text-black/80 font-light"
              >
                {currentJob.remote ? "Remote" : "On-site"}
              </Badge>
              <Badge 
                variant="outline" 
                className="border-black/20 text-black/80 font-light"
              >
                {currentJob.type}
              </Badge>
            </div>
          </div>
          
          {/* Job Info */}
          <div className="mb-6">
            <h3 className="text-xl font-light text-black mb-2 tracking-wide">
              {currentJob.title}
            </h3>
            <p className="text-black/80 font-light mb-1">{currentJob.company}</p>
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
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-light text-black/80">Match Score</span>
              <span className="text-xl font-light text-black">{currentJob.match}%</span>
            </div>
            <Progress value={currentJob.match} className="h-1" />
          </div>

          {/* Description */}
          <p className="text-sm text-black/70 font-light leading-relaxed mb-6">
            {currentJob.description}
          </p>

          {/* Skills */}
          <div className="mb-8">
            <p className="text-sm font-light text-black/80 mb-3">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {currentJob.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-black/20 text-black/80 font-light text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="flex items-center border-black/20 hover:bg-black hover:text-white transition-all duration-300"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-black/20 hover:bg-black hover:text-white transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              className="flex-1 bg-black text-white hover:bg-black/80 transition-all duration-300"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply
            </Button>
          </div>

          {/* Card Counter */}
          <div className="text-center pt-4">
            <p className="text-xs text-black/50 font-light">
              {currentCard + 1} of {jobs.length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCard;
