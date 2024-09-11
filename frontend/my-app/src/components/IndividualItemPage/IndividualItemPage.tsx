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
import FolderOverlay from "../FolderOverlay/FolderOverlay";
import PageLimitDropdown from "../PageLimitDropdown/PageLimitDropdown";
import UpdateItemOverley from "../UpdateItemOverlay/UpdateItemOverlay";
import { useLocation, useSearchParams } from "react-router-dom";
import TagDropdown from "../TagDropdown/TagDropdown";

const IndividualItemPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addItemsOpen, setAddItemsOpen] = useState(false);
  const [items, setItems] = useState<itemType[]>([]);
  const [item, setItem] = useState<itemType>();
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
  const [folderoverlay, setFolderoverlay] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const [img, setImg] = useState<string>();
  const [selectedTags, setSelectedTags] = useState<tagType[]>([]);
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
    tags: tagType[];
    customText: string;
  };
  type tagType = {
    _id: string;
    email: string;
    name: string;
    color: string;
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

  const getItemById = async () => {
    type pagenatedDataType = {
      currentPage: number;
      filteredItems: itemType[];
      totalPages: number;
      totalItems: number;
    };
    try {
      setLoading(true);
      const response = await authAxios.get(`/item/${searchParams.get("id")}`);
      // console.log(response.data);
      setItem(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
      };
      setLoading(true);
      const response = await authAxios.post<pagenatedDataType>(
        `/getfilteredItemsTest?page=${page}&limit=${itemLimit}`,
        filterParams
      );
      // console.log(response.data);
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
      await getItemById();
      setLoading(false);
    };

    fetchItems();
  }, [sortingOption, page, itemLimit]);

  useEffect(() => {
    console.log(sortingOption);
  }, [sortingOption]);

  useEffect(() => {
    if (item && item.image) {
      setImg(`data:image/jpeg;base64,${toBase(item.image.data)}`);
    }
  }, [item]);

  return (
    <div className="flex flex-row content-evenly justify-start ">
      <div className="flex flex-row border-r">
        <NavigationSidebar />
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
              <div className="">
                <TagDropdown
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
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
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col bg-[#f6f8f9] overflow-y-scroll pt-[20px] w-full">
            <div className="flex flex-row justify-between bg-white p-2">
              <div className="text-3xl font-semibold ml-12 pb-2">
                {item?.name}
              </div>
              <div className="flex flex-row">
                <UpdateItemOverley
                  id={item!._id}
                  NewName={item!.name}
                  NewQuantity={item!.quantity}
                  NewMeasurement={item!.measurement}
                  NewMinQuantity={item!.minQuantity}
                  NewPrice={item!.price}
                  NewVariants={item!.variants}
                  refetch={getItemById}
                  loading={loading}
                  setLoading={setLoading}
                  isopen={folderoverlay}
                />
                <button
                  type="button"
                  onClick={() => {
                    setFolderoverlay((prev) => !prev);
                  }}
                  className=" py-2 px-2 text-sm bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <div className="flex flex-row">
                    <div className="mr-2  rounded-md p-1 bg-indigo-500 w-[22px] h-[22px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </div>
                    <div className="font-semibold">EDIT</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="pl-[40px] pr-[40px]">
              <div className="flex flex-row bg-white hover:shadow-md rounded-xl border-2 border-solid border-white h-[140px] mb-6 mt-6">
                <div className=" mt-2 mb-2 border-r w-3/12 pl-4">
                  <div className="flex flex-col">
                    <div className="text-[#4f5366] text-sm">Quantity</div>
                    <div className="text-xl text-gray-600 font-bold mt-3">
                      {item?.quantity}&nbsp;
                      <span className="text-[#4f5366] font-normal text-sm">
                        {item?.measurement}s
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-2 border-r w-3/12 pl-4">
                  <div className="text-[#4f5366] text-sm">Min Level</div>
                  <div className="text-xl text-gray-600 font-bold mt-3">
                    {item?.minQuantity}
                  </div>
                  <div className="text-[#4f5366] text-sm mt-3">
                    Alerts: <span>not included</span>
                  </div>
                </div>
                <div className="mt-2 mb-2 border-r w-3/12 pl-4">
                  <div className="text-[#4f5366] text-sm">Price . per unit</div>
                  <div className="text-xl text-gray-600 font-bold mt-3">
                    GEL {item?.price}
                  </div>
                </div>
                <div className="mt-2 mb-2 w-3/12 pl-4">
                  <div className="text-[#4f5366] text-sm">Total Value</div>
                  <div className="text-xl text-gray-600 font-bold mt-3">
                    GEL {item?.totalPrice}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-2">
                <div className="p-6 bg-white rounded-lg w-6/12 mr-2">
                  <div className="text-3xl mb-8 font-semibold">
                    Product Information
                  </div>
                  <div className="w-11/12 h-8/12 oveflow-hidden ">
                    {item?.image ? (
                      <img
                        className="w-full h-full object-cover object-center rounded-xl"
                        src={img}
                      ></img>
                    ) : (
                      <img
                        className="w-full h-full object-cover object-center rounded-xl"
                        src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                      ></img>
                    )}
                  </div>
                </div>
                <div className="p-6 bg-white rounded-lg w-6/12 ml-2">
                  <div className="text-3xl font-semibold">Custom Fields</div>
                  <div className="flex flex-col">
                    <div className="mt-2">
                      <div className="text-lg font-semibold">Item tags:</div>
                      <div className="mt-1 flex flex-row">
                        {item?.tags.map((tag) => {
                          return (
                            <div
                              className="rounded-lg text-sm font-semibold p-1 mr-1"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                      Custom comments:{" "}
                      <div className="text-base font-normal">
                        {item?.customText}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualItemPage;
