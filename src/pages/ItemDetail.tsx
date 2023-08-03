import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Loading from '../components/core/Loading';
import Button from '../components/ui/Button';
import { QUERY_KEY } from '../constant/query-key';
import { getProductDetail } from '../service/firebase';
import displayPrice from '../utils/display-price';

export default function ItemDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery(
    [QUERY_KEY.PRODUCT_DETAIL, id],
    () => getProductDetail(id!),
    {
      staleTime: 1000 * 60 * 5, // 5 min
      refetchOnMount: false,
    }
  );

  if (isLoading || !product) {
    return <Loading />;
  }

  return (
    <div className='mx-auto max-w-sm px-4 md:max-w-lg lg:flex lg:max-w-7xl'>
      <div className='py-10 lg:w-full'>
        <img src={product.imageURL} alt={product.title} />
      </div>
      <div className='lg:w-full'>
        <p className='text-center font-bold uppercase'>{product.title}</p>
        <p className='text-center font-bold'>{displayPrice(product.price)}</p>
        <Button full className='mt-10'>
          add to cart
        </Button>
        <p className='mt-6'>{product.description}</p>
      </div>
    </div>
  );
}
