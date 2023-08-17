import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../components/core/Loading';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/auth-context';
import { useCartContext } from '../context/cart-context';
import useOrder from '../hooks/use-order';
import displayPrice from '../utils/display-price';

export type UserInfo = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
};

const initialState: UserInfo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  suburb: '',
  state: '',
  postcode: '',
  phone: '',
};

export default function Checkout() {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialState);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { user, uid, isLoading } = useAuth();
  const { cartItems, total, emptyCart } = useCartContext();
  const { submitOrder } = useOrder();
  const navigate = useNavigate();

  const requiredFields = useMemo(() => {
    const { address2, ...required } = userInfo;
    return required;
  }, [userInfo]);

  const handleSubmit = () => {
    if (!uid || !cartItems) return;
    submitOrder.mutate({ uid, userInfo, items: cartItems });
    setIsOrderPlaced(true);
    emptyCart.mutate({ uid });
  };

  useEffect(() => {
    if ((!cartItems || cartItems.length === 0) && !isOrderPlaced) {
      navigate('/cart');
    }
  }, [cartItems, isOrderPlaced]);

  if (!user || isLoading)
    return (
      <div className='min-h-[70vh] w-full'>
        <Loading />
      </div>
    );

  if (isOrderPlaced)
    return (
      <div className='mx-auto w-full max-w-7xl space-y-10 py-20 text-center lg:py-40'>
        <p className='text-2xl font-bold lg:text-4xl'>
          Thank you for your order
        </p>
        <p>Your order has been placed successfully.</p>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );

  return (
    <div className='mx-auto w-full max-w-7xl px-4 lg:mt-4 lg:px-8'>
      <div className='lg:flex lg:space-x-4'>
        <section className='w-full'>
          <div className='space-y-1 border border-gray-300 px-6 py-3 text-xs'>
            <p className='uppercase'>you are checking out as:</p>
            <p>{user.email}</p>
          </div>
          <h2 className='mt-10 text-2xl font-bold uppercase tracking-wide'>
            shipping address
          </h2>
          <div className='space-y-4 py-10'>
            <div className='space-y-4 lg:flex lg:space-x-2 lg:space-y-0'>
              <Input
                placeholder='First Name'
                id='first name'
                value={userInfo.firstName}
                name='first name'
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <Input
                placeholder='Last Name'
                id='last name'
                value={userInfo.lastName}
                name='last name'
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
            <Input
              placeholder='Address 1'
              id='address1'
              value={userInfo.address1}
              name='address1'
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, address1: e.target.value }))
              }
            />
            <Input
              required={false}
              placeholder='Address 2'
              id='address2'
              value={userInfo.address2}
              name='address2'
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, address2: e.target.value }))
              }
            />
            <div className='space-y-4 lg:flex lg:space-x-2 lg:space-y-0'>
              <Input
                placeholder='Suburb'
                id='suburb'
                value={userInfo.suburb}
                name='suburb'
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, suburb: e.target.value }))
                }
              />
              <Input
                placeholder='State'
                id='state'
                value={userInfo.state}
                name='state'
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </div>
            <Input
              placeholder='Postcode'
              id='postcode'
              value={userInfo.postcode}
              name='postcode'
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, postcode: e.target.value }))
              }
            />
            <Input
              placeholder='Phone Number'
              id='phone'
              value={userInfo.phone}
              name='phone'
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div className='mt-10 space-y-4 lg:mt-0'>
            <h6 className='text-sm uppercase tracking-wide'>shipping method</h6>
            <div className='space-y-2 border border-black px-4 py-3'>
              <div className='flex items-center justify-between text-xs'>
                <p>Express</p>
                <p>You will be notified when your item is shipped.</p>
              </div>
              <p className='text-sm font-bold'>Free</p>
            </div>
          </div>
        </section>
        <section className='mt-10 w-full p-5 lg:mt-0 lg:h-max lg:max-w-[24rem] lg:shrink-0 lg:border'>
          <h2 className='text-2xl font-bold uppercase tracking-wide lg:hidden'>
            order detail
          </h2>
          <div className='hidden items-center justify-center space-x-1 lg:flex'>
            <ShoppingBagIcon className='h-5 w-5 stroke-2' />
            <span className='text-lg'>
              {cartItems?.length} item{cartItems?.length === 1 ? '' : 's'}
            </span>
          </div>
          <ul className='mt-4 divide-y border-y'>
            {cartItems!.map((item) => (
              <li key={item.id} className='flex space-x-6 py-6'>
                <div className='basis-1/5'>
                  <img src={item.imageURL} alt={item.title} />
                </div>
                <div className='basis-3/5 text-xs font-bold'>
                  <p className='text-sm uppercase'>{item.title}</p>
                  <span className='text-sm'>({item.selectedOption})</span>
                </div>
                <div className='flex basis-1/5 flex-col justify-between text-right text-xs'>
                  <p>QTY: {item.quantity}</p>
                  <p className='font-bold'>
                    {displayPrice(item.price * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className='space-y-3 py-4 text-sm font-bold'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>{displayPrice(total.price)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>Free (Express)</span>
            </div>
            <div className='flex justify-between'>
              <span>Total</span>
              <span>{displayPrice(total.price)}</span>
            </div>
          </div>
          <Button
            className='mt-4'
            full
            onClick={handleSubmit}
            disabled={Object.values(requiredFields).includes('')}
          >
            place order
          </Button>
        </section>
      </div>
    </div>
  );
}
