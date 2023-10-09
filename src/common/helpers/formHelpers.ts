import { FormData } from '../../types/FormTypes';
import { TileItem } from '../../types/TilesListDndTypes';

export const updateForm = (
  target: TileItem<FormData>,
  fieldName: string,
  value: string | boolean | string[],
  formDataKey?: keyof FormData
): TileItem<FormData> => {
  return {
    ...target,
    [formDataKey ? formDataKey : fieldName]: formDataKey
      ? { ...(target[formDataKey] as object), [fieldName]: value }
      : value
  };
};

export const updateNestedForm = (
  target: TileItem<FormData>,
  nestedIndex: number,
  fieldName: string,
  value: string | boolean | string[],
  formDataKey?: keyof FormData
): TileItem<FormData> => {
  if (!target.nestedTileItems) return target;

  const nestedForms = [...target.nestedTileItems];
  const nestedForm = nestedForms[nestedIndex];

  const updatedNestedObject = {
    ...nestedForm,
    [formDataKey ? formDataKey : fieldName]: formDataKey
      ? { ...(nestedForm[formDataKey] as object), [fieldName]: value }
      : value
  };

  nestedForms[nestedIndex] = updatedNestedObject;

  return {
    ...target,
    nestedTileItems: nestedForms
  };
};

export const checkIfFormDataIsNestedByAttributeId = (targetItemAttributeId: string | null) => {
  const nestItemData = targetItemAttributeId?.split(':');
  const nestItemId = nestItemData?.[2];
  return !!nestItemId;
};
