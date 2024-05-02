import { v4 as uuid } from 'uuid';

import { FormData, FormType } from '../types/FormTypes';
import { TileItem, TileItemBasic, TileItemType } from '../types/TilesListDndTypes';

export const checkIfFormDataIsNestedByAttributeId = (targetItemAttributeId: string | null) => {
  const nestItemData = targetItemAttributeId?.split(':');
  const nestItemId = nestItemData?.[2];
  return !!nestItemId;
};

export const getNewTileItemBasic = (tileType: TileItemType, tileName?: string): TileItemBasic => {
  const id = uuid();
  const name = tileName || `${tileType} ${id.slice(0, 5)}`;

  return { id, name, tileType };
};

export const getNewFormData = (tileType: TileItemType, formType: FormType, tileName?: string): TileItem<FormData> => {
  switch (formType) {
    case 'nestableForm':
      return {
        ...getNewTileItemBasic(tileType, tileName),
        formType,
        someStringValue1: '',
        someStringValue2: '',
        someStringValue3: '',
        optionalFlag1: false,
        optionalFlag2: false,
        optionalFlag3: false,
        optionalStringValue1: '',
        optionalStringValue2: '',
        optionalStringValue3: ''
      };

    case 'anotherNestableForm':
      return {
        ...getNewTileItemBasic(tileType, tileName),
        formType
      };

    case 'nestForm':
      return {
        ...getNewTileItemBasic(tileType, tileName),
        formType,
        someValue: ''
      };

    case 'notNestableForm':
      return {
        ...getNewTileItemBasic(tileType, tileName),
        formType,
        someValue: ''
      };
  }
};
