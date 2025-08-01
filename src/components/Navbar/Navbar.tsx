import { Link, useLocation } from "@tanstack/react-router";
import Icon from "../Icons/Icon";
import Drawer from "../Drawer/Drawer";
import logo from "../../assets/swiggy_logo.webp";

import OtpLogin from "../../modules/Auth/pages/OtpLogin";
import type { NavLink } from "./navbar.types";

import { useState } from "react";

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

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src={logo} alt="swiggy" className="h-15 w-15" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.action === "login" ? (
                <button
                  key={link.label}
                  onClick={open}
                  className="flex items-center gap-2 px-3 py-1 rounded-md transition hover:bg-orange-100 text-gray-700"
                >
                  {link.icon && <Icon name={link.icon as any} size={18} />}
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition hover:bg-orange-100 ${
                    location.pathname === link.path
                      ? "text-orange-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {link.icon && <Icon name={link.icon as any} size={18} />}
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      <Drawer isOpen={isOpen} onClose={close}>
        <OtpLogin />
      </Drawer>
    </>
  );
};

export default Navbar;
