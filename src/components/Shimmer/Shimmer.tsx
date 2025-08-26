import type { ShimmerProps } from "./shimmer.types";

const Shimmer: React.FC<ShimmerProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
};

export default Shimmer;
