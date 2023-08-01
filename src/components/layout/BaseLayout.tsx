import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';

const userOnlyPath = [
  '/my-orders',
  '/account-settings',
  '/my-account',
  '/saved-items',
  '/admin/new-product',
];

const adminOnlyPath = ['/admin/new-product'];

export default function BaseLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    if (isLoading) return;
    if (!user && userOnlyPath.includes(location.pathname)) {
      navigate('/signin', { replace: true });
    }
    if (user && !user.isAdmin && adminOnlyPath.includes(location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, location.pathname]);

  return (
    <main className='mt-16'>{isLoading ? <p>Loading...</p> : children}</main>
  );
}
