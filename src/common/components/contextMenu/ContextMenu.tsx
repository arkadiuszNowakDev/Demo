import { ReactNode, useState, MouseEvent, useRef, useCallback, useLayoutEffect } from 'react';

import { useRootClose } from 'rsuite/utils';

import styles from './ContextMenu.module.scss';
import {
  getContextMenuOffset,
  getContextSubmenuOffset,
  getSubmenuDepth,
  isItemInSubmenu
} from '../../helpers/contextMenuHelpers';

type ClickMode = 'right' | 'left';

export type ContextMenuItemsConfig = {
  id: string;
  content: string | JSX.Element;
  onClick?: (targetItemAttributeId?: string) => void;
  submenu?: ContextMenuItemsConfig[];
  isDisabled?: (currentTarget: string | null) => boolean;
  hasTrailingDivider?: boolean;
};

export type ContextMenuConfig = {
  itemsConfig: ContextMenuItemsConfig[];
  attributeSelector: string;
  clickMode: ClickMode;
};

// NOTE:
// itemsConfig can be undefined - in that case context menu is disabled
// if attributeSelector is delivered context menu will show up only after right click on the elements with pointed attribute
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
  const [openedSubmenuParentId, setOpenedSubmenuParentId] = useState<string | undefined>(undefined);
  const [openedSubmenuDepth, setOpenedSubmenuDepth] = useState(0);
  const [contextMenuItemsConfig, setContextMenuItemsConfig] = useState<ContextMenuItemsConfig[] | undefined>(undefined);

  const targetItem = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setContextMenuVisible(false);
    setOpenedSubmenuParentId(undefined);
  }, []);

  const setSubmenuOffset = useCallback(
    (submenuParentId: string, submenuDepth?: number) => {
      const submenuParent = document.getElementById(submenuParentId);
      const submenu = submenuParent?.getElementsByClassName('submenuItems')[0] as HTMLElement | undefined;

      if (submenu) {
        const submenuRect = submenu.getBoundingClientRect();

        const offset = getContextSubmenuOffset(
          { x: contextMenuPosition.x, y: submenuRect.y },
          MAX_ITEM_WIDTH,
          submenuRect.height,
          submenuParent?.clientWidth ?? 0,
          submenuDepth || openedSubmenuDepth
        );

        submenu.style.setProperty('transform', `translate(${offset.x}, ${offset.y})`);
        submenu.style.setProperty('top', offset.y !== '0' ? '30px' : '0px');
      }
    },
    [openedSubmenuDepth, contextMenuPosition, containerRef.current]
  );

  // useLayoutEffect is important - that removes menu jumping bug
  useLayoutEffect(() => {
    const contextMenuOffset = getContextMenuOffset(
      contextMenuPosition,
      containerRef.current?.clientWidth ?? 0,
      containerRef.current?.offsetHeight ?? 0
    );

    containerRef.current?.style.setProperty('transform', `translate(${contextMenuOffset.x}, ${contextMenuOffset.y})`);
  }, [contextMenuPosition, containerRef.current]); // containerRef dependency is important because the height is changed

  useLayoutEffect(() => {
    if (openedSubmenuParentId) {
      const submenuDepth = getSubmenuDepth(contextMenuItemsConfig ?? [], openedSubmenuParentId);

      setSubmenuOffset(openedSubmenuParentId, submenuDepth);

      if (submenuDepth) setOpenedSubmenuDepth(submenuDepth);
    } else {
      setOpenedSubmenuDepth(0);
    }
  }, [openedSubmenuParentId]);

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
    (submenuItems?: ContextMenuItemsConfig[]) => {
      const items = submenuItems ?? contextMenuItemsConfig;
      if (!items) return;

      return items.map((item, index) => {
        const isItemDisabled = item.isDisabled?.(targetItem.current) || false;
        const itemDisabledClass = isItemDisabled ? styles.disabled : '';
        const itemWithDividerClass = item.hasTrailingDivider ? styles.withDivider : '';
        const itemWithSubmenuClass = item.submenu ? styles.menuItemWithSubmenu : '';

        return (
          <div
            id={item.id}
            key={`${item.id}-${index}`}
            onClick={() => {
              if (!isItemDisabled && !item.submenu) {
                item.onClick?.(targetItem.current ?? undefined);
                closeMenu();
              }
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              setOpenedSubmenuParentId(item.id);
            }}
            onMouseLeave={() => {
              setOpenedSubmenuParentId(undefined);
            }}
            className={`${styles.menuItem} ${itemDisabledClass} ${itemWithDividerClass} ${itemWithSubmenuClass}`}
            style={{ maxWidth: MAX_ITEM_WIDTH }}
          >
            <div className={styles.itemContent}>{item.content}</div>
            {item.submenu && (
              <div className={styles.submenu}>
                <i className='bi-chevron-right' />
                {(openedSubmenuParentId === item.id ||
                  isItemInSubmenu(openedSubmenuParentId ?? '', item.submenu ?? [])) && (
                  <div className={`submenuItems ${styles.submenuItems}`}>{getMenuItems(item.submenu)}</div>
                )}
              </div>
            )}
          </div>
        );
      });
    },
    [props.config, openedSubmenuParentId, contextMenuItemsConfig]
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
