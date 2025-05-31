
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Rocket, Moon, Sun, Palette } from "lucide-react";
import PassportCard from "@/components/PassportCard";
import SwipeableJobCard from "@/components/SwipeableJobCard";
import StartupSection from "@/components/StartupSection";
import MessagingInterface from "@/components/MessagingInterface";
import { useTheme } from "@/contexts/ThemeContext";
import { Job } from "@/services/mockJobs";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("jobs");
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-5 w-5 icon-modern" />;
      case 'job-based':
        return <Palette className="h-5 w-5 icon-modern" />;
      default:
        return <Sun className="h-5 w-5 icon-modern" />;
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-slate-900 text-white";
      case 'job-based':
        return "bg-gradient-to-br from-purple-50 to-blue-50 text-slate-900";
      default:
        return "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900";
    }
  };

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "glass-card-dark border-white/10";
      case 'job-based':
        return "glass-card border-white/20";
      default:
        return "glass-card border-white/20";
    }
  };

  const handleSaveJob = (job: Job) => {
    setSavedJobs(prev => {
      const isAlreadySaved = prev.some(savedJob => savedJob.id === job.id);
      if (isAlreadySaved) {
        return prev.filter(savedJob => savedJob.id !== job.id);
      }
      return [...prev, job];
    });
    console.log("Saved job:", job.title);
  };

  const handleRejectJob = (job: Job) => {
    console.log("Rejected job:", job.title);
  };

  const handleViewDetails = (job: Job) => {
    navigate(`/job-details?id=${job.id}`);
  };

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Your Profile
              </h2>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Your verified professional identity
              </p>
            </div>
            <PassportCard isOwner={true} />
          </div>
        );

      case "startups":
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Startup Opportunities
              </h2>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Join innovative startups and shape the future
              </p>
            </div>
            <StartupSection />
          </div>
        );

      case "messaging":
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Messages
              </h2>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Connect with recruiters and opportunities
              </p>
            </div>
            <MessagingInterface />
          </div>
        );

      case "saved":
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Saved Jobs
              </h2>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {savedJobs.length} jobs saved for later
              </p>
            </div>
            {savedJobs.length > 0 ? (
              <div className="space-y-6 max-w-2xl mx-auto">
                {savedJobs.map((job) => (
                  <div key={job.id} className={`p-6 rounded-2xl shadow-xl ${getCardStyles()} border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                          {job.company} • {job.location}
                        </p>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="font-medium">{job.salary}</span>
                          <span className="font-medium">{job.type}</span>
                          {job.remote && <span className="text-green-600 font-medium">Remote</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{job.matchScore}%</div>
                        <div className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Match</div>
                      </div>
                    </div>
                    
                    <p className={`mb-4 font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      {job.description}
                    </p>

                    <div className="flex space-x-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                        Apply Now
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="font-bold rounded-xl"
                        onClick={() => handleViewDetails(job)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="font-bold rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => setSavedJobs(prev => prev.filter(savedJob => savedJob.id !== job.id))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-blue-600 icon-modern" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
                <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Start swiping to save interesting opportunities!
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Discover Jobs
              </h2>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Swipe to find your perfect match
              </p>
            </div>
            <SwipeableJobCard 
              onSave={handleSaveJob}
              onReject={handleRejectJob}
              onViewDetails={handleViewDetails}
            />
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${getThemeStyles()}`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className={`absolute border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200/30'} animate-pulse`}
            style={{
              top: `${(i * 10) + 5}%`,
              width: '100%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '6s'
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`vertical-${i}`}
            className={`absolute border-l ${theme === 'dark' ? 'border-white/5' : 'border-slate-200/30'} animate-pulse`}
            style={{
              left: `${(i * 12) + 6}%`,
              height: '100%',
              animationDelay: `${i * 0.3}s`,
              animationDuration: '7s'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-6 w-6 icon-modern" />
            </Button>
            <h1 className="font-bold text-xl tracking-tight">
              HIRLY
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const themes: Array<'light' | 'dark' | 'job-based'> = ['light', 'dark', 'job-based'];
                const currentIndex = themes.indexOf(theme);
                const nextIndex = (currentIndex + 1) % themes.length;
                setTheme(themes[nextIndex]);
              }}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              {getThemeIcon()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView(activeView === "profile" ? "jobs" : "profile")}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <Avatar className="h-8 w-8 ring-2 ring-white/30">
                <AvatarFallback className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} text-sm font-bold`}>
                  JS
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>

      {/* Content with improved spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 pb-40">
        {renderContent()}
      </div>

      {/* Bottom Navigation with more spacing */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`flex space-x-1 ${getCardStyles()} rounded-2xl p-2 shadow-2xl border-0`}>
          <Button
            variant={activeView === "jobs" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("jobs")}
            className={`rounded-xl px-4 font-bold text-sm ${
              activeView === "jobs" 
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-white/10"
            }`}
          >
            Jobs
          </Button>
          <Button
            variant={activeView === "saved" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("saved")}
            className={`rounded-xl px-4 font-bold text-sm ${
              activeView === "saved"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-white/10"
            }`}
          >
            Saved ({savedJobs.length})
          </Button>
          <Button
            variant={activeView === "startups" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("startups")}
            className={`rounded-xl px-4 font-bold text-sm ${
              activeView === "startups"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-white/10"
            }`}
          >
            <Rocket className="h-4 w-4 mr-1 icon-modern" />
            Startups
          </Button>
          <Button
            variant={activeView === "messaging" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("messaging")}
            className={`rounded-xl px-4 font-bold text-sm ${
              activeView === "messaging"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-white/10"
            }`}
          >
            <MessageSquare className="h-4 w-4 icon-modern" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
