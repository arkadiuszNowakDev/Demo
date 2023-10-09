export type TileItemType = 'nestable' | 'notNestable' | 'nest';

export type NestedTileItem<T> = T & {
  id: string;
  name: string;
  tileType: TileItemType;
};

export type TileItem<T> = T & {
  id: string;
  name: string;
  tileType: TileItemType;
  nestedTileItems?: NestedTileItem<T>[];
};
