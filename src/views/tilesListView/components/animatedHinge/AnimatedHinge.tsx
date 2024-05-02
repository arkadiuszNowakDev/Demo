import { ReactNode } from 'react';

import styles from './AnimatedHinge.module.scss';

const DEFAULT_MAX_HEIGHT = 50;

type AnimatedHingeProps = {
  children: ReactNode;
  isOpen: boolean;
  customClass?: string;
  openMaxHeight?: number;
};

const AnimatedHinge = (props: AnimatedHingeProps): JSX.Element => {
  return (
    <div
      className={`${styles.animatedHinge} ${props.isOpen ? styles.opened : ''} ${props.customClass || ''}`}
      style={{ maxHeight: props.isOpen ? props.openMaxHeight || DEFAULT_MAX_HEIGHT : 0 }}
    >
      {props.children}
    </div>
  );
};

export default AnimatedHinge;
