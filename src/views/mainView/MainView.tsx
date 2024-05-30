import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import SampleTile, { SampleTileProps } from './components/sampleTile/SampleTile';
import tilesListDnDPicture from './data/pictures/tilesListDnD.jpg';
import styles from './MainView.module.scss';

const MainView = (): JSX.Element => {
  const navigate = useNavigate();

  const sampleTilesConfig: SampleTileProps[] = useMemo(
    () => [
      {
        imageSource: tilesListDnDPicture,
        title: 'Tiles list DnD',
        onClick: () => navigate('/tilesListDnD')
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
