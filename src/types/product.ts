export const categories = ['women', 'men'] as const;
export type ProductCategory = (typeof categories)[number];

export type ProductInfo = {
  title: string;
  category: ProductCategory;
  price: string;
  options: string;
  description: string;
  imageFile: File | null;
};

export type Product = {
  title: string;
  price: number;
  imageURL: string;
  id: string;
  options: string[];
  description: string;
  category: ProductCategory;
};
