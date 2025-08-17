// export default function FloatingElements() {
//   return (
//     <>
//       <div className="absolute top-1/5 left-1/10 floating-1 pointer-events-none">
//         <div className="text-4xl text-green-400/30">{"{}"}</div>
//       </div>
//       <div className="absolute top-3/5 right-1/10 floating-2 pointer-events-none">
//         <div className="text-4xl text-green-400/30">{"</>"}</div>
//       </div>
//     </>
//   )
// }

"use client";

import { useEffect, useState } from "react";

export default function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setElements(newElements);
    };

    generateElements();
    window.addEventListener("resize", generateElements);

    const animateElements = () => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          y:
            element.y < -10
              ? window.innerHeight + 10
              : element.y - element.speed,
        }))
      );
    };

    const interval = setInterval(animateElements, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", generateElements);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute bg-green-400 rounded-full"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
          }}
        />
      ))}
    </div>
  );
}
