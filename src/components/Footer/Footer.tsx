import React from "react";
import type { FooterProps } from "./footer.types";
import logo from "../../assets/swiggy_logo.webp"
import Icon from "../Icons/Icon";


const Footer: React.FC<FooterProps> = ({ cities }) => {
  const visibleCities = cities.slice(0, 6);
  const dropdownCities = cities.slice(6);
console.log("Received cities:", cities);
  return (
    <footer className="bg-gray-100 text-sm text-gray-800 py-10">
      {/* App download */}
      <div className="text-center mb-6">
        <h2 className="font-bold text-lg mb-4">
          For better experience, download the Swiggy app now
        </h2>
        
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto  px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-sm">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Swiggy"
            className="w-16 mb-2 ml-7"
          />
          <p className="font-bold mb-2">2025 Swiggy Limited</p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Swiggy Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Swiggy One</li>
            <li>Swiggy Instamart</li>
            <li>Swiggy Dineout</li>
            <li>Swiggy Genie</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-2">Contact us</h4>
          <ul className="space-y-1">
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Ride with us</li>
          </ul>
        </div>

        {/* Cities */}
        <div>
          <h4 className="font-bold mb-2">Available in:</h4>
          <ul className="space-y-1">
            {visibleCities.map((city, idx) => (
              <li key={idx}>
                <a href={city.link} className="hover:underline">
                  {city.text}
                </a>
              </li>
            ))}
          </ul>
          {dropdownCities.length > 0 && (
            <select
              className="mt-2 border border-gray-300 rounded px-2 py-1 w-full"
              onChange={(e) => {
                if (e.target.value) window.open(e.target.value, "_blank");
              }}
            >
              <option>+ {dropdownCities.length} cities</option>
              {dropdownCities.map((city, i) => (
                <option key={i} value={city.link}>
                  {city.text}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Life at Swiggy */}
        <div>
          <h4 className="font-bold mb-2">Life at Swiggy</h4>
          <ul className="space-y-1">
            <li>Explore with Swiggy</li>
            <li>Swiggy News</li>
            <li>Snackables</li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="space-y-1 mb-4">
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
          <h4 className="font-bold mb-2">Social Links</h4>
          <div className="flex gap-3 text-xl">
            <Icon name="facebook" size={18}/>
            <Icon name="twitter" size={18}/>
            <Icon name="instagram" size={18}/>
            <Icon name="linkedin" size={18}/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
