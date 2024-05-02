import {
  Fragment,
  useCallback,
  useMemo,
  useState,
  MouseEvent,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';

import { DndContext, DragEndEvent, DragOverlay, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

import DropZone from './DropZone';
import Tile from './Tile';
import styles from './TilesListDnD.module.scss';
import {
  findTileItem,
  getTilesListWithInsertIntoDropzone,
  onTileItemFieldChange
} from '../../helpers/tilesListDndHelpers';
import { NestedTileItem, TileItem } from '../../types/TilesListDndTypes';
import ContextMenu, { ContextMenuConfig } from '../contextMenu/ContextMenu';

const defaultLastSelectedIndexConfig = {
  index: 0,
  nestedItemIndex: 0,
  lastNestItemId: ''
};

type TilesListDnDProps<T extends object> = {
  tilesListItems: TileItem<T>[];
  setTilesListItems: Dispatch<SetStateAction<TileItem<T>[]>>;
  onFocusItemsChange?: (focusedItems: TileItem<T>[]) => void;
  contextMenuConfig?: ContextMenuConfig[];
};

const TilesListDnD = <T extends object>(props: TilesListDnDProps<T>): JSX.Element => {
  const lastSelectedIndexConfig = useRef<{
    index: number;
    nestedItemIndex: number;
    lastNestItemId?: string;
  }>(defaultLastSelectedIndexConfig);

  const [activeItem, setActiveItem] = useState<TileItem<T> | undefined>();
  const [focusedItems, setFocusedItems] = useState<TileItem<T>[]>([]);

  const focusedItemsIds = focusedItems.map((item) => item.id);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  });
  const sensors = useSensors(mouseSensor);

  useEffect(() => {
    props.onFocusItemsChange?.(focusedItems);
  }, [focusedItems]);

  useEffect(() => {
    const tilesListItemsIds = props.tilesListItems.flatMap((item) => {
      const itemsIds = item.nestedTileItems?.map((nestedItem) => nestedItem.id) || [];
      itemsIds.push(item.id);
      return itemsIds;
    });

    setActiveItem(undefined);
    lastSelectedIndexConfig.current = defaultLastSelectedIndexConfig;
    setFocusedItems((prev) => prev.filter((focusedItem) => tilesListItemsIds.includes(focusedItem.id)));
  }, [props.tilesListItems]);

  const onTileClick = useCallback(
    (
      e: MouseEvent<HTMLDivElement>,
      tileItem: TileItem<T>,
      nestParentId?: string,
      isRightMouseButtonClicked?: boolean
    ): void => {
      const clickedItemIndex = props.tilesListItems.findIndex((item) => item.id === (nestParentId || tileItem.id));

      const nestParent = nestParentId ? findTileItem(nestParentId, props.tilesListItems).currentItem : undefined;
      const clickedChildIndex = nestParent
        ? nestParent.nestedTileItems?.findIndex((item: NestedTileItem<T>) => item.id === tileItem.id) || 0
        : 0;

      if (e.shiftKey && !isRightMouseButtonClicked) {
        let newFocusedItems: TileItem<T>[] = [];

        if (!nestParentId) {
          newFocusedItems = props.tilesListItems.slice(
            Math.min(lastSelectedIndexConfig.current.index, clickedItemIndex),
            Math.max(lastSelectedIndexConfig.current.index, clickedItemIndex) + 1
          );
        } else {
          if (nestParentId !== lastSelectedIndexConfig.current.lastNestItemId) {
            lastSelectedIndexConfig.current.nestedItemIndex = 0;
          }

          newFocusedItems =
            nestParent?.nestedTileItems?.slice(
              Math.min(lastSelectedIndexConfig.current.nestedItemIndex, clickedChildIndex),
              Math.max(lastSelectedIndexConfig.current.nestedItemIndex, clickedChildIndex) + 1
            ) || [];
        }

        setFocusedItems(newFocusedItems);
        return;
      }

      lastSelectedIndexConfig.current = {
        lastNestItemId: nestParentId,
        nestedItemIndex: clickedChildIndex,
        index: clickedItemIndex
      };

      const isItemFocused = focusedItemsIds.includes(tileItem.id);

      if (e.ctrlKey || e.metaKey) {
        let newFocusedItems: TileItem<T>[] = [];

        if (isRightMouseButtonClicked) {
          return;
        } else if (isItemFocused) {
          newFocusedItems = focusedItems.filter((item) => item.id !== tileItem.id);
        } else if (nestParentId) {
          newFocusedItems = [...focusedItems.filter((item) => item.id !== nestParentId), tileItem];
        } else if (tileItem.nestedTileItems?.length) {
          const nestedItemsIds = tileItem.nestedTileItems.map((item) => item.id);
          newFocusedItems = [...focusedItems.filter((item) => !nestedItemsIds.includes(item.id)), tileItem];
        } else {
          newFocusedItems = [...focusedItems, tileItem];
        }

        setFocusedItems(newFocusedItems);
        return;
      }

      if ((isRightMouseButtonClicked || focusedItemsIds.length === 1) && isItemFocused) {
        return;
      }

      const newFocusedItems = [tileItem];

      setFocusedItems(newFocusedItems);
    },
    [props.tilesListItems, focusedItems, focusedItemsIds]
  );

  const handleDragStart = (event: DragEndEvent): void => {
    if (focusedItems.length > 1) {
      setFocusedItems([]);
    }
    lastSelectedIndexConfig.current = defaultLastSelectedIndexConfig;
    setActiveItem(findTileItem(event.active.id, props.tilesListItems).currentItem);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    setActiveItem(undefined);

    if (!over?.id || typeof over.id !== 'string' || !activeItem) return;

    props.setTilesListItems((prev) => getTilesListWithInsertIntoDropzone(`${over.id}`, activeItem, prev));
  };

  const onTileNameChange = useCallback((nameValue: string, itemToChangePositionIndexes: number[]) => {
    props.setTilesListItems((prev) => {
      const updatedItems = onTileItemFieldChange(prev, itemToChangePositionIndexes, 'name', nameValue);
      return updatedItems || prev;
    });
  }, []);

  const getTileElement = useCallback(
    (
      tileItemIndex: number,
      tileItem?: TileItem<T>,
      dropZonesCounter?: number,
      isInThumbnailMode?: boolean
    ): JSX.Element => {
      if (!tileItem) return <></>;

      let nestedDropZonesCounter = 0;

      if (tileItem.tileType === 'nest') {
        return (
          <Fragment key={`TileWithNestElement${tileItem.id}`}>
            <Tile
              tileItem={tileItem}
              onClick={onTileClick}
              isFocused={focusedItemsIds.includes(tileItem.id)}
              onTileNameChange={(nameValue: string) => onTileNameChange(nameValue, [tileItemIndex, -1])}
            >
              <DropZone
                id={`nestedListDropzone:${nestedDropZonesCounter}:${tileItem.id}`}
                textContent={!tileItem.nestedTileItems?.length ? 'Add element' : undefined}
                activeItem={activeItem}
                thumbnailMode={isInThumbnailMode}
              />
              {tileItem.nestedTileItems ? (
                tileItem.nestedTileItems.map((nestedTileItem, nestedTileItemIndex): JSX.Element => {
                  if (nestedTileItem.id === activeItem?.id)
                    return <Fragment key={`TileNestedElement${nestedTileItem.id}`} />;

                  nestedDropZonesCounter++;

                  return (
                    <Fragment key={`TileNestedElement${nestedTileItem.id}`}>
                      <div className={styles.nestedTileWrapper}>
                        <div className={styles.tileLinesBox} />
                        <Tile
                          tileItem={nestedTileItem}
                          nestParentId={tileItem.id}
                          onClick={onTileClick}
                          isFocused={focusedItemsIds.includes(nestedTileItem.id)}
                          onTileNameChange={(nameValue: string) =>
                            onTileNameChange(nameValue, [tileItemIndex, nestedTileItemIndex])
                          }
                        />
                      </div>
                      <DropZone
                        id={`nestedListDropzone:${nestedDropZonesCounter}:${tileItem.id}`}
                        activeItem={activeItem}
                      />
                    </Fragment>
                  );
                })
              ) : (
                <></>
              )}
            </Tile>
            {dropZonesCounter && <DropZone id={`mainListDropzone:${dropZonesCounter}`} />}
          </Fragment>
        );
      } else {
        return (
          <Fragment key={`TileWithoutNestElement${tileItem.id}`}>
            <Tile
              tileItem={tileItem}
              onClick={onTileClick}
              isFocused={focusedItemsIds.includes(tileItem.id)}
              onTileNameChange={(nameValue: string) => onTileNameChange(nameValue, [tileItemIndex, -1])}
            />
            {dropZonesCounter && <DropZone id={`mainListDropzone:${dropZonesCounter}`} />}
          </Fragment>
        );
      }
    },
    [activeItem, focusedItemsIds, onTileClick]
  );

  const tilesListElements = useMemo(() => {
    let dropZonesCounter = 0;

    return (
      <ContextMenu config={props.contextMenuConfig} customClass={styles.tilesListDnD}>
        {!props.tilesListItems.length ? (
          <div className={styles.addFirstElement}>
            <span data-addicon='mainListDropzone:0'>Add the first element</span>
          </div>
        ) : (
          <DropZone id={`mainListDropzone:${dropZonesCounter}`} />
        )}

        {props.tilesListItems.map((item, index): JSX.Element => {
          if (item.id === activeItem?.id) return <Fragment key={`TileNestedElement${item.id}`} />;

          dropZonesCounter++;
          return getTileElement(index, item, dropZonesCounter);
        })}
      </ContextMenu>
    );
  }, [props.tilesListItems, activeItem, getTileElement]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {tilesListElements}
      <DragOverlay>
        {activeItem && <div className={styles.tileThumbnail}>{getTileElement(-1, activeItem, undefined, true)}</div>}
      </DragOverlay>
    </DndContext>
  );
};

export default TilesListDnD;
