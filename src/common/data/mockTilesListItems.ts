import { FormData } from '../../types/FormTypes';
import { TileItem } from '../../types/TilesListDndTypes';
import { getNewFormData } from '../helpers/formHelpers';

export const mockFormsData: TileItem<FormData>[] = [
  getNewFormData('nestable', 'nestableForm', 'Nestable 1'),
  getNewFormData('nestable', 'anotherNestableForm', 'Another nestable 1'),
  {
    id: '3',
    name: 'Nest Tile',
    tileType: 'nest',
    formType: 'nestForm',
    nestedTileItems: [getNewFormData('nestable', 'nestableForm', 'Nestable 2')],
    someValue: ''
  },
  {
    id: '4',
    name: 'Nest Tile',
    tileType: 'nest',
    nestedTileItems: [],
    formType: 'nestForm',
    someValue: ''
  },
  {
    id: '5',
    name: 'Not nestable 1',
    tileType: 'notNestable',
    formType: 'notNestableForm',
    someValue: ''
  }
];
