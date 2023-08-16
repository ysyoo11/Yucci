import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import { CartItem } from '../context/cart-context';
import { type UserInfo } from '../pages/Checkout';
import { ENV } from '../utils/env';

import type {
  Order,
  Product,
  ProductCategory,
  ProductInfo,
} from '../types/product';

const firebaseConfig = {
  apiKey: ENV.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${ENV.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: ENV.REACT_APP_FIREBASE_DB_URL,
  projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.REACT_APP_FIREBASE_APP_ID,
  measurementId: ENV.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase();

type ProductInfoWithImageURL = ProductInfo & {
  imageURL: string;
};

export function addProduct(productInfo: ProductInfoWithImageURL) {
  const id = uuid();
  const options = productInfo.options.split(',').map((item) => item.trim());
  return set(ref(db, `products/${productInfo.category}/${id}`), {
    ...productInfo,
    options,
    id,
    price: +productInfo.price,
  });
}

export async function getProducts(category?: ProductCategory) {
  return get(ref(db, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (category) {
          const products = Object.values(
            snapshot.child(category).val()
          ) as Product[];
          return products;
        }
        let productArr: Product[] = [];
        snapshot.forEach((item) => {
          const tempArr = Object.values(item.val() as Product[]);
          productArr = productArr.concat(tempArr);
        });
        return productArr;
      }
      return [];
    });
}

export async function searchProducts(keyword: string) {
  return await getProducts() //
    .then((products) =>
      products.filter((item) => item.title.toLowerCase().includes(keyword))
    );
}

export async function getProductDetail(id: string) {
  return await getProducts() //
    .then((products) => products.find((item) => item.id === id));
}

export async function addOrUpdateCart(userId: string, product: CartItem) {
  return set(
    ref(db, `carts/${userId}/${product.id}_${product.selectedOption}`),
    product
  );
}

export async function removeFromCart(
  userId: string,
  productId: string,
  productOption: string
) {
  return remove(ref(db, `carts/${userId}/${productId}_${productOption}`));
}

export async function emptyCart(userId: string) {
  return remove(ref(db, `carts/${userId}`));
}

export async function getCart(userId: string): Promise<CartItem[]> {
  return get(ref(db, `carts/${userId}`)) //
    .then((snapshot) =>
      snapshot.exists() ? Object.values(snapshot.val()) : []
    );
}

export async function saveItem(userId: string, product: Product) {
  return set(ref(db, `saved-items/${userId}/${product.id}`), product);
}

export async function getSavedItems(userId: string): Promise<Product[]> {
  return get(ref(db, `saved-items/${userId}`)) //
    .then((snapshot) =>
      snapshot.exists() ? Object.values(snapshot.val()) : []
    );
}

export async function removeFromSavedItems(userId: string, productId: string) {
  return remove(ref(db, `saved-items/${userId}/${productId}`));
}

export async function addOrder(
  userId: string,
  userInfo: UserInfo,
  items: CartItem[]
) {
  const id = uuid();
  return set(ref(db, `orders/${userId}/${id}`), {
    id,
    userInfo,
    items,
  });
}

export async function getOrders(userId: string): Promise<Order[]> {
  return get(ref(db, `orders/${userId}`)) //
    .then((snapshot) =>
      snapshot.exists() ? Object.values(snapshot.val()) : []
    );
}

export default firebaseApp;
