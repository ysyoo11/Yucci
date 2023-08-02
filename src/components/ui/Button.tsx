import clsx from 'clsx';

interface Props {
  className?: string;
  children: string;
  full?: boolean;
  disabled?: boolean;
}

export default function Button({
  className,
  children,
  full = false,
  disabled = false,
}: Props) {
  return (
    <button
      className={clsx(
        'bg-black px-8 py-5 font-bold uppercase text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-300 lg:text-base',
        className,
        {
          'w-full text-base': full,
          'text-sm': !full,
        }
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
