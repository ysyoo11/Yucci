import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FakeProductsClient from '../api/fake-products';
import Loading from '../components/core/Loading';
import Button from '../components/ui/Button';
import displayPrice from '../utils/display-price';

import type { Product } from '../types/product';

export default function ItemDetail() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { id } = useParams();

  const getProducts = async () => {
    const client = new FakeProductsClient(); // TODO: Fix it to real data
    return await client.products();
  };

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      const item = data.find((item) => item.id === id);
      setProduct(item);
    });
  }, []);

  if (!product) {
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
