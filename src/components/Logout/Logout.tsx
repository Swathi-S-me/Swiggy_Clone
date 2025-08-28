
import Button from "../Button/Button";
import type { LogoutModalProps } from "./logout.types";



const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[300px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={onLogout}
            className="px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
