import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../config";
import TagItem from "./TagItem";

type tagType = {
  _id: string;
  email: string;
  name: string;
  color: string;
};
type tagDropdownType = {
  selectedTags: tagType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<tagType[]>>;
};
export default function TagDropdown({
  selectedTags,
  setSelectedTags,
}: tagDropdownType) {
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
    <div className="p-4 mb-4 border-b-[1px] border-gray-200">
      <div className="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 mt-1 mr-2"
        >
          <path
            fill-rule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        <button
          className="block text-[#4f5366] mb-2 text-xl"
          onClick={() => {
            setTagsIsopen((prev) => !prev);
          }}
        >
          Tags
        </button>
      </div>
      {tagsIsopen ? (
        <div className="mt-4">
          {tags.map((tag: tagType) => {
            return (
              <TagItem
                name={tag.name}
                color={tag.color}
                id={tag._id}
                email={tag.email}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
