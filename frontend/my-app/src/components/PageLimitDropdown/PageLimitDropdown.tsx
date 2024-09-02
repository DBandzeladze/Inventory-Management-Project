import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type sortingOptType = {
  setItemLimit: React.Dispatch<React.SetStateAction<number>>;
};
export default function PageLimitDropdown({ setItemLimit }: sortingOptType) {
  const [sortName, setSortName] = useState<string>("5");
  return (
    <Menu as="div" className="relative inline-block text-left mb-2">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#ebecf3] px-3 py-2 text-sm font-semibold text-[#4f5366] hover:bg-[#4f5366] hover:text-white">
          {sortName}
          <div className="flex items-center justify-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="4"
              viewBox="0 0 8 4"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M0.585,0.585 L3.758,3.758 C3.89182591,3.89123458 4.10817409,3.89123458 4.242,3.758 L7.415,0.585 C7.51277284,0.48679322 7.54184505,0.339400144 7.48868532,0.211423021 C7.43552559,0.0834458989 7.31057886,2.99196319e-05 7.172,-2.22044605e-16 L0.828,-2.22044605e-16 C0.689421143,2.99196319e-05 0.564474409,0.0834458989 0.511314681,0.211423021 C0.458154953,0.339400144 0.487227156,0.48679322 0.585,0.585 Z"
              ></path>
            </svg>
          </div>
        </MenuButton>
      </div>

      <MenuItems
        transition
        anchor="top start"
        className="absolute left-0 z-10 mb-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ close }) => (
              <button
                onClick={() => {
                  setItemLimit(5);
                  setSortName("5");
                  close();
                }}
                className={
                  "block px-4 py-2 text-sm text-left w-full text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
                }
              >
                5
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ close }) => (
              <button
                onClick={() => {
                  setItemLimit(10);
                  setSortName("10");
                  close();
                }}
                className={
                  "block px-4 py-2 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
                }
              >
                10
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ close }) => (
              <button
                onClick={() => {
                  setItemLimit(20);
                  setSortName("20");
                  close();
                }}
                className={
                  "block px-4 py-2 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
                }
              >
                20
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
