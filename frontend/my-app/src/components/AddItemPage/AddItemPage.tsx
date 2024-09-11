import { useEffect, useState } from "react";
import axios from "axios";
import { addItemURI, baseURL } from "../../config";
import { Link } from "react-router-dom";
import TagItem from "../TagDropdown/TagItem";
import AddTagOverlay from "../AddTagOverlay/AddTagOverlay";

type itemType = {
  name: string;
  quantity: number;
  measurement: string;
  minQuantity: number;
  price: number;
  variants: boolean;
};
type tagType = {
  _id: string;
  email: string;
  name: string;
  color: string;
};
type refetchType = {
  refetch: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});
export default function AddItemPage({ refetch, setOpen }: refetchType) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measurement, setMeasurement] = useState("");
  const [minQuantity, setMinQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [variants, setVariants] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<tagType[]>([]);
  const [tags, setTags] = useState<tagType[]>([]);
  const [tagIsOpen, setTagIsOpen] = useState(false);
  const [tagOverlay, setTagOverlay] = useState(false);
  const [customText, setCustomText] = useState("");

  const getTags = async () => {
    const response = await authAxios.get("/getTags");
    setTags(response.data);
    console.log("tags have been set", response.data);
  };

  useEffect(() => {
    const fetchItems = async () => {
      await getTags();
    };

    fetchItems();
  }, []);
  const addItem = async () => {
    const item = {
      name: name,
      quantity: quantity,
      measurement: measurement,
      minQuantity: minQuantity,
      price: price,
      variants: variants,
      image: image,
      tags: selectedTags,
      customText: customText,
    };
    console.log(item);
    // const response = await authAxios.post(addItemURI, item).catch((err) => {
    //   console.log(err);
    // });
    const authAxios = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const response = await authAxios.post("/addItem", item).catch((err) => {
      console.log(err);
    });
    const updated = await refetch();
  };

  const handleCustomTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCustomText(value);
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
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add an item
          </h2>
        </div> */}

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
                  onChange={handlePriceChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="custom"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                custom field &nbsp;
                <span className="text-gray-400 font-normal">
                  {"(opotional)"}
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="custom"
                  name="custom"
                  type="string"
                  onChange={handleCustomTextChange}
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
                  onChange={handleVariantsChange}
                  required
                  className="accent-indigo-600"
                />
              </div>
            </div>
            <div className="">
              <div className="flex flex-row">
                <button
                  className="flex flex-row text-sm font-medium leading-6 text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    setTagIsOpen((prev) => !prev);
                  }}
                >
                  select tags&nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="mt-2 size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <span className="text-gray-400 font-normal ml-2">
                  {"(opotional)"}
                </span>
              </div>

              {tagIsOpen ? (
                <div className="mt-3">
                  {tags.map((tag: tagType) => {
                    return (
                      <TagItem
                        name={tag.name}
                        color={tag.color}
                        id={tag._id}
                        email={tag.email}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                      />
                    );
                  })}
                  <AddTagOverlay refetch={getTags} isopen={tagOverlay} />
                  <button
                    type="button"
                    onClick={() => {
                      setTagOverlay((prev) => !prev);
                    }}
                    className="py-1 px-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    Add a tag
                  </button>
                </div>
              ) : (
                <></>
              )}
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

            <div className="">
              {image === null || image === undefined ? (
                <></>
              ) : (
                <img src={URL.createObjectURL(image)}></img>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  addItem();
                  setOpen(false);
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
            {/* {test?<><img src={URL.createObjectURL(image!)}></img></>:<></>} */}
          </form>
        </div>
      </div>
    </>
  );
}
