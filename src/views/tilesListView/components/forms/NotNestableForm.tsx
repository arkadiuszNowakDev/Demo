import styles from './commonFormsStyles.module.scss';
import { NotNestableFormData } from '../../types/FormTypes';

type NotNestableFormProps = {
  notNestableFormData?: NotNestableFormData;
  onFormDataChange: (fieldName: keyof NotNestableFormData, value: string | boolean) => void;
};

const NotNestableForm = (props: NotNestableFormProps): JSX.Element => {
  return <div className={styles.formContainer}>NotNestableForm</div>;
};

export default NotNestableForm;
