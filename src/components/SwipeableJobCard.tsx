import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Clock, DollarSign, Building, Eye, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { Job, getJobs } from "@/services/mockJobs";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

interface SwipeableJobCardProps {
  onSave?: (job: Job) => void;
  onReject?: (job: Job) => void;
  onViewDetails?: (job: Job) => void;
}

const SwipeableJobCard = ({ onSave, onReject, onViewDetails }: SwipeableJobCardProps) => {
  const [jobs] = useState<Job[]>(getJobs());
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const currentJob = jobs[currentJobIndex];

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "glass-card-dark text-white";
      case 'job-based':
        return "glass-card text-slate-900";
      default:
        return "glass-card text-slate-900";
    }
  };

  const nextJob = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentJobIndex((prev) => (prev + 1) % jobs.length);
      setIsAnimating(false);
    }, 300);
  };

  const previousJob = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentJobIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleSave = () => {
    if (currentJob) {
      setSavedJobs(prev => [...prev, currentJob.id]);
      onSave?.(currentJob);
      nextJob();
    }
  };

  const handleReject = () => {
    if (currentJob) {
      onReject?.(currentJob);
      nextJob();
    }
  };

  const handleViewDetails = () => {
    if (currentJob) {
      navigate(`/job-details?id=${currentJob.id}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isAnimating) return;
      
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          nextJob();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousJob();
          break;
        case ' ':
          event.preventDefault();
          handleSave();
          break;
        case 'x':
        case 'X':
          event.preventDefault();
          handleReject();
          break;
        case 'Enter':
          event.preventDefault();
          handleViewDetails();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentJob, isAnimating]);

  if (!currentJob) {
    return (
      <Card className={`max-w-md mx-auto shadow-xl ${getCardStyles()}`}>
        <CardContent className="p-8 text-center">
          <p className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            No more jobs available. Check back soon for new opportunities!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Job Card */}
      <Card className={`shadow-2xl hover:shadow-3xl transition-all duration-700 border-0 ${getCardStyles()} ${
        isAnimating ? 'animate-scale-in' : ''
      }`}>
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 tracking-wide">{currentJob.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="h-5 w-5 text-blue-600 icon-modern" />
                  <span className="font-medium">{currentJob.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-500 icon-modern" />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {currentJob.location}
                  </span>
                  {currentJob.remote && (
                    <Badge variant="secondary" className="text-xs font-medium">Remote</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {currentJob.matchScore}%
                </div>
                <div className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Match
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={currentJob.type === 'Freelance' ? 'default' : 'secondary'} className="font-medium">
                {currentJob.type}
              </Badge>
              {currentJob.urgent && (
                <Badge variant="destructive" className="text-xs animate-pulse font-medium">Urgent</Badge>
              )}
              <Badge variant="outline" className="text-xs font-medium">
                <DollarSign className="h-3 w-3 mr-1 icon-modern" />
                {currentJob.salary}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className={`text-sm font-medium leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {currentJob.description}
            </p>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Requirements</h4>
              <div className="flex flex-wrap gap-1">
                {currentJob.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-medium">
                    {req}
                  </Badge>
                ))}
                {currentJob.requirements.length > 3 && (
                  <Badge variant="outline" className="text-xs font-medium">
                    +{currentJob.requirements.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Posted Date */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4 font-medium">
              <Clock className="h-3 w-3 icon-modern" />
              <span>Posted {new Date(currentJob.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-3 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                disabled={isAnimating}
              >
                <X className="h-4 w-4 icon-modern" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewDetails}
                className="transition-all duration-300 font-medium"
                disabled={isAnimating}
              >
                <Eye className="h-4 w-4 mr-1 icon-modern" />
                Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className={`transition-all duration-300 font-medium ${
                  savedJobs.includes(currentJob.id) 
                    ? 'border-green-200 text-green-600 bg-green-50' 
                    : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                }`}
                disabled={isAnimating}
              >
                <Heart className={`h-4 w-4 icon-modern ${savedJobs.includes(currentJob.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="sm"
                className={`w-full transition-all duration-300 font-medium ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                disabled={isAnimating}
              >
                Apply Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/messaging')}
                className="w-full transition-all duration-300 font-medium"
                disabled={isAnimating}
              >
                <MessageSquare className="h-4 w-4 mr-1 icon-modern" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousJob}
          className="p-2 transition-all duration-300 hover:bg-white/10"
          disabled={isAnimating}
        >
          <ArrowLeft className="h-5 w-5 icon-modern" />
        </Button>
        
        <div className="text-center">
          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {currentJobIndex + 1} of {jobs.length}
          </div>
          <div className="flex space-x-1 mt-1">
            {jobs.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentJobIndex % 5 
                    ? 'bg-blue-600 w-3' 
                    : theme === 'dark' ? 'bg-white/30' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextJob}
          className="p-2 transition-all duration-300 hover:bg-white/10"
          disabled={isAnimating}
        >
          <ArrowRight className="h-5 w-5 icon-modern" />
        </Button>
      </div>

      {/* Keyboard Hints */}
      <div className={`text-center text-xs font-medium space-y-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        <div>← → keys to navigate • Space to save • X to reject</div>
        <div>Enter for details • Message for contact</div>
      </div>
    </div>
  );
};

export default SwipeableJobCard;
