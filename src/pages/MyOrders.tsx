import { useNavigate } from 'react-router-dom';

import Loading from '../components/core/Loading';
import Banner from '../components/custom/Banner';
import Button from '../components/ui/Button';
import useOrder from '../hooks/use-order';
import parseDateTime from '../utils/parse-date-time';

export default function MyOrders() {
  const { orders, isLoading } = useOrder();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <>
      <Banner
        title='order history'
        bgURL='../images/hero/cart/cart-hero.webp'
      />
      <div className='mx-auto mt-10 w-full max-w-7xl px-4'>
        {orders && orders.length === 0 && (
          <div className='mt-10 flex flex-col items-center'>
            <h2 className='text-xl lg:text-3xl'>No Orders</h2>
            <div className='my-5 h-px w-20 bg-black' />
            <p className='mb-10 mt-4 lg:text-lg'>You have no orders to view.</p>
            <Button onClick={() => navigate('/products')}>
              continue shopping
            </Button>
          </div>
        )}
        <h1 className='text-xl font-bold'>Orders</h1>
        {orders && orders.length > 0 && (
          <ul className='mt-4 divide-y border-y'>
            {orders.map(({ id, isCreatedAt, items, userInfo }) => (
              <li key={id} className='flex items-center justify-between py-4'>
                <div className='text-xs lg:text-base'>
                  <div className='space-x-1'>
                    <span className='font-bold'>Order No.:</span>
                    <span>{id}</span>
                  </div>
                  <div className='space-x-1'>
                    <span className='font-bold'>Order Date:</span>
                    <span>{parseDateTime(isCreatedAt)}</span>
                  </div>
                  <div className='space-x-1'>
                    <span className='font-bold'>Number of items:</span>
                    <span>{items.length}</span>
                  </div>
                </div>
                <div className='h-12'>
                  <Button
                    onClick={() =>
                      navigate(`/my-orders/${id}`, {
                        state: { id, isCreatedAt, items, userInfo },
                      })
                    }
                    size='xs'
                  >
                    detail
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
