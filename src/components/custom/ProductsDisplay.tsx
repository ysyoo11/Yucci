import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';
import useSavedItems from '../../hooks/use-saved-items';
import { Product } from '../../types/product';
import displayPrice from '../../utils/display-price';

type Props = {
  products: Product[];
};

export default function ProductsDisplay({ products }: Props) {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const { likeItem, savedItems, removeLike } = useSavedItems();

  const handleLikeClick = useCallback(
    (e: MouseEvent, product: Product) => {
      e.stopPropagation();
      if (!uid) {
        navigate('/signin');
        return;
      }
      if (savedItems && savedItems.find(({ id }) => id === product.id)) {
        removeLike.mutate({ uid, productId: product.id });
      } else {
        likeItem.mutate({ uid, product });
      }
    },
    [uid, savedItems, likeItem, removeLike]
  );

  return (
    <section className='grid grid-cols-2 gap-[1px] border bg-gray-200 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <div
          key={product.id}
          className='relative bg-white p-4 pb-16 pt-20 hover:cursor-pointer'
          onClick={() => navigate(`/item/${product.id}`)}
        >
          <div className='mx-auto w-2/3'>
            <img src={product.imageURL} alt={product.title} />
          </div>
          <p className='text-center text-xs font-bold uppercase lg:text-sm'>
            {product.title}
          </p>
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2'>
            <p className='mt-8 text-center'>{displayPrice(product.price)}</p>
          </div>
          <button
            className='group absolute right-2 top-4'
            onClick={(e) => handleLikeClick(e, product)}
          >
            {savedItems && savedItems.find((item) => item.id === product.id) ? (
              <FilledHeartIcon className='h-4 w-4 stroke-2 transition-transform group-hover:scale-110' />
            ) : (
              <HeartIcon className='h-4 w-4 stroke-2 transition-transform group-hover:scale-110' />
            )}
          </button>
        </div>
      ))}
    </section>
  );
}
