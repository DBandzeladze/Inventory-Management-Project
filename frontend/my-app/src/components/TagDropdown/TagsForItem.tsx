import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../config";
import TagItem from "./TagItem";
import TagItemForItem from "./TagItemForItem";

type tagType = {
  _id: string;
  email: string;
  name: string;
  color: string;
};
type tagsForItemType = {
  selectedTags: tagType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<tagType[]>>;
  updateTags: () => void;
  itemTags: tagType[];
  itemId: string;
};
export default function TagsForItem({
  selectedTags,
  setSelectedTags,
  updateTags,
  itemTags,
  itemId,
}: tagsForItemType) {
  const [tags, setTags] = useState([]);
  const [tagsIsopen, setTagsIsopen] = useState(false);

  const authAxios = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  const getTags = async () => {
    const response = await authAxios.get("/getTags");
    setTags(response.data);
  };

  useEffect(() => {
    const fetchItems = async () => {
      await getTags();
    };

    fetchItems();
  }, []);

  return (
    <div className=" mb-4  relative">
      <div className="">
        <button
          className="flex flex-row justify-center text-[#4f5366] mb-2 w-[24px] h-[24px]"
          onClick={() => {
            setTagsIsopen((prev) => !prev);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="mt-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300 size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {tagsIsopen ? (
        <div className="absolute top-10 right-0 bg-white p-2 w-[130px] rounded-lg shadow-md z-40">
          {tags.map((tag: tagType) => {
            return (
              <TagItemForItem
                name={tag.name}
                color={tag.color}
                id={tag._id}
                email={tag.email}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                itemTags={itemTags}
                itemId={itemId}
              />
            );
          })}
          <div className="border-t pt-2 boder-gray-600">
            <button
              className="ml-1 bg-indigo-600 rounded-lg py-0.5 px-1 text-white font-medium hover:bg-indigo-700"
              onClick={async () => {
                updateTags();
                setTagsIsopen(false);
                console.log(selectedTags);
              }}
            >
              add tags
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
