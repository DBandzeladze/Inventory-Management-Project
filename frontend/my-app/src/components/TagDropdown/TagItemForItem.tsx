import React, { useState, useEffect } from "react";
type tagItemType = {
  name: string;
  color: string;
  id: string;
  email: string;
  selectedTags: tagType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<tagType[]>>;
  itemTags: tagType[];
  itemId: string;
};
type tagType = {
  _id: string;
  email: string;
  name: string;
  color: string;
};
const TagItemForItem = ({
  name,
  color,
  id,
  email,
  selectedTags,
  setSelectedTags,
  itemTags,
  itemId,
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

  useEffect(() => {
    itemTags.forEach((tag) => {
      if (tag._id === id) {
        setSelected(true);
      }
    });
  }, []);
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={`${id}${itemId}`}
        onChange={() => {
          setSelected((prev) => !prev);
        }}
        checked={selected}
        className="h-4 w-4 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={`${id}${itemId}`} className="ml-2 text-indigo-600">
        {" "}
        {name}
      </label>
    </div>
  );
};

export default TagItemForItem;
