import type { Dish } from "./dishModal.types";

const DishModal = ({ dish, onClose }: { dish: Dish; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-4 relative shadow-lg">
        <button
          className="absolute top-8 right-8 text-gray-600 text-lg bg-white rounded-2xl w-6 h-6 text-center"
          onClick={onClose}
        >
          ✕
        </button>

        {dish.image && (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-56 object-cover rounded-xl"
          />
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between mt-2">
            <div>
              <h2 className="text-xl font-bold">{dish.name}</h2>
              <p className="text-lg font-semibold mt-1">₹{dish.price}</p>
            </div>

            <button className="border bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
              ADD
            </button>
          </div>

          {dish.description && (
            <p className="text-gray-600 mt-2">{dish.description}</p>
          )}

          {dish.nutrition && (
            <p className="text-sm text-gray-500 mt-2">{dish.nutrition}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishModal;
