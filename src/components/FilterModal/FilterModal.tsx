import React, { useState } from "react";
import Icon from "../Icons/Icon";
import type { FilterModalProps } from "./filterModal.types";

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  ratingFilters,
  vegOptions,
  sortOptions,
}) => {
  const [activeFilter, setActiveFilter] = useState("Ratings");

  const [selectedFilters, setSelectedFilters] = useState<{
    Ratings?: string;
    "Veg/Non-Veg"?: string;
    "Sort by"?: string;
  }>({});

  const getOptions = () => {
    if (activeFilter === "Ratings") return ratingFilters;
    if (activeFilter === "Veg/Non-Veg") return vegOptions;
    if (activeFilter === "Sort by") return sortOptions;
    return [];
  };

  const handleSelect = (value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [activeFilter]: value,
    }));
  };

  const handleClear = () => {
    setSelectedFilters({});
  };

  const isAnyFilterSelected = Object.values(selectedFilters).some(Boolean);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-[500px] rounded-lg shadow-lg flex relative">
        {/* Left Section */}
        <div className="w-1/3 border-r p-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
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

        {/* Right Section */}
        <div className="w-2/3 p-6 flex flex-col justify-between relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
            aria-label="Close filter modal"
          >
            <Icon name="close" size={12} />
          </button>

          <div>
            <h3 className="text-lg font-semibold mb-4">{activeFilter} Options</h3>

            <div className="space-y-4">
              {getOptions().map((option) => {
                const isSelected =
                  selectedFilters[activeFilter as keyof typeof selectedFilters] === option.id;

                return (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={activeFilter}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => handleSelect(option.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-orange-500" : "border-gray-400"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                    </div>
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              className={`px-4 py-2 border rounded ${
                isAnyFilterSelected
                  ? "border-gray-300 text-gray-700"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleClear}
              disabled={!isAnyFilterSelected}
            >
              Clear Filters
            </button>

            <button
              className={`px-4 py-2 rounded text-white ${
                isAnyFilterSelected
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-200 cursor-not-allowed"
              }`}
              onClick={onClose}
              disabled={!isAnyFilterSelected}
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
