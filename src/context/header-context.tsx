import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import useWindowScroll from '../hooks/use-window-scroll';

type HeaderState = {
  logoShrink: boolean;
};

const initialState = {
  logoShrink: true,
};

export const HeaderContext = createContext<HeaderState>(initialState);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [logoShrink, setLogoShrink] = useState(true);
  const { scrollY } = useWindowScroll();
  const location = useLocation();

  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);

  useEffect(() => {
    if (!isHome) return;
    if (scrollY > 0) {
      setLogoShrink(true);
    } else {
      setLogoShrink(false);
    }
  }, [scrollY, isHome]);

  const value = useMemo(() => {
    return {
      logoShrink,
    };
  }, [logoShrink]);

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export default function useHeaderStore() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeaderStore must be used within YoutubeProvider.');
  }
  return context;
}
