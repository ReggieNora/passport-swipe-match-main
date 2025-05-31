
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Rocket, GraduationCap, Moon, Sun, Palette } from "lucide-react";
import PassportCard from "@/components/PassportCard";
import EnhancedSwipeableJobCard from "@/components/EnhancedSwipeableJobCard";
import StartupSection from "@/components/StartupSection";
import { useTheme } from "@/contexts/ThemeContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("internships");
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'job-based':
        return <Palette className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-gray-900 text-white";
      case 'job-based':
        return "bg-gradient-to-br from-green-900/20 to-blue-900/20";
      default:
        return "bg-gradient-to-br from-blue-50/30 to-white";
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${getThemeStyles()}`}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute border-l ${theme === 'dark' ? 'border-white/10' : 'border-blue-100/50'}`}
            style={{
              left: `${(i * 8) + 4}%`,
              height: `${100 - (i * 3)}%`,
              top: 0,
              opacity: Math.max(0.05, 0.3 - (i * 0.02))
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className={`relative z-10 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-xl border-b border-white/20`}>
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className={`font-extralight text-xl tracking-[0.2em] font-mono ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            STUDENT
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-white/10"
            >
              {getThemeIcon()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView(activeView === "profile" ? "internships" : "profile")}
              className="p-2 hover:bg-white/10"
            >
              <Avatar className="h-8 w-8 ring-1 ring-white/30">
                <AvatarFallback className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} text-sm font-light`}>
                  ST
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        {activeView === "profile" ? (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-extralight mb-4 tracking-wider font-mono ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Academic Profile
              </h2>
              <p className={`font-light tracking-wide ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                Your verified academic identity
              </p>
            </div>
            <PassportCard isOwner={true} />
          </div>
        ) : activeView === "startups" ? (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-extralight mb-4 tracking-wider font-mono ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Startup Internships
              </h2>
              <p className={`font-light tracking-wide ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                Get hands-on experience at innovative startups
              </p>
            </div>
            <StartupSection />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-extralight mb-4 tracking-wider font-mono ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Find Opportunities
              </h2>
              <p className={`font-light tracking-wide ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                Internships & entry-level positions
              </p>
            </div>
            <EnhancedSwipeableJobCard />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`flex space-x-2 ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/10'} backdrop-blur-xl border border-white/20 rounded-full p-2`}>
          <Button
            variant={activeView === "internships" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("internships")}
            className={`rounded-full px-4 ${
              activeView === "internships" 
                ? theme === 'dark' ? "bg-white text-black" : "bg-black text-white"
                : theme === 'dark' ? "text-white/60 hover:bg-white/10" : "text-black/60 hover:bg-white/10"
            }`}
          >
            <GraduationCap className="h-4 w-4 mr-1" />
            Study
          </Button>
          <Button
            variant={activeView === "startups" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("startups")}
            className={`rounded-full px-4 ${
              activeView === "startups"
                ? theme === 'dark' ? "bg-white text-black" : "bg-black text-white"
                : theme === 'dark' ? "text-white/60 hover:bg-white/10" : "text-black/60 hover:bg-white/10"
            }`}
          >
            <Rocket className="h-4 w-4 mr-1" />
            Startups
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full px-4 ${theme === 'dark' ? 'text-white/60 hover:bg-white/10' : 'text-black/60 hover:bg-white/10'}`}
            onClick={() => alert("Opening chat...")}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
