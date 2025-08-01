export type ButtonProps = {
  type?: "button" | "submit";
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};