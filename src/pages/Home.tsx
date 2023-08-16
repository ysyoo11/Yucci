import clsx from 'clsx';

import HeroSection from '../components/custom/HeroSection';
import useHeaderStore from '../context/header-context';

export default function Home() {
  const { logoShrink } = useHeaderStore();

  return (
    <div
      className={clsx('h-[3000px] transform duration-700 ease-in-out', {
        'mt-52 sm:mt-[20vh] md:mt-[24vh] lg:mt-[28vh]': !logoShrink,
        'mt-24': logoShrink,
      })}
    >
      <HeroSection />
    </div>
  );
}
