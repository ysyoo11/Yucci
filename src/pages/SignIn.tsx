import AppleLogo from '../components/svg/AppleLogo';
import GoogleLogo from '../components/svg/GoogleLogo';

const socialLoginMethods = [
  {
    media: 'google',
    logo: GoogleLogo,
    onClick: () => {},
  },
  {
    media: 'apple',
    logo: AppleLogo,
    onClick: () => {},
  },
];

export default function SignIn() {
  return (
    <div className='mx-auto flex w-full max-w-xs flex-col items-center pt-12'>
      <h1 className='text-3xl font-light uppercase'>my gucci account</h1>
      <div className='mt-10 w-full space-y-6'>
        {socialLoginMethods.map((item, idx) => (
          <button
            key={`${item.media}-${idx}`}
            className='flex w-full justify-center space-x-2 border-2 border-black py-2 hover:bg-gray-100'
          >
            <item.logo className='h-6 w-6' />
            <p className='font-bold uppercase tracking-wide'>
              continue with {item.media}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
