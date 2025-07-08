import React from 'react';
import { Title } from './ui/text';
import Link from 'next/link';
import Image from 'next/image';
import { banner_1 } from '@/images';

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-20 px-10 lg:px-24 flex items-center justify-between bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]">
      <div className="space-y-6 max-w-md">
        <Title className="text-4xl md:text-5xl font-light text-gray-800 leading-tight tracking-wide font-[Inter]">
          Carry Confidence,<br />Style Every Step
        </Title>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
      <div>
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:inline-flex w-80 rounded-2xl shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)]"
        />
      </div>
    </div>
  );
};

export default HomeBanner;