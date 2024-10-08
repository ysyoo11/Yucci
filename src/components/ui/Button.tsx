import clsx from 'clsx';

const colorClasses = {
  black:
    'bg-black text-white transition-opacity hover:opacity-80 disabled:hover:opacity-100',
  white:
    'bg-white hover:bg-gray-100 transition-colors border border-black disabled:hover:opacity-100',
} as const;

interface Props {
  className?: string;
  children: string;
  full?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  color?: keyof typeof colorClasses;
  size?: 'xs' | 'sm' | 'base' | 'lg';
}

export default function Button({
  className,
  children,
  full = false,
  disabled = false,
  onClick,
  color = 'black',
  size = 'sm',
}: Props) {
  return (
    <button
      className={clsx(
        'px-8 py-4 font-bold uppercase disabled:cursor-not-allowed disabled:bg-gray-300',
        className,
        colorClasses[color],
        {
          'w-full': full,
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'base',
          'text-lg': size === 'lg',
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
