import React, { useState } from "react";
import TagDropdown from "../TagDropdown/TagDropdown";
import axios from "axios";
import { baseURL } from "../../config";
type tagType = {
  _id: string;
  email: string;
  name: string;
  color: string;
};
type itemType = {
  _id: string;
  __v: number;
  name: string;
  quantity: number;
  measurement: string;
  minQuantity: number;
  price: number;
  variants: boolean;
  image: { data: number[]; type: string };
  totalPrice: number;
  createdAt: string;
  tags: tagType[];
};
type getFilteredItemsType = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  sortingOption: object;
  page: number;
  itemLimit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: React.Dispatch<React.SetStateAction<itemType[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
};
const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});
const FilterSidebar = ({
  setPage,
  sortingOption,
  page,
  itemLimit,
  setLoading,
  setItems,
  setTotalItems,
  setTotalPages,
}: getFilteredItemsType) => {
  const [name, setName] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string | number>("");
  const [maxPrice, setMaxPrice] = useState<string | number>("");
  const [minTotalPrice, setMinTotalPrice] = useState<string | number>("");
  const [maxTotalPrice, setMaxTotalPrice] = useState<string | number>("");
  const [minQuantity, setMinQuantity] = useState<string | number>("");
  const [maxQuantity, setMaxQuantity] = useState<string | number>("");
  const [withVariants, setWithVariants] = useState(true);
  const [withNoVariants, setWithNoVariants] = useState(true);
  const [filterIsOpen, setFilterIsOpen] = useState(true);
  const [nameisopen, setNameisopen] = useState(false);
  const [priceisopen, setPriceisopen] = useState(false);
  const [quantityisopen, setQuantityisopen] = useState(false);
  const [variantsisopen, setVariantsisopen] = useState(false);
  const [totalPriceisopen, setTotalpriceisopen] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState<tagType[]>([]);
  const [lowFlag, setLowFlag] = useState(false);
  const [lowIsOpen, setLowIsOpen] = useState(false);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };
  const handleFolderFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFolderFilter(value);
  };
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPrice(value);
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxPrice(value);
  };
  const handleMinTotalPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMinTotalPrice(value);
  };
  const handleMaxTotalPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMaxTotalPrice(value);
  };
  const handleMinQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMinQuantity(value);
  };
  const handleMaxQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMaxQuantity(value);
  };
  const handleWithVariantsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithVariants(event.target.checked);
  };
  const handleWithNoVariantsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithNoVariants(event.target.checked);
  };
  const handleLowFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLowFlag(event.target.checked);
  };
  const getfilteredItems = async () => {
    type pagenatedDataType = {
      currentPage: number;
      filteredItems: itemType[];
      totalPages: number;
      totalItems: number;
    };
    try {
      const filterParams = {
        name: name,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minTotalPrice: minTotalPrice,
        maxTotalPrice: maxTotalPrice,
        minQuantity: minQuantity,
        maxQuantity: maxQuantity,
        withNoVariants: withNoVariants,
        withVariants: withVariants,
        sortingOption: sortingOption,
        folderFilter: folderFilter,
        tagFilter: selectedTags,
        lowFlag: lowFlag,
      };
      setLoading(true);
      const response = await authAxios.post<pagenatedDataType>(
        `/getfilteredItemsTest?page=${page}&limit=${itemLimit}`,
        filterParams
      );
      console.log(response.data);
      setItems(response.data.filteredItems);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setItems([]);
    }
  };

  return (
    <>
      {filterIsOpen ? (
        <div className="w-[284px]">
          <div className=" bg-white h-screen">
            {/* overflow-y-scroll */}
            <h2 className="p-4 text-x1 font semibold text-3xl test-indigo-600 mb-4">
              Filter items
            </h2>
            <div className="searchbar">
              <div className="flex flex-row p-2 border-b">
                <div className="mt-2 ml-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="grey"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="folder"
                  onChange={handleFolderFilterChange}
                  className="p-4 w-full px-3 py-2 focus:outline-nonde focus:ring-indigo-600 mb-1 text-lg"
                  placeholder="Search folders"
                />
              </div>
              <button
                className="relative bottom-[13px] left-[273px] rounded-full p-1 bg-gray-200"
                onClick={() => setFilterIsOpen((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 mb-4 border-b-[1px] border-gray-200">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mt-1 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  className="block text-[#4f5366] mb-2 text-xl"
                  onClick={() => {
                    setNameisopen((prev) => !prev);
                  }}
                >
                  Name
                </button>
              </div>

              {nameisopen ? (
                <input
                  type="text"
                  id="name"
                  onChange={handleNameChange}
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="Name"
                  value={name ? name : ""}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="p-4 mb-4 border-b-[1px] border-gray-200">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mt-1 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  className="block text-[#4f5366] mb-2 text-xl"
                  onClick={() => {
                    setPriceisopen((prev) => !prev);
                  }}
                >
                  Price
                </button>
              </div>
              {priceisopen ? (
                <>
                  <div className="flex flex-row">
                    <div className="mb-4 mr-2">
                      <input
                        type="number"
                        id="minPrice"
                        onChange={handleMinPriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                        placeholder="Min"
                        value={minPrice ? minPrice : ""}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="number"
                        id="maxPrice"
                        onChange={handleMaxPriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                        placeholder="Max"
                        value={maxPrice ? maxPrice : ""}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="p-4 mb-4 border-b-[1px] border-gray-200">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mt-1 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  className="block text-[#4f5366] mb-2 text-xl"
                  onClick={() => {
                    setQuantityisopen((prev) => !prev);
                  }}
                >
                  Quantity
                </button>
              </div>
              {quantityisopen ? (
                <>
                  <div className="flex flex-row">
                    <div className="mb-4 mr-2">
                      <input
                        type="number"
                        id="minQuantity"
                        onChange={handleMinQuantityChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                        placeholder="Min"
                        value={minQuantity ? minQuantity : ""}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="number"
                        id="maxQuantity"
                        onChange={handleMaxQuantityChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                        placeholder="Max"
                        value={maxQuantity ? maxQuantity : ""}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="p-4 mb-4 border-b-[1px] border-gray-200">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mt-1 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  className="block text-[#4f5366] mb-2 text-xl"
                  onClick={() => {
                    setVariantsisopen((prev) => !prev);
                  }}
                >
                  Variants
                </button>
              </div>
              {variantsisopen ? (
                <>
                  <div className="flex items-center mb2">
                    <input
                      type="checkbox"
                      id="HasVariants"
                      onChange={handleWithVariantsChange}
                      checked={withVariants}
                      className="h-4 w-4 accent-indigo-600 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded"
                    />
                    <label
                      htmlFor="HasVariants"
                      className="ml-2 text-indigo-600"
                    >
                      {" "}
                      With Variants
                    </label>
                    <input
                      type="checkbox"
                      id="HasNoVariants"
                      onChange={handleWithNoVariantsChange}
                      checked={withNoVariants}
                      className="h-4 w-4 accent-indigo-600 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded"
                    />
                    <label
                      htmlFor="HasNoVariants"
                      className="ml-2 text-indigo-600"
                    >
                      {" "}
                      With No Variants
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="p-4 mb-4 border-b-[1px] border-gray-200">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mt-1 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  className="block text-[#4f5366] mb-2 text-xl"
                  onClick={() => {
                    setTotalpriceisopen((prev) => !prev);
                  }}
                >
                  Total Price
                </button>
              </div>
              {totalPriceisopen ? (
                <>
                  <div className="flex flex-row">
                    <div className="mb-4 mr-2">
                      <input
                        type="number"
                        id="minTotalPrice"
                        onChange={handleMinTotalPriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                        placeholder="Min"
                        value={minTotalPrice ? minPrice : ""}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="number"
                        id="maxTotalPrice"
                        onChange={handleMaxTotalPriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                        placeholder="Max"
                        value={maxTotalPrice ? maxTotalPrice : ""}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              <TagDropdown
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
            <div className="p-4 mb-4 border-b-[1px] border-gray-200">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mt-1 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  className="block text-[#4f5366] mb-2 text-xl"
                  onClick={() => {
                    setLowIsOpen((prev) => !prev);
                  }}
                >
                  out of stock
                </button>
              </div>
              {lowIsOpen ? (
                <>
                  <div className="flex items-center mb2">
                    <input
                      type="checkbox"
                      id="low"
                      onChange={handleLowFilterChange}
                      checked={lowFlag}
                      className="h-4 w-4 accent-indigo-600 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded"
                    />
                    <label htmlFor="low" className="ml-2 text-indigo-600">
                      search only items below limit
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="p-4">
              <button
                type="button"
                onClick={() => {
                  setPage(1);
                  getfilteredItems();
                }}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white w-[20px]">
            <button
              className="relative top-[130px] left-[11px] rounded-full p-1 bg-gray-200"
              onClick={() => setFilterIsOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FilterSidebar;
