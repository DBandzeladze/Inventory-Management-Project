import React, { useEffect, useState } from "react";
import ChatComponent from "../ChatComponent/ChatComponent";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";

type userDataType = {
  _id: string;
  lastname: string;
  firstname: string;
  plan: string;
  email: string;
  password: string;
};

const UserProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [role, setRole] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserdata] = useState<userDataType>();

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
  return (
    <div className="bg-[#f6f8f9] w-full  overflow-y-scroll	scrollbar-hide ">
      <div className="fixed chat">
        <div className="flex flex-row justify-end absolute top-[900px] left-[1391px]">
          <ChatComponent />
        </div>
      </div>
      <div className="px-10 pt-5">
        <div className="text-4xl pb-5 text-[#4f5366] border-b">
          User Profile
        </div>
        <div className="bg-white mx-3 mt-8 p-6 pb-8 rounded-lg shadow-sm">
          <div className="font-semibold text-lg text-gray-600">
            Personal Information
          </div>
          <div className="infocontainer flex flex-col px-4">
            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <input
                  type="text"
                  id="firstname"
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="Name"
                  value={firstname}
                  onChange={handlefirstameChange}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  id="lastname"
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="Name"
                  value={lastname}
                  onChange={handlelastnameChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <input
                  type="text"
                  id="email"
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="Name"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="">
                <input
                  type="number"
                  id="phoneNumber"
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="Phone Number"
                  value={phoneNumber}
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
                <div className="">
                  <Menu as="div" className="relative text-left ">
                    <div>
                      <MenuButton className="px-4 py-2 border rounded-lg ">
                        <div className="flex flex-row">
                          <div className="text-gray-400">
                            Enter your job function
                          </div>
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
              <div className="">
                <Menu as="div" className="relative text-left ">
                  <div>
                    <MenuButton className="px-4 py-2 border rounded-lg ">
                      <div className="flex flex-row">
                        <div className="text-gray-400">select your role...</div>
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
                <button className="font-semibold px-3 py-2 border rounded-lg text-gray-500 ">
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mx-3 mt-8 p-6 pb-8 rounded-lg shadow-sm">
          <div className="font-semibold text-lg text-gray-600">
            Change password
          </div>
          <div className="infocontainer flex flex-col px-4">
            <div className="flex flex-row justify-between mt-8">
              <div className="">
                <input
                  type="text"
                  id="name"
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={handleCurrPasswordChange}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  id="name"
                  className="p-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600 mb-1"
                  placeholder="New password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
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
              <div className="font-semibold text-indigo-500 hover:text-indigo-600">
                forgot password?
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mx-3 mt-8 p-6 pb-8 rounded-lg shadow-sm mb-8">
          <div className="font-semibold text-lg text-gray-600">
            Linked Accounts
          </div>
          <div className="infocontainer flex flex-col px-4">
            <div className="flex flex-row justify-between mt-8">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="60"
                  height="60"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <div className="font-semibold text-gray-600 text-lg mt-4 ml-4">
                  Google
                </div>
              </div>
              <div className="mt-4 text-gray-600">not connected</div>
              <div className="mt-4 flex flex-row">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                </div>
                <div className="ml-2">Link</div>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-8">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="60"
                  height="60"
                  viewBox="0 0 50 50"
                >
                  <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                </svg>
                <div className="font-semibold text-gray-600 text-lg mt-4 ml-4">
                  Apple ID
                </div>
              </div>
              <div className="mt-4 text-gray-600">not connected</div>
              <div className="mt-4 flex flex-row">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                </div>
                <div className="ml-2">Link</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
