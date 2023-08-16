import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Loading from '../components/core/Loading';
import ProductsDisplay from '../components/custom/ProductsDisplay';
import { QUERY_KEY } from '../constant/query-key';
import { searchProducts } from '../service/firebase';

export default function Search() {
  const { q } = useParams();
  const { data: products, isLoading } = useQuery(
    [QUERY_KEY.SEARCH, q],
    () => (q ? searchProducts(q) : null),
    {
      staleTime: 1000 * 60 * 5, // 5 min
      refetchOnMount: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (products && products.length === 0) {
    return (
      <div className='mx-auto w-full max-w-7xl space-y-4 px-4 pt-6 text-center font-light'>
        <p className='text-lg uppercase tracking-wider lg:text-xl'>
          no results were found for &quot;{q}&quot;
        </p>
        <p className='text-sm'>Please try a different search.</p>
      </div>
    );
  }

  return (
    <>
      {products && (
        <>
          <div className='w-full border-t py-3 text-center font-bold lg:text-lg'>
            &quot;{q}&quot;&nbsp;({products.length})
          </div>
          <ProductsDisplay products={products} />
        </>
      )}
    </>
  );
}
