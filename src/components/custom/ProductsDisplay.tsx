import { HeartIcon } from '@heroicons/react/24/outline';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAssertiveStore } from '../../context/assertives';
import { Product } from '../../types/product';
import displayPrice from '../../utils/display-price';

type Props = {
  products: Product[];
};

export default function ProductsDisplay({ products }: Props) {
  const navigate = useNavigate();
  const { showNoti } = useAssertiveStore();

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();
    showNoti({
      title: '🛠 Like feature is not developed yet.',
      variant: 'alert',
    });
  };

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
            onClick={handleLikeClick}
          >
            <HeartIcon className='h-4 w-4 stroke-2 transition-transform group-hover:scale-110' />
          </button>
        </div>
      ))}
    </section>
  );
}
