import styles from './commonFormsStyles.module.scss';
import { NestFormData } from '../../../../types/FormTypes';

type NestFormProps = {
  nestFormData: NestFormData;
  onFormDataChange: (fieldName: string, value: string | boolean) => void;
};

const NestForm = (props: NestFormProps): JSX.Element => {
  return <div className={styles.formContainer}>NestForm</div>;
};

export default NestForm;
