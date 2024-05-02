import { ReactNode, MouseEvent, useState, useMemo, useRef, useEffect } from 'react';

import { useDraggable } from '@dnd-kit/core';

import styles from './Tile.module.scss';
import { TileItem } from '../../../../types/TilesListDndTypes';

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
  onTileNameChange: (nameValue: string) => void;
};

const Tile = <T extends object>(props: TileProps<T>): JSX.Element => {
  const [isNameEdited, setIsNameEdited] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const focusedClassName = props.isFocused ? styles.focused : '';

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.tileItem.id,
    disabled: isNameEdited
  });

  const dndDefaultStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  useEffect(() => {
    if (isNameEdited && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isNameEdited]);

  useEffect(() => {
    if (!props.isFocused && isNameEdited) {
      setIsNameEdited(false);
    }
  }, [props.isFocused]);

  const onDoubleClick = () => {
    setIsNameEdited(true);
  };

  const onBlurInput = () => {
    setIsNameEdited(false);
  };

  const onFocusInput = () => {
    if (nameInputRef.current) {
      nameInputRef.current.select();
    }
  };

  const tileNameElement = useMemo(() => {
    return isNameEdited ? (
      <input
        ref={nameInputRef}
        value={props.tileItem.name}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        onChange={(e) => props.onTileNameChange?.(e.target.value)}
      />
    ) : (
      <span className={`${styles.nameLabel} ${!props.tileItem.name ? styles.noData : ''}`}>
        {props.tileItem.name || 'Brak nazwy'}
      </span>
    );
  }, [isNameEdited, props.tileItem.name]);

  return (
    <div
      ref={setNodeRef}
      style={dndDefaultStyle}
      {...attributes}
      {...listeners}
      className={`${styles.tileContainer} ${focusedClassName}`}
    >
      <div
        id={props.tileItem.id}
        className={`no-select-kswa-ext ${styles.tile} ${styles[`${props.tileItem.tileType}Tile`]} ${focusedClassName}`}
        onClick={(e) => props.onClick?.(e, props.tileItem, props.nestParentId)}
        onContextMenu={(e) => props.onClick?.(e, props.tileItem, props.nestParentId, true)}
        onDoubleClick={onDoubleClick}
        data-tileslistitem={`${props.tileItem.id}`}
      >
        {tileNameElement}
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
