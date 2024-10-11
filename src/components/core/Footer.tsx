import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import footerMenu from '../../assets/footer-menu.json';
import { useAssertiveStore } from '../../context/assertives';
import FooterList from '../custom/FooterList';
import Input from '../ui/Input';

import Logo from './Logo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showNoti } = useAssertiveStore();

  const handleRegisterNewsletter = (e: FormEvent) => {
    e.preventDefault();
    showNoti({
      title: 'Your email is now registered to receive our newsletter.',
    });
    setEmail('');
  };

  return (
    <footer className='mt-20 w-full bg-black px-4 py-14 md:px-8 lg:px-16'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='flex flex-col space-x-6 space-x-reverse lg:flex-row-reverse'>
          <div className='space-y-6 lg:w-full'>
            <p className='text-sm font-bold uppercase text-gray-600'>
              sign up for yucci updates
            </p>
            <p className='text-sm text-white'>
              By entering your email address below, you consent to receiving our
              newsletter with access to our latest collections, events and
              initiatives. More details on this are provided in our Privacy
              Policy.
            </p>
            <form onSubmit={handleRegisterNewsletter}>
              <Input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                name='email'
                color='white'
              />
            </form>
          </div>
          <div className='my-20 lg:hidden'>
            {footerMenu.map(({ title, list }, idx) => (
              <FooterList
                key={`footer-menu-${idx}`}
                title={title}
                list={list}
              />
            ))}
          </div>
          <div className='hidden w-full grid-cols-2 gap-x-12 gap-y-16 lg:grid'>
            {footerMenu.map(({ title, list }, idx) => (
              <div key={`footer-menu-lg-${idx}`}>
                <span className='text-xs font-bold uppercase text-gray-400'>
                  {title}
                </span>
                <ul className='space-y-5 pt-5'>
                  {list.map((listItem, listIdx) => (
                    <li key={`footer-menu-lg-list-${listIdx}`}>
                      <Link
                        to={listItem.href}
                        className='text-sm text-white underline underline-offset-4 hover:no-underline'
                      >
                        {listItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className='py-10 text-center text-sm font-bold text-white lg:py-20'>
          &copy; 2016-2022 Yuccio Yucci S.p.A. - All rights reserved.
        </p>
        <Logo color='white' />
      </div>
    </footer>
  );
}
