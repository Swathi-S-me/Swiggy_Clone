
import { useState } from "react";
import type { FilterModalProps, FilterOptions } from "./filterModal.types";
import Icon from "../Icons/Icon";
import Button from "../Button/Button";
import Input from "../InputField/Input";

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  ratingFilters,
  sortOptions,
  cuisineOptions,
  costOptions,
  onApply,
}) => {
  const [activeFilter, setActiveFilter] = useState("Ratings");
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    Cuisine: [],
  });

  const getOptions = () => {
    if (activeFilter === "Ratings") return ratingFilters;
    if (activeFilter === "Sort by") return sortOptions;
    if (activeFilter === "Cuisine") return cuisineOptions;
    if (activeFilter === "Cost for Two") return costOptions;
    return [];
  };

  const handleSelect = (value: string) => {
    if (activeFilter === "Cuisine") {
      setSelectedFilters((prev) => {
        const existing = prev.Cuisine || [];
        const updated = existing.includes(value)
          ? existing.filter((v) => v !== value)
          : [...existing, value];
        return { ...prev, Cuisine: updated };
      });
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [activeFilter]: value,
      }));
    }
  };

  const handleClear = () => {
    setSelectedFilters({ Cuisine: [] });
  };

  const isSelected = (id: string) => {
    if (activeFilter === "Cuisine") {
      return selectedFilters.Cuisine?.includes(id);
    }
    return selectedFilters[activeFilter as keyof FilterOptions] === id;
  };

  const isAnyFilterSelected = Object.values(selectedFilters).some(
    (v) => v && (Array.isArray(v) ? v.length > 0 : true)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl h-[60vh] rounded-lg shadow-lg flex relative">
        <div className="w-1/3 border-r p-6 overflow-y-auto">
          <h2 className=" cursor-pointer text-xl font-semibold mb-4">Filters</h2>
          {["Ratings", "Sort by", "Cuisine", "Cost for Two"].map((label) => (
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

        <div className="w-2/3 p-6 flex flex-col relative">
          <Button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
            aria-label="Close filter modal"
          >
            <Icon name="close" size={12} />
          </Button>

          <h3 className="text-lg font-semibold mb-4">{activeFilter}</h3>

          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-4">
              {getOptions().map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    name={activeFilter}
                    value={option.id}
                    checked={isSelected(option.id)}
                    onChange={() => handleSelect(option.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected(option.id)
                        ? "border-orange-500"
                        : "border-gray-400"
                    }`}
                  >
                    {isSelected(option.id) && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </div>
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              className={`cursor-pointer px-4 py-2 border rounded ${
                isAnyFilterSelected
                  ? "border-gray-300 text-gray-700"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleClear}
              disabled={!isAnyFilterSelected}
            >
              Clear Filters
            </Button>
            <Button
              className={`cursor-pointer px-4 py-2 rounded text-white ${
                isAnyFilterSelected
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-200 cursor-not-allowed"
              }`}
              onClick={() => {
                onApply(selectedFilters);
                onClose();
              }}
              disabled={!isAnyFilterSelected}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
