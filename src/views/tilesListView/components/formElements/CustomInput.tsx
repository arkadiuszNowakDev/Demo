import { Form } from 'react-bootstrap';

import styles from './commonFormElementsStyles.module.scss';

type CustomInputProps<T extends object> = {
  id: string;
  value: string;
  fieldName: keyof T;
  labelContent: string;
  onInputChange: (fieldName: keyof T, value: string | boolean) => void;
  customGroupClass?: string;
};

const CustomInput = <T extends object>(props: CustomInputProps<T>): JSX.Element => {
  return (
    <Form.Group className={`${styles.formGrid} ${props.customGroupClass}`}>
      <Form.Label htmlFor={props.id} className={styles.formLabel}>
        {props.labelContent}
      </Form.Label>
      <Form.Control
        id={props.id}
        value={props.value}
        onChange={(e) => props.onInputChange(props.fieldName, e.target.value)}
        type='text'
        autoComplete='off'
        className={styles.formControl}
      />
    </Form.Group>
  );
};

export default CustomInput;
