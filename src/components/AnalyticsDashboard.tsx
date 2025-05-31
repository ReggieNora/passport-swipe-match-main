
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Users, Eye, MessageSquare, TrendingUp, Target, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AnalyticsDashboard = () => {
  const { theme } = useTheme();

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

  const applicationsData = [
    { month: 'Jan', applications: 120, hires: 25 },
    { month: 'Feb', applications: 150, hires: 30 },
    { month: 'Mar', applications: 180, hires: 45 },
    { month: 'Apr', applications: 220, hires: 55 },
    { month: 'May', applications: 190, hires: 40 },
    { month: 'Jun', applications: 240, hires: 60 },
  ];

  const jobTypeData = [
    { name: 'Full-time', value: 45, color: '#3B82F6' },
    { name: 'Part-time', value: 25, color: '#10B981' },
    { name: 'Contract', value: 20, color: '#F59E0B' },
    { name: 'Freelance', value: 10, color: '#EF4444' },
  ];

  const engagementData = [
    { day: 'Mon', views: 120, messages: 45 },
    { day: 'Tue', views: 150, messages: 52 },
    { day: 'Wed', views: 180, messages: 61 },
    { day: 'Thu', views: 200, messages: 68 },
    { day: 'Fri', views: 160, messages: 55 },
    { day: 'Sat', views: 90, messages: 30 },
    { day: 'Sun', views: 70, messages: 25 },
  ];

  const stats = [
    {
      title: "Total Applications",
      value: "1,240",
      change: "+12%",
      icon: Users,
      color: "blue"
    },
    {
      title: "Profile Views",
      value: "8,420",
      change: "+8%",
      icon: Eye,
      color: "green"
    },
    {
      title: "Messages",
      value: "456",
      change: "+15%",
      icon: MessageSquare,
      color: "purple"
    },
    {
      title: "Hire Rate",
      value: "24%",
      change: "+3%",
      icon: Target,
      color: "orange"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`${getCardStyles()} shadow-lg hover:shadow-xl transition-all duration-300 border-0`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon className="h-6 w-6 icon-modern" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications Trend */}
        <Card className={`${getCardStyles()} shadow-lg border-0`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 icon-modern" />
              Applications & Hires Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={applicationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="hires" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Types Distribution */}
        <Card className={`${getCardStyles()} shadow-lg border-0`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 icon-modern" />
              Job Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {jobTypeData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Engagement */}
      <Card className={`${getCardStyles()} shadow-lg border-0`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 icon-modern" />
            Weekly Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="day" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
