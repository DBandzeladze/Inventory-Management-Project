import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type sortingOptType = {
  sortingOption: object;
  setSortingOption: React.Dispatch<React.SetStateAction<object>>;
};
export default function SortDropDown({
  sortingOption,
  setSortingOption,
}: sortingOptType) {
  const [sortName, setSortName] = useState<string>("Select Sorting Option");
  const [nameOpt, setNameOpt] = useState(-1);
  const [quantityOpt, setQuantityOpt] = useState(-1);
  const [minQuantityOpt, setMinQuantityOpt] = useState(-1);
  const [priceOpt, setPriceOpt] = useState(-1);
  const [variantsOpt, setVariantsOpt] = useState(-1);
  const [arrowUp, setArrowUp] = useState(false);
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
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => {
                if (sortName !== "name") {
                  setSortName("name");
                  setSortingOption({ name: -1, _id: 1 });
                  setArrowUp(false);
                } else {
                  setSortingOption({ name: -nameOpt, _id: 1 });
                  setNameOpt((prev) => -prev);
                  setArrowUp((prev) => !prev);
                }
              }}
              className={
                sortName === "name"
                  ? "block px-4 py-2 w-56 text-sm text-left text-red-500 data-[focus]:bg-gray-100 flex flex-row"
                  : "block px-4 py-2 w-56 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
              }
            >
              name
              <svg
                className={sortName === "name" ? "mt-1 ml-1" : "hidden"}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="12"
                viewBox="0 0 10 12"
              >
                <path
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d={
                    arrowUp
                      ? "M0,6 L4,2 L8,6 M4,12 L4,2"
                      : "M8,6 L4,10 L0,6 M4,0 L4,10"
                  }
                  transform="translate(1 1)"
                ></path>
              </svg>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                if (sortName !== "quantity") {
                  setSortName("quantity");
                  setSortingOption({ quantity: -1, _id: 1 });
                  setArrowUp(false);
                } else {
                  setSortingOption({ quantity: -quantityOpt, _id: 1 });
                  setQuantityOpt((prev) => -prev);
                  setArrowUp((prev) => !prev);
                }
              }}
              className={
                sortName === "quantity"
                  ? "block px-4 py-2 w-56 text-sm text-left text-red-500 data-[focus]:bg-gray-100 flex flex-row"
                  : "block px-4 py-2 w-56 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
              }
            >
              quantity
              <svg
                className={sortName === "quantity" ? "mt-1 ml-1" : "hidden"}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="12"
                viewBox="0 0 10 12"
              >
                <path
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d={
                    arrowUp
                      ? "M0,6 L4,2 L8,6 M4,12 L4,2"
                      : "M8,6 L4,10 L0,6 M4,0 L4,10"
                  }
                  transform="translate(1 1)"
                ></path>
              </svg>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                if (sortName !== "min quantity") {
                  setSortName("min quantity");
                  setSortingOption({ minQuantity: -1, _id: 1 });
                  setArrowUp(false);
                } else {
                  setSortingOption({ minQuantity: -minQuantityOpt, _id: 1 });
                  setMinQuantityOpt((prev) => -prev);
                  setArrowUp((prev) => !prev);
                }
              }}
              className={
                sortName === "min quantity"
                  ? "block px-4 py-2 w-56 text-sm text-left text-red-500 data-[focus]:bg-gray-100 flex flex-row"
                  : "block px-4 py-2 w-56 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
              }
            >
              min quantity
              <svg
                className={sortName === "min quantity" ? "mt-1 ml-1" : "hidden"}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="12"
                viewBox="0 0 10 12"
              >
                <path
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d={
                    arrowUp
                      ? "M0,6 L4,2 L8,6 M4,12 L4,2"
                      : "M8,6 L4,10 L0,6 M4,0 L4,10"
                  }
                  transform="translate(1 1)"
                ></path>
              </svg>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                if (sortName !== "price") {
                  setSortName("price");
                  setSortingOption({ price: -1, _id: 1 });
                  setArrowUp(false);
                } else {
                  setSortingOption({ price: -priceOpt, _id: 1 });
                  setPriceOpt((prev) => -prev);
                  setArrowUp((prev) => !prev);
                }
              }}
              className={
                sortName === "price"
                  ? "block px-4 py-2 w-56 text-sm text-left text-red-500 data-[focus]:bg-gray-100 flex flex-row"
                  : "block px-4 py-2 w-56 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
              }
            >
              price
              <svg
                className={sortName === "price" ? "mt-1 ml-1" : "hidden"}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="12"
                viewBox="0 0 10 12"
              >
                <path
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d={
                    arrowUp
                      ? "M0,6 L4,2 L8,6 M4,12 L4,2"
                      : "M8,6 L4,10 L0,6 M4,0 L4,10"
                  }
                  transform="translate(1 1)"
                ></path>
              </svg>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                if (sortName !== "variants") {
                  setSortName("variants");
                  setSortingOption({ variants: -1, _id: 1 });
                  setArrowUp(false);
                } else {
                  setSortingOption({ variants: -variantsOpt, _id: 1 });
                  setVariantsOpt((prev) => -prev);
                  setArrowUp((prev) => !prev);
                }
              }}
              className={
                sortName === "variants"
                  ? "block px-4 py-2 w-56 text-sm text-left text-red-500 data-[focus]:bg-gray-100 flex flex-row"
                  : "block px-4 py-2 w-56 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex flex-row"
              }
            >
              variants
              <svg
                className={sortName === "variants" ? "mt-1 ml-1" : "hidden"}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="12"
                viewBox="0 0 10 12"
              >
                <path
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d={
                    arrowUp
                      ? "M0,6 L4,2 L8,6 M4,12 L4,2"
                      : "M8,6 L4,10 L0,6 M4,0 L4,10"
                  }
                  transform="translate(1 1)"
                ></path>
              </svg>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
