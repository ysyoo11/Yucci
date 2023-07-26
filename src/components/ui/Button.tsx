import clsx from 'clsx';

interface Props {
  className?: string;
  children: string;
  full?: boolean;
}

export default function Button({ className, children, full = false }: Props) {
  return (
    <button
      className={clsx(
        'bg-black px-8 py-5 font-bold uppercase text-white transition-opacity hover:opacity-80 lg:text-base',
        className,
        {
          'w-full text-base': full,
          'text-sm': !full,
        }
      )}
    >
      {children}
    </button>
  );
}
