import { useMemo } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import styles from './TopBar.module.scss';
import { MAIN_VIEW_PATH } from '../../../routes/AppRoutes';
import { selectViewTitle } from '../../core/appSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

const TopBar = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const viewTitle = useAppSelector(selectViewTitle);
  const isGoBackIconVisible = useMemo(() => location.pathname !== MAIN_VIEW_PATH, [location.pathname]);

  return (
    <div className={styles.topBar}>
      {isGoBackIconVisible && (
        <i className='bi bi-arrow-up-left-square-fill' onClick={() => navigate(MAIN_VIEW_PATH)} />
      )}
      <span>{viewTitle}</span>
    </div>
  );
};

export default TopBar;
