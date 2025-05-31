
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Shield, Zap, Globe, BarChart3, Users, MessageSquare, Heart, TrendingUp, CheckCircle, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const FeaturesPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

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
        return "bg-gradient-to-br from-purple-900/20 to-blue-900/20 text-gray-900";
      default:
        return "bg-white text-gray-900";
    }
  };

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10";
      case 'job-based':
        return "bg-white/10 backdrop-blur-xl border-purple-200/20 text-gray-900 hover:bg-white/20";
      default:
        return "bg-white/90 backdrop-blur-xl border-gray-200/50 text-gray-900 hover:bg-white";
    }
  };

  const mainFeatures = [
    {
      icon: Target,
      title: "Smart Matching Algorithm",
      description: "Our advanced AI analyzes your skills, experience, and preferences to connect you with the most relevant opportunities.",
      benefits: ["95% match accuracy", "Personalized recommendations", "Real-time updates"]
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All profiles undergo thorough verification to ensure authenticity and build trust in our community.",
      benefits: ["Identity verification", "Skill validation", "Company authentication"]
    },
    {
      icon: Zap,
      title: "Instant Connections",
      description: "Connect with opportunities instantly through our intuitive swipe-based interface.",
      benefits: ["One-tap applications", "Real-time messaging", "Quick responses"]
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access career opportunities worldwide with comprehensive remote work options.",
      benefits: ["International companies", "Remote-first roles", "Global networking"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track your career progress with detailed insights and performance metrics.",
      benefits: ["Application tracking", "Success metrics", "Market insights"]
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Build meaningful connections within our thriving professional community.",
      benefits: ["Industry connections", "Peer networking", "Mentorship opportunities"]
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "Integrated Messaging",
      description: "Seamless communication tools for recruiters and candidates"
    },
    {
      icon: Heart,
      title: "Save & Favorite",
      description: "Save interesting opportunities and revisit them later"
    },
    {
      icon: TrendingUp,
      title: "Career Insights",
      description: "Get market trends and salary insights for your field"
    },
    {
      icon: CheckCircle,
      title: "Application Tracking",
      description: "Monitor your application status in real-time"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${getThemeStyles()}`}>
      {/* Header */}
      <header className={`backdrop-blur-xl border-b ${theme === 'dark' ? 'bg-gray-900/80 border-white/10' : theme === 'job-based' ? 'bg-white/10 border-purple-200/20' : 'bg-white/90 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-extralight tracking-[0.3em] font-mono">
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
                className="p-2"
              >
                {getThemeIcon()}
              </Button>
              <Button 
                className={`font-light ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                onClick={() => navigate("/job-seeker")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extralight mb-6 font-mono">
            Powerful Features
          </h1>
          <p className={`text-xl font-light leading-relaxed mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover all the tools and capabilities that make Hirly the premier platform 
            for career advancement and professional networking.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className={`border-0 hover:shadow-xl transition-all duration-300 ${getCardStyles()}`}>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-12 w-12 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-light mb-3">{feature.title}</h3>
                      <p className={`font-light leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className={`text-sm font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-black/20' : theme === 'job-based' ? 'bg-purple-50/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight mb-6 font-mono">
              Additional Capabilities
            </h2>
            <p className={`text-lg font-light max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              More tools to enhance your career journey and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className={`border-0 text-center hover:shadow-lg transition-all duration-300 ${getCardStyles()}`}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <feature.icon className="h-10 w-10 text-blue-600 mx-auto" />
                  </div>
                  <h3 className="text-lg font-light mb-3">{feature.title}</h3>
                  <p className={`text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight mb-6 font-mono">
              How It Works
            </h2>
            <p className={`text-lg font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Build a comprehensive profile with your skills, experience, and career preferences."
              },
              {
                step: "02", 
                title: "Discover Matches",
                description: "Our AI algorithm presents you with the most relevant opportunities based on your profile."
              },
              {
                step: "03",
                title: "Connect & Apply",
                description: "Swipe, save, and apply to opportunities that interest you. Start conversations with recruiters."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-light mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-light mb-4">{step.title}</h3>
                <p className={`font-light leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 font-mono">
            Ready to experience these features?
          </h2>
          <p className="text-xl text-white/90 font-light mb-8 leading-relaxed">
            Join thousands of professionals who are already using Hirly to advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-light px-8 py-4 text-lg"
              onClick={() => navigate("/job-seeker")}
            >
              Start for Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-light px-8 py-4 text-lg"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
