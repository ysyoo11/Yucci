import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import NewProduct from './pages/admin/NewProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import MyOrders from './pages/MyOrders';
import NotFound from './pages/NotFound';
import OrderDetail from './pages/OrderDetail';
import Products from './pages/Products';
import Redirect from './pages/Redirect';
import SavedItems from './pages/SavedItems';
import Search from './pages/Search';
import SignIn from './pages/SignIn';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/item/:id',
        element: <ItemDetail />,
      },
      {
        path: '/products',
        element: <Products />,
        children: [
          {
            path: '/products/:category',
            element: <Products />,
          },
        ],
      },
      {
        path: '/admin/new-product',
        element: <NewProduct />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
      },
      {
        path: '/my-orders/:id',
        element: <OrderDetail />,
      },
      {
        path: '/saved-items',
        element: <SavedItems />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/search/:q',
        element: <Search />,
      },
      {
        path: '/redirect',
        element: <Redirect />,
      },
    ],
  },
]);

const root = document.getElementById('root');
if (!root) throw new Error('Root element is not found.');

createRoot(root).render(<RouterProvider router={router} />);
