import Button from "../../components/Button/Button";
import Icon from "../Icons/Icon";

import type { DrawerProps } from "./drawer.types";

const Drawer = ({ isOpen, onClose,children  }: DrawerProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 w-full md:w-[400px] h-full bg-white shadow-lg p-4 overflow-y-auto">
       
        <Button onClick={onClose} className="text-gray-600 hover:text-red-500 mb-4" ><Icon name="close" size={18}/></Button>
        
         {children} 
      </div>
    </div>
  );
};

export default Drawer;
