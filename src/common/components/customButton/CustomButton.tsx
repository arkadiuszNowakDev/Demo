import { MouseEvent } from 'react';

import styles from './CustomButton.module.scss';

const DEFAULT_MIN_HEIGHT = 32;
const DEFAULT_MIN_WIDTH = 95;

export type CustomButtonType = 'primary' | 'secondary' | 'tertiary';

type CustomButtonProps = {
  content: string;
  type: CustomButtonType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  customClass?: string;
  minHeight?: number | string;
  width?: number | string;
  disabled?: boolean;
  customDataAttributes?: Record<string, string>;
};

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[`${props.type}Button`]} ${props.customClass || ''}`}
      disabled={props.disabled}
      style={{ minHeight: props.minHeight ?? DEFAULT_MIN_HEIGHT, width: props.width ?? DEFAULT_MIN_WIDTH }}
      {...props.customDataAttributes}
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
};

export default CustomButton;
