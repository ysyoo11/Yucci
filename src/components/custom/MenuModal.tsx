import { Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';
import Logo from '../core/Logo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const generalMenu = [
  {
    name: 'My Orders',
    href: '/my-orders',
  },
] as const;

export default function MenuModal({ isOpen, onClose }: Props) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const menuList = useMemo(
    () => [
      {
        title: 'gifts',
        onClick: () => {},
      },
      {
        title: "what's new",
        onClick: () => {},
      },
      {
        title: 'women',
        onClick: () => {},
      },
      {
        title: 'men',
        onClick: () => {},
      },
    ],
    []
  );
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[2]' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30' />
        </Transition.Child>
        <div className='fixed inset-0 flex justify-end overflow-visible'>
          <div className='flex min-h-full w-full items-center justify-center lg:max-w-xl'>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500 transition transform'
              enterFrom='translate-y-full lg:translate-x-full lg:translate-y-0'
              enterTo='translate-y-0 lg:translate-x-0'
              leave='ease-in-out duration-500 transition transform'
              leaveFrom='translate-y-0 lg:translate-x-0'
              leaveTo='translate-y-full lg:translate-x-full lg:translate-y-0 opacity-0'
            >
              <Dialog.Panel className='flex h-screen w-full transform flex-col bg-white text-left align-middle shadow-xl transition-all lg:pl-12'>
                <div className='relative flex h-full flex-col overflow-y-auto'>
                  <div className='sticky top-0 z-[1] flex h-max items-center justify-between bg-white px-6 py-4'>
                    <Dialog.Title as='div'>
                      <Logo className='w-32 lg:hidden' />
                    </Dialog.Title>
                    <button className='group relative' onClick={onClose}>
                      <div
                        onClick={onClose}
                        className='h-12 w-12 rounded-full bg-black transition-transform duration-500 ease-out group-hover:scale-[85%]'
                      />
                      <XMarkIcon className='absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 stroke-[2.5px] text-white' />
                    </button>
                  </div>

                  <div className='mt-5 space-y-8 px-6'>
                    <ul>
                      {menuList.map(({ title, onClick }, idx) => (
                        <li key={`menu-list-${title}-${idx}`}>
                          <button
                            className='group flex w-full items-center justify-between py-4 pr-2 lg:w-max lg:justify-start lg:space-x-1'
                            onClick={onClick}
                          >
                            <span className='block text-sm font-bold uppercase lg:text-base'>
                              {title}
                            </span>
                            <ChevronRightIcon className='h-3 w-3 stroke-[3px] transition duration-300 group-hover:translate-x-1 lg:opacity-0 lg:group-hover:opacity-100' />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <hr />
                    <ul className='space-y-6'>
                      {!user && (
                        <li>
                          <button
                            className='flex items-center justify-between py-2 underline underline-offset-4 hover:no-underline'
                            onClick={() => navigate('/signin')}
                          >
                            <span className='block font-bold'>Sign in</span>
                          </button>
                        </li>
                      )}
                      {generalMenu.map(({ name, href }, idx) => (
                        <li key={`general-menu-${name}-${idx}`}>
                          <button
                            className='flex items-center justify-between py-2 underline underline-offset-4 hover:no-underline'
                            onClick={() => navigate(user ? href : '/signin')}
                          >
                            <span className='block font-bold'>{name}</span>
                          </button>
                        </li>
                      ))}
                      {user && (
                        <li>
                          <button
                            className='flex items-center justify-between py-2 underline underline-offset-4 hover:no-underline'
                            onClick={logout}
                          >
                            <span className='block font-bold'>Sign out</span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
