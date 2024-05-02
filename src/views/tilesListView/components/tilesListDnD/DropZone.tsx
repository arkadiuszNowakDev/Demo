import { useCallback, useState } from 'react';

import { useDroppable } from '@dnd-kit/core';

import styles from './DropZone.module.scss';
import { TileItem } from '../../../../types/TilesListDndTypes';

type DropZoneProps<T extends object> = {
  id: string;
  textContent?: string;
  activeItem?: TileItem<T>;
  thumbnailMode?: boolean;
};

const DropZone = <T extends object>(props: DropZoneProps<T>): JSX.Element => {
  const isDisabled = props.activeItem?.tileType === 'notNestable' || props.activeItem?.tileType === 'nest';
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    disabled: isDisabled
  });

  const getAddIcon = useCallback(
    (customClass: string) => {
      return (
        <div
          className={`${styles.addIconContainer} ${isOver ? styles.elementIsOver : ''} ${
            isDisabled && props.textContent ? styles.disabled : ''
          } ${customClass}`}
        >
          <i
            className='bi bi-plus-circle-dotted'
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            data-addicon={props.id}
          />
        </div>
      );
    },
    [isOver, isDisabled, props.textContent, props.id, props.thumbnailMode]
  );

  return (
    <div className={`${styles.addTileArea} ${isDisabled ? styles.disabled : ''}`}>
      <div
        ref={setNodeRef}
        className={`${styles.dropZone} ${(isOver || isMouseOver) && !isDisabled ? styles.elementIsOver : ''} ${
          isDisabled || props.thumbnailMode ? styles.disabled : ''
        }`}
      >
        {isDisabled && props.textContent && !props.thumbnailMode ? 'Not available' : props.textContent}
      </div>

      {!props.thumbnailMode && getAddIcon(styles.addIconLeft)}
      {!props.thumbnailMode && getAddIcon(styles.addIconRight)}
    </div>
  );
};

export default DropZone;
