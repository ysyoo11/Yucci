import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

const colorClasses = {
  black:
    'border border-black text-gray-900 focus:border-gray-800 focus:outline-black disabled:bg-gray-300',
  white:
    'border-b border-gray-700 text-white focus:border-white focus:outline-none',
} as const;

type Props = ComponentPropsWithoutRef<'input'> & {
  color?: keyof typeof colorClasses;
};

export default function Input({
  required = true,
  color = 'black',
  placeholder,
  ...props
}: Props) {
  const { id, disabled } = props;
  return (
    <div
      className={clsx('relative z-0 w-full', {
        'bg-gray-300': disabled,
      })}
    >
      <input
        className={clsx(
          'peer block w-full appearance-none bg-transparent px-2 pb-4 pt-6 text-base',
          colorClasses[color]
        )}
        placeholder=' '
        required={required}
        {...props}
      />
      <label
        htmlFor={id}
        className='absolute left-3 top-5 -z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-600'
      >
        {placeholder}
        {required && '*'}
      </label>
    </div>
  );
}
