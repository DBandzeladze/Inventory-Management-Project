import { useState } from "react";
import axios from "axios";
import { addItemURI, baseURL } from "../../config";

type itemType = {
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
};

const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

export default function UpdateItem({
  id,
  NewName,
  NewQuantity,
  NewMeasurement,
  NewMinQuantity,
  NewPrice,
  NewVariants,
  refetch,
  loading,
  setLoading,
}: itemType) {
  const [name, setName] = useState(NewName);
  const [quantity, setQuantity] = useState(NewQuantity);
  const [measurement, setMeasurement] = useState(NewMeasurement);
  const [minQuantity, setMinQuantity] = useState(NewMinQuantity);
  const [price, setPrice] = useState(NewPrice);
  const [variants, setVariants] = useState(NewVariants);
  const [image, setImage] = useState<File | null>(null);

  const updateItem = async () => {
    const item = {
      name: name,
      quantity: quantity,
      measurement: measurement,
      minQuantity: minQuantity,
      price: price,
      variants: variants,
      image: image,
    };
    console.log("updating to: ", item);
    const response = await authAxios.put(`updateTest/${id}`, item);
    console.log("updated in the database");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = String(value);
    setName(numberValue);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);
    setQuantity(numberValue);
  };

  const handleMeasurementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const numberValue = String(value);
    setMeasurement(numberValue);
  };

  const handleMinQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const numberValue = Number(value);
    setMinQuantity(numberValue);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);
    setPrice(numberValue);
  };

  const handleVariantsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariants(event.target.checked);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files ? event.target.files[0] : null;
    console.log(value);
    setImage(value);
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                quantity
              </label>
              <div className="mt-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={quantity}
                  required
                  onChange={handleQuantityChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="measurement"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                measurement
              </label>
              <div className="mt-2">
                <input
                  id="measurement"
                  name="measurement"
                  type="text"
                  value={measurement}
                  onChange={handleMeasurementChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="min quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                min quantity
              </label>
              <div className="mt-2">
                <input
                  id="min quantity"
                  name="min quantity"
                  type="number"
                  value={minQuantity}
                  onChange={handleMinQuantityChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="variants"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                variants
              </label>
              <div className="mt-2">
                <input
                  id="variants"
                  name="price"
                  type="checkbox"
                  checked={variants}
                  onChange={handleVariantsChange}
                  required
                  className="accent-indigo-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                add an image
              </label>
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

            <div>
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  await updateItem();
                  await refetch();
                  setLoading(false);
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
