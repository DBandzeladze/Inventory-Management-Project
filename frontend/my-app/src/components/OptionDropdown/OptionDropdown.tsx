import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { authAxios } from '../../config'

export default function OptionDropdown() {

  return (
    <Menu as="div" className="relative inline-block text-left mb-2">
      <div>
        <MenuButton className="relative inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <rect
                  width="3.5"
                  height="3.5"
                  x="10.25"
                  y="3.75"
                  fill="currentColor"
                  rx="1.75"
                ></rect>
                <rect
                  width="3.5"
                  height="3.5"
                  x="10.25"
                  y="10.25"
                  fill="currentColor"
                  rx="1.75"
                ></rect>
                <rect
                  width="3.5"
                  height="3.5"
                  x="10.25"
                  y="16.75"
                  fill="currentColor"
                  rx="1.75"
                ></rect>
              </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
        <MenuItem>
            <button>
                Delete
            </button>
          </MenuItem>
         
        </div>
      </MenuItems>
    </Menu>
  )
}
