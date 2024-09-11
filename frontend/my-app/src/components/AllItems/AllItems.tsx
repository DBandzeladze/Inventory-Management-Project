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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import TagDropdown from "../TagDropdown/TagDropdown";
import ChatComponent from "../ChatComponent/ChatComponent";

const AllItems = () => {
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
  const [folderoverlay, setFolderoverlay] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState<tagType[]>([]);

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
        folderFilter: folderFilter,
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
  }, [sortingOption, page, itemLimit]);

  useEffect(() => {
    console.log(sortingOption);
  }, [sortingOption]);

  return (
    // loading?<Loading/>:
    <div className="flex flex-row content-evenly justify-start ">
      <div className="flex flex-row border-r">
        <NavigationSidebar />
        <FilterSidebar
          setPage={setPage}
          sortingOption={sortingOption}
          page={page}
          itemLimit={itemLimit}
          setLoading={setLoading}
          setItems={setItems}
          setTotalPages={setTotalPages}
          setTotalItems={setTotalItems}
        />
      </div>
      <div className="flex flex-col bg-[#f6f8f9] overflow-y-scroll pt-[20px] pl-[40px] pr-[40px] w-full">
        <div className="fixed chat">
          <div className="flex flex-row justify-end absolute top-[880px] left-[1350px]">
            <ChatComponent />
          </div>
        </div>
        <div className="flex flex-row justify-between pb-5 border-b">
          <div className="text-4xl text-[#4f5366]">Advanced Search</div>
          <div className="flex flex-row">
            <AddItemOverlay refetch={getfilteredItems} isopen={addItemsOpen} />
            <button
              type="button"
              onClick={() => {
                setAddItemsOpen((prev) => !prev);
              }}
              className="w-[200px] mr-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Add item
            </button>
            <FolderOverlay refetch={getfilteredItems} isopen={folderoverlay} />
            <button
              type="button"
              onClick={() => {
                setFolderoverlay((prev) => !prev);
              }}
              className=" w-[200px] h-[40px] py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Add folder
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="mt-2 text-[#4f5366] mt-4">
            Sort by:&nbsp;&nbsp;&nbsp;
            <SortDropDown
              sortingOption={sortingOption}
              setSortingOption={setSortingOption}
            />
          </div>
          <div className="">
            <Menu as="div" className="relative inline-block text-left mb-2">
              <div>
                <MenuButton className="p-2 bg-gray-200 rounded-lg mt-4 hover:bg-[#4f5366] stroke-black hover:stroke-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-15 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to="http://localhost:3000/Grid"
                      className="block px-4 py-2 w-15 text-sm text-left text-gray-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      onClick={() => {}}
                    >
                      grid
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="http://localhost:3000/Allitems"
                      className="block px-4 py-2 w-15 text-sm text-left text-gray-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      row
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
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
                tags,
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
                    tags={tags}
                  />
                </>
              );
            })}
          </div>
        )}

        <div className="mb-2">
          <div className="flex flex-row">
            <div className="text-gray-500 mr-2 mt-1">show:</div>
            <PageLimitDropdown setItemLimit={setItemLimit} />
            <div className="text-gray-500 ml-2 mt-1">per page</div>
          </div>
          {totalPages >= 2 ? (
            <div className="">
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
          ) : (
            <></>
          )}
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

export default AllItems;
