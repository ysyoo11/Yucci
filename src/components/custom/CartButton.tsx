import { Menu, Transition } from '@headlessui/react';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from '../../context/cart-context';
import displayPrice from '../../utils/display-price';
import Button from '../ui/Button';

export default function CartButton() {
  const {
    cartItems,
    removeFromCart,
    total: { quantity },
  } = useCartContext();
  const navigate = useNavigate();

  return (
    <Menu as='li' className='inline-block h-max'>
      {({ close }) => (
        <>
          <Menu.Button className='relative'>
            <ShoppingBagIcon className='h-5 w-5 stroke-[1.5px]' />
            {cartItems && cartItems.length > 0 && (
              <div className='absolute -right-1 -top-1'>
                <div className='relative h-3 w-3 rounded-full bg-gray-800'>
                  <span
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white'
                    style={{ fontSize: '0.65rem' }}
                  >
                    {quantity}
                  </span>
                </div>
              </div>
            )}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-[90vw] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:right-10 lg:w-[32rem]'>
              <div className='relative border-b border-gray-300 py-4'>
                <p className='text-center text-sm font-bold uppercase lg:text-base'>
                  added to shopping bag
                </p>
                <button
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                  onClick={close}
                >
                  <XMarkIcon className='h-4 w-4 stroke-2' />
                </button>
              </div>
              {!cartItems || (cartItems && cartItems.length === 0) ? (
                <div className='w-full py-20'>
                  <p className='text-center'>Your shopping bag is empty.</p>
                </div>
              ) : null}
              {cartItems && cartItems.length > 0 && (
                <>
                  <ul className='h-full max-h-[18rem] overflow-y-auto border-y border-white py-2'>
                    {cartItems.map((item, idx) => (
                      <li
                        key={`${item.id}-${item.selectedOption}-${idx}`}
                        className='relative w-full p-2'
                      >
                        <div className='flex w-full'>
                          <div className='basis-2/5'>
                            <img src={item.imageURL} alt={item.title} />
                          </div>
                          <div className='basis-3/5 space-y-2'>
                            <p className='text-sm font-bold uppercase'>
                              {item.title} ({item.selectedOption})
                            </p>
                            <span className='block text-lg'>
                              {displayPrice(item.price)}
                            </span>
                            <p className='text-xs font-bold'>
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <button
                          className='absolute right-2 top-1/3'
                          onClick={() =>
                            removeFromCart.mutate({
                              productId: item.id,
                              productOption: item.selectedOption,
                            })
                          }
                        >
                          <XMarkIcon className='h-4 w-4 stroke-2 text-gray-500 transition-colors hover:text-gray-700' />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className='space-y-4 border-t border-gray-300 px-6 py-4'>
                    <Button full onClick={() => navigate('/checkout')}>
                      checkout
                    </Button>
                    <Button
                      full
                      color='white'
                      onClick={() => navigate('/cart')}
                    >
                      view shopping bag
                    </Button>
                  </div>
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
