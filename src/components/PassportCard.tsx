
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, User, Award, Briefcase, GraduationCap, Folder, Globe, Star, TrendingUp } from "lucide-react";

interface PassportCardProps {
  isOwner?: boolean;
}

const PassportCard = ({ isOwner = false }: PassportCardProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    { id: "skills", label: "Skills", icon: Award, content: "React, TypeScript, Design Systems, User Research" },
    { id: "experience", label: "Experience", icon: Briefcase, content: "Senior UX Designer at TechCorp • 3 years" },
    { id: "education", label: "Education", icon: GraduationCap, content: "BS Computer Science, Stanford University" },
    { id: "portfolio", label: "Portfolio", icon: Folder, content: "dribbble.com/johndoe • github.com/johndoe" },
    { id: "languages", label: "Languages", icon: Globe, content: "English (Native), Spanish (Fluent)" },
    { id: "testimonials", label: "Testimonials", icon: Star, content: "Outstanding design thinking and execution - Sarah Chen, Product Director" }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-lg"></div>
        
        <CardContent className="p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Avatar className="h-20 w-20 mx-auto mb-6 ring-2 ring-white/30 bg-white/10 backdrop-blur-sm">
              <AvatarFallback className="bg-black/80 text-white text-xl font-light">
                JD
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-extralight text-black mb-2 tracking-wider font-mono">
              John Doe
            </h2>
            <p className="text-black/80 font-light mb-1 tracking-wide">Senior UX Designer</p>
            <p className="text-sm text-black/60 mb-4 tracking-wide">San Francisco, CA</p>
            
            <div className="flex justify-center space-x-2 mb-6">
              <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50/50 font-light">
                Available
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-600 bg-blue-50/50 font-light">
                Remote
              </Badge>
            </div>

            {!isOwner && (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6 border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-light text-black/80">Match Score</span>
                  </div>
                  <span className="text-2xl font-light text-black font-mono">94%</span>
                </div>
                <Progress value={94} className="h-2 bg-white/20" />
              </div>
            )}
          </div>

          {/* Expandable Sections */}
          <div className="space-y-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-4 text-left hover:bg-white/10 font-light"
                    onClick={() => toggleSection(section.id)}
                  >
                    <IconComponent className="h-4 w-4 mr-3 text-black/80" />
                    <span className="font-light text-black tracking-wide">{section.label}</span>
                  </Button>
                  {expandedSection === section.id && (
                    <div className="px-4 pb-4 text-sm text-black/70 font-light leading-relaxed tracking-wide">
                      {section.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-8">
            {!isOwner ? (
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-black/80 text-white hover:bg-black transition-all duration-300 backdrop-blur-sm"
                >
                  Connect
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full border-black/30 text-black hover:bg-black hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-sm font-light"
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PassportCard;
