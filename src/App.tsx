import styles from './App.module.scss';
import MainView from './views/mainView/MainView';

const App = () => {
  return (
    <div className={styles.app}>
      <MainView />
    </div>
  );
};

export default App;
