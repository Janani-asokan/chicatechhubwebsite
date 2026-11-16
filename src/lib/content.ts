// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Janani Asokan",
  company: "ChicaTechHub",
  role: "Founder · Software & AI Engineer",
  location: "Bengaluru, India",
  email: "jananiasokanse@gmail.com",
  phone: "+91 63834 95030",
  phoneRaw: "916383495030",
  linkedin: "https://www.linkedin.com/in/janani-asokan-71a515305/",
  github: "https://github.com/Janani-asokan",
  photo: "/profile.webp",
  roles: [
    "Billing & GST Software",
    "Fintech Lending Platforms",
    "AI & Machine Learning",
    "API Test Automation",
    "Cloud-Native Web Apps",
  ],
  summary:
    "Passionate software engineer with hands-on experience in AI, Data Science and Software Testing. Proficient in Python and C++ with a focus on building scalable systems and automation, and applying technical skills to drive innovation in next-generation AI computing.",
};

export const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 2, suffix: "", label: "Live client products" },
  { value: 95, suffix: "%", label: "Best model accuracy" },
  { value: 4, suffix: "", label: "Awards & honours" },
  { value: 65, suffix: "%", label: "Time saved with AI summaries" },
];

export const services = [
  { icon: "Receipt", title: "Billing, GST & Inventory Software", text: "Invoicing, purchase orders, stock and accounts tailored to how your shop or distribution business actually works." },
  { icon: "Landmark", title: "Fintech & Lending Platforms", text: "Loan management, customer records, repayment tracking and secure dashboards for finance companies." },
  { icon: "Globe", title: "Custom Web Applications", text: "Fast, responsive web apps and business websites, hosted in the cloud and ready for real users." },
  { icon: "BrainCircuit", title: "AI & Machine Learning", text: "Chatbots, RAG systems, document summarisation, computer vision and predictive analytics." },
  { icon: "FlaskConical", title: "API & Test Automation", text: "Pytest API suites, CI/CD quality gates and automation that catch bugs before your customers do." },
  { icon: "Cloud", title: "Cloud, DevOps & IoT", text: "Docker, Kubernetes, AWS and MQTT-based IoT integrations, deployed and monitored properly." },
] as const;

export type ClientProject = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  flagship?: boolean;
  url: string;
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  stack: string[];
};

export const clients: ClientProject[] = [
  {
    id: "lending",
    name: "Sri Sakthi Thirumurugan Finance",
    tagline: "Premium lending operations platform",
    category: "Fintech",
    flagship: true,
    url: "https://money-lending-app.onrender.com/",
    summary:
      "An end-to-end lending operations platform that brings customers, loans and collections into one secure system.",
    challenge:
      "Loan records, repayments and collections were tracked across paper ledgers, making it hard to see outstanding balances and follow up on time.",
    solution:
      "A secure web platform where staff manage customers and loan accounts, record repayments and see the state of the business on a live dashboard.",
    features: [
      "Customer and loan account management",
      "Repayment, interest and collection tracking",
      "Operations dashboard with business insights",
      "Secure, role-based staff access",
    ],
    stack: ["Full-Stack Web", "REST APIs", "Database", "Secure Auth", "Cloud Deploy"],
  },
  {
    id: "corpus360",
    name: "Corpus365",
    tagline: "Billing and stock, without the paperwork",
    category: "Co-founder & CTO · SaaS",
    url: "https://ledgerly-books.onrender.com/app/purchases/orders",
    summary:
      "GST invoicing, inventory and accounts for Indian businesses in one clean dashboard.",
    challenge:
      "Small businesses juggled spreadsheets and paper registers for invoices, purchases and stock, leading to errors and lost time at month end.",
    solution:
      "A web-based billing system with GST-ready invoices, purchase orders, real-time stock and reports, usable from any device.",
    features: [
      "GST-compliant invoicing and billing",
      "Purchase orders and supplier management",
      "Real-time inventory and stock tracking",
      "Accounts and business reports",
    ],
    stack: ["Web App", "REST APIs", "Database", "Cloud Deploy"],
  },
];

export const experience = [
  {
    role: "Senior Data Scientist",
    company: "Aleta Software Solutions",
    location: "India",
    period: "2026 – Present",
    points: [
      "Senior Data Scientist building data-driven and AI solutions for business clients.",
    ],
  },
  {
    role: "Co-founder & CTO",
    company: "Corpus365",
    location: "India",
    period: "Present",
    points: [
      "Co-founded Corpus365, a GST billing, inventory and accounts platform for Indian businesses.",
      "Lead the product's technology: architecture, development, deployment and quality.",
    ],
  },
  {
    role: "Cloud API Automation Engineer",
    company: "Signify (formerly Philips Lighting)",
    location: "Bengaluru",
    period: "Jul 2025 – 2026",
    points: [
      "Built an integrated AI to automate the firmware and cloud API testing flow.",
      "Built a scalable, cloud-native API test framework in Python and Pytest validating REST APIs across dev, staging and production.",
      "Validate data flow between MQTT brokers, cloud APIs and mobile clients for reliability and synchronisation.",
      "Implemented dynamic token auth, session management, retries and response-time validation.",
      "Execute firmware test cases over MQTT for real-time device communication.",
    ],
  },
  {
    role: "Founder & Freelance Engineer",
    company: "ChicaTechHub",
    location: "Remote · India",
    period: "Present",
    points: [
      "Deliver custom business software end to end: requirements, design, build, testing and deployment.",
      "Shipped a lending operations platform and a GST billing system now used daily by clients.",
    ],
  },
  {
    role: "MTech, Computer Science & Engineering",
    company: "Vellore Institute of Technology",
    location: "Vellore",
    period: "Jul 2021 – Jul 2026",
    points: ["Research in federated learning for healthcare."],
  },
];

