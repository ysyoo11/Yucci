import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { LOCAL_STORAGE_KEY } from '../constant/local-storage-key';
import { Product } from '../types/product';

type CartItem = Product & {
  quantity: number;
  selectedOption: string;
};

type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = {
  cartItems: [],
};

export const CartContext = createContext<CartState>(initialState);

export type CartStore = CartState & {
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (product: Product, selectedOption: string) => void;
  deleteFromCart: (product: Product) => void;
  total: {
    quantity: number;
    price: number;
  };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const total = useMemo(() => {
    const quantity = cartItems
      .map(({ quantity }) => quantity)
      .reduce((a, b) => a + b, 0);
    const price = cartItems
      .map(({ price, quantity }) => price * quantity)
      .reduce((a, b) => a + b, 0);
    return { quantity, price };
  }, [cartItems]);

  const addToCart = (product: Product, selectedOption: string) => {
    if (cartItems.find((item) => item.id === product.id)) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }
    setCartItems((prev) => [
      ...prev,
      { ...product, quantity: 1, selectedOption },
    ]);
  };

  const deleteFromCart = (product: Product) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  useEffect(() => {
    const storedValue = window.localStorage.getItem(
      LOCAL_STORAGE_KEY.CART_ITEMS
    );
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue) as CartItem[];
      const parsedItems = parsedValue.map((product) => ({
        ...product,
        price: +product.price,
      }));
      setCartItems(parsedItems);
      return;
    }
    setCartItems([]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.CART_ITEMS,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const value = useMemo<CartStore>(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      deleteFromCart,
      total,
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
