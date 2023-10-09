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
      translate.y = `-${mousePosition.y - 10}px`;
    }
  }

  return translate;
};
