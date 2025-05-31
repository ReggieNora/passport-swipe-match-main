
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, DollarSign, Clock, Building, Heart, MessageSquare, Share } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getJobById, Job } from "@/services/mockJobs";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const jobId = searchParams.get('id');
    if (jobId) {
      const foundJob = getJobById(jobId);
      setJob(foundJob || null);
    }
  }, [searchParams]);

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-gray-900 text-white";
      case 'job-based':
        return "bg-gradient-to-br from-purple-900/20 to-blue-900/20";
      default:
        return "bg-white";
    }
  };

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "glassmorphism-dark text-white";
      case 'job-based':
        return "glassmorphism text-gray-900";
      default:
        return "glassmorphism text-gray-900";
    }
  };

  if (!job) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${getThemeStyles()}`}>
        <p>Job not found</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative transition-all duration-300 ${getThemeStyles()}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`absolute w-full border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200/20'} animate-pulse`}
            style={{
              top: `${(i * 15) + 10}%`,
              opacity: Math.max(0.02, 0.1 - (i * 0.015)),
              animationDelay: `${i * 0.8}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className={`relative z-10 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-xl border-b border-white/20`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/job-seeker")}
            className="p-2 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Jobs
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Share className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSaved(!isSaved)}
              className="p-2"
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Job Header */}
        <Card className={`mb-8 border-0 shadow-2xl ${getCardStyles()}`}>
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-2 ring-white/20">
                  <AvatarFallback className="bg-blue-500 text-white text-lg font-light">
                    {job.company.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-light mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="font-light text-lg">{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extralight text-blue-600 mb-1">
                  {job.matchScore}%
                </div>
                <div className={`text-sm font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Match Score
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant={job.type === 'Freelance' ? 'default' : 'secondary'}>
                {job.type}
              </Badge>
              {job.remote && (
                <Badge variant="secondary">Remote</Badge>
              )}
              {job.urgent && (
                <Badge variant="destructive">Urgent</Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                size="lg"
                className={`w-full ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                Apply Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/messaging')}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Recruiter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Description */}
          <div className="lg:col-span-2 space-y-6">
            <Card className={`border-0 shadow-xl ${getCardStyles()}`}>
              <CardHeader>
                <CardTitle className="text-xl font-light">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-light leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {job.description}
                </p>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-xl ${getCardStyles()}`}>
              <CardHeader>
                <CardTitle className="text-xl font-light">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className={`font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      • {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-xl ${getCardStyles()}`}>
              <CardHeader>
                <CardTitle className="text-xl font-light">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className={`font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className={`border-0 shadow-xl ${getCardStyles()}`}>
              <CardHeader>
                <CardTitle className="text-xl font-light">Company Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">About {job.company}</h4>
                  <p className={`text-sm font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    A leading company in the tech industry, focused on innovation and growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Company Size</h4>
                  <p className={`text-sm font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    500-1000 employees
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Industry</h4>
                  <p className={`text-sm font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Technology
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-xl ${getCardStyles()}`}>
              <CardHeader>
                <CardTitle className="text-xl font-light">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Frontend Developer', 'React Developer', 'JavaScript Engineer'].map((title, index) => (
                  <div key={index} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} cursor-pointer hover:bg-white/10 transition-colors`}>
                    <h5 className="font-medium text-sm">{title}</h5>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Similar Company
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
