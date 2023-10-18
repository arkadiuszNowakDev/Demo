import { AnotherNestableFormData, FormData } from '../../../types/FormTypes';

type AnotherNestableFormProps = {
  anotherNestableFormData?: AnotherNestableFormData;
  onFormDataChange: (fieldName: string, value: string | boolean | string[], formDataKey?: keyof FormData) => void;
};

const AnotherNestableForm = (props: AnotherNestableFormProps): JSX.Element => {
  return <div className='formContainer'>AnotherNestableForm</div>;
};

export default AnotherNestableForm;
