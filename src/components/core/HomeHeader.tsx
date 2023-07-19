import clsx from 'clsx';

import useHeaderStore from '../../context/header-context';

import Logo from './Logo';

export default function HomeHeader() {
  const { logoShrink } = useHeaderStore();

  return (
    <header
      className={clsx('fixed top-0 z-20 w-full bg-white px-4', {
        'py-4': logoShrink,
        'pt-12 lg:py-2': !logoShrink,
      })}
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='flex-1'>
          <Logo
            className={clsx('transform duration-700 ease-in-out', {
              'w-36': logoShrink,
              'w-full': !logoShrink,
            })}
          />
        </div>
      </div>
    </header>
  );
}
