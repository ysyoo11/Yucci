import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '../constant/query-key';
import { useAssertiveStore } from '../context/assertives';
import { useAuth } from '../context/auth-context';
import { type CartItem } from '../context/cart-context';
import { type UserInfo } from '../pages/Checkout';
import { addOrder, getOrders } from '../service/firebase';

export default function useOrder() {
  const { uid } = useAuth();
  const { showNoti, showAlert } = useAssertiveStore();

  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery(
    [QUERY_KEY.ORDERS, uid],
    () => (uid ? getOrders(uid) : null),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
    }
  );

  const submitOrder = useMutation(
    ({
      uid,
      userInfo,
      items,
    }: {
      uid: string;
      userInfo: UserInfo;
      items: CartItem[];
    }) => addOrder(uid, userInfo, items),
    {
      onSuccess: () => {
        showNoti({ title: 'Your order has been placed!' });
        queryClient.invalidateQueries([QUERY_KEY.ORDERS, uid]);
      },
      onError: (e: any) => showAlert(e),
    }
  );

  return {
    orders,
    isLoading,
    submitOrder,
  };
}
