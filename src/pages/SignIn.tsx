import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleLogo from '../components/svg/GoogleLogo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/auth-context';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user, login, loginWithEmail, isAuthEmailSent, isLoading } = useAuth();

  const socialLoginMethods = useMemo(
    () => [
      {
        media: 'google',
        logo: GoogleLogo,
        onClick: () => {
          login('google');
        },
      },
    ],
    []
  );

  const onEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await loginWithEmail(email);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  if (isAuthEmailSent) {
    return (
      <div className='mx-auto flex min-h-[20rem] max-w-sm flex-col items-center justify-center space-y-4 text-center lg:min-h-[32rem] lg:max-w-lg lg:space-y-8'>
        <p className='text-xl lg:text-3xl'>
          Email for authentication has been sent to&nbsp;
          <strong>{email}</strong>.
        </p>
        <p className='text-lg lg:text-xl'>Please check your inbox.</p>
      </div>
    );
  }

  return (
    <div className='mx-auto flex w-full max-w-xs flex-col items-center pt-12'>
      <h1 className='text-3xl font-light uppercase'>my gucci account</h1>
      <div className='mt-10 w-full space-y-6'>
        {socialLoginMethods.map((item, idx) => (
          <button
            key={`${item.media}-${idx}`}
            className='flex w-full justify-center space-x-2 border-2 border-black py-2 hover:bg-gray-100'
            onClick={item.onClick}
          >
            <item.logo className='h-6 w-6' />
            <p className='font-bold uppercase tracking-wide'>
              continue with {item.media}
            </p>
          </button>
        ))}
      </div>
      <span className='my-6'>OR</span>
      <div className='space-y-8'>
        <p className='text-center text-xl uppercase'>
          continue with your email address
        </p>
        <p className='text-center leading-tight'>
          Sign in with your GUCCI email or create a profile if you are new.
        </p>
        <form action='submit' className='space-y-8' onSubmit={onEmailSubmit}>
          <Input
            placeholder='EMAIL'
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            value={email}
            name='email'
            type='email'
          />
          <Button className='tracking-wide' full disabled={isLoading || !email}>
            {isLoading ? 'loading..' : 'continue'}
          </Button>
        </form>
      </div>
    </div>
  );
}
