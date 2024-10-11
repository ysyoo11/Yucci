import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../components/core/Loading';
import Button from '../components/ui/Button';
import { QUERY_KEY } from '../constant/query-key';
import { useAssertiveStore } from '../context/assertives';
import { useAuth } from '../context/auth-context';
import { useCartContext } from '../context/cart-context';
import { getProductDetail } from '../service/firebase';
import { Product } from '../types/product';
import displayPrice from '../utils/display-price';

export default function ItemDetail() {
  const navigate = useNavigate();
  const [option, setOption] = useState<string | undefined>(undefined);
  const { uid } = useAuth();
  const { id } = useParams();
  const { data: product, isLoading } = useQuery(
    [QUERY_KEY.PRODUCT_DETAIL, id],
    () => getProductDetail(id!),
    {
      staleTime: 1000 * 60 * 5, // 5 min
      refetchOnMount: false,
    }
  );
  const { addOrUpdateCart, hasSameItemInCart } = useCartContext();
  const { showNoti } = useAssertiveStore();

  const handleAddToCart = useCallback(
    (product: Product) => {
      if (!uid) {
        navigate('/signin');
        return;
      }
      if (option) {
        if (
          hasSameItemInCart({ ...product, quantity: 1, selectedOption: option })
        ) {
          showNoti({ title: 'The item is already in the cart.' });
          return;
        }
        addOrUpdateCart.mutate({
          ...product,
          selectedOption: option,
          quantity: 1,
        });
        showNoti({ title: 'The item is added to the cart.' });
      }
    },
    [option, uid]
  );

  useEffect(() => {
    if (product) {
      setOption(product.options[0]);
    }
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className='min-h-[70vh] w-full'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-sm px-4 md:max-w-lg lg:flex lg:max-w-7xl'>
      <div className='py-6 lg:w-full'>
        <img
          src={product.imageURL}
          alt={product.title}
          width={540}
          height={540}
        />
      </div>
      <div className='space-y-2 lg:w-full'>
        <p className='text-center font-bold uppercase'>{product.title}</p>
        <p className='text-center font-bold'>{displayPrice(product.price)}</p>
        <div className='flex items-center justify-center space-x-2'>
          <label htmlFor='option'>Option:</label>
          <select
            name='option'
            id='option'
            className='border border-gray-200 px-2 py-1 text-sm disabled:bg-gray-300'
            onChange={(e) => setOption(e.target.value)}
            required
            value={option}
          >
            {product.options.map((option, idx) => (
              <option key={`option-${idx}`}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <Button
            full
            className='mt-10'
            onClick={() => handleAddToCart(product)}
            disabled={option === undefined}
          >
            add to cart
          </Button>
          <p className='mt-6'>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
