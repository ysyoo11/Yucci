import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

import { CartItem } from '../context/cart-context';
import displayPrice from '../utils/display-price';
import parseDateTime from '../utils/parse-date-time';

export default function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, isCreatedAt, items, userInfo } = location.state;

  return (
    <div className='mx-auto w-full max-w-7xl px-4'>
      <button
        onClick={() => navigate('/my-orders')}
        className='mb-8 mt-4 flex items-center space-x-1'
      >
        <ChevronLeftIcon className='h-4 w-4 stroke-2' />
        <span>My Orders</span>
      </button>
      <div>
        <div className='bg-gray-200 p-4 text-sm'>
          <p>
            <span className='font-bold'>Order No.:</span> {id}
          </p>
          <p>
            <span className='font-bold'>Order Date:</span>{' '}
            {parseDateTime(isCreatedAt)}
          </p>
          <div>
            <span className='font-bold'>Recipient Info:</span>
            <p>
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <p>{userInfo.address1}</p>
            {userInfo.address2 && <p>{userInfo.address2}</p>}
            <p>
              {userInfo.suburb}, {userInfo.state}, {userInfo.postcode}
            </p>
            <p>{userInfo.phone}</p>
          </div>
        </div>
        <div className='mt-4 flow-root px-4'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Option
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {items.map((item: CartItem) => (
                    <tr key={item.id}>
                      <td className='max-w-[4rem] whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                        <div>
                          <img src={item.imageURL} alt={item.title} />
                        </div>
                      </td>
                      <td className='line-clamp-2 max-w-[8rem] px-3 py-4 text-sm text-gray-500 lg:line-clamp-none lg:max-w-none lg:text-base'>
                        {item.title}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500'>
                        {item.selectedOption}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500'>
                        {item.quantity}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {displayPrice(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
];

export function Example() {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Users
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add user
          </button>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Title
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Role
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {person.name}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {person.title}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {person.email}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {person.role}
                    </td>
                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit<span className='sr-only'>, {person.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
