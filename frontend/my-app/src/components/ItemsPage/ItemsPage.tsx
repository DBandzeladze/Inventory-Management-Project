import axios from "axios";
import React, { useEffect, useState } from "react";
import { authAxios, baseURL, getItemsURI } from "../../config";
import Item from "../Item/Item";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import AddItemPage from "../AddItemPage/AddItemPage";
import Loading from "../Loading/Loading";
import SortDropDown from "../SortDropDown/SortDropDown";
import AddFolder from "../AddFolder/AddFolder";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import { Autocomplete } from "@mui/material";
import { DropdownSearch } from "../DropdownSearch/DropdownSearch";
import AddItemOverlay from "../AddItemOverlay/AddItemOverlay";

const ItemsPage = () => {
  const [addItemsOpen, setAddItemsOpen] = useState(false);
  const [items, setItems] = useState<itemType[]>([]);
  const [name, setName] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string | number>("");
  const [maxPrice, setMaxPrice] = useState<string | number>("");
  const [minTotalPrice, setMinTotalPrice] = useState<string | number>("");
  const [maxTotalPrice, setMaxTotalPrice] = useState<string | number>("");
  const [minQuantity, setMinQuantity] = useState<string | number>("");
  const [maxQuantity, setMaxQuantity] = useState<string | number>("");
  const [withVariants, setWithVariants] = useState(true);
  const [withNoVariants, setWithNoVariants] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sortingOption, setSortingOption] = useState<object>({ _id: 1 });
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemLimit, setItemLimit] = useState<number>(5);
  const [filterIsOpen, setFilterIsOpen] = useState(true);
  const [nameisopen, setNameisopen] = useState(false);
  const [priceisopen, setPriceisopen] = useState(false);
  const [quantityisopen, setQuantityisopen] = useState(false);
  const [variantsisopen, setVariantsisopen] = useState(false);
  const [totalPriceisopen, setTotalpriceisopen] = useState(false);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
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
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
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
  };
  const authAxios = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  // const getfilteredItems = async () =>{
  //   try {
  //     const filterParams = {
  //       name: name,
  //       minPrice: minPrice,
  //       maxPrice: maxPrice,
  //       minQuantity: minQuantity,
  //       maxQuantity: maxQuantity,
  //       withNoVariants: withNoVariants,
  //       withVariants: withVariants,
  //       sortingOption: sortingOption,
  //     }
  //     setLoading(true)
  //     const response = await authAxios.post<itemType[]>('/getfilteredItems', filterParams);
  //     console.log(response.data)
  //     setItems(response.data)
  //     setLoading(false)
  //   } catch (err) {
  //     console.log(err);
  //     setItems([])
  //   }
  // }
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

  useEffect(() => {
    const fetchItems = async () => {
      await getfilteredItems();
      setLoading(false);
    };

    fetchItems();
  }, [sortingOption, page]);

  useEffect(() => {
    console.log(sortingOption);
  }, [sortingOption]);

  return (
    // loading?<Loading/>:
    <div className="flex flex-row content-evenly justify-start ">
      <div className="flex flex-row border-r">
        <NavigationSidebar />
        <div className="w-[284px]">
          {filterIsOpen ? (
            <div className=" bg-white h-screen overflow-y-scroll">
              <h2 className="p-4 text-x1 font semibold text-3xl test-indigo-600 mb-4">
                Filter items
              </h2>
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
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="number"
                          id="maxPrice"
                          onChange={handleMaxPriceChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                          placeholder="Max"
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
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="number"
                          id="maxQuantity"
                          onChange={handleMaxQuantityChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                          placeholder="Max"
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
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded"
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
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 ronuded"
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
                          id="minPrice"
                          onChange={handleMinTotalPriceChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                          placeholder="Min"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="number"
                          id="maxPrice"
                          onChange={handleMaxTotalPriceChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
                          placeholder="Max"
                        />
                      </div>
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
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col bg-[#f6f8f9] overflow-y-scroll pt-[20px] pl-[40px] pr-[40px] w-full">
        <div className="text-4xl text-[#4f5366] pb-5 border-b">
          Advanced Search
        </div>
        <div className="mt-2 text-[#4f5366] mt-4">
          Sort by:&nbsp;&nbsp;&nbsp;
          <SortDropDown
            sortingOption={sortingOption}
            setSortingOption={setSortingOption}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="mt-2">
            <div className="text-xl text-[#4f5366]">
              Search results ({totalItems} items)
            </div>
            {items.map((item) => {
              const {
                _id,
                __v,
                name,
                quantity,
                measurement,
                minQuantity,
                price,
                variants,
                image,
                createdAt,
                totalPrice,
              } = item;
              return (
                <>
                  <Item
                    key={_id}
                    id={_id}
                    refetch={getfilteredItems}
                    name={name}
                    quantity={quantity}
                    measurement={measurement}
                    minQuantity={minQuantity}
                    price={price}
                    variants={variants}
                    image={image}
                    loading={loading}
                    setLoading={setLoading}
                    createdAt={createdAt}
                    totalPrice={totalPrice}
                  />
                </>
              );
            })}
          </div>
        )}
        <div className="mb-2">
          <button
            className="w-max bg-indigo-600 text-white rounded px-2 py-2"
            disabled={page === 1}
            onClick={() => {
              handlePageChange(page - 1);
            }}
          >
            Previous
          </button>
          <span className="ml-3 mr-3">{`Page ${page} of ${totalPages} pages`}</span>
          <button
            className="w-max bg-indigo-600 text-white rounded px-2 py-2 w-[76px]"
            disabled={page === totalPages}
            onClick={() => {
              handlePageChange(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
      {/* <div className="">
        <AddItemOverlay refetch={getfilteredItems} isopen={addItemsOpen} />
        <button
          type="button"
          onClick={() => {
            setAddItemsOpen((prev) => !prev);
          }}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Add Items
        </button>
        <>
          <AddFolder refetch={getfilteredItems} />
        </>
      </div> */}
    </div>
  );
};

export default ItemsPage;
