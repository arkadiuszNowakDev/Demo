import { Form } from 'react-bootstrap';

import styles from './commonFormElementsStyles.module.scss';

type CustomCheckProps<T extends object> = {
  fieldName: keyof T;
  isChecked: boolean;
  value?: string;
  onChange: (fieldName: string, value: string | boolean) => void;
  labelContent: string;
  type?: 'checkbox' | 'radio';
};

const CustomCheck = <T extends object>(props: CustomCheckProps<T>): JSX.Element => {
  return (
    <Form.Label className={styles.formLabel}>
      <Form.Check.Input
        name={props.fieldName.toString()}
        value={props.value}
        type={props.type}
        className={styles.formCheck}
        onChange={(e) => props.onChange(e.target.name, props.value ? e.target.value : e.target.checked)}
        checked={props.isChecked}
      />
      {props.labelContent}
    </Form.Label>
  );
};

export default CustomCheck;
