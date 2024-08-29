
import type { Ref } from 'vue'

export type ButtonType = "primary" | "success" | "warning" | "danger" | 'info' ;
export type NativeType = "button" | "submit" | 'reset' ;
export type ButtonSize = "large" | 'default' | 'small';

export interface ButtonProps {
  tag?: string; 
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  loading?: boolean;
  loadingIcon?: string;
  disabled?: boolean;
  icon?: string;
  circle: boolean;
  plain?: boolean;
  round?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonEmits {
  (e: 'click',val:MouseEvent) :void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
}