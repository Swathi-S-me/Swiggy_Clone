import { Link, useLocation } from "@tanstack/react-router";
import Icon from "../Icons/Icon";
import Drawer from "../Drawer/Drawer";
import logo from "../../assets/swiggy_logo.webp";

import type { NavLink } from "./navbar.types";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthFlow from "../../modules/Auth/pages/OtpLogin";

const navLinks: NavLink[] = [
  { label: "Swiggy Corporate", path: "/", icon: "bag" },
  { label: "Search", path: "/search", icon: "search" },
  { label: "Offers", path: "/offers", icon: "offers" },
  { label: "Help", path: "/help", icon: "help" },
  { label: "Signin", path: "/signin", icon: "user", action: "login" },
  { label: "Cart", path: "/cart", icon: "cart" },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth(); // 👈 gets user from context

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src={logo} alt="swiggy" className="h-15 w-15" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.label === "Swiggy Corporate") {
                return (
                  <a
                    key={link.label}
                    href="https://www.swiggy.com/corporate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 rounded-md transition hover:text-orange-500 text-gray-700"
                  >
                    {link.icon && <Icon name={link.icon} size={18} />}
                    {link.label}
                  </a>
                );
              }

              if (link.action === "login") {
                return user ? (
                  <span
                    key="user-name"
                    className="flex items-center gap-2 px-3 py-1 rounded-md text-green-600 font-semibold"
                  >
                    <Icon name="user" size={18} />
                    {user.name}
                  </span>
                ) : (
                  <button
                    key={link.label}
                    onClick={open}
                    className="flex items-center gap-2 px-3 py-1 rounded-md transition hover:text-orange-500 text-gray-700"
                  >
                    {link.icon && <Icon name={link.icon} size={18} />}
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition hover:text-orange-500 ${
                    location.pathname === link.path
                      ? "text-orange-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {link.icon && <Icon name={link.icon} size={18} />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Show drawer only when not logged in */}
      {!user && (
        <Drawer isOpen={isOpen} onClose={close}>
          <AuthFlow onClose={close} />
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
