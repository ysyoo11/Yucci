import { XMarkIcon } from '@heroicons/react/24/outline';
import { MouseEvent } from 'react';

import Button from '../components/ui/Button';
import { useAssertiveStore } from '../context/assertives';
import { useAuth } from '../context/auth-context';
import { useCartContext } from '../context/cart-context';
import useSavedItems from '../hooks/use-saved-items';
import { Product } from '../types/product';
import displayPrice from '../utils/display-price';

export default function SavedItems() {
  const { savedItems, removeLike } = useSavedItems();
  const { addOrUpdateCart, cartItems } = useCartContext();
  const { uid } = useAuth();
  const { showNoti } = useAssertiveStore();

  const hasItemInCart = (productId: string) =>
    cartItems && !!cartItems.find(({ id }) => id === productId);

  const handleRemove = (e: MouseEvent, productId: string) => {
    if (!uid) return;
    e.stopPropagation();
    removeLike.mutate({ uid, productId });
  };

  const handleAddToBag = (product: Product) => {
    addOrUpdateCart.mutate({
      ...product,
      selectedOption: product.options[0],
      quantity: 1,
    });
    showNoti({ title: 'The item is added to the cart.' });
  };

  return (
    <>
      <div className='flex flex-col items-center pb-16 pt-4'>
        <h1 className='text-3xl font-light uppercase tracking-wide lg:text-7xl'>
          saved items
        </h1>
        <div className='my-5 h-px w-40 bg-black' />
        {savedItems && (
          <p className='lg:text-xl'>
            You have {savedItems.length} item
            {savedItems.length === 1 ? '' : 's'} in Saved Items.
          </p>
        )}
      </div>
      <section>
        {savedItems && savedItems.length > 0 && (
          <ul className='grid w-full grid-cols-2 gap-px border-y bg-gray-300 md:grid-cols-3 lg:grid-cols-4'>
            {savedItems.map((item) => (
              <li
                key={item.id}
                className='relative flex h-full w-full flex-col items-center justify-between bg-white px-4 py-4 lg:pb-10'
              >
                <div className='flex justify-center p-4'>
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    width={540}
                    height={540}
                  />
                </div>
                <div className='space-y-2'>
                  <p className='text-center text-xs font-bold uppercase md:text-sm lg:text-base'>
                    {item.title}
                  </p>
                  <p className='text-center text-xs md:text-sm lg:text-base'>
                    {displayPrice(item.price)}
                  </p>
                </div>
                <Button
                  className='mt-4 lg:hidden'
                  full
                  onClick={() => handleAddToBag(item)}
                  disabled={hasItemInCart(item.id)}
                >
                  {hasItemInCart(item.id) ? 'added to bag' : 'add to bag'}
                </Button>
                <Button
                  className='mt-4 hidden lg:block'
                  onClick={() => handleAddToBag(item)}
                  disabled={hasItemInCart(item.id)}
                  size='base'
                >
                  {hasItemInCart(item.id) ? 'added to bag' : 'add to bag'}
                </Button>
                <button
                  className='group absolute right-2 top-2 lg:right-4 lg:top-4'
                  onClick={(e) => handleRemove(e, item.id)}
                >
                  <XMarkIcon className='h-5 w-5 stroke-2 text-gray-400 transition-colors group-hover:text-gray-900 lg:h-7 lg:w-7' />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
