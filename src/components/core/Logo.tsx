import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <Link to='/'>
      <svg
        id='uuid-9efc5eea-6419-49f0-9574-ef02ccac9139'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 758.8 200'
        className={className}
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