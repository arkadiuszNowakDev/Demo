import SampleTile, { SampleTileProps } from './components/sampleTile/SampleTile';
import tilesListDnDPicture from './data/pictures/tilesListDnD.jpg';
import styles from './MainView.module.scss';

const sampleTilesConfig: SampleTileProps[] = [
  {
    imageSource: tilesListDnDPicture,
    title: 'Tiles list DnD'
  }
];

const MainView = (): JSX.Element => {
  return (
    <div className={styles.mainViewContainer}>
      {sampleTilesConfig.map((tileConfig) => (
        <SampleTile {...tileConfig} key={`sampleTile:${tileConfig.title}`} />
      ))}
    </div>
  );
};

export default MainView;
