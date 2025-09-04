import { useEffect, useState } from "react";
import { userLocation } from "../../context/LocationContext";
import type {
  LocationProps,
  RecentLocation,
  Suggestion,
} from "../LocationDrawer/locationDrawer.types";
import Icon from "../Icons/Icon";
import Button from "../Button/Button";
import Input from "../InputField/Input";
import useLocalStorage from "../../Queries/useLocalStorage";

export default function LocationDrawer({ isOpen, onClose }: LocationProps) {
  const { setLocation } = userLocation();
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useLocalStorage<RecentLocation[]>(
    "recent-locations",
    []
  );
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:5000/api/autocomplete?input=${search}`
        );

        const data = await res.json();
        setSuggestions(data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();

        const loc = { lat, lng, address: data.display_name };
        setLocation(loc);
        setRecent([loc, ...recent.filter((r) => r.address !== loc.address)]);
        onClose();
      },
      (err) => console.error(err)
    );
  };

  const handleSelectSuggestion = async (s: Suggestion) => {
    try {
      const res = await fetch(
      `http://localhost:5000/api/place-details?place_id=${s.place_id}`
    );

      const data = await res.json();
      const loc = {
        lat: data?.data[0]?.geometry?.location?.lat,
        lng: data?.data[0]?.geometry?.location?.lng,
        address: s.description,
      };

      setLocation(loc);
      setRecent([loc, ...recent.filter((r) => r.address !== loc.address)]);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const searchLocation = async () => {
    if (!search) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        search
      )}&format=json&limit=1`
    );
    const data = await res.json();
    if (data.length > 0) {
      const loc = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        address: data[0].display_name,
      };
      setLocation(loc);
      setRecent([loc, ...recent.filter((r) => r.address !== loc.address)]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 w-150 h-full bg-white shadow-lg z-50 overflow-auto animate-slideIn">
        <div className="relative p-6 ml-30 mr-10">
          <Button
            onClick={onClose}
            className="absolute top-10 right-4 text-gray-500 hover:text-gray-700"
          >
            <Icon name="close" size={20} />
          </Button>

          <h2 className="text-lg font-semibold mb-4 mt-5">
            Choose your location
          </h2>

          <div className="mt-3 w-full relative">
            <Input
              type="text"
              placeholder="Search for area, street..."
              value={search}
              onChange={setSearch}
              className="w-full outline-none text-sm border border-gray-600 rounded-lg px-3 py-2"
            />

            {suggestions.length > 0 && (
              <div className="absolute bg-white border rounded-lg mt-1 w-full max-h-60 overflow-auto shadow-lg z-50">
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSuggestion(s)}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {s.description}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={searchLocation}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-3 rounded-lg font-medium"
          >
            Search
          </Button>

          <div className="my-5 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400 text-xs">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <Button
            onClick={getCurrentLocation}
            className="w-full border border-gray-600 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 font-medium"
          >
            <Icon name="location" size={16} />
            Get current location
          </Button>

          {recent.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-gray-500 mb-3 uppercase">
                Recent Searches
              </h4>
              <div className="border rounded-lg divide-y divide-gray-200">
                {recent.map((r, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLocation(r);
                      onClose();
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-50 transition"
                  >
                    {r.address}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
