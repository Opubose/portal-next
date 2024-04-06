import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  $active?: boolean;
};

const NavbarItem = ({ $active = false, href, children }: Props) => {
  return (
    <Link
      href={href}
      className={`relative overflow-hidden text-base w-1/5 flex flex-col justify-center items-center ${
        $active ? 'bg-gradient-to-bl from-[#E10087] to-[#4004C0] text-white' : 'text-black'
      }`}
    >
      {children}
    </Link>
  );
};
export default NavbarItem;
