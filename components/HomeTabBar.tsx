import { productType } from '@/constants/Data';
import Link from 'next/link';
import React from 'react';

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-4 justify-between">
      <div className="flex items-center gap-2 text-sm font-medium">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`
              px-5 py-2 rounded-full text-[#2A4D3E] text-sm font-medium tracking-wide
              transition-all duration-300
              ${
                selectedTab === item?.title
                  ? 'bg-[#D0F0C0] shadow-inner' // Selected state: soft green bg with inset shadow
                  : 'bg-[#F8F7F4] shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)]'
              }
            `}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href={"/shop"}
        className="
          px-5 py-2 rounded-full bg-[#F8F7F4] text-[#2A4D3E] text-sm font-medium tracking-wide
          shadow-[2px_2px_4px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)]
          hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,1)]
          hover:scale-105 transition-all duration-300
        "
      >
        See All
      </Link>
    </div>
  );
};

export default HomeTabBar;
