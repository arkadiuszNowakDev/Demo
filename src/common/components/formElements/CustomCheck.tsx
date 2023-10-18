import { Form } from 'react-bootstrap';

import { FormData } from '../../../types/FormTypes';

type CustomCheckProps<T extends object> = {
  fieldName: keyof T;
  isChecked: boolean;
  formDataKey?: keyof FormData;
  value?: string;
  onChange: (fieldName: string, value: string | boolean, formDataKey?: keyof FormData) => void;
  labelContent: string;
  type?: 'checkbox' | 'radio';
};

const CustomCheck = <T extends object>(props: CustomCheckProps<T>): JSX.Element => {
  return (
    <Form.Label className='formLabel'>
      <Form.Check.Input
        name={props.fieldName.toString()}
        value={props.value}
        type={props.type}
        className='formCheck'
        onChange={(e) =>
          props.onChange(e.target.name, props.value ? e.target.value : e.target.checked, props.formDataKey)
        }
        checked={props.isChecked}
      />
      {props.labelContent}
    </Form.Label>
  );
};

export default CustomCheck;
