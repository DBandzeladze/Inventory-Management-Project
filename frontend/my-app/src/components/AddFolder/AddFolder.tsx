import { useState } from "react";
import axios from "axios";
import { addItemURI, baseURL } from "../../config";

type refetchType = {
  refetch: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});
export default function AddFolder({ refetch, setOpen }: refetchType) {
  const [name, setName] = useState("");

  const addItem = async () => {
    const folder = {
      name: name,
    };
    console.log(folder);
    // const response = await authAxios.post(addItemURI, item).catch((err) => {
    //   console.log(err);
    // });
    await axios
      .post("/addFolder", folder, {
        baseURL: baseURL,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = String(value);
    setName(numberValue);
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleNameChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  addItem();
                  setOpen(false);
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
