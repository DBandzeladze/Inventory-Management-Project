import React, { useEffect, useState } from "react";
type historyItemType = {
  _id: string;
  createdAt: string;
  operation: string;
  name: string;
  quantity: number;
  measurement: string;
  minQuantity: number;
  price: number;
  variants: boolean;
  userID: string;
  image: { type: string; data: number[] };
};

const HistoryItem = ({
  _id,
  createdAt,
  operation,
  name,
  quantity,
  measurement,
  minQuantity,
  price,
  variants,
  userID,
  image,
}: historyItemType) => {
  const [img, setImg] = useState<string>();

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

  useEffect(() => {
    if (image) {
      setImg(`data:image/jpeg;base64,${toBase(image.data)}`);
    }
  }, []);
  return (
    <div className="p-4 bg-white hover:shadow-md rounded-lg border border-gray-200 w-[900px] mb-2 mt-2">
      <div className="flex flex-row justify-between">
        <div className="text-[#4f5366] text-lg">
          {userID} {operation} item <span className="font-bold">{name}</span> in{" "}
          <span className="font-bold">{"items"}</span>
        </div>
        <div className="text-[#4f5366] text-lg">{formatDate(createdAt)}</div>
      </div>

      {/* <div className="flex justify-between">
        <div className="text-indigo-600 font-bold text-lg">{name}</div>
      </div>
      {img && <img className="mt-1 mb-4 max-w-80 max-h-45" src={img}></img>}
      <div className="text-indigo-600 mt-1">
        Changed By: {userID} at {formatDate(createdAt)}
      </div>
      <div className="text-indigo-600 mt-1">Operation: {operation}</div>
      <div className="text-indigo-600 mt-1">
        Quantity: {quantity} {measurement}s
      </div>
      <div className="text-indigo-600 mt-1">Min Quantity: {minQuantity}</div>
      <div className="text-indigo-600 mt-1">Price: ${price}</div>
      <div className="text-indigo-600 mt-1">
        {variants ? "Has variants" : "No variants"}
      </div>
      <div className="text-indigo-600 mt-1">
        Total Value: ${quantity * price}
      </div> */}
    </div>
  );
};

export default HistoryItem;
