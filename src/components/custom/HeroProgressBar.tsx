import clsx from 'clsx';

interface Props {
  onClick: () => void;
  isCurrent: boolean;
}

export default function HeroProgressBar({ onClick, isCurrent }: Props) {
  return (
    <li className='w-full'>
      <button className='block w-full py-2' onClick={onClick}>
        <div className='h-[2px] w-full bg-gray-300'>
          <div
            className={clsx('h-full bg-gray-600', {
              'animate-progress-bar': isCurrent,
              'w-0': !isCurrent,
            })}
          />
        </div>
      </button>
    </li>
  );
}
