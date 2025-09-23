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
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Moses Edem", 14, 20);
  doc.setFontSize(16);
  doc.text("Full Stack Developer (Backend Specialist)", 14, 30);

  // Contact Information
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Email: mosesedem81@gmail.com", 14, 40);
  doc.text("Phone: +234 903 046 5501", 14, 46);
  doc.text("Address: Uyo, Akwa Ibom State, Nigeria", 14, 52);
  doc.text("LinkedIn: linkedin.com/in/mosesedem", 14, 58);
  doc.text("GitHub: github.com/mosesedem", 14, 64);

  // Personal Profile
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Personal Profile", 14, 78);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const profileText = `Dedicated backend developer and system architect with 4+ years of experience building scalable, high-performance web applications and APIs. Specialized in Node.js, and PHP with expertise in microservices architecture, database design, and system optimization. Proven success in delivering robust solutions for fintech, healthcare, e-commerce, and network security domains. Adept at remaining responsive to changing business needs and implementing best practices to safeguard smooth system operations. Now, with AI as a tool, I can happily say I'm a 200X developer.`;
  let finalY = 86;
  const maxWidth = 180;
  const profileLines = doc.splitTextToSize(profileText, maxWidth);
  doc.text(profileLines, 14, finalY);
  finalY += profileLines.length * getCurrentLineHeight() + 4;

  // Skills Section (Table with multi-line support)
  if (finalY > pageHeight - 100) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Skills", 14, finalY);
  finalY += getCurrentLineHeight() + 2;

  autoTable(doc, {
    startY: finalY,
    head: [["Category", "Skills"]],
    body: [
      [
        "Backend Development",
        "• Node.js, Express.js, NestJS - Server-side JavaScript development and API creation High-level programming for web applications and data processing\n• PHP, Laravel - Web development and enterprise applications\n• Microservices Architecture - Distributed system design and implementation",
      ],
      [
        "Database Management",
        "• PostgreSQL, MySQL - Relational database design and optimization\n• MongoDB - NoSQL database management and document storage\n• Redis - In-memory data structure store for caching and sessions\n• Database design, optimization, and performance tuning",
      ],
      [
        "API Development & Integration",
        "• RESTful APIs - Standard web service architecture and implementation\n• GraphQL - Query language and runtime for APIs\n• Third-party integrations - Payment gateways, SMS services, authentication providers\n• API security, rate limiting, and documentation",
      ],
      [
        "Cloud & DevOps",
        "• AWS - Cloud infrastructure and deployment\n• Docker - Containerization and application deployment\n• Server management and configuration\n• Performance tuning and load balancing\n• Monitoring and logging systems",
      ],
      [
        "Security & Compliance",
        "• Authentication systems - JWT, OAuth, session management\n• Encryption and data protection\n• Healthcare system applications\n• PCIDSS Certified system applications for fintech and insurance industries\n• Fraud detection and prevention systems\n• Security best practices and vulnerability assessment",
      ],
    ],
    styles: { fontSize: 10, cellPadding: 3, overflow: "linebreak" },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 130 } },
    headStyles: { fillColor: [41, 128, 185] },
  });
  finalY = (doc as any).lastAutoTable.finalY + 10;

  // Work Experience
  if (finalY > pageHeight - 50) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Work Experience", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Backend Developer & System Architect (2020 - Present)", 14, finalY);
  finalY += getCurrentLineHeight();
  doc.text("Freelance & Contract Work, Nigeria", 14, finalY);
  finalY += getCurrentLineHeight() + 4;

  doc.setFontSize(11);
  doc.text("Key Projects & Achievements:", 14, finalY);
  finalY += getCurrentLineHeight() + 2;

  doc.setFontSize(10);
  const projects = [
    {
      name: "InstantOTP - Authentication Service (2024)",
      bullets: [
        "Designed and developed high-performance OTP service handling thousands of daily verifications",
        "Implemented Node.js microservices architecture with Redis caching and PostgreSQL",
        "Built SMS and email verification systems with multiple provider integrations",
        "Achieved 99.9% uptime with robust error handling and monitoring",
      ],
    },
    {
      name: "Etegram Platform - Fintech Backend (2023-2024)",
      bullets: [
        "Built scalable backend supporting 10,000+ daily users",
        "Implemented secure payment processing and inventory management",
        "Developed real-time order tracking with WebSocket integration",
        "Created admin dashboard with comprehensive analytics and reporting",
      ],
    },
    {
      name: "MonieCheap - Fintech Platform (2023)",
      bullets: [
        "Architected financial technology platform with secure transaction processing",
        "Built comprehensive fraud detection systems using PHP and Laravel",
        "Implemented real-time notifications and transaction monitoring",
        "Designed secure API architecture for financial data handling",
      ],
    },
    {
      name: "BrixVPN - VPN Service Backend (2024)",
      bullets: [
        "Created VPN service backend with global server infrastructure management",
        "Implemented user authentication and bandwidth monitoring systems",
        "Built server selection algorithms and connection optimization",
        "Developed admin dashboard for server management and user analytics",
      ],
    },
    {
      name: "TunnelDeck - Network Infrastructure (2022-2023)",
      bullets: [
        "Developed advanced tunneling service with custom protocol implementation",
        "Built traffic routing and performance optimization systems",
        "Implemented real-time monitoring and analytics dashboard",
        "Created high-throughput network applications with load balancing",
      ],
    },
    {
      name: "Proton Medicare - Health Insurance Management (2022 till date)",
      bullets: [
        "Automated Health Insurance Enrollment portal",
        "Created secure communication channels for medical professionals",
        "Location Based hospital finder",
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
    "5+ years professional experience in Node.js, and PHP",
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
    "InstantOTP (www.instantotp.com) - OTP verification service",
    "Hospitalcard (www.hospitalcard.ng) - Healthcare management",
    "Etegram Platform (www.etegram.com) - FIntech platform",
    "MonieCheap (moniecheap.com) - Fintech platform",
    "BrixVPN (www.brixvpn.com) - VPN service",
    "TunnelDeck (tunneldeck.com) - Network infrastructure",
    "ProtonMedicare (protonmedicare.com) - Healthcare management",
    // "InstantOTP (www.instantotp.com) - OTP verification service",
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
  if (finalY > pageHeight - 50) {
    doc.addPage();
    finalY = 20;
  }
  const closingText = `Thank you for reviewing my CV. I am passionate about building robust, scalable backend systems that power modern applications and solve real-world problems. I look forward to discussing how my experience and skills can contribute to your organization's success. `;
  const closingLines = doc.splitTextToSize(closingText, maxWidth);
  doc.text(closingLines, 14, finalY);
  finalY += closingLines.length * getCurrentLineHeight() + 8;

  doc.text("Moses Edem", 14, finalY);
  finalY += getCurrentLineHeight();
  doc.text("Backend Developer & System Architect", 14, finalY);
  finalY += getCurrentLineHeight();
  doc.text("mosesedem81@gmail.com", 14, finalY);
  finalY += getCurrentLineHeight();
  doc.text("+234 903 046 5501", 14, finalY);

  // Save PDF
  doc.save("Moses_Edem_Professional_CV.pdf");
};

export const downloadProfessionalCV = () => {
  generateProfessionalCV();
};

const CVGenerator: React.FC<CVGeneratorProps> = ({ onGenerate }) => {
  return null; // Utility component
};

export default CVGenerator;
