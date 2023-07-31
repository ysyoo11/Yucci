import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';

const userOnlyPath = [
  '/my-orders',
  '/account-settings',
  '/my-account',
  '/saved-items',
];

export default function BaseLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && userOnlyPath.includes(location.pathname)) {
      navigate('/signin');
    }
  }, [user]);

  return <main className='mt-16'>{children}</main>;
}
