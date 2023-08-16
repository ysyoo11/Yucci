import clsx from 'clsx';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
  color?: 'white' | 'black';
};
// TODO: Adjust logo length on header
export default function Logo({ className, color = 'black' }: Props) {
  return (
    <Link to='/'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 758.8 200'
        className={clsx(className, {
          'fill-white': color === 'white',
        })}
      >
        <text
          transform='translate(0 163.4)'
          fontFamily='Granjon, Granjon'
          fontSize='200'
          letterSpacing='.16em'
        >
          <tspan x='0' y='0'>
            YUCCI
          </tspan>
        </text>
      </svg>
    </Link>
  );
}
