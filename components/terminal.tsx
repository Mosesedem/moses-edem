// "use client"

// import { useEffect, useState } from "react"

// const terminalCommands = [
//   "node server.js",
//   "🚀 Server running on port 3000",
//   "✅ Database connected",
//   "⚡ Redis cache initialized",
//   "🔐 JWT middleware active",
//   "📊 API endpoints ready",
//   "Ready to build amazing backends...",
// ]

// export default function Terminal() {
//   const [currentCommand, setCurrentCommand] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentCommand((prev) => (prev + 1) % terminalCommands.length)
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="bg-gray-900 rounded-xl p-6 border border-green-400/30 font-mono relative">
//       <div className="flex gap-2 mb-4">
//         <div className="w-3 h-3 rounded-full bg-red-500"></div>
//         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//         <div className="w-3 h-3 rounded-full bg-green-500"></div>
//       </div>
//       <div className="text-green-400 space-y-2">
//         {terminalCommands.slice(0, -1).map((command, index) => (
//           <div key={index} className="flex items-center">
//             {index === 0 && <span className="text-orange-400 mr-2">$</span>}
//             <span>{command}</span>
//           </div>
//         ))}
//         <div className="flex items-center typing">
//           <span className="text-orange-400 mr-2">$</span>
//           <span>{terminalCommands[currentCommand]}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";

export default function Terminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayText, setDisplayText] = useState<string[]>([]);

  const terminalLines = [
    "$ whoami",
    "moses_edem",
    "$ cat skills.txt",
    "Backend Development: ████████████ 95%",
    "Node.js/Express: ████████████ 90%",
    "Python/Django: ███████████░ 85%",
    "PHP/Laravel: ██████████░░ 80%",
    "Database Design: ████████████ 95%",
    "API Development: ████████████ 95%",
    "$ ls projects/",
    "InstantOTP/  Etegram/  MonieCheap/  BrixVPN/",
    "TunnelDeck/  ProtonMedicare/",
    "$ echo 'Ready to build amazing things!'",
    "Ready to build amazing things!",
    "$ _",
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      if (currentChar < line.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => {
            const newText = [...prev];
            if (!newText[currentLine]) {
              newText[currentLine] = "";
            }
            newText[currentLine] = line.substring(0, currentChar + 1);
            return newText;
          });
          setCurrentChar(currentChar + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLine, currentChar, terminalLines]);

  return (
    <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 font-mono text-sm border border-gray-700 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-2">moses@portfolio:~</span>
      </div>
      <div className="space-y-1">
        {displayText.map((line, index) => (
          <div
            key={index}
            className={`${
              line.startsWith("$")
                ? "text-green-400"
                : line.includes("%")
                ? "text-blue-400"
                : line.includes("/")
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            {line}
            {index === currentLine && (
              <span className="animate-pulse text-green-400">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
