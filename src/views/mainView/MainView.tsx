import styles from './MainView.module.scss';
import TilesListView from '../tilesListView/TilesListView';

const MainView = (): JSX.Element => {
  return (
    // <div className={styles.mainView}>
    //   <span>page1</span>
    //   <span>page2</span>
    //   <span>page3</span>
    //   <span>page4</span>
    // </div>
    <TilesListView />
  );
};

export default MainView;
