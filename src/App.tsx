import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, useLocation } from 'react-router-dom';

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
        <CartProvider>
          <HeaderProvider>
            {location.pathname === '/' ? <HomeHeader /> : <Header />}
            <QueryClientProvider client={queryClient}>
              <BaseLayout>
                <Outlet />
              </BaseLayout>
            </QueryClientProvider>
          </HeaderProvider>
        </CartProvider>
      </UserAuthProvider>
    </AssertiveStoreProvider>
  );
}

export default App;
