import clsx from 'clsx';

interface Props {
  onClick: () => void;
  isCurrent: boolean;
}

export default function HeroProgressBar({ onClick, isCurrent }: Props) {
  return (
    <li className='w-full'>
      <button className='block h-px w-full bg-gray-300' onClick={onClick}>
        <div
          className={clsx('h-full bg-gray-500', {
            'animate-progress-bar': isCurrent,
            'w-0': !isCurrent,
          })}
        />
      </button>
    </li>
  );
}
