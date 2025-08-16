"use client"

import { useEffect, useState } from "react"

const terminalCommands = [
  "node server.js",
  "🚀 Server running on port 3000",
  "✅ Database connected",
  "⚡ Redis cache initialized",
  "🔐 JWT middleware active",
  "📊 API endpoints ready",
  "Ready to build amazing backends...",
]

export default function Terminal() {
  const [currentCommand, setCurrentCommand] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % terminalCommands.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-green-400/30 font-mono relative">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-green-400 space-y-2">
        {terminalCommands.slice(0, -1).map((command, index) => (
          <div key={index} className="flex items-center">
            {index === 0 && <span className="text-orange-400 mr-2">$</span>}
            <span>{command}</span>
          </div>
        ))}
        <div className="flex items-center typing">
          <span className="text-orange-400 mr-2">$</span>
          <span>{terminalCommands[currentCommand]}</span>
        </div>
      </div>
    </div>
  )
}
