import { Form } from 'react-bootstrap';

type CustomInputProps<T extends object> = {
  id: string;
  value: string;
  fieldName: keyof T;
  labelContent: string;
  onInputChange: (fieldName: string, value: string | boolean) => void;
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
        onChange={(e) => props.onInputChange(e.target.name, e.target.value)}
        autoComplete='off'
      />
    </Form.Group>
  );
};

export default CustomInput;
