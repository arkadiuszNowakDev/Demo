import { useCallback, useMemo, useState } from 'react';

import FormContainer from './FormContainer';
import styles from './TilesListView.module.scss';
import TilesListDnD from '../../common/components/tilesListDnD/TilesListDnD';
import { mockFormsData } from '../../common/data/mockTilesListItems';
import { updateForm, updateNestedForm } from '../../common/helpers/formHelpers';
import { findTileItem, onTileItemFieldChange } from '../../common/helpers/tilesListDndHelpers';
import { FormData } from '../../types/FormTypes';
import { TileItem } from '../../types/TilesListDndTypes';

const TilesListView = (): JSX.Element => {
  const [tilesListItems, setTilesListItems] = useState<TileItem<FormData>[]>(mockFormsData);
  const [focusedItemId, setFocusedItemId] = useState<string | undefined>(undefined);
  const focusedItem = useMemo(
    () => findTileItem(focusedItemId || '', tilesListItems).currentItem,
    [focusedItemId, tilesListItems]
  );

  const onFocusedItemsChange = useCallback((focusedItems: TileItem<FormData>[]) => {
    setFocusedItemId(focusedItems.length === 1 ? focusedItems[0].id : undefined);
  }, []);

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

  return (
    <div className={styles.tilesListView}>
      <TilesListDnD
        tilesListItems={tilesListItems}
        setTilesListItems={setTilesListItems}
        onFocusItemsChange={onFocusedItemsChange}
      />
      <FormContainer formData={focusedItem} onFormDataChange={onFormDataChange} />
    </div>
  );
};

export default TilesListView;
