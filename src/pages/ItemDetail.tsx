import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FakeProductsClient from '../api/products';
import Button from '../components/ui/Button';
import displayPrice from '../utils/display-price';

type Product = {
  name: string;
  price: number;
  imageSrc: string;
  id: string;
  description: string;
};

export default function ItemDetail() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { id } = useParams();

  const getProducts = async () => {
    const client = new FakeProductsClient();
    return await client.products();
  };

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      const item = data.find((item) => item.id === id);
      setProduct(item);
    });
  }, []);

  if (!product) {
    return <p>loading...</p>;
  }

  return (
    <div className='mx-auto max-w-sm px-4 md:max-w-lg lg:flex lg:max-w-7xl'>
      <div className='py-10 lg:w-full'>
        <img src={product.imageSrc} alt={product.name} />
      </div>
      <div className='lg:w-full'>
        <p className='text-center font-bold uppercase'>{product.name}</p>
        <p className='text-center font-bold'>
          AU$ {displayPrice(product.price)}
        </p>
        <Button full className='mt-10'>
          add to cart
        </Button>
        <p className='mt-6'>{product.description}</p>
      </div>
    </div>
  );
}
