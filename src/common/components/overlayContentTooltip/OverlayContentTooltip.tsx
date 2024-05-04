import { useEffect, useMemo, useRef, useState } from 'react';

import { renderToString } from 'react-dom/server';

import styles from './OverlayContentTooltip.module.scss';
import CustomTooltipWrapper, { TooltipConfig } from '../customTooltipWrapper/CustomTooltipWrapper';

export type OverlayContentTooltipProps = {
  children: string | number | JSX.Element;
  disabled?: boolean;
  maxWidth?: number | string;
  tooltipConfig?: TooltipConfig;
};

export const OverlayContentTooltip = (props: OverlayContentTooltipProps): JSX.Element => {
  const childrenWrapperRef = useRef<HTMLSpanElement>(null);
  const parentWrapperRef = useRef<HTMLDivElement>(null);

  const [tooltipDisabled, setTooltipDisabled] = useState(true);

  const checkIfOverflow = (): void => {
    const parentWidth = parentWrapperRef.current?.offsetWidth;
    const childrenWidth = childrenWrapperRef.current?.offsetWidth;

    if (parentWidth && childrenWidth) {
      setTooltipDisabled(parentWidth - childrenWidth >= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkIfOverflow);

    return () => {
      window.removeEventListener('resize', checkIfOverflow);
    };
  }, []);

  useEffect(() => {
    checkIfOverflow();
  }, [props.children]);

  const tooltipContent = useMemo(() => {
    if (props.tooltipConfig?.content) {
      return props.tooltipConfig.content;
    }
    return typeof props.children === 'string' || typeof props.children === 'number'
      ? `${props.children}`
      : renderToString(props.children);
  }, [props.tooltipConfig?.content, props.children]);

  return props.disabled || tooltipDisabled ? (
    <div className={styles.parentWrapper} ref={parentWrapperRef} data-testid='overlayWrapperWithoutTooltip'>
      <span ref={childrenWrapperRef}>{props.children}</span>
    </div>
  ) : (
    <CustomTooltipWrapper {...props.tooltipConfig} content={tooltipContent}>
      <div className={styles.parentWrapper} ref={parentWrapperRef} style={{ maxWidth: props.maxWidth }}>
        <span ref={childrenWrapperRef}>{props.children}</span>
      </div>
    </CustomTooltipWrapper>
  );
};

export default OverlayContentTooltip;
