import React from 'react';

// props for the card, be sure to includa any new props in this interface
interface CardPropTypes {
  width: number;
  height: number;
  onClick?: () => void;
}

export default function ACMCard({ children, ...props }: React.PropsWithChildren<CardPropTypes>) {
  return (
    <div
      onClick={props.onClick}
      className="w-[300px] h-[150px] rounded-2xl p-5 shadow-[0px 1px 24px -1px rgba(0, 0, 0, 0.25)] backdrop-filter-[blur(50px)] transition-transform duration-200 ease-in-out hover:scale-105 bg-gradient-to-br from-[rgba(255,255,255,0.25)] hover:from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.05)] hover:to-[rgba(255,255,255,0.1)]"
      {...props}
    >
      {children}
    </div>
  );
}
