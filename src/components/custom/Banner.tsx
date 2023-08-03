type Props = {
  bgURL: string;
  title: string;
};

export default function Banner({ bgURL, title }: Props) {
  return (
    <div
      className='relative h-96 w-full bg-cover bg-center lg:h-[40vh]'
      style={{
        backgroundImage: `url(${bgURL})`,
      }}
    >
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 space-y-4 text-center text-white'>
        <p className='text-3xl uppercase lg:text-5xl'>{title}</p>
      </div>
      <div className='h-full w-full bg-black/20' />
    </div>
  );
}
