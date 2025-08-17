// "use client"

// import { useEffect, useRef } from "react"

// export default function CodeRainBackground() {
//   const bgRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const bg = bgRef.current
//     if (!bg) return

//     const codes = ["0", "1", "{", "}", "<", ">", "/", "*", "+", "-", "=", ";", "(", ")", "[", "]"]

//     const createCodeRain = () => {
//       const codeElement = document.createElement("div")
//       codeElement.className = "code-rain"
//       codeElement.textContent = codes[Math.floor(Math.random() * codes.length)]
//       codeElement.style.left = Math.random() * 100 + "%"
//       codeElement.style.animationDuration = Math.random() * 3 + 2 + "s"
//       bg.appendChild(codeElement)

//       setTimeout(() => {
//         if (codeElement.parentNode) {
//           codeElement.remove()
//         }
//       }, 5000)
//     }

//     const interval = setInterval(createCodeRain, 200)

//     return () => {
//       clearInterval(interval)
//     }
//   }, [])

//   return <div ref={bgRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-10" aria-hidden="true" />
// }

"use client";

import { useEffect, useRef } from "react";

export default function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Code characters
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    // "Moses Edem, Backend Developer, System Architect, Port Harcourt, Nigeria, JavaScript, Node.js, Python, PHP, Express.js, NestJS, Django, Laravel, PostgreSQL, MySQL, MongoDB, Redis, API Development, Database Design, Microservices Architecture";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array to store y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Black background with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F4";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
    />
  );
}
