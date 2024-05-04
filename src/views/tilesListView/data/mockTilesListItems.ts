import { getNewFormData } from '../helpers/formHelpers';
import { FormData } from '../types/FormTypes';
import { TileItem } from '../types/TilesListDndTypes';

const NEST_TILE_INFO =
  'This text will be shortened with ellipsis due to the container width, but the full content will appear inside the tooltip, which shows up only when there is an overflow effect.';

export const mockFormsData: TileItem<FormData>[] = [
  getNewFormData('nestable', 'nestableForm', 'Nestable 1'),
  getNewFormData('nestable', 'anotherNestableForm', 'Another nestable 1'),
  {
    id: '3',
    name: 'Nest Tile',
    tileType: 'nest',
    formType: 'nestForm',
    nestedTileItems: [getNewFormData('nestable', 'nestableForm', 'Nestable 2')],
    textAreaContent: NEST_TILE_INFO
  },
  {
    id: '4',
    name: 'Nest Tile',
    tileType: 'nest',
    nestedTileItems: [],
    formType: 'nestForm',
    textAreaContent: NEST_TILE_INFO
  },
  {
    id: '5',
    name: 'Not nestable 1',
    tileType: 'notNestable',
    formType: 'notNestableForm',
    someValue: ''
  }
];
