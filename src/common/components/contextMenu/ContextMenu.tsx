import { ReactNode, useState, MouseEvent, useRef, useCallback, useLayoutEffect } from 'react';

import { useRootClose } from 'rsuite/utils';

import styles from './ContextMenu.module.scss';
import { getContextMenuOffset } from '../../helpers/contextMenuHelpers';

type ClickMode = 'right' | 'left';

export type ContextMenuItemConfig = {
  id: string;
  content: string | JSX.Element;
  onClick?: (targetItemAttributeId?: string) => void;
  isDisabled?: (currentTarget: string | null) => boolean;
  hasTrailingDivider?: boolean;
};

export type ContextMenuConfig = {
  itemsConfig: ContextMenuItemConfig[];
  attributeSelector: string;
  clickMode: ClickMode;
};

// NOTE:
// itemsConfig can be undefined - in that case context menu is disabled
// if attributeSelector is delivered context menu will show up only after click on the elements with pointed attribute
// if attributeSelector is undefined context menu will show up after click in every place on the container
// itemsConfig's onClick callback will pass attribute's value if it exists for clicked element
type ContextMenuProps = {
  children: ReactNode;
  config?: ContextMenuConfig[];
  customClass?: string;
};

const MAX_ITEM_WIDTH = 250;

const ContextMenu = (props: ContextMenuProps): JSX.Element => {
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const [contextMenuItemsConfig, setContextMenuItemsConfig] = useState<ContextMenuItemConfig[] | undefined>(undefined);

  const targetItem = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setContextMenuVisible(false);
  }, []);

  useLayoutEffect(() => {
    const contextMenuOffset = getContextMenuOffset(
      contextMenuPosition,
      containerRef.current?.clientWidth ?? 0,
      containerRef.current?.offsetHeight ?? 0
    );

    containerRef.current?.style.setProperty('transform', `translate(${contextMenuOffset.x}, ${contextMenuOffset.y})`);
  }, [contextMenuPosition, containerRef.current]);

  useRootClose(closeMenu, {
    disabled: !contextMenuVisible,
    triggerTarget: containerRef,
    listenEscape: true,
    overlayTarget: containerRef
  });

  const handleContextMenu = (e: MouseEvent, clickMode: ClickMode): void => {
    const configByClickMode = props.config?.filter((config) => config.clickMode === clickMode);
    if (!configByClickMode) return;

    e.preventDefault();

    const target = e.target as HTMLElement;
    let currentSelector: string | undefined;
    let targetItemSelected: Element | undefined;

    configByClickMode.forEach((configItem) => {
      const configSelector = configItem.attributeSelector;
      const possibleTarget = target.closest(`[${configSelector}]`);

      if (possibleTarget) {
        currentSelector = configSelector;
        targetItemSelected = possibleTarget;
      }
    });

    if (targetItemSelected instanceof Element && currentSelector) {
      targetItem.current = targetItemSelected?.getAttribute(currentSelector) || null;
    } else {
      targetItem.current = null;
    }

    if (targetItemSelected) {
      const newConfigItems = configByClickMode.find(
        (configItem) => configItem.attributeSelector === currentSelector
      )?.itemsConfig;

      setContextMenuPosition({ x: e.clientX, y: e.clientY });
      setContextMenuItemsConfig(newConfigItems);
      setContextMenuVisible(true);
    } else {
      closeMenu();
    }
  };

  const getMenuItems = useCallback(
    (submenuItems?: ContextMenuItemConfig[]) => {
      const items = submenuItems ?? contextMenuItemsConfig;
      if (!items) return;

      return items.map((item, index) => {
        const isItemDisabled = item.isDisabled?.(targetItem.current) || false;
        const itemDisabledClass = isItemDisabled ? styles.disabled : '';
        const itemWithDividerClass = item.hasTrailingDivider ? styles.withDivider : '';

        return (
          <div
            id={item.id}
            key={`${item.id}-${index}`}
            onClick={() => {
              if (!isItemDisabled) {
                item.onClick?.(targetItem.current ?? undefined);
                closeMenu();
              }
            }}
            className={`${styles.menuItem} ${itemDisabledClass} ${itemWithDividerClass}`}
            style={{ maxWidth: MAX_ITEM_WIDTH }}
          >
            <div className={styles.itemContent}>{item.content}</div>
          </div>
        );
      });
    },
    [props.config, contextMenuItemsConfig]
  );

  return (
    <div
      ref={overlayContainerRef}
      className={`${props.customClass || ''}`}
      onWheel={closeMenu}
      onContextMenu={(e) => {
        e.stopPropagation();
        handleContextMenu(e, 'right');
      }}
      onClick={(e) => {
        handleContextMenu(e, 'left');
      }}
    >
      {props.children}
      {contextMenuVisible && props.config && !!contextMenuItemsConfig && (
        <div
          ref={containerRef}
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x
          }}
          className={`noSelect ${styles.contextMenuContainer}`}
        >
          {getMenuItems()}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
