import { useNavigate } from 'react-router-dom';

import Banner from '../components/custom/Banner';
import Button from '../components/ui/Button';
import { useCartContext } from '../context/cart-context';
import displayPrice from '../utils/display-price';

const MAX_PURCHASE_QTY = 4;

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    deleteFromCart,
    total: { price },
  } = useCartContext();

  const navigate = useNavigate();

  return (
    <div className='pb-20'>
      <Banner title='shopping bag' bgURL='../images/hero/cart/cart-hero.webp' />
      <div className='mx-auto mt-10 max-w-7xl space-y-6 px-6 lg:hidden'>
        <h2 className='text-center text-2xl font-light'>
          Shopping Bag ({cartItems.length})
        </h2>
        <hr />
        <div className='px-10'>
          <Button full size='sm' onClick={() => navigate('/checkout')}>
            checkout
          </Button>
        </div>
      </div>
      <div className='lg:mt-10 lg:flex'>
        <section className='mx-auto mt-8 w-full max-w-7xl border-y border-gray-300 py-4 lg:mt-0 lg:border-y-0 lg:px-6'>
          <h6 className='hidden text-xs font-bold uppercase lg:block'>
            your selections
          </h6>
          <hr className='my-4 hidden lg:block' />
          <ul className='divide-y'>
            {cartItems.map((item) => (
              <li key={item.id} className='py-6'>
                <div className='mx-auto flex w-full max-w-sm flex-col items-center lg:max-w-none lg:flex-row lg:items-start lg:justify-between'>
                  <div className='lg:flex lg:basis-2/3'>
                    <div className='lg:basis-1/3'>
                      <img src={item.imageURL} alt={item.title} />
                    </div>
                    <div className='flex flex-col items-center lg:items-start lg:justify-between'>
                      <h5 className='max-w-[14rem] text-center text-lg uppercase lg:text-left lg:text-base'>
                        {item.title}
                        <span className='hidden font-bold lg:block'>
                          ({item.selectedOption})
                        </span>
                      </h5>
                      <h6 className='text-center text-sm font-bold lg:hidden'>
                        ({item.selectedOption})
                      </h6>
                      <button
                        className='mt-6 hidden text-sm font-bold uppercase underline hover:no-underline lg:block'
                        onClick={() => deleteFromCart(item)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col lg:flex-col-reverse'>
                    <span className='py-4 text-lg lg:py-1'>
                      {displayPrice(item.price * item.quantity)}
                    </span>
                    <div className='flex items-center space-x-2'>
                      <label htmlFor='category' className='text-sm'>
                        QTY:
                      </label>
                      <select
                        name='category'
                        id='category'
                        className='border border-gray-200 px-2 py-1 text-sm disabled:bg-gray-300'
                        onChange={(e) => {
                          setCartItems((prev) =>
                            prev.map((i) =>
                              i.id === item.id
                                ? { ...i, quantity: +e.target.value }
                                : i
                            )
                          );
                        }}
                        required
                        value={item.quantity}
                      >
                        {Array.from(Array(MAX_PURCHASE_QTY).keys()).map(
                          (val) => (
                            <option key={`quantity-${val}`}>{val + 1}</option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <button
                    className='mt-6 text-sm font-bold uppercase underline hover:no-underline lg:hidden'
                    onClick={() => deleteFromCart(item)}
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <div className='h-max w-full space-y-5 p-6 lg:mt-4 lg:max-w-sm lg:border'>
          <h6 className='text-xs uppercase'>order summary</h6>
          <hr />
          <div className='space-y-2'>
            <div className='flex items-end justify-between'>
              <span className='text-sm font-bold'>Subtotal</span>
              <span className='text-sm font-bold'>{displayPrice(price)}</span>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-sm font-bold'>Shipping</span>
              <span className='text-sm font-light'>Free</span>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-sm font-bold'>Total</span>
              <span className='text-xl font-light'>{displayPrice(price)}</span>
            </div>
          </div>
          <Button full size='sm' onClick={() => navigate('/checkout')}>
            checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
