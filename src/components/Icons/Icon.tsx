import {
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaSearch,
  FaUtensils,
  FaBars,
  FaTimes,
  FaStar,
   FaShoppingBag,
   FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaAngleDown ,
    FaAngleUp 
} from "react-icons/fa";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdKeyboardDoubleArrowLeft , MdKeyboardDoubleArrowRight} from "react-icons/md";
import type { IconProps } from "./icons.types";
import { IoMdLogOut } from "react-icons/io";
export const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cart: FaShoppingCart,
  user: FaUser,
  location: FaMapMarkerAlt,
  search: FaSearch,
  logo: FaUtensils,
  menu: FaBars,
  close: FaTimes,
  star: FaStar,
  help: IoHelpBuoyOutline,
  offers: BiSolidOffer,
  bag: FaShoppingBag,
  left:MdKeyboardDoubleArrowLeft,
  right:MdKeyboardDoubleArrowRight,
  facebook:FaFacebook,
  twitter:FaTwitter,
  instagram:FaInstagram,
  linkedin:FaLinkedin,
  delivery:TbTruckDelivery,
  down:FaAngleDown,
  up:FaAngleUp ,
  logout:IoMdLogOut
} as const;

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = "" }) => {
  const SelectedIcon = icons[name];

  if (!SelectedIcon) return null;

  return <SelectedIcon size={size} className={className} />;
};

export default Icon;
