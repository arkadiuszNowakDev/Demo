import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import FormContainer from './components/formContainer/FormContainer';
import TilesListDnD from './components/tilesListDnD/TilesListDnD';
import { mockFormsData } from './data/mockTilesListItems';
import { findTileItem, onTileItemFieldChange } from './helpers/tilesListDndHelpers';
import { useTilesListContextMenuConfig } from './hooks/useTilesListContextMenuConfig';
import styles from './TilesListView.module.scss';
import { FormData } from './types/FormTypes';
import { TileItem } from './types/TilesListDndTypes';
import { setViewTitle } from '../../common/core/appSlice';
import { useAppDispatch } from '../../common/hooks/reduxHooks';

const TilesListView = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [tilesListItems, setTilesListItems] = useState<TileItem<FormData>[]>(mockFormsData);
  const [focusedItemId, setFocusedItemId] = useState<string | undefined>(undefined);
  const allCheckedItems = useRef<TileItem<FormData>[]>([]);

  useEffect(() => {
    dispatch(setViewTitle('Tiles List DnD'));
  }, []);

  const { contextMenuConfig } = useTilesListContextMenuConfig({
    setTilesListItems,
    allCheckedItems: allCheckedItems.current
  });

  const focusedItem = useMemo(
    () => findTileItem(focusedItemId || '', tilesListItems).currentItem,
    [focusedItemId, tilesListItems]
  );

  const onCheckedItemsChange = useCallback((checkedItems: TileItem<FormData>[]) => {
    allCheckedItems.current = checkedItems;
    setFocusedItemId(checkedItems.length === 1 ? checkedItems[0].id : undefined);
  }, []);

  const onFormDataChange = useCallback(
    (fieldName: string, value: string | boolean): void => {
      if (!focusedItemId) return;

      setTilesListItems((prevItems) => {
        const { itemPositionIndexes } = findTileItem(focusedItemId, prevItems);
        const updatedActions = onTileItemFieldChange(prevItems, itemPositionIndexes, fieldName, value);

        return updatedActions || prevItems;
      });
    },
    [tilesListItems, setTilesListItems, focusedItemId]
  );

  return (
    <div className={styles.tilesListView}>
      <TilesListDnD
        tilesListItems={tilesListItems}
        setTilesListItems={setTilesListItems}
        onFocusItemsChange={onCheckedItemsChange}
        contextMenuConfig={contextMenuConfig}
        customContainerClass={styles.tilesListContainer}
      />
      <FormContainer formData={focusedItem} onFormDataChange={onFormDataChange} />
    </div>
  );
};

export default TilesListView;
