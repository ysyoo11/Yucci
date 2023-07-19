import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './components/core/Header';
import HomeHeader from './components/core/HomeHeader';
import { HeaderProvider } from './context/header-context';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <HeaderProvider>
      {location.pathname === '/' ? <HomeHeader /> : <Header />}
      <QueryClientProvider client={queryClient}>
        <main className='mt-12 lg:mt-24'>
          <Outlet />
        </main>
      </QueryClientProvider>
    </HeaderProvider>
  );
}

export default App;
