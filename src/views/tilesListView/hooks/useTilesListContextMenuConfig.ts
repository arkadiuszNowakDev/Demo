import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { ContextMenuConfig, ContextMenuItemConfig } from '../components/contextMenu/ContextMenu';
import { getNewFormData } from '../helpers/formHelpers';
import { getTilesListWithInsertIntoDropzone, removeTileItemsFromArray } from '../helpers/tilesListDndHelpers';
import { FormData, FormType } from '../types/FormTypes';
import { TileItem, TileItemType } from '../types/TilesListDndTypes';

type useTilesListContextMenuConfigProps = {
  setTilesListItems: Dispatch<SetStateAction<TileItem<FormData>[]>>;
  allCheckedItems: TileItem<FormData>[];
};

export const useTilesListContextMenuConfig = (props: useTilesListContextMenuConfigProps) => {
  const onClearTilesList = useCallback((): void => {
    props.setTilesListItems([]);
  }, [props.setTilesListItems]);

  const onDeleteTileItems = useCallback((): void => {
    props.setTilesListItems((prev) => removeTileItemsFromArray(props.allCheckedItems, prev));
  }, [props.setTilesListItems, props.allCheckedItems]);

  const onCreateNewTile = useCallback(
    (tileType: TileItemType, formType: FormType, dropzoneId?: string, tileName?: string): void => {
      if (dropzoneId) {
        const newFormData = getNewFormData(tileType, formType, tileName);
        props.setTilesListItems((prev) => getTilesListWithInsertIntoDropzone(dropzoneId, newFormData, prev));
      }
    },
    [props.setTilesListItems]
  );

  const isContextMenuItemDisabled = useCallback((currentTarget: string | null) => {
    if (!currentTarget) return false;
    return currentTarget.startsWith('nested');
  }, []);

  const tilesContextMenuItemsConfig: ContextMenuItemConfig[] = useMemo(
    () => [
      {
        id: 'deleteCheckedItems',
        content: 'Delete checked tiles',
        onClick: () => onDeleteTileItems()
      },
      {
        id: 'clearAllItems',
        content: 'Delete all tiles',
        onClick: () => onClearTilesList()
      }
    ],
    [onDeleteTileItems, onClearTilesList]
  );

  const addIconsContextMenuItemsConfig: ContextMenuItemConfig[] = useMemo(
    () => [
      {
        id: 'createNestableTile',
        content: `Create nestable tile`,
        onClick: (targetItemAttributeId) => {
          onCreateNewTile('nestable', 'nestableForm', targetItemAttributeId, 'Nestable Tile');
        }
      },
      {
        id: 'createAnotherNestableTile',
        content: `Create another nestable tile`,
        onClick: (targetItemAttributeId) => {
          onCreateNewTile('nestable', 'anotherNestableForm', targetItemAttributeId, 'Another Nestable Tile');
        }
      },
      {
        id: 'createNotNestableTile',
        content: `Create not nestable tile`,
        onClick: (targetItemAttributeId) => {
          onCreateNewTile('notNestable', 'notNestableForm', targetItemAttributeId, 'Not Nestable Tile');
        },
        isDisabled: isContextMenuItemDisabled
      },
      {
        id: 'createNestTile',
        content: `Create nest tile`,
        onClick: (targetItemAttributeId) => {
          onCreateNewTile('nest', 'nestForm', targetItemAttributeId, 'Nest Tile');
        },
        isDisabled: isContextMenuItemDisabled
      }
    ],
    [onCreateNewTile, isContextMenuItemDisabled]
  );

  const contextMenuConfig: ContextMenuConfig[] = useMemo(
    () => [
      {
        attributeSelector: 'data-tileslistitem',
        clickMode: 'right',
        itemsConfig: tilesContextMenuItemsConfig
      },
      {
        attributeSelector: 'data-addicon',
        clickMode: 'left',
        itemsConfig: addIconsContextMenuItemsConfig
      }
    ],
    [tilesContextMenuItemsConfig, addIconsContextMenuItemsConfig]
  );

  return { contextMenuConfig };
};
