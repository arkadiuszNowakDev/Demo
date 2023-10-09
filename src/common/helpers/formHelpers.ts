import { v4 as uuid } from 'uuid';

import { FormData, FormType } from '../../types/FormTypes';
import { TileItem, TileItemType } from '../../types/TilesListDndTypes';
import { FORMS_WITH_EDITABLE_NAME } from '../../views/tilesListView/TilesListView';

export const checkIfFormDataIsNestedByAttributeId = (targetItemAttributeId: string | null) => {
  const nestItemData = targetItemAttributeId?.split(':');
  const nestItemId = nestItemData?.[2];
  return !!nestItemId;
};

export const getNewFormData = (tileType: TileItemType, formType: FormType, tileName?: string): TileItem<FormData> => {
  const id = uuid();
  const newFormData: TileItem<FormData> = {
    id,
    name: tileName || `${tileType} ${id.slice(0, 5)}`,
    tileType,
    formType,
    isTileNameEditable: FORMS_WITH_EDITABLE_NAME.includes(formType)
  };

  return newFormData;
};
