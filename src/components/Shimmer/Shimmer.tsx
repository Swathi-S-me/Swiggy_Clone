import type { ShimmerProps } from "./shimmer.types";



const Shimmer: React.FC<ShimmerProps> = ({
  width,
  height,
  className = "",
  children,
}) => {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : undefined,
    height: typeof height === "number" ? `${height}px` : undefined,
  };

  return (
    <div
      style={style}
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Shimmer;

