import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/auth-context';

export default function Redirect() {
  const { uid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) navigate('/');
  }, [uid]);

  return (
    <div className='mx-auto flex min-h-[20rem] max-w-sm flex-col items-center justify-center space-y-4 text-center lg:min-h-[32rem] lg:max-w-xl lg:space-y-8'>
      <p className='text-2xl font-bold lg:text-3xl'>
        Please wait for a second.
      </p>
      <p className='text-lg lg:text-xl'>
        You will be redirected to Home in a while.
      </p>
    </div>
  );
}
