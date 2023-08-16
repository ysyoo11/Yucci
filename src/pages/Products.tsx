import { useParams } from 'react-router-dom';

import Loading from '../components/core/Loading';
import Banner from '../components/custom/Banner';
import ProductsDisplay from '../components/custom/ProductsDisplay';
import useProducts from '../hooks/use-products';

export default function Products() {
  const { category } = useParams();
  const {
    productsQuery: { data: products, isLoading },
  } = useProducts();

  return (
    <>
      {/* TODO: Fix background image url logic */}
      <Banner
        title={category || 'All items'}
        bgURL={`../images/hero/products/hero-${category || 'women'}.jpg`}
      />
      {isLoading && (
        <div className='relative h-96'>
          <Loading />
        </div>
      )}
      {products && <ProductsDisplay products={products} />}
    </>
  );
}
