import { HeartIcon } from '@heroicons/react/24/outline';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAssertiveStore } from '../context/assertives';
import displayPrice from '../utils/display-price';

const dummyWomenProducts = [
  {
    name: 'gucci horsebit 1955 mini bag',
    price: 2320,
    imageSrc: '../images/products/mini-bag.webp',
    id: '1',
  },
  {
    name: 'denim dress with web detail',
    price: 2800,
    imageSrc: '../images/products/denim-dress.jpeg',
    id: '2',
  },
];

const dummyMenProducts = [
  {
    name: 'mini gg canvas medium backpack',
    price: 3590,
    imageSrc: '../images/products/mens-bag.webp',
    id: '1',
  },
  {
    name: 'oxford cotton shirt with embroidery',
    price: 1200,
    imageSrc: '../images/products/mens-shirt.webp',
    id: '2',
  },
];

export default function Products() {
  const [products, setProducts] = useState(dummyWomenProducts);
  const navigate = useNavigate();
  const params = useParams();
  const { showNoti } = useAssertiveStore();

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();
    showNoti({
      title: '🛠 Like feature is not developed yet.',
      variant: 'alert',
    });
  };

  useEffect(() => {
    switch (params.category) {
      case 'women':
        setProducts(dummyWomenProducts);
        break;
      case 'men':
        setProducts(dummyMenProducts);
        break;
      default:
        throw new Error('Cannot find the page');
    }
  }, [params.category]);

  return (
    <>
      <div
        className='relative h-96 w-full bg-cover bg-center lg:h-[40vh]'
        style={{
          backgroundImage: `url(../images/hero/products/hero-${params.category}.jpg)`,
        }}
      >
        <div className='absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 space-y-4 text-center text-white'>
          <p className='text-3xl uppercase'>{params.category}</p>
        </div>
        <div className='h-full w-full bg-black/20' />
      </div>
      <section className='grid grid-cols-2 gap-[1px] border bg-gray-200 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((item) => (
          <div
            key={item.id}
            className='relative bg-white p-4 pb-16 pt-20 hover:cursor-pointer'
            onClick={() => navigate(`/item/${item.id}`)}
          >
            <div className='mx-auto w-2/3'>
              <img src={item.imageSrc} alt={item.name} />
            </div>
            <p className='text-center text-xs font-bold uppercase lg:text-sm'>
              {item.name}
            </p>
            <div className='absolute bottom-3 left-1/2 -translate-x-1/2'>
              <p className='mt-8 text-center'>AU$ {displayPrice(item.price)}</p>
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
    </>
  );
}
