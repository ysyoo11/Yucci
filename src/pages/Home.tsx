import clsx from 'clsx';

import HeroSection from '../components/custom/HeroSection';
import useHeaderStore from '../context/header-context';

export default function Home() {
  const { logoShrink } = useHeaderStore();

  return (
    <div
      className={clsx('transform pb-20 duration-700 ease-in-out', {
        'mt-32 sm:mt-[12rem] md:mt-[14rem] lg:mt-[18rem]': !logoShrink,
        'mt-8': logoShrink,
      })}
    >
      <HeroSection />
    </div>
  );
}
