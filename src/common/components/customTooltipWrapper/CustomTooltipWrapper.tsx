/* eslint-disable import/no-extraneous-dependencies */
import { ReactNode, useMemo } from 'react';

import Tippy from '@tippyjs/react';
import { Placement } from 'react-bootstrap/esm/types';
import 'tippy.js/dist/tippy.css';

import styles from './CustomTooltipWrapper.module.scss';

const defaultCustomTooltipWrapperProps = {
  hideOnClick: true
};

export type TooltipConfig = {
  content: ReactNode;
  disabled?: boolean;
  customClass?: string;
  placement?: Placement;
  hideOnClick?: boolean;
  customTrigger?: string;
  autoHideTimeout?: number;
  interactive?: boolean | undefined;
};

type CustomTooltipWrapperProps = {
  children: JSX.Element;
} & TooltipConfig;

const CustomTooltipWrapper = (props: CustomTooltipWrapperProps): JSX.Element => {
  const tooltipedElement = useMemo(() => {
    return (
      <Tippy
        trigger={props.customTrigger ?? 'mouseenter'}
        animation={false}
        hideOnClick={props.hideOnClick}
        placement={props.placement}
        interactive={props.interactive}
        content={props.content}
        className={`${styles.tooltip} ${props.customClass}`}
      >
        {props.children}
      </Tippy>
    );
  }, [props.children, props.content, props.customClass, props.customTrigger, props.autoHideTimeout]);

  return props.disabled || !props.content ? <>{props.children}</> : tooltipedElement;
};

CustomTooltipWrapper.defaultProps = defaultCustomTooltipWrapperProps;

export default CustomTooltipWrapper;
