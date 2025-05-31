
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, BarChart3, MessageSquare, Users, Settings, Moon, Sun, Palette } from "lucide-react";
import JobCreationForm from "@/components/JobCreationForm";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import MessagingInterface from "@/components/MessagingInterface";
import { useTheme } from "@/contexts/ThemeContext";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      description: "We're looking for an experienced frontend developer...",
      requirements: ["React", "TypeScript", "5+ years experience"],
      postedDate: new Date().toISOString(),
      remote: true,
      urgent: false,
      applicants: 12,
      views: 156
    }
  ]);
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

  const handleJobSubmit = (jobData: any) => {
    setJobs(prev => [jobData, ...prev]);
    setShowJobForm(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case "analytics":
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Analytics Dashboard
              </h2>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Track your recruitment performance and insights
              </p>
            </div>
            <AnalyticsDashboard />
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
                Connect with candidates and team members
              </p>
            </div>
            <MessagingInterface />
          </div>
        );

      default:
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-3xl font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Job Postings
                </h2>
                <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Manage your active job listings
                </p>
              </div>
              <Button
                onClick={() => setShowJobForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl"
              >
                <Plus className="h-5 w-5 mr-2 icon-modern" />
                Post New Job
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className={`p-6 rounded-2xl shadow-xl ${getCardStyles()} border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                        {job.company} • {job.location}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-medium">{job.salary}</span>
                        <span className="font-medium">{job.type}</span>
                        {job.remote && <span className="text-green-600 font-medium">Remote</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{job.applicants}</div>
                      <div className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Applicants</div>
                      <div className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                        {job.views} views
                      </div>
                    </div>
                  </div>

                  <p className={`mb-4 font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {job.description}
                  </p>

                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                      View Applications
                    </Button>
                    <Button size="sm" variant="outline" className="font-bold rounded-xl">
                      Edit Job
                    </Button>
                    <Button size="sm" variant="outline" className="font-bold rounded-xl">
                      Analytics
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${getThemeStyles()}`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className={`absolute border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200/30'} animate-pulse`}
            style={{
              top: `${(i * 12) + 10}%`,
              width: '100%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '6s'
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`vertical-${i}`}
            className={`absolute border-l ${theme === 'dark' ? 'border-white/5' : 'border-slate-200/30'} animate-pulse`}
            style={{
              left: `${(i * 16) + 8}%`,
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
              HIRLY RECRUITER
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
            <Avatar className="h-8 w-8 ring-2 ring-white/30">
              <AvatarFallback className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} text-sm font-bold`}>
                R
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 pb-32">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`flex space-x-1 ${getCardStyles()} rounded-2xl p-2 shadow-2xl border-0`}>
          <Button
            variant={activeView === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("dashboard")}
            className={`rounded-xl px-4 font-bold text-sm ${
              activeView === "dashboard" 
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-white/10"
            }`}
          >
            <Users className="h-4 w-4 mr-1 icon-modern" />
            Jobs
          </Button>
          <Button
            variant={activeView === "analytics" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("analytics")}
            className={`rounded-xl px-4 font-bold text-sm ${
              activeView === "analytics"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-white/10"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-1 icon-modern" />
            Analytics
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
            <MessageSquare className="h-4 w-4 mr-1 icon-modern" />
            Messages
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl px-4 font-bold text-sm hover:bg-white/10"
          >
            <Settings className="h-4 w-4 icon-modern" />
          </Button>
        </div>
      </div>

      {/* Job Creation Modal */}
      {showJobForm && (
        <JobCreationForm
          onClose={() => setShowJobForm(false)}
          onSubmit={handleJobSubmit}
        />
      )}
    </div>
  );
};

export default RecruiterDashboard;
