import { FormData } from '../../types/FormTypes';
import { TileItem } from '../../types/TilesListDndTypes';

export const mockFormsData: TileItem<FormData>[] = [
  {
    id: '1',
    name: 'Nestable 1',
    tileType: 'nestable',
    formType: 'nestableForm'
  },
  {
    id: '2',
    name: 'Nestable 2',
    tileType: 'nestable',
    formType: 'nestableForm'
  },
  {
    id: '3',
    name: 'Nest 1',
    tileType: 'nest',
    formType: 'nestForm',
    nestedTileItems: [
      {
        id: '3.1',
        name: 'Nestable 3',
        tileType: 'nestable',
        formType: 'nestableForm'
      }
    ]
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
    formType: 'notNestableForm'
  }
];
