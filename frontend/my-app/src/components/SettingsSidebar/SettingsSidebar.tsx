import React, { useState } from "react";
import TagDropdown from "../TagDropdown/TagDropdown";
import axios from "axios";
import { baseURL } from "../../config";

const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

type selectedType = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsSidebar = ({ selected, setSelected }: selectedType) => {
  const [filterIsOpen, setFilterIsOpen] = useState(true);

  return (
    <>
      {filterIsOpen ? (
        <div className="w-[284px]">
          <div className=" bg-white h-screen border-r">
            {/* overflow-y-scroll */}
            <h2 className="p-4 text-x1 font semibold text-3xl test-indigo-600 mb-3">
              Settings
            </h2>
            <div className="searchbar mt-8">
              <button
                onClick={() => {
                  setSelected("profile");
                }}
              >
                <div className="flex flex-row">
                  <div className="ml-5 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={selected === "profile" ? "#612af7" : "gray"}
                      className="size-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <div
                    className=" text-lg text-gray-600 hover:text-indigo-600"
                    style={selected === "profile" ? { fontWeight: 500 } : {}}
                  >
                    User Profile
                  </div>
                </div>
              </button>

              <button
                className="flex flex-row mt-7"
                onClick={() => {
                  setSelected("preferences");
                }}
              >
                <div className="ml-5 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={selected === "preferences" ? "#612af7" : "gray"}
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <div
                  className="text-lg text-gray-600 hover:text-indigo-600"
                  style={selected === "preferences" ? { fontWeight: 500 } : {}}
                >
                  Preferences
                </div>
              </button>
              <button
                className="relative bottom-[58px] left-[273px] rounded-full p-1 bg-gray-200"
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
            <div className="border-b"></div>

            <button
              onClick={() => {
                setSelected("company");
              }}
            >
              <div className="flex flex-row mt-5">
                <div className="ml-5 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={selected === "company" ? "#612af7" : "gray"}
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div
                  className=" text-lg text-gray-600 hover:text-indigo-600"
                  style={selected === "company" ? { fontWeight: 500 } : {}}
                >
                  Company Details
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setSelected("billing");
              }}
            >
              <div className="flex flex-row mt-6 mb-7">
                <div className="ml-5 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={selected === "billing" ? "#612af7" : "gray"}
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </div>
                <div
                  className=" text-lg text-gray-600 hover:text-indigo-600"
                  style={selected === "billing" ? { fontWeight: 500 } : {}}
                >
                  Plan & Billing
                </div>
              </div>
            </button>

            <div className="border-b"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white w-[20px] border-r">
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

export default SettingsSidebar;
