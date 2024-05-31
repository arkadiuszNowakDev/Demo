import { MAIN_VIEW_PATH, TILES_LIST_PATH } from '../../routes/AppRoutes';
import colors from '../styles/colors.module.scss';

export const getViewBackgroundColor = (pathName: string) => {
  switch (pathName) {
    case MAIN_VIEW_PATH:
      return colors.gray3;

    case TILES_LIST_PATH:
      return colors.blue2;

    default:
      return colors.gray3;
  }
};
