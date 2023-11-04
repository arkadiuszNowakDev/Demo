import { FormData } from '../../types/FormTypes';
import { TileItem } from '../../types/TilesListDndTypes';
import { getNewFormData } from '../helpers/formHelpers';

export const mockFormsData: TileItem<FormData>[] = [
  getNewFormData('nestable', 'nestableForm', 'Nestable 1'),
  {
    id: '2',
    name: 'Another nestable 1',
    tileType: 'nestable',
    formType: 'anotherNestableForm',
    isTileNameEditable: true
  },
  {
    id: '3',
    name: 'Nest 1',
    tileType: 'nest',
    formType: 'nestForm',
    nestedTileItems: [getNewFormData('nestable', 'nestableForm', 'Nestable 2')]
  },
  {
    id: '4',
    name: 'Nest 2',
    tileType: 'nest',
    nestedTileItems: [],
    formType: 'nestForm'
  },
  {
    id: '5',
    name: 'Not nestable 1',
    tileType: 'notNestable',
    formType: 'notNestableForm',
    isTileNameEditable: true
  }
];
