import colors from '../styles/colors.module.scss';

export const getViewBackgroundColor = (pathName: string) => {
  switch (pathName) {
    case '/main':
      return colors.gray3;

    case '/tilesListDnD':
      return colors.blue2;

    default:
      return colors.gray3;
  }
};
