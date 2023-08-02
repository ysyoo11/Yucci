import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleLogo from '../components/svg/GoogleLogo';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';
import { useAssertiveStore } from '../context/assertives';
import { useAuth } from '../context/auth-context';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { showNoti, showAlert } = useAssertiveStore();

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

  const onEmailSubmit = (e: FormEvent) => {
    if (email === '') {
      showAlert({
        name: 'Invalid email',
        message: 'Please write a valid email address.',
      });
    }
    e.preventDefault();
    // TODO:
    showNoti({
      title: '🛠 This feature has not been developed yet.',
      variant: 'alert',
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

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
          Sign in with your GUCCI email and password or create a profile if you
          are new.
        </p>
        <form action='submit' className='space-y-8' onSubmit={onEmailSubmit}>
          <div className='relative z-0 w-full'>
            <input
              type='email'
              id='email'
              className='peer block w-full appearance-none border border-black bg-transparent px-2 pb-4 pt-6 text-base text-gray-900 focus:border-gray-800 focus:outline-black'
              placeholder=' '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor='email'
              className='absolute left-3 top-5 -z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-600'
            >
              EMAIL*
            </label>
          </div>
          <TextInput
            placeholder='EMAIL'
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            value={email}
            name='email'
          />
          <Button className='tracking-wide' full>
            continue
          </Button>
        </form>
      </div>
    </div>
  );
}
