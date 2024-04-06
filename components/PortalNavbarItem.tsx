import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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

const StyledA = styled(motion.a)<ACMNavbarItemPropTypes>`
  position: relative;
  overflow: hidden;
  padding: 10px 0px;

  width: 100%;
  color: ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
  font-size: 36px;

  background: ${(props) =>
    props.$active
      ? `linear-gradient(90deg,${props.color || '#E10087'} 0%,${
          props.gradientColor || props.color || '#4004C0'
        } 100%)`
      : 'none'};
`;

const NavbarItem: FC<ACMNavbarItemPropTypes & NextLinkForwardRefTypes> = ({
  theme = 'dark',
  $active = false,
  isLogo = false,
  onClick,
  href,
  ...props
}) => {
  const [hover, setHover] = useState<boolean>(false);

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
