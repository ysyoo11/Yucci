import Lottie from 'lottie-react';

import loading from '../../assets/loading.json';

export default function Loading() {
  return (
    <div className='absolute inset-0 z-[2] flex h-full w-full items-center justify-center'>
      <Lottie animationData={loading} className='h-60 w-60' />
    </div>
  );
}
