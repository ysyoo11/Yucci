import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import { ENV } from '../utils/env';

import type { Product, ProductCategory, ProductInfo } from '../types/product';

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

export async function getProductDetail(id: string) {
  return await getProducts() //
    .then((products) => products.find((item) => item.id === id));
}

export default firebaseApp;
