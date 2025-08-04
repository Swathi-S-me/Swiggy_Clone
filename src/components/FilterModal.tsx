import React, { useState } from "react";

interface Option {
  id: string;
  label: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratingFilters: Option[];
  vegOptions: Option[];
  sortOptions: Option[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  ratingFilters,
  vegOptions,
  sortOptions,
}) => {
  const [activeFilter, setActiveFilter] = useState("Ratings");

  const getOptions = () => {
    if (activeFilter === "Ratings") return ratingFilters;
    if (activeFilter === "Veg/Non-Veg") return vegOptions;
    if (activeFilter === "Sort by") return sortOptions;
    return [];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl h-[500px] rounded-lg shadow-lg flex">
        {/* Left side - filter categories */}
        <div className="w-1/3 border-r p-4">
          {["Ratings", "Veg/Non-Veg", "Sort by"].map((label) => (
            <div
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`cursor-pointer py-2 px-3 rounded-md mb-2 font-medium ${
                activeFilter === label ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Right side - filter options */}
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-4">{activeFilter} Options</h3>
          <div className="space-y-3">
            {getOptions().map((option) => (
              <label key={option.id} className="flex items-center space-x-2">
                <input type="radio" name={activeFilter} className="accent-orange-500" />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded"
              onClick={onClose}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
