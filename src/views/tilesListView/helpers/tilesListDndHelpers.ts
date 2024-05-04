import { TileItem } from '../types/TilesListDndTypes';

export const findTileItem = <T extends object>(
  itemId: string | number,
  tileItemsArray: TileItem<T>[]
): { currentItem: TileItem<T> | undefined; itemPositionIndexes: number[] } => {
  let currentItem: TileItem<T> | undefined = undefined;
  let itemPositionIndexes = [-1, -1];

  tileItemsArray.forEach((item, index) => {
    if (item.id === itemId) {
      currentItem = item;
      itemPositionIndexes[0] = index;
      return;
    }

    if (item.nestedTileItems) {
      item.nestedTileItems.forEach((nestedItem, nestedIndex) => {
        if (nestedItem.id === itemId) {
          currentItem = nestedItem;
          itemPositionIndexes = [index, nestedIndex];
          return;
        }
      });
    }
  });

  return { currentItem, itemPositionIndexes };
};

export const insertTileItemIntoArray = <T extends object>(
  newItem: TileItem<T>,
  itemsArray: TileItem<T>[] | undefined,
  index: number
) => {
  if (!itemsArray || !itemsArray.length) return [newItem];
  return [...itemsArray.slice(0, index), newItem, ...itemsArray.slice(index)];
};

export const getTilesListWithInsertIntoDropzone = <T extends object>(
  dropzoneId: string,
  itemToInsert: TileItem<T>,
  tilesListItems: TileItem<T>[]
): TileItem<T>[] => {
  const dropZoneIdData = dropzoneId.split(':');
  const dropZoneType = dropZoneIdData[0];
  const dropZoneIndex = Number(dropZoneIdData[1]);
  const filteredItems = tilesListItems
    .filter((item) => item.id !== itemToInsert.id)
    .map((item) => {
      item.nestedTileItems = item.nestedTileItems?.filter((nestedItem) => nestedItem.id !== itemToInsert.id);
      return item;
    });

  if (dropZoneType === 'mainListDropzone') {
    const newItems = insertTileItemIntoArray(itemToInsert, filteredItems, dropZoneIndex);

    return newItems;
  } else if (dropZoneType === 'nestedListDropzone') {
    const itemWithNestId = dropZoneIdData[2];

    const newItems = filteredItems.map((item) => {
      if (item.id === itemWithNestId) {
        item.nestedTileItems = insertTileItemIntoArray(itemToInsert, item.nestedTileItems, dropZoneIndex);
      }

      return item;
    });

    return newItems;
  }

  return [];
};

const filterNestedTileItemsByIds = <T extends object>(tileItem: TileItem<T>, itemsToRemoveIds: string[]) => {
  return tileItem.nestedTileItems
    ? tileItem.nestedTileItems.filter((nestedItem) => !itemsToRemoveIds.includes(nestedItem.id))
    : undefined;
};

export const removeTileItemsFromArray = <T extends object>(itemsToRemove: TileItem<T>[], itemsArray: TileItem<T>[]) => {
  const itemsToRemoveIds = itemsToRemove.map((item) => item.id);
  const newItems: TileItem<T>[] = [];

  itemsArray.forEach((item) => {
    if (itemsToRemoveIds.includes(item.id)) return;

    newItems.push({
      ...item,
      nestedTileItems: filterNestedTileItemsByIds(item, itemsToRemoveIds)
    });
  });

  return newItems;
};

const updateTileItem = <T extends object>(
  target: TileItem<T>,
  fieldName: string,
  value: string | boolean | string[],
  key?: keyof T
): TileItem<T> => {
  return {
    ...target,
    [key ? key : fieldName]: key ? { ...(target[key] as object), [fieldName]: value } : value
  };
};

const updateNestedTileItem = <T extends object>(
  target: TileItem<T>,
  nestedIndex: number,
  fieldName: string,
  value: string | boolean | string[],
  key?: keyof T
): TileItem<T> => {
  if (!target.nestedTileItems) return target;

  const nestedActions = [...target.nestedTileItems];
  const nestedAction = nestedActions[nestedIndex];

  const updatedNestedObject = {
    ...nestedAction,
    [key ? key : fieldName]: key ? { ...(nestedAction[key] as object), [fieldName]: value } : value
  };

  nestedActions[nestedIndex] = updatedNestedObject;

  return {
    ...target,
    nestedTileItems: nestedActions
  };
};

export const onTileItemFieldChange = <T extends object>(
  tileItems: TileItem<T>[],
  itemToChangePositionIndexes: number[],
  fieldName: string,
  value: string | boolean | string[],
  innerObjectKey?: keyof T
): TileItem<T>[] | undefined => {
  const updatedItems: TileItem<T>[] = JSON.parse(JSON.stringify(tileItems));

  const index = itemToChangePositionIndexes[0];
  const nestedIndex = itemToChangePositionIndexes[1];

  if (index < 0) return;

  if (nestedIndex > -1 && updatedItems[index].nestedTileItems) {
    updatedItems[index] = updateNestedTileItem(updatedItems[index], nestedIndex, fieldName, value, innerObjectKey);
  } else {
    updatedItems[index] = updateTileItem(updatedItems[index], fieldName, value, innerObjectKey);
  }

  return updatedItems;
};
