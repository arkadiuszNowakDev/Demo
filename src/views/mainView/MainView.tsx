import { useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import SampleTile, { SampleTileProps } from './components/sampleTile/SampleTile';
import tilesListDnDPicture from './data/pictures/tilesListDnD.jpg';
import styles from './MainView.module.scss';
import { setViewTitle } from '../../common/core/appSlice';
import { useAppDispatch } from '../../common/hooks/reduxHooks';
import { TILES_LIST_PATH } from '../../routes/AppRoutes';

const MainView = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setViewTitle('Arkadiusz Nowak'));
  }, []);

  const sampleTilesConfig: SampleTileProps[] = useMemo(
    () => [
      {
        imageSource: tilesListDnDPicture,
        title: 'Tiles list DnD',
        onClick: () => navigate(TILES_LIST_PATH)
      }
    ],
    []
  );

  return (
    <div className={styles.mainViewContainer}>
      {sampleTilesConfig.map((tileConfig) => (
        <SampleTile {...tileConfig} key={`sampleTile:${tileConfig.title}`} />
      ))}
    </div>
  );
};

export default MainView;
