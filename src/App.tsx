import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from './components/core/Footer';
import Header from './components/core/Header';
import HomeHeader from './components/core/HomeHeader';
import BaseLayout from './components/layout/BaseLayout';
import { AssertiveStoreProvider } from './context/assertives';
import { UserAuthProvider } from './context/auth-context';
import { CartProvider } from './context/cart-context';
import { HeaderProvider } from './context/header-context';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <AssertiveStoreProvider>
      <UserAuthProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <HeaderProvider>
              <div className='flex h-full min-h-screen flex-col justify-between'>
                {location.pathname === '/' ? <HomeHeader /> : <Header />}
                <BaseLayout>
                  <Outlet />
                </BaseLayout>
                <Footer />
              </div>
            </HeaderProvider>
          </CartProvider>
        </QueryClientProvider>
      </UserAuthProvider>
    </AssertiveStoreProvider>
  );
}

export default App;
