import { HTMLAttributes, useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter = ({
  text = 'uh oh, you forgot to add text!',
  speed = 500, // default half a second
  ...rest
}: TypewriterProps & HTMLAttributes<HTMLSpanElement>) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((current) => current + text[index]);
        setIndex((current) => current + 1);
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, index]);

  return <span {...rest}>{displayText}</span>;
};
