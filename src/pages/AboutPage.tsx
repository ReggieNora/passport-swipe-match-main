
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Users, Globe, Award, Heart, Lightbulb, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AboutPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-5 w-5" strokeWidth={3} />;
      case 'job-based':
        return <Palette className="h-5 w-5" strokeWidth={3} />;
      default:
        return <Sun className="h-5 w-5" strokeWidth={3} />;
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
        return "glassmorphism-dark border-white/10";
      case 'job-based':
        return "glassmorphism border-white/20";
      default:
        return "glassmorphism border-white/20";
    }
  };

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in career matching technology."
    },
    {
      icon: Users,
      title: "Community", 
      description: "Building a supportive ecosystem where professionals and companies thrive together."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making career opportunities accessible to everyone, everywhere in the world."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering exceptional experiences and results for all our users."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Driven by our passion to transform how people find and build their careers."
    },
    {
      icon: Lightbulb,
      title: "Intelligence", 
      description: "Using smart algorithms and data science to create meaningful connections."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      background: "Former VP of Engineering at TechCorp"
    },
    {
      name: "Michael Rodriguez", 
      role: "Co-Founder & CTO",
      background: "AI Research Lead at Innovation Labs"
    },
    {
      name: "Emma Thompson",
      role: "Head of Product",
      background: "Former Product Manager at StartupXYZ"
    },
    {
      name: "David Kim",
      role: "Head of Data Science", 
      background: "ML Engineer at DataCorp"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${getThemeStyles()}`}>
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
              animationDuration: '4s'
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
              animationDuration: '5s'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="h-6 w-6" strokeWidth={3} />
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">
                Hirly
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl"
                onClick={() => navigate("/select-role")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hirly
            </span>
          </h1>
          <p className={`text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            We're revolutionizing how people connect with their perfect career opportunities 
            through intelligent matching and meaningful professional relationships.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold leading-tight">
                Our Mission
              </h2>
              <p className={`text-lg leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                At Hirly, we believe that everyone deserves to find work they love. Our platform 
                uses intelligent matching technology to create meaningful connections between talented 
                professionals and innovative companies.
              </p>
              <p className={`text-lg leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                We're not just another job board – we're a comprehensive career ecosystem that 
                supports job seekers and recruiters in achieving their goals.
              </p>
            </div>
            <Card className={`${getCardStyles()} shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 border-0`}>
              <CardContent className="p-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold">2024</div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Founded</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold">50K+</div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Users</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold">5K+</div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Companies</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold">95%</div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Our Values
            </h2>
            <p className={`text-xl max-w-3xl mx-auto font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              The principles that guide everything we do and drive us to create 
              exceptional experiences for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className={`${getCardStyles()} shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-0 group`}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className="mb-6">
                    <value.icon className="h-14 w-14 text-blue-600 mx-auto group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className={`leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Meet Our Team
            </h2>
            <p className={`text-xl font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              The passionate individuals behind Hirly's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className={`${getCardStyles()} shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-0 group`}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-blue-600 font-semibold">{member.role}</p>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {member.background}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-8 text-white leading-tight">
            Join Our Journey
          </h2>
          <p className="text-xl mb-12 leading-relaxed text-blue-100 font-medium max-w-2xl mx-auto">
            Be part of the future of work. Whether you're looking for your next opportunity 
            or the perfect candidate, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-xl text-lg"
              onClick={() => navigate("/select-role")}
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-bold px-10 py-4 rounded-xl text-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
