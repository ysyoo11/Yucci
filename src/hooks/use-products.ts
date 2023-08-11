import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { QUERY_KEY } from '../constant/query-key';
import { addProduct, getProducts } from '../service/firebase';

import type { ProductCategory, ProductInfo } from '../types/product';

const options = {
  staleTime: 1000 * 60 * 5, // 5 min
  refetchOnMount: false,
};

export default function useProducts() {
  const { category } = useParams();

  const queryClient = useQueryClient();

  const productsQuery = useQuery(
    [QUERY_KEY.PRODUCTS, category],
    () => getProducts(category as ProductCategory),
    options
  );

  const addNewProduct = useMutation(
    ({
      productInfo,
      imageURL,
    }: {
      productInfo: ProductInfo;
      imageURL: string;
    }) => addProduct({ ...productInfo, imageURL }),
    {
      onSuccess: () => queryClient.invalidateQueries([QUERY_KEY.PRODUCTS]),
    }
  );

  return {
    productsQuery,
    addNewProduct,
  };
}
