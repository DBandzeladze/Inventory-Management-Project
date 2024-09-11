import React, { useEffect, useState } from "react";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import SettingsSidebar from "../SettingsSidebar/SettingsSidebar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";
import ChatComponent from "../ChatComponent/ChatComponent";
import AddLogoOverlay from "../AddLogoOverlay/AddLogoOverlay";

type userDataType = {
  _id: string;
  lastname: string;
  firstname: string;
  plan: string;
  email: string;
  password: string;
};

const CompanyDetails = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [role, setRole] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserdata] = useState<userDataType>();
  const [image, setImage] = useState<File | null>(null);
  const [updateLogoIsopen, setUpdateLogoIsopen] = useState(false);

  const authAxios = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  const getUserData = async () => {
    try {
      const response = await authAxios.get("/getUserInfo");
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setUserdata(response.data);
      console.log("this is the user data: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changePassword = async () => {
    try {
      const data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      await authAxios.put("/changePassword", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      await getUserData();
    };
    fetchdata();
  }, []);

  const handlefirstameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFirstname(value);
  };

  const handlelastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLastname(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  const handleCurrPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentPassword(value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setNewPassword(value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files ? event.target.files[0] : null;
    console.log(value);
    setImage(value);
  };

  return (
    <div className="bg-[#f6f8f9] w-full  overflow-y-scroll	scrollbar-hide ">
      <div className="fixed chat">
        <div className="flex flex-row justify-end absolute top-[900px] left-[1391px]">
          <ChatComponent />
        </div>
      </div>
      <div className="px-10 pt-5">
        <div className="text-4xl pb-5 text-[#4f5366] border-b">
          Company Details
        </div>
        <div className="flex flex-row">
          <div className="bg-white w-full mx-3 mt-8 p-6 pb-8 rounded-lg shadow-sm">
            <div className="font-semibol text-2xl text-gray-600">
              Company Info
            </div>
            <div className="infocontainer flex flex-col px-4">
              <div className="flex flex-row justify-between mt-8">
                <div className="">
                  <input
                    type="text"
                    id="firstname"
                    className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                    placeholder="Enter Company Name*"
                    onChange={handlefirstameChange}
                  />
                </div>
                <div className="">
                  <Menu as="div" className="relative text-left ">
                    <div>
                      <MenuButton className="px-4 py-2 border rounded-lg border-gray-300 w-[207px]">
                        <div className="flex flex-row justify-between">
                          <div className="text-gray-400">Enter industry</div>
                          <div className="p-1">
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
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
              <div className="flex flex-row justify-between mt-8">
                <div className="">
                  <Menu as="div" className="relative text-left ">
                    <div>
                      <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                        <div className="flex flex-row justify-between">
                          <div className="text-gray-400">Company Color</div>
                          <div className="p-1">
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
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
                <div className="">
                  <input
                    type="string"
                    id="phoneNumber"
                    className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                    placeholder="initials"
                    onChange={handlePhoneNumberChange}
                  />
                  {/* <div className="relative">
                    <input
                      type="text"
                      id="floating_outlined"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Floating outlined
                    </label>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-row justify-between mt-8">
                <div className="">
                  <button className="font-semibold px-3 py-2 border rounded-lg text-gray-500 ">
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg w-[450px] ml-4 shadow-sm mt-8 px-6 py-5 flex flex-col justify-between">
            <div className="text-2xl text-center text-gray-600">
              Company Logo
            </div>
            <div className="mt-4 mb-4 max-w-[180px] ml-[53px]">
              <img
                className="w-full h-full object-cover object-center rounded-xl"
                src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
              ></img>
            </div>
            <div className="flex flex-row justify-center">
              <AddLogoOverlay
                refetch={async () => {}}
                isopen={updateLogoIsopen}
              />
              <button
                className="px-8 py-2 text-gray-500 font-semibold rounded-lg border"
                onClick={() => {
                  setUpdateLogoIsopen((prev) => !prev);
                }}
              >
                Update Logo
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white mx-3 mt-8 p-6 pb-8 rounded-lg shadow-sm">
          <div className="font-semibold text-lg text-gray-600">
            General Settings
          </div>
          <div className="infocontainer flex flex-col px-4">
            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <Menu as="div" className="relative text-left ">
                  <div>
                    <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                      <div className="flex flex-row justify-between">
                        <div className="text-gray-400">Country</div>
                        <div className="p-1">
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
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
              <div className="">
                <Menu as="div" className="relative text-left ">
                  <div>
                    <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                      <div className="flex flex-row justify-between">
                        <div className="text-gray-400">Time Zone</div>
                        <div className="p-1">
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
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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

            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <Menu as="div" className="relative text-left ">
                  <div>
                    <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                      <div className="flex flex-row justify-between">
                        <div className="text-gray-400">Date Format</div>
                        <div className="p-1">
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
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
              <div className="">
                <Menu as="div" className="relative text-left ">
                  <div>
                    <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                      <div className="flex flex-row justify-between">
                        <div className="text-gray-400">Time Format</div>
                        <div className="p-1">
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
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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

            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <Menu as="div" className="relative text-left ">
                  <div>
                    <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                      <div className="flex flex-row justify-between">
                        <div className="text-gray-400">Currency</div>
                        <div className="p-1">
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
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
              {/* <div className="">
                  <Menu as="div" className="relative text-left ">
                    <div>
                      <MenuButton className="px-4 py-2 border border-gray-300 rounded-lg w-[207px]">
                        <div className="flex flex-row justify-between">
                          <div className="text-gray-400">Time Zone</div>
                          <div className="p-1">
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
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
                </div> */}
            </div>

            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <button
                  className="font-semibold px-3 py-2 border rounded-lg text-gray-500 "
                  onClick={() => {
                    console.log(currentPassword);
                    console.log(newPassword);
                    changePassword();
                  }}
                >
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
