
import type { ComputedRef, Ref } from 'vue'

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
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
}


export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: 'click',val:MouseEvent) :void;
}

// 使用者可通过ref去使用，进行去判断disalble属性、size属性、type属性
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
  disabled: ComputedRef<boolean> ;
  size: ComputedRef<ButtonSize | "">;
  type:ComputedRef<ButtonType | "">;
}