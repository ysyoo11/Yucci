import clsx from 'clsx';

import HeroSection from '../components/custom/HeroSection';
import useHeaderStore from '../context/header-context';

export default function Home() {
  const { logoShrink } = useHeaderStore();

  return (
    <div
      className={clsx('h-[3000px] transform duration-700 ease-in-out', {
        'mt-52': !logoShrink,
        'mt-24': logoShrink,
      })}
    >
      <HeroSection />
    </div>
  );
}
