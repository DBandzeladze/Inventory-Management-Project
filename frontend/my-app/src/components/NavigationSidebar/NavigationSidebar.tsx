import React from "react";
import { Link } from "react-router-dom";

const NavigationSidebar = () => {
  return (
    // may need height full
    <div className="w-[5.5rem] h-full bg-indigo-600">
      <div className="flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <Link
            to="/itemsPage"
            className="h-[48px] w-[48px] hover:bg-indigo-500 mt-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                stroke="#fff"
                stroke-miterlimit="10"
                stroke-opacity=".8"
                stroke-width="1.534"
                d="M23.308 30.51c3.978 0 7.203-3.224 7.203-7.203 0-3.978-3.225-7.202-7.203-7.202-3.979 0-7.203 3.224-7.203 7.203 0 3.978 3.224 7.203 7.203 7.203z"
              ></path>
              <path
                stroke="#fff"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-opacity=".8"
                stroke-width="1.534"
                d="M28.4 28.4l3.495 3.495"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Link
            to="/AllItems"
            className="h-[48px] w-[48px] hover:bg-indigo-500 mt-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#fff"
              className="size-6 flex ml-3 mt-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Link
            to="/welcomePage"
            className="h-[48px] w-[48px] hover:bg-indigo-500 mt-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                stroke="#fff"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-opacity=".8"
                stroke-width="1.514"
                d="M16.045 19.488h15.91"
              ></path>
              <path
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-opacity=".8"
                stroke-width="1.514"
                d="M19.325 16.164h9.589c.423 0 .824.187 1.095.512l1.617 1.94c.213.257.33.58.33.913v10.408c0 1.049-.85 1.9-1.9 1.9H18.183c-1.05 0-1.9-.851-1.9-1.9V19.529c0-.334.117-.656.33-.912l1.617-1.941c.271-.325.672-.512 1.095-.512zM21.98 22.812h4.275M24.12 16.4v2.85"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Link
            to="/history"
            className="h-[48px] w-[48px] hover:bg-indigo-500 mt-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#fff"
              className="size-6 flex ml-3 mt-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          </Link>
        </div>
        {/* <div className="flex flex-row justify-center items-center">
          <Link
            to="/settings"
            className="h-[48px] w-[48px] hover:bg-indigo-500 mt-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="size-6 flex ml-3 mt-3"
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
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default NavigationSidebar;