export type Project = {
  title: string;
  metric: string;
  metricLabel: string;
  text: string;
  tags: string[];
  category: "AI / ML" | "IoT" | "NLP";
  link?: string;
};

export const projects: Project[] = [
  {
    title: "AI-Powered Healthcare Orchestration System",
    metric: "Best Rising Star",
    metricLabel: "award",
    text: "Real-time coordination for critical care with intelligent dispatch, predictive analytics, automated workflows and decision-support dashboards.",
    tags: ["AI/ML", "Kafka", "OpenCV", "React", "PostgreSQL"],
    category: "AI / ML",
  },
  {
    title: "Adaptive Traffic Signals for Emergency Vehicles",
    metric: "30%",
    metricLabel: "faster emergency response",
    text: "IoT traffic control using reinforcement learning to prioritise emergency vehicles, with automatic signal switching at 4-way intersections.",
    tags: ["AWS IoT", "YOLOv8", "Reinforcement Learning"],
    category: "IoT",
  },
  {
    title: "IoT Response Drone for Search & Rescue",
    metric: "95%",
    metricLabel: "detection accuracy",
    text: "Arduino drone with AI image processing to find stranded people in floods, remotely operated and tested from 18,000 km away.",
    tags: ["Deep Learning", "YOLOv8", "CNN", "REST APIs"],
    category: "IoT",
    link: "https://github.com/Janani-asokan/HACKWAR",
  },
  {
    title: "WebDigestAI: AI Content Digesting",
    metric: "65%",
    metricLabel: "less reading time",
    text: "Summarises articles from 1000+ URLs using LangChain, LangGraph and RAG with the Gemini API, at around 90% response accuracy.",
    tags: ["NLP", "LangChain", "LangGraph", "RAG", "Gemini"],
    category: "NLP",
    link: "https://github.com/Janani-asokan/WebDigestAI",
  },
];

export const awards = [
  { icon: "Medal", title: "PitchWar Hackathon · 3rd Place", text: "Best Innovator Award for the AI-driven IoT rescue drone." },
  { icon: "Rocket", title: "ISRO Hackathon Finalist", text: "87.2% accuracy annotating 30,000 moon images with YOLOv8." },
  { icon: "Star", title: "Best Rising Star", text: "For impactful contributions on the healthcare orchestration platform." },
  { icon: "FileText", title: "Research Publication", text: "Federated Learning in Healthcare: a decentralised AI model." },
  { icon: "BadgeCheck", title: "ISTQB Certified Tester", text: "Internationally recognised software testing certification." },
  { icon: "GraduationCap", title: "MTech CSE · VIT Vellore", text: "Computer Science & Engineering, Vellore Institute of Technology." },
] as const;

export const skills: Record<string, string[]> = {
  Languages: ["Python", "C++", "C", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  "AI & Data": ["Machine Learning", "Deep Learning", "NLP", "LLMs", "RAG", "Generative AI", "Agentic AI", "EDA", "Power BI"],
  Frameworks: ["React", "Next.js", "TensorFlow", "scikit-learn", "LangChain", "LangGraph", "OpenCV", "NumPy", "Pandas"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD", "REST APIs", "MQTT", "Kafka", "PostgreSQL", "Render"],
  "Testing & QA": ["Pytest", "Postman", "API Automation", "Firmware Testing", "Wireshark", "Packet Sender", "ISTQB"],
};

export const processSteps = [
  { title: "Discover", text: "We talk through your business, workflow and goals, and agree on scope, timeline and budget." },
  { title: "Design", text: "You see screens and flows before any code is written, so the product fits how your team works." },
  { title: "Build & Test", text: "Weekly demos and automated testing, so every feature works the first time." },
  { title: "Launch & Support", text: "Cloud deployment, team training and ongoing support after go-live." },
];

export const faqs = [
  { q: "How long does a typical project take?", a: "A business website takes 1–2 weeks. Billing or inventory software usually takes 3–6 weeks, and a full platform like a lending system 6–10 weeks, depending on features." },
  { q: "How is pricing decided?", a: "After a free discovery call I send a fixed quote based on scope. Payments are split into milestones, so you only pay as you see progress." },
  { q: "Will I own the code and data?", a: "Yes. You get full ownership of the source code, database and hosting accounts once the project is paid for." },
  { q: "Do you provide support after launch?", a: "Yes. Every project includes a free support period for bug fixes, and affordable monthly plans are available for updates and new features." },
  { q: "Can you work with my existing system?", a: "Yes. I can extend or integrate with existing software through APIs, migrate your data, or rebuild it step by step without downtime." },
];

export const serviceOptions = [
  "Billing / Inventory Software",
  "Fintech / Lending Platform",
  "Custom Web Application",
  "AI / ML Solution",
  "Test Automation",
  "Other",
];

export const budgetOptions = ["Under ₹10K", "₹10K – ₹50K", "₹50K – ₹1L", "₹1L+", "Not sure yet"];
