import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

export default function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const handleScroll = () => {
    const x = window.scrollX;
    const y = window.scrollY;
    setScrollPosition({ x, y });
  };

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return {
    scrollX: scrollPosition.x,
    scrollY: scrollPosition.y,
  };
}
