import { ContextMenuItemsConfig } from '../components/contextMenu/ContextMenu';

export const getContextMenuOffset = (
  mousePosition: { x: number; y: number },
  contextMenuWidth: number,
  contextMenuHeight: number
): { x: string; y: string } => {
  const translate = { x: '0', y: '0' };
  if (mousePosition.x > window.innerWidth - contextMenuWidth) {
    translate.x = '-100%';
  }

  if (mousePosition.y > window.innerHeight - contextMenuHeight) {
    if (mousePosition.y >= contextMenuHeight) {
      translate.y = '-100%';
    } else {
      translate.y = `-${mousePosition.y - 10}px`; // 10px is the additional padding for a better look
    }
  }

  return translate;
};

export const getContextSubmenuOffset = (
  mousePosition: { x: number; y: number },
  submenuMaxWidth: number,
  submenuHeight: number,
  parentMenuWidth: number,
  submenuDepth = 0
): { x: string; y: string } => {
  const translate = { x: '0', y: '0' };

  if (mousePosition.x > window.innerWidth - submenuDepth * submenuMaxWidth) {
    translate.x = `calc(-100% - ${parentMenuWidth}px)`;
  }

  if (mousePosition.y > window.innerHeight - submenuHeight) {
    if (mousePosition.y >= submenuHeight) {
      translate.y = '-100%';
    } else {
      translate.y = `-${mousePosition.y - 10}px`; // 10px is the additional padding for a better look
    }
  }

  return translate;
};

export const getSubmenuDepth = (itemsConfig: ContextMenuItemsConfig[], mainItemId: string): number => {
  const itemConfig = itemsConfig.find((item) => item.id === mainItemId);

  return itemConfig?.submenu?.length
    ? 1 + Math.max(...itemConfig.submenu.map((subitem, _key, arr) => getSubmenuDepth(arr, subitem.id)))
    : 0;
};

export const isItemInSubmenu = (itemId: string, submenu: ContextMenuItemsConfig[]): boolean => {
  if (submenu.find((item) => item.id === itemId)) {
    return true;
  }

  if (submenu.every((item) => !item.submenu)) {
    return false;
  }

  return submenu
    .filter((item) => item.submenu)
    .map((item) => isItemInSubmenu(itemId, item.submenu ?? []))
    .some((itemInSubmenu) => itemInSubmenu);
};
