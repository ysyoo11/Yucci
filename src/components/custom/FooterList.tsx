import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  list: {
    title: string;
    href: string;
  }[];
};

export default function FooterList({ title, list }: Props) {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={clsx('border-b py-6', {
            'border-white': open,
            'border-gray-700': !open,
          })}
        >
          <Disclosure.Button className='flex w-full justify-between text-left font-bold focus:outline-none'>
            <span
              className={clsx('text-xs uppercase', {
                'text-white': open,
                'text-gray-400': !open,
              })}
            >
              {title}
            </span>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-white`}
            />
          </Disclosure.Button>

          <Disclosure.Panel
            as='ul'
            className='space-y-6 pb-2 pt-6 text-sm text-white'
          >
            {list.map((list, idx) => (
              <li key={`list-${idx}`}>
                <Link
                  to={list.href}
                  className='underline underline-offset-4 hover:no-underline'
                >
                  {list.title}
                </Link>
              </li>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
