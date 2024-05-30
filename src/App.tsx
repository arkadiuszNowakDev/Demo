import { useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import { hideAll } from 'tippy.js';

import styles from './App.module.scss';
import { getViewBackgroundColor } from './common/helpers/appHelpers';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const location = useLocation();

  const appBackgroundColor = useMemo(() => getViewBackgroundColor(location.pathname), [location.pathname]);

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
    <div className={styles.app} style={{ backgroundColor: appBackgroundColor }}>
      <div className={styles.topBar}>TOP BAR</div>
      <div className={styles.view}>
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
