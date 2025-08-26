export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  name?: string;
  checked?: boolean; 
}