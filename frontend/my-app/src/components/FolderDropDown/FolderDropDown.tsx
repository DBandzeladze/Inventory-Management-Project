import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { authAxios } from "../../config";

type foldersType = {
  itemName: string;
  itemId: string;
  folders: string[];
  getFolders: () => Promise<void>;
};
export default function FolderDropDown({
  itemName,
  itemId,
  folders,
  getFolders,
}: foldersType) {
  return (
    <Menu as="div" className="relative inline-block text-left mb-2">
      <div>
        <MenuButton
          onClick={getFolders}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-semibold text-gray-900  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {folders.map((name) => (
            <MenuItem key={name}>
              <button
                onClick={async () => {
                  await authAxios.put(`/addToFolder/${name}`, {
                    name: itemName,
                    id: itemId,
                  });
                }}
                className="block px-4 py-2 w-56 text-sm text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
