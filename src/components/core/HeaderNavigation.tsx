import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';

// TODO: Make onClick action
const userMenu = [
  {
    name: 'sign in',
    onClick: () => {},
  },
  {
    name: 'my orders',
    onClick: () => {},
  },
  {
    name: 'account settings',
    onClick: () => {},
  },
  {
    name: 'saved items',
    onClick: () => {},
  },
];

export default function HeaderNavigation() {
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
            <Menu.Items className='absolute right-0 mt-2 w-[90vw] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:w-56'>
              <div className='flex flex-col px-1 py-4'>
                {userMenu.map((item, idx) => (
                  <Menu.Item key={`item-${item.name}-${idx}`}>
                    <button
                      className={clsx(
                        'w-full rounded-md px-2 py-4 text-left text-sm font-semibold uppercase hover:bg-gray-200 lg:px-4 lg:text-base'
                      )}
                    >
                      {item.name}
                    </button>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <li>
          <button>
            <MagnifyingGlassIcon className='h-5 w-5 stroke-[1.5px]' />
          </button>
        </li>
        <li>
          <button>
            <Bars3Icon className='h-5 w-5 stroke-[1.5px]' />
          </button>
        </li>
      </ul>
    </nav>
  );
}
