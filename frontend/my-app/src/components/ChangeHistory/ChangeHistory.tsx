import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../config";
import HistoryItem from "../HistoryItem/HistoryItem";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";
import OptionDropdown from "../OptionDropdown/OptionDropdown";
import Loading from "../Loading/Loading";
type historyItemType = {
  _id: string;
  createdAt: string;
  operation: string;
  name: string;
  quantity: number;
  measurement: string;
  minQuantity: number;
  price: number;
  variants: boolean;
  userID: string;
  image: { type: string; data: number[] };
};
const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

const ChangeHistory = () => {
  const [logs, setLogs] = useState<historyItemType[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [folderQuantity, setFolderQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    try {
      const response = await authAxios.get<historyItemType[]>("/history");
      setLogs(response.data);
    } catch (err) {
      console.log(err);
      setLogs([]);
    }
  };

  const getStats = async () => {
    try {
      const response = await authAxios.get("/historyStats");
      setTotalQuantity(response.data.totalQuantity);
      setTotalAmount(response.data.totalAmount);
      setItemQuantity(response.data.itemQuantity);
      setFolderQuantity(response.data.folderQuantity);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      await getHistory();
      await getStats();
      setLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className="flex flex-row h-screen bg-[#f6f8f9]">
        <NavigationSidebar />

        <div className="bg-[#f6f8f9] w-11/12 mt-5">
          <div className="text-3xl ml-8 mb-2 text-[#4f5366] font-bold border-b-2 pb-4">
            History
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="">
              <div className="text-2xl ml-8 mt-4 mb-2 text-[#4f5366] font-bold pb-4 text-center mr-[680px]">
                Inventory summary
              </div>
              <div className="flex flex-row justify-center">
                <div className="text-2xl mr-6 bg-white w-[200px] h-[200px] rounded-md text-[#4f5366] font-bold">
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center mt-7 mb-1">
                      <div className="h-[60px] w-[60px] bg-[#8fe3df] mt-3 rounded-full flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#277571"
                          className="size-7"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                            clip-rule="evenodd"
                          />
                          <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">{itemQuantity}</div>
                    <div className="font-normal text-center text-base">
                      Items
                    </div>
                  </div>
                </div>
                <div className="text-2xl mr-6 bg-white w-[200px] h-[200px] rounded-md text-[#4f5366] font-bold">
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center mt-7 mb-1">
                      <div className="h-[60px] w-[60px] bg-orange-100 mt-3 rounded-full flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="orange"
                          className="size-7"
                        >
                          <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="text-center">{folderQuantity}</div>
                    <div className="font-normal text-center text-base">
                      Folders
                    </div>
                  </div>
                </div>
                <div className="text-2xl mr-6 bg-white w-[200px] h-[200px] rounded-md text-[#4f5366] font-bold">
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center mt-7 mb-1">
                      <div className="h-[60px] w-[60px] bg-indigo-200 mt-3 rounded-full flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="indigo"
                          className="size-7"
                        >
                          <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                          <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                          <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">{totalQuantity}</div>
                    <div className="font-normal text-center text-base">
                      Total Quantity
                    </div>
                  </div>
                </div>
                <div className="text-2xl mr-6 bg-white w-[200px] h-[200px] rounded-md text-[#4f5366] font-bold">
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center mt-7 mb-1">
                      <div className="h-[60px] w-[60px] bg-red-100 mt-3 rounded-full flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="size-7"
                        >
                          <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                          <path
                            fill-rule="evenodd"
                            d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                            clip-rule="evenodd"
                          />
                          <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">{totalAmount} GEL</div>
                    <div className="font-normal text-center text-base">
                      Total Value
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center mt-8">
                <div className="flex flex-col justify-center">
                  <div className="text-2xl ml-8 text-[#4f5366] font-bold pb-4">
                    Recent Activity
                  </div>
                  <div className="ml-8">
                    <OptionDropdown />
                    {logs.map((item: historyItemType) => {
                      return (
                        <HistoryItem
                          key={item._id}
                          _id={item._id}
                          createdAt={item.createdAt}
                          operation={item.operation}
                          name={item.name}
                          quantity={item.quantity}
                          measurement={item.measurement}
                          minQuantity={item.minQuantity}
                          price={item.price}
                          variants={item.variants}
                          userID={item.userID}
                          image={item.image}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeHistory;
