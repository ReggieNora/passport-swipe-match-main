
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Star, Crown, Zap, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const PricingPage = () => {
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

  const plans = [
    {
      name: "Student",
      price: "Free",
      description: "Perfect for students starting their career journey",
      icon: Star,
      features: [
        "Basic job matching",
        "Up to 5 applications per month",
        "Standard profile visibility",
        "Email support",
        "Access to career resources"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "green"
    },
    {
      name: "Professional",
      price: "$19",
      period: "/month",
      description: "For professionals seeking their next opportunity",
      icon: Zap,
      features: [
        "Advanced job matching",
        "Unlimited applications",
        "Priority profile visibility",
        "Direct messaging with recruiters",
        "Resume optimization tools",
        "Interview preparation resources",
        "24/7 support"
      ],
      buttonText: "Start Professional",
      popular: true,
      color: "blue"
    },
    {
      name: "Recruiter",
      price: "$99",
      period: "/month",
      description: "Comprehensive recruiting tools for hiring teams",
      icon: Crown,
      features: [
        "Unlimited candidate searches",
        "Advanced filtering & matching",
        "Bulk messaging capabilities",
        "Analytics & reporting dashboard",
        "Team collaboration tools",
        "Custom job posting templates",
        "Priority customer support",
        "API access"
      ],
      buttonText: "Start Recruiting",
      popular: false,
      color: "purple"
    }
  ];

  const getButtonStyles = (plan: typeof plans[0]) => {
    if (plan.popular) {
      return "bg-blue-600 hover:bg-blue-700 text-white font-bold";
    }
    switch (plan.color) {
      case 'green':
        return "bg-green-600 hover:bg-green-700 text-white font-bold";
      case 'purple':
        return "bg-purple-600 hover:bg-purple-700 text-white font-bold";
      default:
        return "bg-slate-600 hover:bg-slate-700 text-white font-bold";
    }
  };

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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl"
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
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p className={`text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            Select the perfect plan for your career journey. Start free as a student 
            or unlock premium features to accelerate your success.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`${getCardStyles()} shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-6 relative border-0 group ${
                  plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="mb-6">
                    <plan.icon className={`h-16 w-16 mx-auto group-hover:scale-110 transition-transform duration-300 ${
                      plan.color === 'green' ? 'text-green-600' :
                      plan.color === 'purple' ? 'text-purple-600' :
                      'text-blue-600'
                    }`} strokeWidth={2.5} />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">{plan.name}</CardTitle>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className={`text-lg font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{plan.period}</span>}
                  </div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-8 px-8 pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className={`h-5 w-5 ${
                          plan.color === 'green' ? 'text-green-600' :
                          plan.color === 'purple' ? 'text-purple-600' :
                          'text-blue-600'
                        }`} strokeWidth={3} />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-4 rounded-xl text-lg ${getButtonStyles(plan)}`}
                    onClick={() => navigate("/select-role")}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Is the student plan really free?",
                answer: "Yes! We offer a completely free plan for students to help them start their career journey without any financial burden."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Absolutely! You can change your plan at any time. Changes take effect immediately and billing is prorated."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions."
              },
              {
                question: "Is there a contract or can I cancel anytime?",
                answer: "No contracts required. You can cancel your subscription at any time with no penalties or fees."
              }
            ].map((faq, index) => (
              <Card key={index} className={`${getCardStyles()} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0`}>
                <CardContent className="p-8 space-y-4">
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <p className={`font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {faq.answer}
                  </p>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 leading-relaxed text-blue-100 font-medium max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with Hirly.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-xl text-lg"
            onClick={() => navigate("/select-role")}
          >
            Start Your Journey Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
