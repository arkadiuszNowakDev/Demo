import { Form } from 'react-bootstrap';

import { FormData } from '../../../types/FormTypes';

type CustomInputProps<T extends object> = {
  value: string;
  fieldName: keyof T;
  actionDataObjectName?: keyof FormData;
  labelContent: string;
  onInputChange: (fieldName: string, value: string | boolean, key?: keyof FormData) => void;
};

const CustomInput = <T extends object>(props: CustomInputProps<T>): JSX.Element => {
  return (
    <Form.Label className='formLabel'>
      {props.labelContent}
      <Form.Control
        className='formControl'
        type='text'
        name={props.fieldName.toString()}
        value={props.value}
        onChange={(e) => props.onInputChange(e.target.name, e.target.value, props.actionDataObjectName)}
        autoComplete='off'
      />
    </Form.Label>
  );
};

export default CustomInput;
