import { Navigate, Route, Routes } from 'react-router-dom';

import MainView from '../views/mainView/MainView';
import TilesListView from '../views/tilesListView/TilesListView';

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/main' />} />

      <Route path='/main' element={<MainView />} />

      <Route path='/tilesListDnD' element={<TilesListView />} />
    </Routes>
  );
};

export default AppRoutes;
