import { useState } from "react";
import { userLocation } from "../../context/LocationContext";
import useLocalStorage from "../../modules/Auth/hooks/useLocalStorage";
import type { Props } from "../LocationDrawer/locationDrawer.types"



export default function LocationDrawer({ isOpen, onClose }: Props) {
  const { setLocation } = userLocation();
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useLocalStorage<any[]>("recent-locations", []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();

        const loc = { lat, lng, address: data.display_name };
        setLocation(loc);
        setRecent([loc, ...recent.filter(r => r.address !== loc.address)]);
        onClose();
      },
      (err) => console.error(err)
    );
  };

  const searchLocation = async () => {
    if (!search) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1`
    );
    const data = await res.json();
    if (data.length > 0) {
      const loc = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        address: data[0].display_name,
      };
      setLocation(loc);
      setRecent([loc, ...recent.filter(r => r.address !== loc.address)]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-auto animate-slideIn">
      <button onClick={onClose} className="text-xl"></button>

     
      <input
        type="text"
        placeholder="Search for area, street..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 mt-4"
      />
      <button onClick={searchLocation} className="w-full bg-orange-500 text-white p-2 mt-2">
        Search
      </button>

      
      <div className="mt-4">
        <button onClick={getCurrentLocation} className="flex items-center gap-2 border p-3 w-full">
           Get current location
        </button>
      </div>

      {recent.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Recent Searches</h4>
          {recent.map((r, idx) => (
            <div
              key={idx}
              onClick={() => {
                setLocation(r);
                onClose();
              }}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
            >
              {r.address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
