import React from 'react';

const Navbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed bottom-0 h-[100px] w-full rounded-t-[20px] bg-white p-[0px_10px] flex justify-evenly">
      {children}
    </div>
  );
};

// Used to make sure MobileDiv does not overlay content
// Must have same height as MobileDiv
export const MobileNavPlaceholder = () => {
  return <div className="w-full h-[100px] mt-[20px]"></div>;
};

export default Navbar;
