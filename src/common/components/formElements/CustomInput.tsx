import { Form } from 'react-bootstrap';

type CustomInputProps<T extends object, K extends object | undefined = undefined> = {
  id: string;
  value: string;
  fieldName: keyof T;
  nestedObjectKey?: keyof K;
  labelContent: string;
  onInputChange: (fieldName: string, value: string | boolean, formDataKey?: keyof K) => void;
  customGroupClass?: string;
};

const CustomInput = <T extends object, K extends object | undefined = undefined>(
  props: CustomInputProps<T, K>
): JSX.Element => {
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
        onChange={(e) => props.onInputChange(e.target.name, e.target.value, props.nestedObjectKey)}
        autoComplete='off'
      />
    </Form.Group>
  );
};

export default CustomInput;
