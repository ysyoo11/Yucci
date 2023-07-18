import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import HeroProgressBar from './HeroProgressBar';

const images = [
  {
    src: 'images/hero/hero-1.avif',
    title: 'GUCCI HORSEBIT 1955',
  },
  {
    src: 'images/hero/hero-2.avif',
    title: 'GUCCI ACE',
  },
  {
    src: 'images/hero/hero-3.avif',
    title: "MEN'S BAG",
  },
] as const;

type HeroImage = (typeof images)[number];

// TODO: Styling for PC view
// TODO: Refactor
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState<HeroImage>(images[0]);
  const [index, setIndex] = useState(0);
  const [slidePlaying, setSlidePlaying] = useState(true);

  const handlePlayPause = () => {
    setSlidePlaying((prev) => !prev);
  };

  useEffect(() => {
    if (slidePlaying) {
      const heroInterval = setInterval(
        () => setIndex((i) => (i + 1) % images.length),
        5000
      );
      return () => clearInterval(heroInterval);
    }
  }, [slidePlaying]);

  useEffect(() => {
    setCurrentSlide(images[index]);
  }, [index]);

  return (
    <section className='relative px-4'>
      <div className='relative mb-6 flex w-full items-center space-x-2'>
        <button onClick={handlePlayPause}>
          {slidePlaying ? (
            <PauseIcon className='h-4 w-4' />
          ) : (
            <PlayIcon className='h-4 w-4' />
          )}
        </button>
        <ul className='flex w-full space-x-2'>
          {images.map((img, idx) => (
            <HeroProgressBar
              key={img.title}
              onClick={() => setIndex(idx)}
              isCurrent={index === idx && slidePlaying}
            />
          ))}
        </ul>
      </div>
      {images.map((img, idx) => (
        <div
          key={`image-${img.title}`}
          className='h-max w-full overflow-hidden'
        >
          <img
            src={currentSlide.src}
            alt={currentSlide.title}
            draggable={false}
            className={clsx({
              'block animate-hero-img': index === idx,
              hidden: index !== idx,
            })}
          />
        </div>
      ))}
      {images.map((img, idx) => (
        <div
          key={`${img.title}-${idx}`}
          className={clsx(
            'mt-4 flex flex-col items-center justify-center space-y-4',
            {
              'block animate-arise': index === idx,
              hidden: index !== idx,
            }
          )}
        >
          <h2 className='cursor-default text-center text-4xl'>{img.title}</h2>
          <button className='bg-black px-8 py-5 text-sm font-bold uppercase text-white transition-opacity hover:opacity-80'>
            Explore the collection
          </button>
        </div>
      ))}
    </section>
  );
}
