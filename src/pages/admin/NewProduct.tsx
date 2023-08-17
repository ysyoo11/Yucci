import { FormEvent, useCallback, useEffect, useState } from 'react';

import Loading from '../../components/core/Loading';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/TextArea';
import { useAssertiveStore } from '../../context/assertives';
import useProducts from '../../hooks/use-products';
import { uploadToCloudinary } from '../../service/cloudinary';
import { ProductCategory, ProductInfo, categories } from '../../types/product';
import { getImageURL } from '../../utils/image';

const initialProductInfo: ProductInfo = {
  title: '',
  category: categories[0],
  price: '',
  options: '',
  description: '',
  imageFile: null,
};

type LoadingVariant = 'imagePreview' | 'submit' | null;

export default function NewProduct() {
  const [productInfo, setProductInfo] =
    useState<ProductInfo>(initialProductInfo);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState('');
  const [loading, setLoading] = useState<LoadingVariant>(null);
  const { showNoti, showAlert } = useAssertiveStore();
  const { addNewProduct } = useProducts();

  const showPreview = useCallback(async () => {
    if (!imageFile) {
      setPreviewURL('');
      return;
    }
    setLoading('imagePreview');
    await getImageURL(imageFile)
      .then((url) => setPreviewURL(url))
      .catch(showAlert)
      .finally(() => setLoading(null));
  }, [imageFile]);

  const initialize = () => {
    setImageFile(null);
    setPreviewURL('');
    setProductInfo(initialProductInfo);
  };

  const handleSubmit = async (e: FormEvent) => {
    if (!imageFile) return;
    e.preventDefault();
    try {
      setLoading('submit');
      await uploadToCloudinary(imageFile)
        .then((imageURL) => addNewProduct.mutate({ productInfo, imageURL }))
        .then(() => showNoti({ title: 'The product is added' }));
    } catch (e: any) {
      showAlert(e);
      console.error(e);
    } finally {
      setLoading(null);
      initialize();
    }
  };

  useEffect(() => {
    showPreview();
  }, [showPreview]);

  return (
    <div className='mx-auto max-w-2xl px-4 pb-20 pt-6'>
      <h1 className='text-center text-3xl font-bold'>Add New Product</h1>
      {loading && (
        <div className='relative h-96'>
          <Loading />
        </div>
      )}
      {imageFile && previewURL && !loading && (
        <div className='mt-10 flex justify-center'>
          <img
            src={previewURL}
            alt='Uploaded image preview'
            className='h-full max-h-[40vh]'
          />
        </div>
      )}
      <form
        action='submit'
        onSubmit={handleSubmit}
        className='mt-10 w-full space-y-4'
      >
        <input
          type='file'
          accept='image/png, image/jpeg, image/jpg, image/webp, image/heic, image/avif'
          className='w-full border border-black p-6 disabled:bg-gray-300'
          onChange={(e) => {
            setImageFile(null);
            setPreviewURL('');
            if (e.target.files) {
              setImageFile(e.target.files[0]);
            }
          }}
          disabled={loading === 'submit'}
          required
          name='imageFile'
        />
        <div className='space-y-1'>
          <label htmlFor='category'>Category:</label>
          <select
            name='category'
            id='category'
            className='w-full border border-black p-2 disabled:bg-gray-300'
            onChange={(e) =>
              setProductInfo((prev) => ({
                ...prev,
                category: e.target.value as ProductCategory,
              }))
            }
            disabled={loading === 'submit'}
            value={productInfo.category}
            required
          >
            {categories.map((category, idx) => (
              <option key={`category-${idx}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <Input
          placeholder='Title'
          onChange={(e) =>
            setProductInfo((prev) => ({ ...prev, title: e.target.value }))
          }
          id='title'
          value={productInfo.title}
          name='title'
        />
        <Input
          type='number'
          placeholder='Price'
          onChange={(e) =>
            setProductInfo((prev) => ({ ...prev, price: e.target.value }))
          }
          id='price'
          value={productInfo.price}
          name='price'
        />
        <Input
          placeholder='Size options'
          onChange={(e) =>
            setProductInfo((prev) => ({ ...prev, options: e.target.value }))
          }
          id='options'
          name='options'
          value={productInfo.options}
        />
        <Textarea
          placeholder='Description'
          onChange={(e) =>
            setProductInfo((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          id='description'
          value={productInfo.description}
          name='description'
        />
        <Button
          full
          disabled={
            Object.values(productInfo).includes('') ||
            !imageFile ||
            loading === 'submit'
          }
        >
          {loading ? 'Loading...' : 'Add'}
        </Button>
      </form>
    </div>
  );
}
