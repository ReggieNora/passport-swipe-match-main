
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Users, Globe, BarChart3, Shield, Zap, Target, Star, ArrowRight, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const exampleImages = [
    {
      url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Professional networking",
    },
    {
      url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Career growth",
    },
    {
      url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Team collaboration",
    },
    {
      url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Success achievement",
    },
    {
      url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Professional headshot",
    },
  ];

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
        return "bg-gray-50 text-gray-900";
      default:
        return "bg-white text-gray-900";
    }
  };

  const getCardStyles = () => {
    switch (theme) {
      case 'dark':
        return "modern-card-dark text-white hover:bg-gray-800/50";
      case 'job-based':
        return "modern-card text-gray-900 hover:bg-orange-50/50";
      default:
        return "modern-card text-gray-900 hover:bg-gray-50/50";
    }
  };

  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description: "Advanced algorithms connect you with perfect opportunities based on your skills, experience, and career goals."
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All profiles undergo thorough verification to ensure authenticity and build trust in our community."
    },
    {
      icon: Zap,
      title: "Instant Connections",
      description: "Connect instantly with potential matches through our streamlined communication platform."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access opportunities worldwide with remote work options and international companies."
    },
    {
      icon: BarChart3,
      title: "Career Analytics",
      description: "Track your progress with detailed insights and performance metrics to accelerate growth."
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Build meaningful connections within our thriving community of verified professionals."
    }
  ];

  const testimonials = [
    {
      quote: "Hirly transformed my career search completely. Found my ideal position in just 2 weeks with their smart matching system.",
      author: "Sarah Johnson",
      role: "Software Engineer at TechCorp",
      rating: 5
    },
    {
      quote: "The platform's matching accuracy is incredible. Every opportunity perfectly aligned with my skills and career aspirations.",
      author: "Michael Chen",
      role: "Product Manager at StartupXYZ",
      rating: 5
    },
    {
      quote: "As a recruiter, Hirly has revolutionized how we discover and connect with top talent. Game-changing platform.",
      author: "Emily Rodriguez",
      role: "HR Director at Innovation Labs",
      rating: 5
    },
    {
      quote: "Professional, efficient, and results-driven. Hirly consistently delivers on its promises.",
      author: "David Kim",
      role: "Data Scientist at AI Corp",
      rating: 5
    }
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${getThemeStyles()}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : theme === 'job-based' ? 'bg-white/90 border-orange-200/20' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold tracking-tight">
                Hirly
              </h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className={`font-medium hover:text-primary transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Features</a>
                <a href="#testimonials" className={`font-medium hover:text-primary transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Success Stories</a>
                <button 
                  onClick={() => navigate("/about")}
                  className={`font-medium hover:text-primary transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  About
                </button>
                <button 
                  onClick={() => navigate("/pricing")}
                  className={`font-medium hover:text-primary transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  Pricing
                </button>
              </nav>
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
                variant="ghost" 
                className="font-medium"
                onClick={() => navigate("/select-role")}
              >
                Log In
              </Button>
              <Button 
                className={`font-medium px-6 ${theme === 'job-based' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                onClick={() => navigate("/select-role")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section with Parallax */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        <Floating sensitivity={-0.5} className="h-full">
          <FloatingElement
            depth={0.5}
            className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
          >
            <motion.img
              src={exampleImages[0].url}
              alt={exampleImages[0].alt}
              className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={1}
            className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
          >
            <motion.img
              src={exampleImages[1].url}
              alt={exampleImages[1].alt}
              className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={4}
            className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
          >
            <motion.img
              src={exampleImages[2].url}
              alt={exampleImages[2].alt}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={2}
            className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
          >
            <motion.img
              src={exampleImages[3].url}
              alt={exampleImages[3].alt}
              className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={1}
            className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
          >
            <motion.img
              src={exampleImages[4].url}
              alt={exampleImages[4].alt}
              className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            />
          </FloatingElement>
        </Floating>

        <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-bold tracking-tight space-y-1 md:space-y-4"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          >
            <span>Connect with your </span>
            <LayoutGroup>
              <motion.span layout className="flex whitespace-pre">
                <motion.span
                  layout
                  className="flex whitespace-pre"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                >
                  dream{" "}
                </motion.span>
                <TextRotate
                  texts={[
                    "career",
                    "opportunity",
                    "future",
                    "success",
                    "journey",
                    "destiny",
                    "passion",
                    "calling",
                    "purpose",
                    "breakthrough",
                  ]}
                  mainClassName={`overflow-hidden pr-3 ${theme === 'job-based' ? 'text-orange-500' : 'text-primary'} py-0 pb-2 md:pb-4 rounded-xl`}
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </motion.span>
            </LayoutGroup>
          </motion.h1>
          
          <motion.p
            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-medium pt-4 sm:pt-8 md:pt-10 lg:pt-12"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
          >
            Hirly is the intelligent platform that connects talented professionals with their perfect opportunities. 
            Experience seamless job matching powered by advanced algorithms.
          </motion.p>

          <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.7,
              }}
            >
              <Button
                size="lg"
                className={`font-medium px-8 py-4 text-lg ${theme === 'job-based' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-primary hover:bg-primary/90 text-primary-foreground'} transform hover:scale-105 transition-all duration-200`}
                onClick={() => navigate("/select-role")}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${theme === 'dark' ? 'bg-gray-800/50' : theme === 'job-based' ? 'bg-orange-50/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-sm font-semibold mb-4 block ${theme === 'job-based' ? 'text-orange-600' : 'text-primary'}`}>FEATURES</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need for career success
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Powerful tools designed to accelerate your professional growth and connect you with the right opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`border-0 transition-all duration-300 hover:-translate-y-2 ${getCardStyles()}`}>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <feature.icon className={`h-12 w-12 ${theme === 'job-based' ? 'text-orange-500' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Real experiences from our community
            </p>
          </div>

          <div className="relative">
            <Card className={`max-w-4xl mx-auto border-0 transition-all duration-700 ${getCardStyles()}`}>
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className={`text-2xl font-medium leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-lg mb-1">{testimonials[currentTestimonial].author}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{testimonials[currentTestimonial].role}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevTestimonial}
                className="rounded-full w-10 h-10 p-0"
              >
                ←
              </Button>
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? theme === 'job-based' ? 'bg-orange-500 w-8' : 'bg-primary w-8'
                        : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextTestimonial}
                className="rounded-full w-10 h-10 p-0"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Removed gradient colors */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : theme === 'job-based' ? 'bg-orange-100' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your career?
          </h2>
          <p className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Join thousands of professionals who have found their perfect match through Hirly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className={`font-medium px-8 py-4 text-lg ${theme === 'job-based' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
              onClick={() => navigate("/select-role")}
            >
              Start for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${theme === 'dark' ? 'bg-gray-900 text-white border-t border-gray-800' : 'bg-gray-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Hirly</h3>
              <p className="text-gray-400 leading-relaxed">
                Your essential platform for career advancement and professional connections.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/select-role")} className="hover:text-white transition-colors">Job Seekers</button></li>
                <li><button onClick={() => navigate("/select-role")} className="hover:text-white transition-colors">Recruiters</button></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Tips</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/about")} className="hover:text-white transition-colors">About Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hirly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
