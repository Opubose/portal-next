import React from 'react';
import { VanityLink } from '@generated/type-graphql';
import { Dialog } from '@headlessui/react';
import CloseIcon from 'icons/CloseIcon';

type VanityPopUpProps = {
  success: boolean;
  vals: Omit<VanityLink, 'id'> | undefined;
  errMsg: string | undefined;
  isOpen: boolean;
  onClose: () => void;
};

const VanityPopUp: React.FC<VanityPopUpProps> = ({ success, vals, errMsg, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

      <div
        className="fixed inset-0 flex justify-center items-center z-50 text-black text-center"
        aria-hidden="true"
      >
        <div className="relative w-1/2 h-1/4 lg:h-2/5 flex justify-center items-center flex-col text-lg md:text-2xl lg:text-4xl rounded-lg shadow-md bg-clip-content p-[2px] bg-gradient-to-r from-[#be185d] to-[#7e22ce]">
          <div className="flex flex-col justify-center items-center w-full h-full bg-black rounded-lg p-4">
            <Dialog.Panel className="w-full h-full mt-14">
              <Dialog.Description
                className={`font-bold mb-12 ${success ? 'text-green-600' : 'text-red-600'} `}
              >
                {success ? 'Vanity Linked Created Successfully' : 'Vanity Link Failed to Generate!'}
              </Dialog.Description>
              <Dialog.Description className="text-sm lg:text-2xl select-text">
                {success
                  ? `Vanity Link: https://${vals!.vanityDomain}.acmutd.co/${vals!.slashtag}`
                  : `Reason: ${errMsg}`}
              </Dialog.Description>
            </Dialog.Panel>
            <div className="absolute top-0 right-0 m-2" onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default VanityPopUp;
