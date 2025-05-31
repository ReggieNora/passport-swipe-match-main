
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, MapPin, DollarSign, Clock, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface JobCreationFormProps {
  onClose: () => void;
  onSubmit: (job: any) => void;
}

const JobCreationForm = ({ onClose, onSubmit }: JobCreationFormProps) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    requirements: "",
    remote: false,
    urgent: false
  });

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "glassmorphism-dark border-white/10";
      case 'job-based':
        return "glassmorphism border-white/20";
      default:
        return "glassmorphism border-white/20";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString(),
      matchScore: Math.floor(Math.random() * 30) + 70,
      requirements: formData.requirements.split(',').map(req => req.trim())
    };
    onSubmit(jobData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${getCardStyles()} border-0 shadow-2xl`}>
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <CardTitle className="text-2xl font-bold">Create New Job</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium`}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium`}
                  placeholder="Company Name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center">
                  <MapPin className="h-4 w-4 mr-1" strokeWidth={3} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium`}
                  placeholder="e.g. San Francisco, CA"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" strokeWidth={3} />
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium`}
                  placeholder="e.g. $80k - $120k"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center">
                <Clock className="h-4 w-4 mr-1" strokeWidth={3} />
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium`}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium resize-none`}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Requirements (comma-separated)</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-white/50 border-white/30'} backdrop-blur-sm font-medium resize-none`}
                placeholder="e.g. React, TypeScript, 3+ years experience, Team leadership"
                required
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remote"
                  checked={formData.remote}
                  onChange={handleChange}
                  className="rounded"
                />
                <span className="text-sm font-bold">Remote Work Available</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  className="rounded"
                />
                <span className="text-sm font-bold">Urgent Hiring</span>
              </label>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold"
              >
                <Users className="h-4 w-4 mr-2" strokeWidth={3} />
                Create Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCreationForm;
