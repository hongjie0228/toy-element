
export type ButtonType = "primary" | "success" | "warning" | "danger" | 'info' ;
export type NativeType = "button" | "submit" | 'reset' ;
export type ButtonSize = "large" | 'default' | 'small';

export interface ButtonProps {
  tag?: string; 
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  loading?: boolean ;
  disabled?: boolean;
  icon?: string;
  circle: boolean;
  plain?: boolean;
  round?: boolean;
}