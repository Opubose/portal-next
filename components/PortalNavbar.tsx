import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Navbar({ children }: Props) {
  return (
    <div id="portal-navbar">
      <div className="h-full w-1/10 min-w-[280px]" />
      <div className="flex flex-col justify-center gap-8 fixed top-0 h-full w-1/10 min-w-[280px]">
        <div className="bg-[#ffffff17] backdrop-blur-[5px] absolute top-0 left-0 h-full w-[90%]" />
        {children}
      </div>
    </div>
  );
}
