import clsx from 'clsx';
import { ChangeEvent } from 'react';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
  isOptional?: boolean;
  placeholder: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  name: string;
};

export default function NumberInput({
  onChange,
  id,
  value,
  isOptional,
  placeholder,
  min = 0,
  max = 100000,
  disabled = false,
  name,
}: Props) {
  return (
    <div
      className={clsx('relative z-0 w-full', {
        'bg-gray-300': disabled,
      })}
    >
      <input
        type='number'
        id={id}
        className='peer block w-full appearance-none border border-black bg-transparent px-2 pb-4 pt-6 text-base text-gray-900 focus:border-gray-800 focus:outline-black disabled:bg-gray-300'
        placeholder=' '
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        name={name}
      />
      <label
        htmlFor={id}
        className='absolute left-3 top-5 -z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-600'
      >
        {placeholder}
        {!isOptional && '*'}
      </label>
    </div>
  );
}
