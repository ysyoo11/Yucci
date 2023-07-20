import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';
import 'keen-slider/keen-slider.min.css';

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
    title: "MEN'S BAGS",
  },
] as const;

// TODO: Change hero image animation + change text color when on image
export default function HeroSection() {
  const [slidePlaying, setSlidePlaying] = useState(true);
  const [opacities, setOpacities] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: images.length,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    detailsChanged(s) {
      const newOpacities = s.track.details.slides.map((slide) => slide.portion);
      setOpacities(newOpacities);
    },
  });

  const handlePlayPause = () => {
    setSlidePlaying((prev) => !prev);
  };

  useEffect(() => {
    if (slidePlaying) {
      const heroInterval = setInterval(() => instanceRef.current?.next(), 5000);
      return () => clearInterval(heroInterval);
    }
  }, [slidePlaying]);

  return (
    <section className='relative mx-auto max-w-7xl px-4'>
      <div className='relative flex flex-col lg:flex-row'>
        <div className='relative mb-6 flex w-full items-center space-x-2 lg:absolute lg:-left-20 lg:top-1/2 lg:w-72 lg:-translate-y-1/2 lg:rotate-90'>
          {instanceRef.current && loaded && (
            <button onClick={handlePlayPause} className='lg:-rotate-90'>
              {slidePlaying ? (
                <PauseIcon className='h-4 w-4' />
              ) : (
                <PlayIcon className='h-4 w-4' />
              )}
            </button>
          )}
          <ul className='flex w-full space-x-2'>
            {loaded &&
              instanceRef.current &&
              images.map((img, idx) => (
                <HeroProgressBar
                  key={img.title}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  isCurrent={currentSlide === idx && slidePlaying}
                />
              ))}
          </ul>
        </div>
        <div ref={sliderRef} className='keen-slider mx-auto w-full max-w-3xl'>
          {images.map((img, idx) => (
            <div
              key={`image-${img.title}`}
              className='keen-slider__slide h-max w-full overflow-hidden'
              style={{ opacity: opacities[idx] }}
            >
              <img
                src={img.src}
                alt={img.title}
                draggable={false}
                className='animate-hero-img'
              />
            </div>
          ))}
        </div>
      </div>
      <div
        key={`${images[currentSlide].title}-title`}
        className='sticky bottom-10 mt-4 flex animate-arise flex-col items-center justify-center space-y-4'
      >
        <h2 className='cursor-default text-center text-4xl'>
          {images[currentSlide].title}
        </h2>
        <button className='bg-black px-8 py-5 text-sm font-bold uppercase text-white transition-opacity hover:opacity-80'>
          Explore the collection
        </button>
      </div>
    </section>
  );
}
