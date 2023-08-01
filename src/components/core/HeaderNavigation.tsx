import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';
import MenuModal from '../custom/MenuModal';
import SearchModal from '../custom/SearchModal';

type ModalType = 'trolley' | 'search' | 'menu';

const userMenu = [
  {
    name: 'my account',
    href: 'my-account',
  },
  {
    name: 'my orders',
    href: '/my-orders',
  },
  {
    name: 'account settings',
    href: '/account-settings',
  },
  {
    name: 'saved items',
    href: '/saved-items',
  },
] as const;

export default function HeaderNavigation() {
  const [showModal, setShowModal] = useState<ModalType | null>(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const closeModal = () => setShowModal(null);

  return (
    <nav className='absolute right-2 top-6 flex'>
      <ul className='flex items-center space-x-4'>
        <li>
          <button>
            <ShoppingBagIcon className='h-5 w-5 stroke-[1.5px]' />
          </button>
        </li>
        <Menu as='li' className='inline-block h-max'>
          <Menu.Button>
            <UserIcon className='h-5 w-5 stroke-[1.5px]' />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-[90vw] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:w-56'>
              <div className='flex flex-col p-2'>
                {!user && (
                  <Menu.Item>
                    <button
                      className={clsx(
                        'w-full rounded-md px-2 py-4 text-left font-semibold uppercase hover:bg-gray-200 lg:px-4 lg:text-base'
                      )}
                      onClick={() => navigate('/signin')}
                    >
                      Sign in
                    </button>
                  </Menu.Item>
                )}
                {userMenu.map((item, idx) => (
                  <Menu.Item key={`item-${item.name}-${idx}`}>
                    <button
                      className={clsx(
                        'w-full rounded-md px-2 py-4 text-left font-semibold uppercase hover:bg-gray-200 lg:px-4 lg:text-base'
                      )}
                      onClick={() => navigate(user ? item.href : '/signin')}
                    >
                      {item.name}
                    </button>
                  </Menu.Item>
                ))}
              </div>
              {user && (
                <div className='flex flex-col space-y-4 p-2'>
                  <hr />
                  <Menu.Item>
                    <button
                      className={clsx(
                        'w-full rounded-md px-2 py-4 text-left text-sm font-semibold uppercase underline underline-offset-2 hover:no-underline lg:px-4 lg:text-base'
                      )}
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
        {user && user.isAdmin && (
          <li>
            <Link to='/admin/new-product'>
              <button>
                <PencilIcon className='h-5 w-5 stroke-[1.5px]' />
              </button>
            </Link>
          </li>
        )}
        <li>
          <button onClick={() => setShowModal('search')}>
            <MagnifyingGlassIcon className='h-5 w-5 stroke-[1.5px]' />
          </button>
        </li>
        <li>
          <button onClick={() => setShowModal('menu')}>
            <Bars3Icon className='h-5 w-5 stroke-[1.5px]' />
          </button>
        </li>
      </ul>
      <SearchModal isOpen={showModal === 'search'} onClose={closeModal} />
      <MenuModal isOpen={showModal === 'menu'} onClose={closeModal} />
    </nav>
  );
}
