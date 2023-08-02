import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../constant/query-key';
import { getProducts } from '../service/firebase';

import type { ProductCategory } from '../types/product';

const options = {
  staleTime: 1000 * 60 * 5, // 5 min
  refetchOnMount: false,
};

export default function useProducts(category?: ProductCategory) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(
    [QUERY_KEY.PRODUCTS, category],
    () => getProducts(category),
    options
  );

  return {
    products,
    isLoading,
    error,
  };
}
