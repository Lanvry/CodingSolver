import { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text, delay = 30, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [inView, setInView] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let i = 0;
    setDisplayedText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayedText}
      {!isComplete && <span className="typewriter-cursor" aria-hidden="true">|</span>}
    </span>
  );
};

export default Typewriter;
