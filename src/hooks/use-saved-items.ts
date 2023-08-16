import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '../constant/query-key';
import { useAssertiveStore } from '../context/assertives';
import { useAuth } from '../context/auth-context';
import {
  getSavedItems,
  removeFromSavedItems,
  saveItem,
} from '../service/firebase';
import { Product } from '../types/product';

export default function useSavedItems() {
  const { uid } = useAuth();
  const { showNoti } = useAssertiveStore();

  const queryClient = useQueryClient();

  const { data: savedItems, isLoading } = useQuery(
    [QUERY_KEY.SAVED_ITEMS, uid],
    () => (uid ? getSavedItems(uid) : null),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
    }
  );

  const likeItem = useMutation(
    ({ uid, product }: { uid: string; product: Product }) =>
      saveItem(uid, product),
    {
      onSuccess: () => {
        showNoti({ title: 'The item is saved in your list.' });
        queryClient.invalidateQueries([QUERY_KEY.SAVED_ITEMS, uid]);
      },
    }
  );

  const removeLike = useMutation(
    ({ uid, productId }: { uid: string; productId: string }) =>
      removeFromSavedItems(uid, productId),
    {
      onSuccess: () => {
        showNoti({ title: 'The item is removed from your list.' });
        queryClient.invalidateQueries([QUERY_KEY.SAVED_ITEMS, uid]);
      },
    }
  );

  return {
    savedItems,
    isLoading,
    likeItem,
    removeLike,
  };
}
