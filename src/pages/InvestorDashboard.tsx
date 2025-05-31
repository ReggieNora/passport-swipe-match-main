
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Plus, TrendingUp, Briefcase, MessageSquare, DollarSign, Eye, Target } from "lucide-react";
import StartupSection from "@/components/StartupSection";

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("startups");

  const stats = [
    { label: "Portfolio", value: "8", icon: Briefcase, trend: "+2 this month" },
    { label: "Invested", value: "$2.4M", icon: DollarSign, trend: "+500K this quarter" },
    { label: "Returns", value: "24%", icon: TrendingUp, trend: "+5% vs last year" },
    { label: "Deals", value: "156", icon: Target, trend: "+12 this week" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
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
              <h1 className="font-extralight text-2xl text-black tracking-[0.2em] font-mono">
                INVESTOR PORTAL
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Investment
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-light">
                  IV
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/20 backdrop-blur-sm rounded-lg p-1">
          {[
            { id: "startups", label: "Startup Deals", icon: TrendingUp },
            { id: "portfolio", label: "Portfolio", icon: Briefcase },
            { id: "analytics", label: "Analytics", icon: Target },
            { id: "messages", label: "Messages", icon: MessageSquare }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeView === tab.id ? "default" : "ghost"}
                className={`flex-1 ${activeView === tab.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "text-black/60"}`}
                onClick={() => setActiveView(tab.id)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {activeView === "startups" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={index} className="border-0 bg-white/20 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <IconComponent className="h-5 w-5 text-black/60" />
                        </div>
                        <div className="text-2xl font-light text-black mb-1">{stat.value}</div>
                        <div className="text-sm text-black/60 mb-1">{stat.label}</div>
                        <div className="text-xs text-green-600">{stat.trend}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Search */}
              <Card className="border-0 bg-white/20 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Search className="h-5 w-5 text-black/60" />
                    <input 
                      type="text" 
                      placeholder="Search startups by industry, stage, or location..."
                      className="flex-1 bg-transparent border-none outline-none text-black placeholder-black/60"
                    />
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Startup Cards */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-light text-black mb-4">Investment Opportunities</h3>
              <StartupSection isInvestor={true} />
            </div>
          </div>
        )}

        {activeView === "portfolio" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 bg-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-light text-black">EcoTech Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-black/60">Investment</span>
                        <p className="font-light text-black">$500K</p>
                      </div>
                      <div>
                        <span className="text-black/60">Current Value</span>
                        <p className="font-light text-black">$750K</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-black/60">Returns</span>
                      <p className="font-light text-green-600">+50% (6 months)</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-black/20">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeView === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-light text-black">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-black/60">
                  Portfolio Analytics Chart
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-light text-black">Investment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["CleanTech", "HealthTech", "FinTech", "EdTech"].map((sector, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-black font-light">{sector}</span>
                      <span className="text-black/60">{30 - i * 5}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "messages" && (
          <div className="max-w-2xl">
            <Card className="border-0 bg-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-light">
                          ET
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-light text-black">EcoTech Solutions</p>
                        <p className="text-sm text-black/60">Thank you for your investment! Here's our Q4 update...</p>
                      </div>
                      <span className="text-xs text-black/60">1h ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
