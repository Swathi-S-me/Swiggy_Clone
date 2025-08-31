import Button from "../Button/Button";
import type { LogoutModalProps } from "./logout.types";

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="bg-white p-6 rounded-2xl shadow-2xl w-[320px] text-center transform transition-all duration-300 scale-100 opacity-100"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6-10V5a3 3 0 00-6 0v1"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Logout</h2>
        <p className="text-gray-500 mt-2 mb-6">
          Are you sure you want to logout from your account?
        </p>

        <div className="flex justify-center gap-3">
          <Button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 shadow-md transition"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
