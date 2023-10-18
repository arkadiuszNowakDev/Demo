import { FormData } from '../../types/FormTypes';
import { TileItem } from '../../types/TilesListDndTypes';

export const mockFormsData: TileItem<FormData>[] = [
  {
    id: '1',
    name: 'Nestable 1',
    tileType: 'nestable',
    formType: 'nestableForm',
    isTileNameEditable: true,
    nestableFormData: {
      someStringValue1: '',
      someStringValue2: '',
      someStringValue3: '',
      optionalFlag1: false,
      optionalFlag2: false,
      optionalFlag3: false,
      optionalStringValue1: '',
      optionalStringValue2: '',
      optionalStringValue3: ''
    }
  },
  {
    id: '2',
    name: 'Nestable 2',
    tileType: 'nestable',
    formType: 'nestableForm',
    isTileNameEditable: true
  },
  {
    id: '3',
    name: 'Another nestable 1',
    tileType: 'nestable',
    formType: 'anotherNestableForm',
    isTileNameEditable: true
  },
  {
    id: '4',
    name: 'Nest 1',
    tileType: 'nest',
    formType: 'nestForm',
    nestedTileItems: [
      {
        id: '4.1',
        name: 'Nestable 3',
        tileType: 'nestable',
        formType: 'nestableForm',
        isTileNameEditable: true
      }
    ]
  },
  {
    id: '5',
    name: 'Nest 2',
    tileType: 'nest',
    nestedTileItems: [],
    formType: 'nestForm'
  },
  {
    id: '6',
    name: 'Not nestable 1',
    tileType: 'notNestable',
    formType: 'notNestableForm',
    isTileNameEditable: true
  }
];
