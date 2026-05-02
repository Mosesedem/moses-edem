import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CVGeneratorProps {
  onGenerate: () => void;
}

export const generateProfessionalCV = () => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  const getCurrentLineHeight = () =>
    doc.getLineHeight() / doc.internal.scaleFactor;

  // Header
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Moses Jacob Edem", 14, 20);
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(
    "Fullstack Developer | Backend Specialist | DevOps Engineer",
    14,
    28
  );
  doc.setTextColor(0, 0, 0);

  // Contact Information - Clean horizontal layout
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("mosesedem81@gmail.com  |  +234 903 046 5501  |  Nigeria", 14, 36);
  doc.text("linkedin.com/in/mosesedem  |  github.com/mosesedem", 14, 42);

  // Professional Summary
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", 14, 54);
  doc.setLineWidth(0.5);
  doc.line(14, 56, 196, 56);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const profileText = `Results-driven Fullstack Developer with 7+ years of experience building scalable web applications and APIs. Currently focused on building my own startup, delivering production-ready solutions across fintech, healthcare, and e-commerce. Expert in Node.js (Express, Fastify, Hono), Prisma ORM, PostgreSQL, and modern DevOps practices. Proven track record of architecting microservices handling 10,000+ daily users with 99.9% uptime. Strong expertise in CI/CD pipelines, Docker containerization, and cloud deployments (Vercel, AWS).`;
  let finalY = 62;
  const maxWidth = 180;
  const profileLines = doc.splitTextToSize(profileText, maxWidth);
  doc.text(profileLines, 14, finalY);
  finalY += profileLines.length * getCurrentLineHeight() + 4;

  // Skills Section (Table with multi-line support)
  if (finalY > pageHeight - 100) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TECHNICAL SKILLS", 14, finalY);
  doc.setLineWidth(0.5);
  doc.line(14, finalY + 2, 196, finalY + 2);
  finalY += getCurrentLineHeight() + 4;

  autoTable(doc, {
    startY: finalY,
    head: [["Category", "Technologies"]],
    body: [
      [
        "Backend",
        "Node.js (Express, Fastify, Hono, Next.js API Routes), Go Lang, PHP (Laravel)",
      ],
      [
        "Frontend",
        "Next.js, React, TypeScript, Vanilla JavaScript, HTML5, CSS3, Tailwind CSS",
      ],
      [
        "Database & ORM",
        "Prisma ORM, PostgreSQL, MySQL, MongoDB, Redis, Database Design & Optimization",
      ],
      [
        "DevOps",
        "Docker, CI/CD (GitHub Actions, Vercel), AWS, Linux Server Management, Nginx",
      ],
      [
        "APIs & Auth",
        "REST, GraphQL, JWT, OAuth 2.0, Payment Gateway Integration, WebSockets",
      ],
    ],
    styles: { fontSize: 9, cellPadding: 2, overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: "bold" },
      1: { cellWidth: 145 },
    },
    headStyles: { fillColor: [41, 128, 185], fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  finalY = (doc as any).lastAutoTable.finalY + 10;

  // Work Experience
  if (finalY > pageHeight - 50) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL EXPERIENCE", 14, finalY);
  doc.setLineWidth(0.5);
  doc.line(14, finalY + 2, 196, finalY + 2);
  finalY += getCurrentLineHeight() + 6;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Founder & Lead Developer", 14, finalY);
  doc.setFont("helvetica", "normal");
  doc.text("2024 - Present", 160, finalY);
  finalY += getCurrentLineHeight();
  doc.setFont("helvetica", "italic");
  doc.text("Startup Ventures | Nigeria", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "• Building and scaling multiple SaaS products serving thousands of users",
    14,
    finalY
  );
  finalY += getCurrentLineHeight();
  doc.text(
    "• Architecting full-stack solutions with Next.js, Prisma, and PostgreSQL",
    14,
    finalY
  );
  finalY += getCurrentLineHeight();
  doc.text(
    "• Managing DevOps pipelines and cloud infrastructure for production apps",
    14,
    finalY
  );
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Fullstack Developer & DevOps Engineer", 14, finalY);
  doc.setFont("helvetica", "normal");
  doc.text("2020 - 2024", 160, finalY);
  finalY += getCurrentLineHeight();
  doc.setFont("helvetica", "italic");
  doc.text("Freelance & Contract Work | Nigeria", 14, finalY);
  finalY += getCurrentLineHeight() + 2;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Key Projects:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;

  doc.setFontSize(10);
  const projects = [
    {
      name: "Proton Medicare (Personal - 2024)",
      bullets: [
        "Affordable health insurance platform in Nigeria offering comprehensive medical, dental, and vision coverage",
        "Implemented flexible plans, quick online enrollment, and 24/7 support from certified agents",
        "Built scalable backend with secure payment processing for insurance transactions",
        "Live: https://www.protonmedicare.com",
      ],
    },
    {
      name: "Servixing (Paid - 2024)",
      bullets: [
        "Professional device repair management service providing fast repairs for phones, laptops, tablets",
        "Implemented 90-day warranty tracking, certified technician management, and real-time status updates",
        "Built scheduling system and customer notification platform",
        "Live: https://www.servixing.com",
      ],
    },
    {
      name: "Dakuri (Personal - 2023)",
      bullets: [
        "Cryptocurrency trading platform simplifying buying and selling of assets like USDT",
        "Implemented secure Web3 transactions with real-time pricing and transaction limits",
        "Built market data aggregation and order management system",
        "Live: https://dakuri.vercel.app/",
      ],
    },
    {
      name: "Instant OTP (Paid - 2024)",
      bullets: [
        "Management tool for creating white-label child panels for SMS verification services",
        "Implemented real-time DNS verification and comprehensive dashboard monitoring",
        "Built multi-tenant architecture supporting thousands of daily verifications",
        "Live: https://instant-otp.vercel.app/",
      ],
    },
    {
      name: "Instant OTP Payment (Paid - 2024)",
      bullets: [
        "Registration platform for Instant OTP child panels with simple form setup",
        "Implemented status tracking through registration, payment, and completion stages",
        "Built secure payment integration and automated provisioning system",
        "Live: https://instant-otp-payment.vercel.app/",
      ],
    },
    {
      name: "AI SEO (Personal - 2023)",
      bullets: [
        "AI-powered SEO optimization tool that audits websites for AI and search engine visibility",
        "Generates files like robots.txt and meta tags with actionable recommendations",
        "Provides scores and detailed reports for SEO improvement",
        "Live: https://ai-seo-seven.vercel.app/",
      ],
    },
    {
      name: "Online Shop (Paid - 2023)",
      bullets: [
        "Wellness products online store with age verification targeting adults",
        "Implemented secure checkout, inventory management, and order tracking",
        "Built admin dashboard for product and order management",
        "Live: https://online-shop-liard-omega.vercel.app/",
      ],
    },
    {
      name: "Akwa Ibom Tech Week (Paid - 2024)",
      bullets: [
        "Event registration site for Akwa Ibom Tech Week 2025 offering ticket purchases",
        "Implemented event details, networking opportunities for tech innovators",
        "Built ticket generation and attendee management system",
        "Live: https://akwaibomtechweek.moniecheap.com/",
      ],
    },
    {
      name: "UTQE NAKS (Paid - 2023)",
      bullets: [
        "Platform for Union of Tipper and Quarry Employers providing certification and fleet management",
        "Implemented networking and verification services for transport professionals across Nigeria",
        "Built document verification and compliance tracking system",
        "Live: https://utqenaks.ng/",
      ],
    },
    {
      name: "Hotels Etegram Group (Paid - 2023)",
      bullets: [
        "Hotel management system for efficient guest onboarding, check-in/out, and stay tracking",
        "Implemented analytics dashboard and secure data handling to prevent duplicates",
        "Built reservation system and guest communication platform",
        "Live: https://hotels.etegramgroup.com/",
      ],
    },
    {
      name: "Restaurant App (Paid - 2024)",
      bullets: [
        "Gen-Z focused food platform connecting users to 500+ restaurants with AI recommendations",
        "Implemented real-time menus, user reviews, and fast delivery options integration",
        "Built recommendation engine and order management system",
        "Live: https://restaurant-ten-lake.vercel.app/",
      ],
    },
    {
      name: "Hospital Card (Paid - 2023)",
      bullets: [
        "Healthcare platform for searching providers, comparing plans, and accessing services",
        "Implemented digital verification, tailored plans, and secure data handling in Nigeria",
        "Built provider directory and plan comparison system",
        "Live: https://hospitalcard.ng/",
      ],
    },
    {
      name: "DarNumber (Paid - 2023)",
      bullets: [
        "SMS verification service platform for secure and reliable messaging solutions",
        "Built SMS delivery infrastructure and verification code management",
        "Implemented provider integration and reliability monitoring",
        "Live: https://darnumber.com/",
      ],
    },
    {
      name: "ScoreFusion (Paid - 2024)",
      bullets: [
        "Premium platform offering betting tips, predictions, and analytics for users",
        "Implemented real-time data analysis and prediction algorithms",
        "Built user dashboard and subscription management system",
        "Live: https://getscorefusion.com/",
      ],
    },
  ];

  for (const project of projects) {
    if (finalY > pageHeight - 30) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.text(project.name, 14, finalY);
    finalY += getCurrentLineHeight() + 2;
    doc.setFont("helvetica", "normal");
    for (const bullet of project.bullets) {
      if (finalY > pageHeight - 20) {
        doc.addPage();
        finalY = 20;
      }
      const bulletLines = doc.splitTextToSize(`• ${bullet}`, maxWidth);
      doc.text(bulletLines, 14, finalY);
      finalY += bulletLines.length * getCurrentLineHeight() + 1;
    }
    finalY += 4; // Space between projects
  }

  // Professional Responsibilities
  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(11);
  doc.text("Professional Responsibilities:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const responsibilities = [
    "Established and maintained professional relationships with clients across multiple industries",
    "Coordinated multiple projects simultaneously using agile methodologies",
    "Provided technical consultation and system architecture guidance",
    "Ensured code quality through testing, documentation, and peer reviews",
  ];
  for (const resp of responsibilities) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${resp}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  // Technical Achievements
  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(11);
  doc.text("Technical Achievements:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const achievements = [
    "Successfully deployed over 20 production applications serving thousands of daily users",
    "Implemented secure payment processing systems handling significant transaction volumes",
    "Designed microservices architectures improving system scalability by 300%",
    "Achieved 99.9% uptime across all deployed services through robust system design",
    "Reduced API response times by 60% through optimization and caching strategies",
  ];
  for (const ach of achievements) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${ach}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  // Education
  if (finalY > pageHeight - 60) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Education", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Bachelor's Degree in Soil Science and Land Resource Management",
    14,
    finalY
  );
  finalY += getCurrentLineHeight();
  doc.text("University of Uyo, Nigeria (In Progress)", 14, finalY);
  finalY += getCurrentLineHeight();
  doc.text("Expected Graduation: 2025", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.text("Relevant Coursework:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const coursework = [
    "Research methodology and data analysis",
    "Environmental systems and sustainability",
    "Project management and scientific methodology",
    "Statistical analysis and problem-solving",
  ];
  for (const course of coursework) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${course}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(11);
  doc.text("Additional Skills:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const additionalSkills = [
    "Analytical thinking and problem-solving",
    "Project management and team coordination",
    "Technical documentation and communication",
    "Continuous learning and adaptation to new technologies",
  ];
  for (const skill of additionalSkills) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${skill}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  // Professional Development
  if (finalY > pageHeight - 60) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Professional Development", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.text("Continuous Learning & Growth:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const learningGrowth = [
    "Regular participation in developer communities and forums",
    "Active contributions to open-source projects",
    "Continuous study of emerging backend technologies and frameworks",
    "Regular updates on industry best practices and security standards",
    "Attendance at virtual conferences and webinars",
  ];
  for (const item of learningGrowth) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(11);
  doc.text("Technical Certifications & Learning:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const certifications = [
    "Advanced Node.js development patterns",
    "Database design and optimization techniques",
    "Cloud architecture and deployment strategies",
    "Security best practices and compliance standards",
  ];
  for (const cert of certifications) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${cert}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  // Technical Expertise Summary
  if (finalY > pageHeight - 60) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Technical Expertise Summary", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.text("Backend Technologies:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const backendTech = [
    "7+ years professional experience in Node.js, and PHP",
    "Expert-level knowledge of Express.js, Django, Flask, and Laravel",
    "Advanced understanding of microservices architecture and API design",
    "Proficient in both SQL and NoSQL database management",
  ];
  for (const item of backendTech) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(11);
  doc.text("Industry Experience:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const industryExp = [
    "Proven track record in fintech, healthcare, e-commerce, and network security",
    "Experience with high-traffic applications and real-time systems",
    "Strong focus on security, performance, and system reliability",
    "Expertise in payment processing and financial system integration",
  ];
  for (const item of industryExp) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(11);
  doc.text("System Architecture:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const systemArch = [
    "Design and implementation of scalable microservices",
    "Performance optimization and load balancing",
    "Security architecture and compliance implementation",
    "Integration with third-party services and APIs",
  ];
  for (const item of systemArch) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  // Project Portfolio
  if (finalY > pageHeight - 60) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Project Portfolio", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.text("Live Applications:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;
  doc.setFontSize(10);
  const portfolio = [
    "Proton Medicare (protonmedicare.com) - Health insurance platform",
    "Servixing (servixing.com) - Device repair management",
    "Dakuri (dakuri.vercel.app) - Cryptocurrency trading platform",
    "Instant OTP (instant-otp.vercel.app) - SMS verification service",
    "Instant OTP Payment (instant-otp-payment.vercel.app) - Registration platform",
    "AI SEO (ai-seo-seven.vercel.app) - SEO optimization tool",
    "Online Shop (online-shop-liard-omega.vercel.app) - Wellness product store",
    "Akwa Ibom Tech Week (akwaibomtechweek.moniecheap.com) - Event registration",
    "UTQE NAKS (utqenaks.ng) - Transport professionals platform",
    "Hotels Etegram Group (hotels.etegramgroup.com) - Hotel management system",
    "Restaurant App (restaurant-ten-lake.vercel.app) - Food delivery platform",
    "Hospital Card (hospitalcard.ng) - Healthcare provider platform",
    "DarNumber (darnumber.com) - SMS verification service",
    "ScoreFusion (getscorefusion.com) - Betting predictions platform",
  ];
  for (const item of portfolio) {
    if (finalY > pageHeight - 20) {
      doc.addPage();
      finalY = 20;
    }
    const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
    doc.text(lines, 14, finalY);
    finalY += lines.length * getCurrentLineHeight() + 1;
  }

  if (finalY > pageHeight - 30) {
    doc.addPage();
    finalY = 20;
  }
  const portfolioNote =
    "All applications are currently in production, serving real users and processing live transactions.";
  const noteLines = doc.splitTextToSize(portfolioNote, maxWidth);
  doc.text(noteLines, 14, finalY);
  finalY += noteLines.length * getCurrentLineHeight() + 8;

  // References
  if (finalY > pageHeight - 30) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("References", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.text("Professional references available upon request.", 14, finalY);
  finalY += getCurrentLineHeight() + 12;

  // Closing Note
  if (finalY > pageHeight - 40) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  const closingText = `I am eager to bring my expertise in fullstack development, DevOps, and startup experience to your team. Let's build something great together.`;
  const closingLines = doc.splitTextToSize(closingText, maxWidth);
  doc.text(closingLines, 14, finalY);
  finalY += closingLines.length * getCurrentLineHeight() + 6;

  doc.setFont("helvetica", "bold");
  doc.text("Moses Jacob Edem", 14, finalY);
  doc.setFont("helvetica", "normal");
  finalY += getCurrentLineHeight();
  doc.text("mosesedem81@gmail.com  |  +234 903 046 5501", 14, finalY);
  finalY += getCurrentLineHeight();
  doc.text("linkedin.com/in/mosesedem  |  github.com/mosesedem", 14, finalY);

  // Save PDF
  doc.save("Moses_Jacob_Edem_CV.pdf");
};

export const downloadProfessionalCV = () => {
  generateProfessionalCV();
};

const CVGenerator: React.FC<CVGeneratorProps> = ({ onGenerate }) => {
  return null; // Utility component
};

export default CVGenerator;
