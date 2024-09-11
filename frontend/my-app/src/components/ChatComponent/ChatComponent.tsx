import React, { useState } from "react";
import { EmailPage } from "../EmailPage/EmailPage";

const ChatComponent = () => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  return (
    <div className="realtive z-50">
      {chatIsOpen ? (
        <></>
      ) : (
        <button
          className="bg-indigo-600 rounded-3xl pl-2 pr-3 py-2 w-[90px] text-white"
          onClick={() => {
            setChatIsOpen(true);
          }}
        >
          <div className="flex flex-row justify">
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </div>

            <div className="font-semibold">Help</div>
          </div>
        </button>
      )}
      {chatIsOpen ? (
        <div className="absolute bottom-[-20px] right-[-88px]">
          <EmailPage setChatIsOpen={setChatIsOpen} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatComponent;
