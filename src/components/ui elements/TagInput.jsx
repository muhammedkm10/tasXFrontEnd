import React, { useState } from "react";

function TagInput({ tags, setTags }) {
  const [value, setValue] = useState("");

  const addTag = () => {
    if (value.trim() !== "" && !tags.includes(value)) {
      setTags([...tags, value]);
      setValue("");
    }
  };

  const removeTag = (t) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">Tags</label>

      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded-lg p-2 flex-1"
          value={value}
          placeholder="Add tag..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="button"
          className="bg-blue-600 text-white px-3 rounded-lg"
          onClick={addTag}
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              className="text-red-600"
              onClick={() => removeTag(tag)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
