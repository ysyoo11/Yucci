import clsx from 'clsx';

import useHeaderStore from '../../context/header-context';

import HeaderNavigation from './HeaderNavigation';
import Logo from './Logo';

export default function HomeHeader() {
  const { logoShrink } = useHeaderStore();

  return (
    <header className='fixed top-0 z-20 w-full bg-white px-4'>
      <div
        className={clsx('relative mx-auto w-full max-w-7xl', {
          'py-4': logoShrink,
          'pt-12 lg:py-2': !logoShrink,
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
