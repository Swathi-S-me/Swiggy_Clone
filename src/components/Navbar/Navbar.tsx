import { Link, useLocation } from "@tanstack/react-router";
import Icon from "../Icons/Icon";
import Drawer from "../Drawer/Drawer";
import logo from "../../assets/swiggy_logo.webp";
import type { NavLink } from "./navbar.types";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthFlow from "../../pages/OtpLogin";
import { userLocation } from "../../context/LocationContext";
import LocationDrawer from "../LocationDrawer/LocationDrawer";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import LogoutModal from "../Logout/Logout";

const navLinks: NavLink[] = [
  { label: "Swiggy Corporate", path: "/", icon: "bag" },
  { label: "Search", path: "/search", icon: "search" },
  { label: "Offers", path: "/offers", icon: "offers" },
  { label: "Help", path: "/help", icon: "help" },
  { label: "Signin", path: "/signin", icon: "user", action: "login" },
  { label: "Cart", path: "/cart", icon: "cart" },
];

const Navbar = () => {
  const location = useLocation();
  const { location: locations } = userLocation();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="w-full bg-white shadow-xl shadow-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto  flex justify-between items-center ">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src={logo} alt="swiggy" className="h-auto w-20" />
          </Link>

          <div
            className="cursor-pointer flex items-center gap-2 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="font-bold text-l truncate">
              {locations?.address || "Select Location"}
            </span>
          </div>

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
                  <div
                    key="user-logged-in"
                    className="flex items-center gap-3 px-3 py-1 rounded-md"
                  >
                    <button
                      onClick={() => setLogoutOpen(true)}
                      className="flex items-center gap-2 px-3 py-1 rounded-md text-green-600 font-semibold hover:bg-gray-100"
                    >
                      <Icon name="user" size={18} />
                      {user.name}
                    </button>

                    <LogoutModal
                      isOpen={logoutOpen}
                      onClose={() => setLogoutOpen(false)}
                      onLogout={() => {
                        logout();
                        setLogoutOpen(false);
                      }}
                    />
                  </div>
                ) : (
                  <Button
                    key={link.label}
                    onClick={open}
                    className="flex items-center gap-2 px-3 py-1 rounded-md transition hover:text-orange-500 text-gray-700"
                  >
                    {link.icon && <Icon name={link.icon} size={18} />}
                    {link.label}
                  </Button>
                );
              }

              if (link.label === "Cart") {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-2 px-3 py-1 rounded-md transition hover:text-orange-500 ${
                      location.pathname === link.path
                        ? "text-orange-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {cartCount > 0 ? (
                      <span className="flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full">
                        {cartCount}
                      </span>
                    ) : (
                      link.icon && <Icon name={link.icon} size={18} />
                    )}
                    {link.label}
                  </Link>
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

      <LocationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {!user && (
        <Drawer isOpen={isOpen} onClose={close}>
          <AuthFlow onClose={close} />
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
