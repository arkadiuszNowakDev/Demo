export type TileItemType = 'nestable' | 'notNestable' | 'nest';

export type TileItemBasic = {
  id: string;
  name: string;
  tileType: TileItemType;
};

export type NestedTileItem<T> = T & TileItemBasic;

export type TileItem<T> = T & TileItemBasic & { nestedTileItems?: NestedTileItem<T>[] };
