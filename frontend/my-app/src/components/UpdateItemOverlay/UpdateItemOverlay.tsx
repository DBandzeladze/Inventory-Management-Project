"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import UpdateItem from "../UpdateItem/UpdateItem";

type refetchType = {
  id: string;
  NewName: string;
  NewQuantity: number;
  NewMeasurement: string;
  NewMinQuantity: number;
  NewPrice: number;
  NewVariants: boolean;
  refetch: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isopen: boolean;
};
export default function UpdateItemOverley({
  id,
  NewName,
  NewMeasurement,
  NewMinQuantity,
  NewPrice,
  NewQuantity,
  NewVariants,
  refetch,
  loading,
  setLoading,
  isopen,
}: refetchType) {
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (skip) {
      setSkip(false);
    } else {
      setOpen(true);
    }
  }, [isopen]);

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
                    Update The Item
                  </DialogTitle>
                </div>
              </div>
              <UpdateItem
                id={id}
                NewName={NewName}
                NewQuantity={NewQuantity}
                NewMeasurement={NewMeasurement}
                NewMinQuantity={NewMinQuantity}
                NewPrice={NewPrice}
                NewVariants={NewVariants}
                refetch={refetch}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
