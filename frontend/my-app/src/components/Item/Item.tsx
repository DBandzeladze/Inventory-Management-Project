import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../config";
import UpdateItem from "../UpdateItem/UpdateItem";
import FolderDropDown from "../FolderDropDown/FolderDropDown";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import AddItemOverlay from "../AddItemOverlay/AddItemOverlay";
import UpdateItemOverley from "../UpdateItemOverlay/UpdateItemOverlay";
import { Link } from "react-router-dom";

const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

type itemType = {
  id: string;
  name: string;
  quantity: number;
  measurement: string;
  minQuantity: number;
  price: number;
  variants: boolean;
  refetch: () => Promise<void>;
  image: { type: string; data: number[] };
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  createdAt: string;
  totalPrice: number;
};

const Item = ({
  id,
  name,
  quantity,
  measurement,
  minQuantity,
  price,
  variants,
  refetch,
  image,
  loading,
  setLoading,
  createdAt,
  totalPrice,
}: itemType) => {
  const [deleted, setDeleted] = useState(false);
  const [update, setUpdate] = useState(false);
  const [img, setImg] = useState<string>();
  const [folders, setFolders] = useState<string[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  };
  const toBase64 = (uInt8Array: number[]) =>
    btoa(String.fromCharCode(...uInt8Array));
  const toBase = (blob: number[]) =>
    btoa(
      new Uint8Array(blob).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    );
  // const base64String = btoa(String.fromCharCode(...new Uint8Array(image)));

  // CONTINUE HERE!!!

  const getFolders = async () => {
    const result = await axios.get("/getFolderNames", {
      baseURL: baseURL,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    // console.log(result.data)
    setFolders(result.data);
  };
  useEffect(() => {
    const fetchItems = async () => {
      await getFolders();
    };

    fetchItems();
  }, []);
  useEffect(() => {
    if (image) {
      setImg(`data:image/jpeg;base64,${toBase(image.data)}`);
    }
  }, []);

  return deleted ? (
    <></>
  ) : (
    <div className="">
      <UpdateItemOverley
        id={id}
        NewName={name}
        NewQuantity={quantity}
        NewMeasurement={measurement}
        NewMinQuantity={minQuantity}
        NewPrice={price}
        NewVariants={variants}
        refetch={refetch}
        loading={loading}
        setLoading={setLoading}
        isopen={update}
      />
      <div className="flex flex-row bg-white hover:shadow-md rounded-xl border-2 border-solid border-white h-[140px] mb-2 mt-2">
        <div className="w-[186px] h-[136px] oveflow-hidden relative">
          {minQuantity >= quantity ? (
            <div className="bg-red-500 text-white rounded-lg pl-1 w-[35px] absolute bottom-2 left-2">
              low
            </div>
          ) : (
            <></>
          )}
          {img ? (
            <img
              className="w-full h-full object-cover object-center rounded-l-xl"
              src={img}
            ></img>
          ) : (
            <img
              className="w-full h-full object-cover object-center rounded-l-xl"
              src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            ></img>
          )}
        </div>
        <div className="w-[434px] h-[136px] pl-5 pr-5 pt-2 pb-2 flex flex-col flex-start">
          <div className="text-gray-400 text-xs">{id}</div>
          <Link to={`http://localhost:3000/individual?id=${id}`}>
            <div className="font-sans text-base text-[#4f5366] hover:text-indigo-700">
              {name}
            </div>
          </Link>
          <div className="flex flex-row">
            <div className="text-sm">
              {quantity} {measurement}s
            </div>
            <div className="text-gray-500 text-sm">
              &nbsp; | GEL{" "}
              {totalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
            </div>
          </div>
        </div>
        <div className="w-[434px] h-[136px] pl-5 pr-5 pt-2 pb-2  flex flex-col flex-start w-full">
          <div className="flex flex-row justify-between">
            <div className="font-sans text-sm">{formatDate(createdAt)}</div>
            <div className="flex justify-end">
              <Menu as="div" className="relative inline-block text-left mb-2">
                <div>
                  <MenuButton className="relative inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm mt-1 font-semibold text-gray-900">
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
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        className="block px-4 py-2 w-56 text-sm text-left text-gray-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        onClick={async () => {
                          await authAxios.delete(`delete/${id}`);
                          refetch();
                        }}
                      >
                        Delete
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="block px-4 py-2 w-56 text-sm text-left text-gray-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        onClick={() => {
                          setUpdate((prev) => !prev);
                        }}
                      >
                        Update
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-between">
        <div className="text-indigo-600 font-bold text-lg">{name}</div>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={async () => {
            await authAxios.delete(`delete/${id}`);
            refetch();
          }}
        >
          Delete
        </button>
      </div> */}

      {/* <div className="text-indigo-600 mt-1">
        Quantity: {quantity} {measurement}s
      </div> */}
      {/* <div className="text-indigo-600 mt-1">Min Quantity: {minQuantity}</div>
      <div className="text-indigo-600 mt-1">Price: ${price}</div>
      <div className="text-indigo-600 mt-1">
        {variants ? "Has variants" : "No variants"}
      </div> */}
      {/* <div className="text-indigo-600 mt-1">
        Total Value: ${quantity * price}
      </div> */}
      {/* <div className="flex flex-row-reverse">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={async () => {
            setUpdate((prev) => !prev);
          }}
        >
          {update ? "Close" : "Update"}
        </button>
      </div> */}
      {/* <FolderDropDown
        itemName={name}
        itemId={id}
        folders={folders}
        getFolders={getFolders}
      /> */}
      {/* <>
        {update ? (
          <UpdateItem
            id={id}
            hideUpdateBar={() => {
              setUpdate((prev) => !prev);
            }}
            refetch={refetch}
            NewName={name}
            NewQuantity={quantity}
            NewMeasurement={measurement}
            NewMinQuantity={minQuantity}
            NewPrice={price}
            NewVariants={variants}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <></>
        )}
      </> */}
    </div>
  );
};

export default Item;
