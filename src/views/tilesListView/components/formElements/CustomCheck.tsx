import { Form } from 'react-bootstrap';

import styles from './commonFormElementsStyles.module.scss';

type CustomCheckProps<T extends object> = {
  value?: string;
  fieldName: keyof T;
  isChecked: boolean;
  onChange: (fieldName: keyof T, value: string | boolean) => void;
  labelContent: string;
  type?: 'checkbox' | 'radio';
};

const CustomCheck = <T extends object>(props: CustomCheckProps<T>): JSX.Element => {
  return (
    <Form.Label className={styles.formLabel}>
      <Form.Check.Input
        value={props.value}
        onChange={(e) => props.onChange(props.fieldName, props.value ? e.target.value : e.target.checked)}
        type={props.type}
        checked={props.isChecked}
        className={styles.formCheck}
      />
      {props.labelContent}
    </Form.Label>
  );
};

export default CustomCheck;
