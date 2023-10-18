import { Form } from 'react-bootstrap';

import { FormData } from '../../../types/FormTypes';

type CustomInputProps<T extends object> = {
  id: string;
  value: string;
  fieldName: keyof T;
  formDataKey?: keyof FormData;
  labelContent: string;
  onInputChange: (fieldName: string, value: string | boolean, formDataKey?: keyof FormData) => void;
  customGroupClass?: string;
};

const CustomInput = <T extends object>(props: CustomInputProps<T>): JSX.Element => {
  return (
    <Form.Group className={`formGrid ${props.customGroupClass}`}>
      <Form.Label htmlFor={props.id} className='formLabel'>
        {props.labelContent}
      </Form.Label>
      <Form.Control
        id={props.id}
        className='formControl'
        type='text'
        name={props.fieldName.toString()}
        value={props.value}
        onChange={(e) => props.onInputChange(e.target.name, e.target.value, props.formDataKey)}
        autoComplete='off'
      />
    </Form.Group>
  );
};

export default CustomInput;
