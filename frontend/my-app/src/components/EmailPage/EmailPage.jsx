import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

type emailpagetype = {
  setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
};
export const EmailPage = ({ setChatIsOpen }: emailpagetype) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("contact_service2003", "contact_form2003", form.current, {
        publicKey: "4zE17P-FlXlyVyqjf",
      })
      .then(
        () => {
          setChatIsOpen(false);
        },
        (error) => {
          window.location.href = "http://localhost:3000/email/failure";
        }
      );
  };

  return (
    <div className="w-[250px] ml-10 bg-white rounded-lg shadow-md z-10">
      <div className="bg-indigo-600 rounded-t-lg h-[38px] flex flex-row-reverse">
        <button
          className="px-2"
          onClick={() => {
            setChatIsOpen(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <form className="" ref={form} onSubmit={sendEmail}>
        <div className="p-4">
          {" "}
          <label htmlFor="chatName">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
            type="text"
            name="name"
            id="chatName"
          />
          <label htmlFor="chatEmail">Email</label>
          <input
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-nonde focus:ring-indigo-600"
            type="email"
            name="user_email"
            id="chatEmail"
          />
        </div>

        <div className="flex flex-row-reverse border-t p-1">
          <button
            className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
          <input
            type="text"
            id="folder"
            className="w-full px-3 py-1 mb-1 text-lg"
            placeholder="type your message"
            name="message"
          />
        </div>
      </form>
    </div>
  );
};
