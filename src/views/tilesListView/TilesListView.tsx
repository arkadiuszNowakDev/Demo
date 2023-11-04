import { useCallback, useMemo, useRef, useState } from 'react';

import FormContainer from './formContainer/FormContainer';
import styles from './TilesListView.module.scss';
import { ContextMenuConfig, ContextMenuItemConfig } from '../../common/components/contextMenu/ContextMenu';
import TilesListDnD from '../../common/components/tilesListDnD/TilesListDnD';
import { mockFormsData } from '../../common/data/mockTilesListItems';
import { getNewFormData } from '../../common/helpers/formHelpers';
import {
  findTileItem,
  getTilesListWithInsertIntoDropzone,
  onTileItemFieldChange,
  removeTileItemsFromArray
} from '../../common/helpers/tilesListDndHelpers';
import { FormData, FormType } from '../../types/FormTypes';
import { TileItem, TileItemType } from '../../types/TilesListDndTypes';

const TilesListView = (): JSX.Element => {
  const [tilesListItems, setTilesListItems] = useState<TileItem<FormData>[]>(mockFormsData);
  const [focusedItemId, setFocusedItemId] = useState<string | undefined>(undefined);
  const allCheckedItems = useRef<TileItem<FormData>[]>([]);

  const focusedItem = useMemo(
    () => findTileItem(focusedItemId || '', tilesListItems).currentItem,
    [focusedItemId, tilesListItems]
  );

  const onCheckedItemsChange = useCallback((checkedItems: TileItem<FormData>[]) => {
    allCheckedItems.current = checkedItems;
    setFocusedItemId(checkedItems.length === 1 ? checkedItems[0].id : undefined);
  }, []);

  const onClearTilesList = (): void => {
    setTilesListItems([]);
  };

  const onDeleteTileItems = (): void => {
    setTilesListItems((prev) => removeTileItemsFromArray(allCheckedItems.current, prev));
  };

  const onCreateNewTile = (
    tileType: TileItemType,
    formType: FormType,
    dropzoneId?: string,
    tileName?: string
  ): void => {
    if (dropzoneId) {
      const newFormData = getNewFormData(tileType, formType, tileName);
      setTilesListItems((prev) => getTilesListWithInsertIntoDropzone(dropzoneId, newFormData, prev));
    }
  };

  const onFormDataChange = useCallback(
    (fieldName: string, value: string | boolean | string[], formDataKey?: keyof FormData): void => {
      if (!focusedItemId) return;

      setTilesListItems((prevItems) => {
        const itemToChangePositionIndexes = findTileItem(focusedItemId, prevItems).itemPositionIndexes;

        const updatedActions = onTileItemFieldChange(
          prevItems,
          itemToChangePositionIndexes,
          fieldName,
          value,
          formDataKey
        );

        return updatedActions || prevItems;
      });
    },
    [tilesListItems, setTilesListItems, focusedItemId]
  );

  const isContextMenuItemDisabled = (currentTarget: string | null) => {
    if (!currentTarget) return false;
    return currentTarget.startsWith('nested');
  };

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
    []
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
    []
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

  return (
    <div className={styles.tilesListView}>
      <TilesListDnD
        tilesListItems={tilesListItems}
        setTilesListItems={setTilesListItems}
        onFocusItemsChange={onCheckedItemsChange}
        contextMenuConfig={contextMenuConfig}
      />
      <FormContainer formData={focusedItem} onFormDataChange={onFormDataChange} />
    </div>
  );
};

export default TilesListView;
