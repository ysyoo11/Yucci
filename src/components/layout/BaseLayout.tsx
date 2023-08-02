import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';
import Loading from '../core/Loading';

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
    if (isLoading) return;
    if (!user && userOnlyPath.includes(location.pathname)) {
      navigate('/signin', { replace: true });
    }
    if (user && !user.isAdmin && adminOnlyPath.includes(location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, location.pathname]);

  return <main className='mt-16'>{isLoading ? <Loading /> : children}</main>;
}
