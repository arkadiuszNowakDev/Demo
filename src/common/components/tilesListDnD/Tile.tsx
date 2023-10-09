import { ReactNode, MouseEvent } from 'react';

import { useDraggable } from '@dnd-kit/core';

import styles from './Tile.module.scss';
import { TileItem } from '../../../types/TilesListDndTypes';

type TileProps<T extends object> = {
  tileItem: TileItem<T>;
  children?: ReactNode;
  nestParentId?: string;
  onClick?: (
    e: MouseEvent<HTMLDivElement>,
    tileItem: TileItem<T>,
    nestParentId?: string,
    isRightMouseButtonClicked?: boolean
  ) => void;
  isFocused?: boolean;
};

const Tile = <T extends object>(props: TileProps<T>): JSX.Element => {
  const focusedClassName = props.isFocused ? styles.focused : '';
  const tileName = props.tileItem.name;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.tileItem.id
  });
  const dndDefaultStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={dndDefaultStyle}
      {...attributes}
      {...listeners}
      className={`${styles.tileContainer} ${focusedClassName}`}
    >
      <div
        className={`no-select-kswa-ext ${styles.tile} ${styles[`${props.tileItem.tileType}Tile`]} ${focusedClassName}`}
        onClick={(e) => props.onClick?.(e, props.tileItem, props.nestParentId)}
        onContextMenu={(e) => props.onClick?.(e, props.tileItem, props.nestParentId, true)}
        data-tileslistitem={`${props.tileItem.id}`}
      >
        {tileName ? tileName : <span className={styles.noData}>No name</span>}
      </div>
      {props.children && props.tileItem.tileType === 'nest' ? (
        <div className={styles.nest}>{props.children}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tile;
