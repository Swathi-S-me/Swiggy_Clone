import type {ButtonProps} from "./button.types";
 
const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className = "",
  
  onClick,
  disabled = false,
}) => {
  return (
    <button type={type} className={className}  onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
 
export default Button;