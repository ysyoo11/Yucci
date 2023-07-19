import Logo from './Logo';

export default function Header() {
  return (
    <header className='fixed top-0 z-20 w-full bg-white p-4'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='flex-1'>
          <Logo className='w-36 transform duration-700 ease-in-out' />
        </div>
      </div>
    </header>
  );
}
