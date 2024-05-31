import { Navigate, Route, Routes } from 'react-router-dom';

import MainView from '../views/mainView/MainView';
import TilesListView from '../views/tilesListView/TilesListView';

export const MAIN_VIEW_PATH = '/main';
export const TILES_LIST_PATH = '/tilesListDnD';

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to={MAIN_VIEW_PATH} />} />

      <Route path={MAIN_VIEW_PATH} element={<MainView />} />

      <Route path={TILES_LIST_PATH} element={<TilesListView />} />
    </Routes>
  );
};

export default AppRoutes;
