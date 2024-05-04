import { useEffect } from 'react';

import { hideAll } from 'tippy.js';

import styles from './App.module.scss';
import MainView from './views/mainView/MainView';

const App = () => {
  useEffect(() => {
    const hideAllTooltips = (): void => {
      hideAll();
    };

    window.addEventListener('scroll', hideAllTooltips, true);

    return () => {
      window.removeEventListener('scroll', hideAllTooltips, true);
    };
  }, []);

  return (
    <div className={styles.app}>
      <MainView />
    </div>
  );
};

export default App;
