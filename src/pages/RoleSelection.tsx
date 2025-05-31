
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Building, ArrowRight, ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const RoleSelection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-gray-900 text-white";
      case 'job-based':
        return "bg-gray-50 text-gray-900";
      default:
        return "bg-white text-gray-900";
    }
  };

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-gray-800 text-white hover:bg-gray-700 border-gray-700";
      case 'job-based':
        return "bg-white text-gray-900 hover:bg-orange-50 border-gray-200";
      default:
        return "bg-white text-gray-900 hover:bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${getThemeStyles()}`}>
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Hirly
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Choose Your Path
          </h2>
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Select how you want to engage with our platform and unlock your potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              id: "job-seeker",
              title: "Job Seeker",
              description: "Discover your next career opportunity with smart matching and verified companies",
              icon: User,
              path: "/job-seeker",
              accent: theme === 'job-based' ? "orange" : "blue"
            },
            {
              id: "recruiter",
              title: "Recruiter",
              description: "Find exceptional talent efficiently with our advanced candidate discovery tools",
              icon: Building,
              path: "/recruiter",
              accent: theme === 'job-based' ? "red" : "purple"
            }
          ].map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id}
                className={`group cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl border ${getCardStyles()}`}
                onClick={() => navigate(role.path)}
              >
                <CardContent className="p-12 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-20 w-20 mx-auto ${
                        role.accent === 'orange' ? 'text-orange-500 group-hover:text-orange-600' :
                        role.accent === 'red' ? 'text-red-500 group-hover:text-red-600' :
                        role.accent === 'purple' ? 'text-purple-500 group-hover:text-purple-600' :
                        'text-blue-500 group-hover:text-blue-600'
                      } transition-colors duration-300`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-6 tracking-wide">
                      {role.title}
                    </h3>
                    
                    <p className={`mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {role.description}
                    </p>
                    
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Button 
                        variant="outline"
                        className={`border-2 font-medium px-8 py-3 ${
                          role.accent === 'orange' ? 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white' :
                          role.accent === 'red' ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' :
                          role.accent === 'purple' ? 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white' :
                          'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                        } transition-all duration-300`}
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
