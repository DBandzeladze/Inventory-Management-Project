"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import AddItemPage from "../AddItemPage/AddItemPage";
import AddFolder from "../AddFolder/AddFolder";

type refetchType = {
  refetch: () => Promise<void>;
  isopen: boolean;
};
export default function AddLogoOverlay({ refetch, isopen }: refetchType) {
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (skip) {
      setSkip(false);
    } else {
      setOpen(true);
    }
  }, [isopen]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files ? event.target.files[0] : null;
    console.log(value);
    setImage(value);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center w-full">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold text-center text-gray-900"
                  >
                    Add a Logo
                  </DialogTitle>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    id="image"
                    name="price"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/jpeg, image/png, image/jpg"
                    className="block w-full text-sm text-indigo-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                  />
                </div>
              </div>

              <div className="">
                {image === null || image === undefined ? (
                  <></>
                ) : (
                  <img src={URL.createObjectURL(image)}></img>
                )}
              </div>
              <div className="flex mt-4">
                <button
                  className="rounded-lg py-2 px-4 bg-indigo-600 text-white text-lg"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
