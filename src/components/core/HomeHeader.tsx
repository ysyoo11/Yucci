import clsx from 'clsx';

import useHeaderStore from '../../context/header-context';

import HeaderNavigation from './HeaderNavigation';
import Logo from './Logo';

// TODO: Adjust logo length on header
export default function HomeHeader() {
  const { logoShrink } = useHeaderStore();

  return (
    <header className='fixed top-0 z-[1] w-full bg-white px-4'>
      <div
        className={clsx('relative mx-auto w-full max-w-7xl', {
          'py-4': logoShrink,
          'pt-12 lg:pb-2 lg:pt-6': !logoShrink,
        })}
      >
        <div className='flex-1'>
          <Logo
            className={clsx('transform duration-700 ease-in-out', {
              'w-36': logoShrink,
              'w-full': !logoShrink,
            })}
          />
        </div>
        <HeaderNavigation />
      </div>
    </header>
  );
}
