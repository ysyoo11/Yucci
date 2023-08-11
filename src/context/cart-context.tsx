import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { QUERY_KEY } from '../constant/query-key';
import {
  addOrUpdateCart as addOrUpdateCartFB,
  getCart,
  removeFromCart as removeFromCartFB,
} from '../service/firebase';
import { Product } from '../types/product';

import { useAssertiveStore } from './assertives';
import { useAuth } from './auth-context';

export type CartItem = Product & {
  quantity: number;
  selectedOption: string;
};

type CartState = {
  cartItems?: CartItem[];
  isLoading: boolean;
  error: any;
};

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

export const CartContext = createContext<CartState>(initialState);

export type CartStore = CartState & {
  addOrUpdateCart: UseMutationResult<void, unknown, CartItem, unknown>;
  removeFromCart: UseMutationResult<
    void,
    unknown,
    {
      productId: string;
      productOption: string;
    },
    unknown
  >;
  getCart: (userId: string) => Promise<CartItem[]>;
  total: {
    quantity: number;
    price: number;
  };
  hasSameItemInCart: (product: CartItem) => boolean;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { showNoti } = useAssertiveStore();
  const { user, uid } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: cartItems,
    error,
    isLoading,
  } = useQuery([QUERY_KEY.CART_ITEMS, uid], () => getCart(uid || ''), {
    enabled: !!uid,
  });

  const total = useMemo(
    () =>
      cartItems
        ? {
            quantity: cartItems
              .map(({ quantity }) => quantity)
              .reduce((a, b) => a + b, 0),
            price: cartItems
              .map(({ price, quantity }) => price * quantity)
              .reduce((a, b) => a + b, 0),
          }
        : {
            quantity: 0,
            price: 0,
          },
    [cartItems]
  );

  const hasSameItemInCart = useCallback(
    (product: CartItem) =>
      cartItems &&
      cartItems.find(
        ({ id, selectedOption }) =>
          id === product.id && selectedOption === product.selectedOption
      )
        ? true
        : false,
    [cartItems]
  );

  const addOrUpdateCart = useMutation(
    (product: CartItem) => addOrUpdateCartFB(uid || '', product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.CART_ITEMS, uid]);
      },
    }
  );

  const removeFromCart = useMutation(
    ({
      productId,
      productOption,
    }: {
      productId: string;
      productOption: string;
    }) => {
      showNoti({ title: 'The item is removed from the cart.' });
      return removeFromCartFB(uid || '', productId, productOption);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.CART_ITEMS, uid]);
      },
    }
  );

  useEffect(() => {
    if (user) {
      getCart(user.uid);
    }
  }, [user]);

  const value = useMemo<CartStore>(
    () => ({
      cartItems,
      error,
      isLoading,
      addOrUpdateCart,
      removeFromCart,
      getCart,
      total,
      hasSameItemInCart,
    }),
    [cartItems, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCartContext must be used within CartProvider.');
  return context as CartStore;
};
