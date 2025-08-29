
import logo from "../../assets/swiggy_logo.webp";
import { useHomepageData } from "../../hooks/hooks";
import Icon from "../Icons/Icon";
import type { City } from "./footer.types";

const Footer = () => {
  const { data, isLoading } = useHomepageData();
const footerCard = data?.data?.cards.find(
  (card: any) =>
    card?.card?.card?.["@type"] ===
    "type.googleapis.com/swiggy.seo.widgets.v1.FooterContent"
)?.card?.card as { cities: City[] } | undefined;

const cities: City[] = footerCard?.cities || [];


const visibleCities: City[] = cities.slice(0, 6);
const dropdownCities: City[] = cities.slice(6);
  return (
    <footer className="bg-gray-100 text-sm text-gray-800 py-10">
      <div className="text-center mb-6">
        <h2 className="font-bold text-lg mb-4">
          For better experience, download the Swiggy app now
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-sm">
        <div>
          <img src={logo} alt="Swiggy" className="w-16 mb-2 ml-7" />
          <p className="font-bold mb-2">2025 Swiggy Limited</p>
        </div>

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

        <div>
          <h4 className="font-bold mb-2">Contact us</h4>
          <ul className="space-y-1">
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Ride with us</li>
          </ul>
        </div>

<div>
  <h4 className="font-bold mb-2">Available in:</h4>
  <ul className="space-y-1">
    {visibleCities.map((city: City, idx: number) => (isLoading ?
     ( <li key={idx}>
        <span>{city.text}</span>
      </li>):<></>
    ))}
  </ul>

  {dropdownCities.length > 0 && (
    <select
      disabled={isLoading} 
      className="mt-2 p-1 border rounded text-sm  w-30"
    >
      <option>+ {dropdownCities.length} cities</option>
      {dropdownCities.map((city: City, i: number) => (
        <option key={i}>{city.text}</option>
      ))}
    </select>
  )}
</div>


        <div>
          <h4 className="font-bold mb-2">Life at Swiggy</h4>
          <ul className="space-y-1">
            <li>Explore with Swiggy</li>
            <li>Swiggy News</li>
            <li>Snackables</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="space-y-1 mb-4">
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
          <h4 className="font-bold mb-2">Social Links</h4>
          <div className="flex gap-3 text-xl">
            <Icon name="facebook" size={18} />
            <Icon name="twitter" size={18} />
            <Icon name="instagram" size={18} />
            <Icon name="linkedin" size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
