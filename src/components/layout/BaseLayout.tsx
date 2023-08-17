import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';

const userOnlyPath = [
  '/admin/new-product',
  '/account-settings',
  '/cart',
  '/checkout',
  '/my-account',
  '/my-orders',
  '/saved-items',
];

const adminOnlyPath = ['/admin/new-product'];

export default function BaseLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && userOnlyPath.includes(pathname)) {
      navigate('/signin', { replace: true });
    }
    if (user && !user.isAdmin && adminOnlyPath.includes(pathname)) {
      navigate('/', { replace: true });
    }
  }, [user, pathname]);

  return <main className='mt-20'>{children}</main>;
}
