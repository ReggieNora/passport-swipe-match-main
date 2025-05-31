
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance";
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  matchScore: number;
  postedDate: string;
  logo?: string;
  remote: boolean;
  urgent?: boolean;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    description: "Join our innovative team building next-generation web applications using React, TypeScript, and modern development practices.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Modern CSS/Tailwind", "Git workflow"],
    benefits: ["Health insurance", "Remote work", "Stock options", "Unlimited PTO"],
    matchScore: 95,
    postedDate: "2024-01-15",
    remote: true,
    urgent: true
  },
  {
    id: "2", 
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $120k",
    description: "Create beautiful and intuitive user experiences for our clients' digital products and platforms.",
    requirements: ["3+ years UX/UI experience", "Figma expertise", "User research skills", "Portfolio required"],
    benefits: ["Creative freedom", "Flexible hours", "Health benefits", "Learning budget"],
    matchScore: 88,
    postedDate: "2024-01-14",
    remote: false
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Austin, TX", 
    type: "Full-time",
    salary: "$100k - $130k",
    description: "Build scalable web applications from frontend to backend using modern technologies and cloud infrastructure.",
    requirements: ["Node.js experience", "React knowledge", "Database design", "API development"],
    benefits: ["Equity package", "Remote work", "Tech stipend", "Team events"],
    matchScore: 92,
    postedDate: "2024-01-13",
    remote: true
  },
  {
    id: "4",
    title: "Product Manager",
    company: "Innovation Labs",
    location: "Seattle, WA",
    type: "Full-time", 
    salary: "$110k - $140k",
    description: "Lead product strategy and development for our cutting-edge AI-powered platform serving millions of users.",
    requirements: ["3+ years PM experience", "Data-driven mindset", "Agile methodology", "Technical background"],
    benefits: ["Stock options", "Health coverage", "Professional development", "Flexible PTO"],
    matchScore: 85,
    postedDate: "2024-01-12",
    remote: true
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    salary: "$115k - $145k", 
    description: "Manage and optimize our cloud infrastructure, ensuring high availability and performance of our services.",
    requirements: ["AWS/Azure experience", "Kubernetes knowledge", "CI/CD pipelines", "Infrastructure as code"],
    benefits: ["Fully remote", "Generous PTO", "Learning budget", "Health benefits"],
    matchScore: 90,
    postedDate: "2024-01-11",
    remote: true
  },
  {
    id: "6",
    title: "Marketing Specialist",
    company: "GrowthCorp",
    location: "Los Angeles, CA",
    type: "Freelance",
    salary: "$50 - $75/hour",
    description: "Drive marketing campaigns and brand awareness for our B2B SaaS platform targeting enterprise clients.",
    requirements: ["Digital marketing experience", "Content creation", "Analytics skills", "B2B background"],
    benefits: ["Flexible schedule", "Project-based", "Performance bonuses", "Remote work"],
    matchScore: 78,
    postedDate: "2024-01-10",
    remote: true
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125k - $160k",
    description: "Develop machine learning models and data-driven insights to enhance our AI products and services.",
    requirements: ["Python/R proficiency", "ML algorithms", "Statistics background", "PhD preferred"],
    benefits: ["Research time", "Conference budget", "Stock options", "Health insurance"],
    matchScore: 94,
    postedDate: "2024-01-09",
    remote: false,
    urgent: true
  },
  {
    id: "8",
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Miami, FL",
    type: "Contract",
    salary: "$80k - $100k",
    description: "Build cross-platform mobile applications using React Native for our diverse client portfolio.",
    requirements: ["React Native experience", "iOS/Android knowledge", "API integration", "App store deployment"],
    benefits: ["Contract flexibility", "Diverse projects", "Competitive rates", "Remote options"],
    matchScore: 87,
    postedDate: "2024-01-08",
    remote: true
  }
];

export const getJobs = (): Job[] => {
  return mockJobs;
};

export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

export const searchJobs = (query: string): Job[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockJobs.filter(job => 
    job.title.toLowerCase().includes(lowercaseQuery) ||
    job.company.toLowerCase().includes(lowercaseQuery) ||
    job.location.toLowerCase().includes(lowercaseQuery) ||
    job.description.toLowerCase().includes(lowercaseQuery)
  );
};
