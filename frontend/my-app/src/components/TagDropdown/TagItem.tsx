import React, { useState, useEffect } from "react";
type tagItemType = {
  name: string;
  color: string;
  id: string;
  email: string;
  selectedTags: tagType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<tagType[]>>;
};
type tagType = {
  _id: string;
  email: string;
  name: string;
  color: string;
};
const TagItem = ({
  name,
  color,
  id,
  email,
  selectedTags,
  setSelectedTags,
}: tagItemType) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    var tagids: string[] = [];
    selectedTags.forEach((tag) => tagids.push(tag._id));
    if (selected) {
      if (!tagids.includes(id)) {
        setSelectedTags((prev) => [
          ...prev,
          { _id: id, email: email, name: name, color: color },
        ]);
      }
    } else {
      if (tagids.includes(id)) {
        let newtags = selectedTags;
        newtags = newtags.filter((tag) => {
          if (tag._id !== id) {
            return tag;
          } else {
            return;
          }
        });
        setSelectedTags(newtags);
      }
    }
  }, [selected]);
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={`${id}`}
        onChange={() => {
          setSelected((prev) => !prev);
        }}
        defaultChecked={false}
        className="h-4 w-4 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={`${id}`} className="ml-2 text-indigo-600">
        {" "}
        {name}
      </label>
    </div>
  );
};

export default TagItem;
