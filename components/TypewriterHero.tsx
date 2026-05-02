'use client';

import { useEffect, useState } from 'react';
import { usePersona } from '@/hooks/usePersona';
import { personaContent } from '@/lib/personaContent';

export function TypewriterHero() {
  const { currentPersona } = usePersona();
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const content = personaContent[currentPersona];
  const textToType = content.role;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBeforeDelete = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const isTypeComplete = displayedText === textToType;

      if (!isTypeComplete && !isDeleting) {
        setDisplayedText(textToType.substring(0, displayedText.length + 1));
      } else if (isDeleting && displayedText !== '') {
        setDisplayedText(displayedText.substring(0, displayedText.length - 1));
      } else if (isTypeComplete && !isDeleting) {
        timer = setTimeout(() => setIsDeleting(true), delayBeforeDelete);
        return;
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(
      handleType,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textToType, loopNum]);

  return (
    <div className="mb-6">
      <p className="text-lg text-muted-foreground mb-2">Welcome, I&apos;m Moses</p>
      <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
        {displayedText}
        <span className="animate-pulse">_</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        {content.tagline}
      </p>
    </div>
  );
}
