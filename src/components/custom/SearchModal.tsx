import { Dialog } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = ['shirt', 'shoes', 'belts'] as const;

export default function SearchModal({ isOpen, onClose }: Props) {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onClose();
    navigate(`/search/${text.toLowerCase()}`);
  };

  const handleTrendingSearch = (keyword: string) => {
    const lowerCaseKeyword = keyword.toLowerCase();
    onClose();
    navigate(`/search/${lowerCaseKeyword}`);
  };

  return (
    <Dialog as='div' className='relative z-[1]' onClose={onClose} open={isOpen}>
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <Dialog.Panel className='relative min-h-screen w-full transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all lg:absolute lg:top-16 lg:min-h-[28rem] lg:max-w-2xl'>
            <form
              className='flex items-center justify-between space-x-4'
              onSubmit={handleSearch}
            >
              <div className='relative z-0 w-full'>
                <input
                  type='text'
                  id='search'
                  className='peer block w-full appearance-none border-0 border-b border-gray-400 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:border-gray-800 focus:outline-none focus:ring-0'
                  placeholder=' '
                  onChange={(e) => setText(e.target.value)}
                />
                <label
                  htmlFor='search'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gray-600'
                >
                  What are you looking for?
                </label>
              </div>
              <button
                onClick={onClose}
                className='p-1 text-sm font-bold uppercase underline underline-offset-2 hover:no-underline'
                type='button'
              >
                cancel
              </button>
            </form>
            <div className='mt-8'>
              <p className='text-xs font-bold uppercase'>trending searches</p>
              <ul className='mt-4 space-y-2'>
                {trendingSearches.map((word, idx) => (
                  <li key={`trending-${word}-${idx}`}>
                    <button
                      onClick={() => handleTrendingSearch(word)}
                      className='flex items-end space-x-2 underline underline-offset-4 hover:no-underline'
                    >
                      <MagnifyingGlassIcon className='stroke-4 h-4 w-4' />
                      <span className='text-sm font-semibold first-letter:uppercase'>
                        {word}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
