import React, { FC } from 'react';
import Link from 'next/link';

interface ACMNavbarItemPropTypes {
  children?: React.ReactNode;
  color?: string;
  gradientColor?: string;
  theme?: 'light' | 'dark';
  $active?: boolean;
  isLogo?: boolean;
}
interface NextLinkForwardRefTypes {
  onClick?: React.MouseEventHandler<HTMLElement>;
  href: string;
  // temporary attribute, moving to a state system in the next commits
}
const NavbarItem: FC<ACMNavbarItemPropTypes & NextLinkForwardRefTypes> = ({
  theme = 'dark',
  $active = false,
  isLogo = false,
  onClick,
  href,
  ...props
}) => {
  if (isLogo)
    return (
      <Link
        href={href}
        className="relative overflow-hidden px-10 flex w-[90%] justify-center place-items-center -mt-[40%]"
      >
        {props.children}
      </Link>
    );

  return (
    <Link
      href={href}
      type="button"
      className={`relative overflow-hidden py-3 px-5 w-full text-dark dark:text-white text-4xl transition-all ease-in-out transform ease-in-out$ hover:scale-125 hover:translate-x-3 ${
        $active ? 'bg-gradient-to-r from-[#E10087] to-[#4004C0] scale-105' : ''
      }`}
    >
      {props.children}
    </Link>
  );
};

export default NavbarItem;
