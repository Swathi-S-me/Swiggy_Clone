// import React, { createContext, useState, useContext } from "react";
// import type { Location, LocationContextType } from "./locationContext.types";

// const defaultLocation: Location = {
//   address: "Chennai, Tamil Nadu",
//   lat: 13.0827,
//   lng: 80.2707,
// };

// const LocationContext = createContext<LocationContextType | undefined>(undefined);

// export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [location, setLocation] = useState<Location | null>(defaultLocation);

//   return (
//     <LocationContext.Provider value={{ location, setLocation }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// export const userLocation = () => {
//   const ctx = useContext(LocationContext);
//   if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
//   return ctx;
// };





// import React, { createContext, useState, useContext, useEffect } from "react";
// import type { Location, LocationContextType } from "./locationContext.types";

// const LocationContext = createContext<LocationContextType | undefined>(undefined);

// export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [location, setLocation] = useState<Location | null>(null);

//   useEffect(() => {
//     // ask for current location when app starts
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;

//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
//              {
//     headers: {
//       "User-Agent": "swiggy-clone-app (your-email@example.com)",
//     },
//   }

//           );
//           const data = await res.json();
//           setLocation({
//             lat,
//             lng,
//             address: data.display_name,
//           });
//         } catch (err) {
//           console.error("Failed to fetch address:", err);
//         }
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         // fallback if user denies permission
//         setLocation({
//           lat: 13.0827,
//           lng: 80.2707,
//           address: "Chennai, Tamil Nadu",
//         });
//       }
//     );
//   }, []);

//   return (
//     <LocationContext.Provider value={{ location, setLocation }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// export const userLocation = () => {
//   const ctx = useContext(LocationContext);
//   if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
//   return ctx;
// };




import React, { createContext, useState, useContext, useEffect } from "react";
import type { Location, LocationContextType } from "./locationContext.types";

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { "User-Agent": "swiggy-clone (your-email@example.com)" } }
          );

          if (!res.ok) throw new Error("API error");

          const data = await res.json();
          setLocation({ lat, lng, address: data.display_name });
        } catch (err) {
          console.error("Failed to fetch address:", err);
          setLocation({ lat, lng, address: "Unknown location" });
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocation({
          lat: 13.0827,
          lng: 80.2707,
          address: "Chennai, Tamil Nadu",
        });
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const userLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
  return ctx;
};
