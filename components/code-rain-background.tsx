"use client"

import { useEffect, useRef } from "react"

export default function CodeRainBackground() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const codes = ["0", "1", "{", "}", "<", ">", "/", "*", "+", "-", "=", ";", "(", ")", "[", "]"]

    const createCodeRain = () => {
      const codeElement = document.createElement("div")
      codeElement.className = "code-rain"
      codeElement.textContent = codes[Math.floor(Math.random() * codes.length)]
      codeElement.style.left = Math.random() * 100 + "%"
      codeElement.style.animationDuration = Math.random() * 3 + 2 + "s"
      bg.appendChild(codeElement)

      setTimeout(() => {
        if (codeElement.parentNode) {
          codeElement.remove()
        }
      }, 5000)
    }

    const interval = setInterval(createCodeRain, 200)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={bgRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-10" aria-hidden="true" />
}
